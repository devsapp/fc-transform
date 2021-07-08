import _ from 'lodash';
import logger from '../../common/logger';
import fse from 'fs-extra';
import Base from './base';

const COMPONENT = 'devsapp/fnf';
const COMPONENT_RAM = 'devsapp/ram';

export default class Transform extends Base {
  transform(name: string, resource: any) {
    const servicesObj: any = {};
    const { Description, DefinitionUri, Definition, Policies, Role } = resource.Properties;
    const roleArnKey = `${name}-role-${new Date().getTime()}`;

    const hasPolicies = !_.isEmpty(Policies);
    if (!Role && hasPolicies) {
      servicesObj[roleArnKey] = {
        component: COMPONENT_RAM,
        props: {
          name: `aliyunfnfgeneratedrole-${name}`.replace(/_/g, '-'),
          description: 'Function Flow Default Role',
          service: 'fnf.aliyuncs.com',
          policies: Policies,
        }
      };
    }

    let roleArn = Role;
    if (hasPolicies) {
      roleArn = '${roleArnKey.output}';
    }
    let definition = DefinitionUri;
    if (_.isString(Definition)) {
      const savaFilePath = `${name}_${new Date().getTime()}.yaml`;
      fse.writeFileSync(savaFilePath, definition);
      definition = savaFilePath;
    } else if (!_.isEmpty(Definition)) {
      logger.error(`The flow[${name}] definition in this format can not be converted.`);
    }

    servicesObj[name] = {
      component: COMPONENT,
      props: {
        name,
        description: Description,
        definition,
        roleArn,
      },
    };

    return servicesObj;
  }
}
