import _ from 'lodash';
import logger from '../common/logger';

const isAuto = (args) => _.isString(args) && _.toLower(args) === 'auto';
const transformKey = (args) => {
  if (_.isEmpty(args)) {
    return undefined;
  }
  if (isAuto(args)) {
    return args;
  } else {
    return _.mapKeys(args, (_value, key) => _.lowerFirst(key))
  }
}

export default class Transform {
  static resources(resour: any) {
    const props: any = {};

    _.forIn(resour, (resource: any, name) => {
      const type = resource.Type;
      if (type === 'Aliyun::Serverless::Service') {
        props[`Service-${name}`] = this.fc(name, resource);
      } else if (type === 'Aliyun::Serverless::Api') {
        logger.error('Not currently supported transform Aliyun::Serverless::Api');
      } else if (type === 'Aliyun::Serverless::TableStore') {
        logger.error('Not currently supported transform Aliyun::Serverless::TableStore');
      } else if (type === 'Aliyun::Serverless::Log') {
        logger.error('Not currently supported transform Aliyun::Serverless::Log');
      } else if (type === 'Aliyun::Serverless::CustomDomain') {
        // props[`CustomDomain-${name}`] = this.customDomain(name, resource);
        logger.error('Not currently supported transform Aliyun::Serverless::CustomDomain');
      } else if (type === 'Aliyun::Serverless::MNSTopic') {
        logger.error('Not currently supported transform Aliyun::Serverless::MNSTopic');
      } else if (type === 'Aliyun::Serverless::Flow') {
        logger.error('Not currently supported transform Aliyun::Serverless::MNSTopic');
      } else {
        logger.error(`unknown resource ${name}`);
      }
    });

    const services = {};
    _.forEach(props, (value, key) => {
      // TODO: 合并 customDomains
      Object.assign(services, value);
    });

    return services;
  }

  static customDomain(name: string, resource) {

  }

  static fc(name: string, resource: any) {
    const properties = resource.Properties;
    const serviceConfig: any = {
      name,
      description: properties.Description,
      role: properties.Role,
      internetAccess: 'InternetAccess' in properties ? properties.InternetAccess : null,
    };
    const vpcConfig = properties.VpcConfig;
    const nasConfig = properties.NasConfig;
    const logConfig = properties.LogConfig;
    const tracingConfig = properties.TracingConfig;

    if (vpcConfig) {
      serviceConfig.vpcConfig = transformKey(vpcConfig);
    }

    if (nasConfig) {
      if (isAuto(nasConfig)) {
        serviceConfig.nasConfig = transformKey(nasConfig);
      } else {
        const tNasConfig = transformKey(nasConfig);
  
        tNasConfig.mountPoints = tNasConfig.mountPoints.map((item) => {
          const [serverAddr, nasDir] = transformKey(item).serverAddr.split(':');
          return { serverAddr, nasDir, fcDir: item.MountDir };
        });
        serviceConfig.nasConfig = tNasConfig;
      }
    }

    if (logConfig) {
      serviceConfig.logConfig = transformKey(logConfig);
    }

    if (tracingConfig) {
      serviceConfig.tracingConfig = tracingConfig;
    }

    const services: any = {};
    _.forIn(resource, (v: any, functionName) => {
      if ((v || {}).Type === 'Aliyun::Serverless::Function') {
        const props: any = {
          region: '${vars.region}',
          service: serviceConfig,
        };
        const funcProperties = v.Properties;

        props.function = {
          name:functionName,
          description: funcProperties.Description,
          handler: funcProperties.Handler,
          initializer: funcProperties.Initializer,
          timeout: funcProperties.Timeout,
          initializationTimeout: funcProperties.InitializationTimeout,
          memorySize: funcProperties.MemorySize,
          runtime: funcProperties.Runtime,
          codeUri: funcProperties.CodeUri,
          customContainerConfig: transformKey(funcProperties.CustomContainerConfig),
          cAPort: funcProperties.CAPort,
          instanceType: funcProperties.InstanceType,
          environmentVariables: funcProperties.EnvironmentVariables,
          instanceConcurrency: funcProperties.InstanceConcurrency,
          layers: funcProperties.Layers,
          asyncConfiguration: transformKey(funcProperties.AsyncConfiguration),
          instanceLifecycleConfig: transformKey(funcProperties.InstanceLifecycleConfig)
        }

        if (v.Events) {
          props.triggers = Object.keys(v.Events).map(triggerName => {
            const triggerConfig = v.Events[triggerName];
            // authType for http trigger should be transformed to be in lower case
            const transformedConfig: any = transformKey(triggerConfig.Properties);
            if (transformedConfig?.authType) {
              transformedConfig.authType = _.lowerCase(transformedConfig?.authType);
            }
            return {
              name: triggerName,
              type: _.toLower(triggerConfig.Type),
              config: transformedConfig,
            }
          });
        }

        services[`${name}-${functionName}`] = {
          component: 'devsapp/fc',
          props,
        };
      }
    })
    
    return services;
  }
}
