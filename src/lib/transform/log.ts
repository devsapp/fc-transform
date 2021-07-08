import _ from 'lodash';
import Base from './base';

const COMPONENT = 'devsapp/sls';

export default class Transform extends Base {
  transform(name: string, resource: any) {
    const servicesObj = {};
    
    _.forIn(resource, (v: any, logstoreName) => {
      if ((v || {}).Type === 'Aliyun::Serverless::Log::Logstore') {
        const props: any = {
          regionId: this.VARS_REGION,
          project: name,
          description: resource?.Properties?.Description || '',
          logstore: logstoreName,
          logstoreOption: {
            ttl: v.Properties.TTL,
            shardCount: v.Properties.ShardCount,
          }
        };

        servicesObj[name] = {
          component: COMPONENT,
          props,
        };
      }
    });

    return servicesObj;
  }
}
