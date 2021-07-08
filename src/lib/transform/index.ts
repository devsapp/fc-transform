import _, { isEmpty } from 'lodash';
import logger from '../../common/logger';
import Fc from './fc';
import Log from './log';
import CustomDomain from './custom-domain';

export default class Transform {
  static resources(resour: any) {
    const services: any = {};
    const logs: any = {};
    const cnames: any = {};
    const customDomains = [];

    _.forIn(resour, (resource: any, name) => {
      const type = resource.Type;
      if (type === 'Aliyun::Serverless::Service') {
        const fcResources = new Fc().transform(name, resource);
        Object.assign(services, fcResources);
      } else if (type === 'Aliyun::Serverless::Api') {
        logger.error('Not currently supported transform Aliyun::Serverless::Api');
      } else if (type === 'Aliyun::Serverless::TableStore') {
        logger.error('Not currently supported transform Aliyun::Serverless::TableStore');
      } else if (type === 'Aliyun::Serverless::Log') {
        const logResources = new Log().transform(name, resource);
        Object.assign(logs, logResources);
      } else if (type === 'Aliyun::Serverless::CustomDomain') {
        customDomains.push({
          name,
          resource,
        });
      } else if (type === 'Aliyun::Serverless::MNSTopic') {
        logger.error('Not currently supported transform Aliyun::Serverless::MNSTopic');
      } else if (type === 'Aliyun::Serverless::Flow') {
        logger.error('Not currently supported transform Aliyun::Serverless::MNSTopic');
      } else {
        logger.error(`unknown resource ${name}`);
      }
    });

    const fcResources = Object.keys(services)
      .map(key => {
        const { props } = services[key];

        return ({
          key,
          serviceName: props.service.name,
          functionName: props.function?.name,
          hasHttpTrigger: props.triggers ? !isEmpty(props.triggers.filter(({ type }) => type === 'http')) : false,
        })
      })
      .filter(({ hasHttpTrigger }) => hasHttpTrigger);

    for (const { name, resource } of customDomains) {
      const customDomain = new CustomDomain().transform(name, resource, fcResources);
      if (customDomain.key) {
        if (!services[customDomain.key].props.customDomains) {
          services[customDomain.key].props.customDomains = [];
        }
        services[customDomain.key].props.customDomains.push(customDomain.customDomain);
      } else {
        cnames[`CustomDomain-${name}`] = customDomain;
      }
    }

    return {
      ...logs,
      ...cnames,
      ...services,
    };
  }
}
