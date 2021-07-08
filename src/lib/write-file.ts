import yaml from 'js-yaml';
import fse from 'fs-extra';

export default class WriteFile {
    static async s(ymlPath, access, region, services) {
        const ymlConfig = {
            edition: '1.0.0',
            name: 'transform_fun',
            access,
            vars: {region},
            services: JSON.parse(JSON.stringify(services))
        };
        const tempServiceObj = {}
        const tempServiceVarsList = []
        const tempServiceList = []

        for (const eveService in ymlConfig.services) {
            if (ymlConfig.services[eveService].component !== 'devsapp/fc') {
                continue;
            }
            if (ymlConfig.services[eveService].props.service) {
                if (ymlConfig.services[eveService].props.service.name) {
                    if (tempServiceList.includes(ymlConfig.services[eveService].props.service.name)) {
                        tempServiceObj[ymlConfig.services[eveService].props.service.name] = ymlConfig.services[eveService].props.service
                        tempServiceVarsList.push(ymlConfig.services[eveService].props.service.name)
                    }
                    tempServiceList.push(ymlConfig.services[eveService].props.service.name)
                }
            }
        }
        if(tempServiceVarsList.length > 0){
          for(let i=0;i<tempServiceVarsList.length;i++){
            ymlConfig.vars[tempServiceVarsList[i]] = tempServiceObj[tempServiceVarsList[i]]
          }
        }
        for (const eveService in ymlConfig.services) {
            if (ymlConfig.services[eveService].component !== 'devsapp/fc') {
                continue;
            }
            if (ymlConfig.services[eveService].props.service) {
                if (ymlConfig.services[eveService].props.service.name) {
                    if (tempServiceVarsList.includes(ymlConfig.services[eveService].props.service.name)) {
                        ymlConfig.services[eveService].props.service = '${vars.' + ymlConfig.services[eveService].props.service.name + '}'
                    }
                }
            }
        }
        const configStr = yaml.dump(ymlConfig);
        await fse.writeFile(ymlPath, configStr);
    }

    static async ros(saveSPath: string, data: any) {
        const fileName = `${saveSPath}.json`;
        await fse.writeFile(fileName, JSON.stringify(data, null, 2));
        return fileName;
    }
}