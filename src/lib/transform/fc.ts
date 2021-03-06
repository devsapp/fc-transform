import _ from 'lodash';
import Base from './base';

const COMPONENT = 'devsapp/fc';
function extractOssCodeUri(ossUri: string) {
  const prefixLength = 'oss://'.length;

  const index = ossUri.indexOf('/', prefixLength);

  return {
    ossBucket: ossUri.substring(prefixLength, index),
    ossKey: ossUri.substring(index + 1)
  };
}

export default class Transform extends Base {
  transform(name: string, resource: any) {
    const properties = resource?.Properties;
    const serviceConfig = this.transformService(name, properties);

    const services = {};

    _.forIn(resource, (v: any, functionName) => {
      if ((v || {}).Type === 'Aliyun::Serverless::Function') {
        const props: any = {
          region: this.VARS_REGION,
          service: serviceConfig,
        };

        props.function = this.transformFunction(functionName, v.Properties);

        if (v.Events) {
          props.triggers = Object.keys(v.Events).map(triggerName =>
            this.transformTrigger(triggerName, v.Events[triggerName])
          );
        }

        services[`fc-${name}-${functionName}`] = {
          component: COMPONENT,
          props,
        };
      }
    });

    // 如果仅配置服务，services 会返回一个空的对象
    if (_.isEmpty(services)) {
      services[`fc-${name}`] = {
        component: COMPONENT,
        props: {
          region: this.VARS_REGION,
          service: serviceConfig,
        },
      };
    }

    return services;
  }

  private transformService(name, properties) {
    const serviceConfig: any = {
      name,
      description: properties?.Description,
      role: properties?.Role,
      internetAccess: (properties && 'InternetAccess' in properties) ? properties.InternetAccess : true
    };
    const vpcConfig = properties?.VpcConfig;
    const nasConfig = properties?.NasConfig;
    const logConfig = properties?.LogConfig;
    const tracingConfig = properties?.TracingConfig;

    if (properties?.Policies) {
      let policies = [];
      if (_.isString(properties.Policies)) {
        policies.push(properties.Policies);
      } else if (_.isArray(properties.Policies)) {
        for (const p of properties.Policies) {
          if (_.isString(p)) {
            policies.push(p);
          } else if (_.has(p, 'Statement') && p?.Version === '1') {
            const policyName = `Fun2sGeneratedServicePolicy-${name}-${Math.floor((Math.random()*100)+1)}`;
            policies.push({
              name: policyName,
              statement: p.Statement,
            });
          } else {
            throw new Error('Unsupported service role configuration, please file an issue');
          }
        }
      } else {
        policies = properties.Policies;
      }

      serviceConfig.role = {
        name: serviceConfig.role || `${serviceConfig.name}DefaultRole`,
        policies,
      };
    }

    if (vpcConfig) {
      if (this.isAuto(nasConfig)) {
        serviceConfig.vpcConfig = this.transformKey(vpcConfig);
      } else {
        serviceConfig.vpcConfig = {
          vpcId: vpcConfig.VpcId,
          vswitchIds: vpcConfig.VSwitchIds,
          securityGroupId: vpcConfig.SecurityGroupId,
        };
      }
    }

    if (nasConfig) {
      if (this.isAuto(nasConfig)) {
        serviceConfig.nasConfig = this.transformKey(nasConfig);
      } else {
        const tNasConfig = this.transformKey(nasConfig);

        tNasConfig.mountPoints = tNasConfig.mountPoints.map((item) => {
          const [serverAddr, nasDir] = this.transformKey(item).serverAddr.split(':');
          return { serverAddr, nasDir, fcDir: item.MountDir };
        });
        serviceConfig.nasConfig = tNasConfig;
      }
    }

    if (logConfig) {
      serviceConfig.logConfig = this.transformKey(logConfig);
    }

    if (tracingConfig) {
      serviceConfig.tracingConfig = tracingConfig;
    }

    return serviceConfig;
  }

  private transformFunction(name, funcProperties) {
    const resolvedFunctionConf = {
      name,
      description: funcProperties.Description,
      handler: funcProperties.Handler,
      initializer: funcProperties.Initializer,
      timeout: funcProperties.Timeout,
      initializationTimeout: funcProperties.InitializationTimeout,
      memorySize: funcProperties.MemorySize,
      runtime: funcProperties.Runtime,
      customContainerConfig: this.transformKey(funcProperties.CustomContainerConfig),
      caPort: funcProperties.CAPort,
      instanceType: funcProperties.InstanceType,
      environmentVariables: funcProperties.EnvironmentVariables,
      instanceConcurrency: funcProperties.InstanceConcurrency,
      layers: funcProperties.Layers,
      asyncConfiguration: this.transformKey(funcProperties.AsyncConfiguration),
      instanceLifecycleConfig: this.transformKey(funcProperties.InstanceLifecycleConfig)
    }
    const codeUri = funcProperties.CodeUri;
    if (_.isString(codeUri) && codeUri.startsWith('oss://')) {
      Object.assign(resolvedFunctionConf, extractOssCodeUri(codeUri));
    } else {
      Object.assign(resolvedFunctionConf, { codeUri });
    }
    return resolvedFunctionConf;
  }

  private transformTrigger(name, triggerConfig) {
    // authType for http trigger should be transformed to be in lower case
    const transformedConfig: any = this.transformKey(triggerConfig.Properties);
    if (transformedConfig?.authType) {
      transformedConfig.authType = _.lowerCase(transformedConfig?.authType);
    }

    const role = transformedConfig?.invocationRole;
    transformedConfig?.invocationRole && delete transformedConfig?.invocationRole;

    const sourceArn = transformedConfig?.sourceArn;
    transformedConfig?.sourceArn && delete transformedConfig?.sourceArn;

    const qualifier = transformedConfig?.qualifier;
    transformedConfig?.qualifier && delete transformedConfig?.qualifier;

    let type = _.toLower(triggerConfig.Type || '');
    if(type === 'mnstopic') {
      type = 'mns_topic';
    }

    return {
      name,
      role,
      qualifier,
      sourceArn,
      type,
      config: transformedConfig,
    }
  }
}
