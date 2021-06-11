import Base from './base';
export default class Transform extends Base {
    transform(name: string, resource: any, serviceConfig: any): {
        key: any;
        customDomain: {
            domainName: any;
            protocol: any;
            certConfig: any;
            routeConfigs: any[];
        };
        component?: undefined;
        props?: undefined;
    } | {
        component: string;
        props: {
            region: string;
            customDomain: {
                domainName: any;
                protocol: any;
                certConfig: any;
                routeConfigs: any[];
            };
        };
        key?: undefined;
        customDomain?: undefined;
    };
}
