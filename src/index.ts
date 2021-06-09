import * as core from '@serverless-devs/core';
import BaseComponent from './common/base';
import logger from './common/logger';
import * as _ from 'lodash';
import HELP from './lib/help';
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
      boolean: ['help', 'force'],
      string: ['region', 'type', 'fun-path'],
      alias: { 'help': 'h', 'force': 'f', 'fun-path': 'fun' },
    };
    const comParse: any = core.commandParse({ args }, apts);
    // 将Args转成Object
    const argsData: any = comParse.data || {};
    const { region, fun, force } = argsData;
    if (argsData.help) {
      return { isHelp: true };
    }

    return {
      region,
      force,
      fun
    };
  }

  public async fc(inputs: InputProps) {
    logger.debug(inputs);
    const { access } = inputs.project;
    this.report('fc-transform', 'fc', inputs.credentials?.AccountID, access);
    const { isHelp, region, fun, force } = this.argsParser(inputs.args);
    if (isHelp) {
      core.help(HELP);
      return;
    }
    
    const { fileDir, filePath: funYamlPath } = await GetYaml.getFunPaths({
      filePath: fun,
    });
    const saveSPath = await GetYaml.getYamlFileNotExistPath({
      fileDir,
      fileName: 's',
      force,
    });
    logger.debug(`fileDir: ${fileDir}, funYamlPath: ${funYamlPath}, saveSPath: ${saveSPath}`);
    const funConfig = await ReadFile.readYaml(funYamlPath);
    const funProfile = await ReadFile.getFunProfile();

    const services = Transform.resources(funConfig.Resources);
    logger.debug(JSON.stringify(services, null, 2));
    await WriteFile.s(saveSPath, access, region || funProfile.region || '***', services);

    logger.success(`\nTransform success, s file path: ${saveSPath}`);

    const eventInvokeTip = 's local invoke';
    const httpInvokeTip = 's local start';
    const deployTip = 's deploy';
    
logger.log(`\nTips for next step

======================
* Invoke Event Function: ${eventInvokeTip}
* Invoke Http Function: ${httpInvokeTip}
* Deploy Resources: ${deployTip}\n`, 'yellow');
  }
}
