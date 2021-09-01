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
      serviceConfig.role = {
        name: serviceConfig.role || `${serviceConfig.name}DefaultRole`,
        policies: _.isString(properties.Policies) ? [properties.Policies] : properties.Policies
      }
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
    return {
      name,
      type: _.toLower(triggerConfig.Type),
      config: transformedConfig,
    }
  }
}
