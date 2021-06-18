import _ from 'lodash';
import Base from './base';

const COMPONENT = 'devsapp/fc';

export default class Transform extends Base {
  transform(name: string, resource: any) {
    const properties = resource.Properties;
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
      description: properties.Description,
      role: properties.Role,
      internetAccess: 'InternetAccess' in properties ? properties.InternetAccess : true,
    };
    const vpcConfig = properties.VpcConfig;
    const nasConfig = properties.NasConfig;
    const logConfig = properties.LogConfig;
    const tracingConfig = properties.TracingConfig;

    if (properties.Policies) {
      serviceConfig.role = {
        name: serviceConfig.role,
        policies: _.isString(properties.Policies) ? [properties.Policies] : properties.Policies
      }
    }

    if (vpcConfig) {
      serviceConfig.vpcConfig = this.transformKey(vpcConfig);
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
    return {
      name,
      description: funcProperties.Description,
      handler: funcProperties.Handler,
      initializer: funcProperties.Initializer,
      timeout: funcProperties.Timeout,
      initializationTimeout: funcProperties.InitializationTimeout,
      memorySize: funcProperties.MemorySize,
      runtime: funcProperties.Runtime,
      codeUri: funcProperties.CodeUri,
      customContainerConfig: this.transformKey(funcProperties.CustomContainerConfig),
      cAPort: funcProperties.CAPort,
      instanceType: funcProperties.InstanceType,
      environmentVariables: funcProperties.EnvironmentVariables,
      instanceConcurrency: funcProperties.InstanceConcurrency,
      layers: funcProperties.Layers,
      asyncConfiguration: this.transformKey(funcProperties.AsyncConfiguration),
      instanceLifecycleConfig: this.transformKey(funcProperties.InstanceLifecycleConfig)
    }
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
