import _ from 'lodash';
import Base from './base';

const COMPONENT = 'devsapp/sls';

export default class Transform extends Base {
  transform(name: string, resource: any) {
    const servicesObj = {};
    console.log('resource ', resource);
    
    const logstores = [];
    _.forIn(resource, (v: any, logstoreName) => {
      if ((v || {}).Type === 'Aliyun::Serverless::Log::Logstore') {
        logstores.push({
          name: logstoreName,
          option: [{
            ttl: v.Properties.TTL,
            shardCount: v.Properties.ShardCount,
          }]
        })
      }
    });
    const props: any = {
      regionId: this.VARS_REGION,
      project: name,
      description: resource?.Properties?.Description || '',
      logstore: logstores,
    };

    servicesObj[name] = {
      component: COMPONENT,
      props,
    };

    return servicesObj;
  }
}
