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
      string: ['region', 'type', 'source', 'target'],
      alias: { 'help': 'h'},
    };
    const comParse: any = core.commandParse({ args }, apts);
    // 将Args转成Object
    const argsData: any = comParse.data || {};
    const { region, source, force, target } = argsData;
    if (argsData.help) {
      return { isHelp: true };
    }

    return {
      region,
      force,
      source,
      target
    };
  }

  /**
   * Funcraft配置转换为Serverless Devs配置
   * @param 'Optional --source [fun Yaml文件], --target [Serverless Devs目标文件]'
   * @typeParam Required --serviceName
   * @typeParam
   */
  public async fun2fc(inputs: InputProps) {
    logger.debug(inputs);
    // 获取密钥
    const { access } = inputs.project;
    // 数据采集
    this.report('fc-transform', 'fc', inputs.credentials?.AccountID, access);
    // 参数获取
    const { isHelp, region, source, force, target } = this.argsParser(inputs.args);
    if (isHelp) {
      core.help(HELP);
      return;
    }

    const { fileDir, filePath: funYamlPath } = await GetYaml.getFunPaths({
      filePath: source,
    });
    logger.info(`Using funcraft yaml: ${funYamlPath}`)
    const saveSPath = await GetYaml.getYamlFileNotExistPath({
      fileDir,
      fileName: target || 's.yaml',
      force,
    });

    logger.debug(`fileDir: ${fileDir}, funYamlPath: ${funYamlPath}, saveSPath: ${saveSPath}`);
    const funConfig = await ReadFile.readYaml(funYamlPath);
    const funProfile = await ReadFile.getFunProfile();

    const services = Transform.resources(funConfig.Resources);
    logger.debug(JSON.stringify(services, null, 2));
    await WriteFile.s(saveSPath, access, region || funProfile.region || '***', services);

    logger.info(`Reminder serverless devs yaml path: ${saveSPath}`);

    const eventInvokeTip = 's local invoke -t ' + (target ? target : 's.yaml');
    const httpInvokeTip = 's local start -t ' + (target ? target : 's.yaml');
    const deployTip = 's deploy -t ' + (target ? target : 's.yaml');

    logger.log(`\nTips for next step

======================
* Invoke Event Function: ${eventInvokeTip}
* Invoke Http Function: ${httpInvokeTip}
* Deploy Resources: ${deployTip}\n`, 'yellow');
  }
}
