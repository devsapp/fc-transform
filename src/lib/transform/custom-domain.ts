import _ from 'lodash';
import Base from './base';

const COMPONENT = 'devsapp/fc-domain';

export default class Transform extends Base {
  transform(name: string, resource: any, serviceConfig) {
    const properties = resource.Properties;

    const routes = properties?.RouteConfig?.Routes || {};
    const routeConfigs = Object.keys(routes).map(key => ({
      ...this.transformKey(routes[key]),
      path: key,
    }));
    
    const customDomain = {
      domainName: properties.DomainName || name,
      protocol: properties.Protocol,
      certConfig: this.transformKey(properties.CertConfig),
      routeConfigs,
    };

    for (const { serviceName, functionName } of routeConfigs) {
      const index = _.findIndex(serviceConfig, (item: any) => item.serviceName === serviceName && item.functionName && functionName);

      if (index !== -1) {
        return {
          key: serviceConfig[0].key,
          customDomain,
        }
      }
    }

    return {
      component: COMPONENT,
      props: {
        region: this.VARS_REGION,
        customDomain,
      }
    };
  }
}
