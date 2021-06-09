import * as core from '@serverless-devs/core';
import BaseComponent from './common/base';
import logger from './common/logger';
import * as _ from 'lodash';
import { InputProps, ICredentials } from './common/entity';
import GetYaml from './lib/yaml-path';
import ReadFile from './lib/read-file';
import WriteFile from './lib/write-file';
import Transform from './lib/transform';

export default class ComponentDemo extends BaseComponent {
  constructor(props) {
    super(props)
  }

  private async report(componentName: string, command: string, accountID?: string, access?: string): Promise<void> {
    let uid: string = accountID;
    if (_.isEmpty(accountID)) {
      const credentials: ICredentials = await core.getCredential(access);
      uid = credentials.AccountID;
    }

    core.reportComponent(componentName, {
      command,
      uid,
    });
  }

  private argsParser(args: string) {
    const apts: any = {
      boolean: ['help'],
      string: ['region', 'type', 'fun'],
      alias: { 'help': 'h' },
    };
    const comParse: any = core.commandParse({ args }, apts);
    // 将Args转成Object
    const argsData: any = comParse.data || {};
    const { region, fun } = argsData;
    if (argsData.help) {
      return { isHelp: true };
    }

    return {
      region,
      fun
    };
  }

  public async fc(inputs: InputProps) {
    logger.debug(inputs);
    const { access } = inputs.project;
    // this.report('fc-transform', 'fc', inputs.credentials?.AccountID, access);
    const { isHelp, region, fun } = this.argsParser(inputs.args);
    if (isHelp) {
      // TODO help
      return;
    }
    
    const { fileDir, filePath: funYamlPath } = await GetYaml.getFunPaths({
      filePath: fun,
    });
    const saveSPath = await GetYaml.getYamlFileNotExistPath({
      fileDir,
      fileName: 's'
    });
    logger.debug(`fileDir: ${fileDir}, funYamlPath: ${funYamlPath}, saveSPath: ${saveSPath}`);
    const funConfig = await ReadFile.readYaml(funYamlPath);
    const funProfile = await ReadFile.getFunProfile();

    const services = Transform.resources(funConfig.Resources);
    // console.log(JSON.stringify(services, null, 2));
    await WriteFile.s(saveSPath, access, region || funProfile.region || '***', services);
    logger.success('ok');
  }
}
