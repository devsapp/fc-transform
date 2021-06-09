import yaml from 'js-yaml';
import fse from 'fs-extra';

export default class WriteFile {
  static async s(ymlPath, access, region, services) {
    const ymlConfig = {
      edition: '1.0.0',
      name: 'tramsform_fun',
      access,
      vars: { region },
      services: JSON.parse(JSON.stringify(services))
    };

    const configStr = yaml.dump(ymlConfig);

    await fse.writeFile(ymlPath, configStr);
  }
}