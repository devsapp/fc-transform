import * as core from '@serverless-devs/core';
import logger from './common/logger';
import * as _ from 'lodash';
import HELP from './lib/help';
import { InputProps } from './common/entity';
import GetYaml from './lib/yaml-path';
import ReadFile from './lib/read-file';
import WriteFile from './lib/write-file';
import Transform from './lib/transform';

export default class ComponentDemo {
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
  async fun2fc(inputs: InputProps) {
    // 获取密钥
    const { access } = inputs.project;
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
      fileName: target || 's.yaml',
      command: 'fun2fc',
      fileDir,
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

  /**
   * Funcraft配置转换为Serverless Devs配置
   * @param 'Optional --source [fun Yaml文件], --target [Serverless Devs目标文件]'
   * @typeParam Required --serviceName
   * @typeParam
   */
  async fun2ros(inputs: InputProps) {
    const { isHelp, region, source, force, target } = this.argsParser(inputs.args);
    if (isHelp) {
      core.help(HELP);
      return;
    }

    const { fileDir, filePath: funYamlPath } = await GetYaml.getFunPaths({
      filePath: source,
    });
    logger.info(`Using funcraft yaml: ${funYamlPath}`);

    const saveSPath = await GetYaml.getYamlFileNotExistPath({
      fileName: target || 's.yaml',
      command: 'fun2ros',
      fileDir,
      force,
    });

    logger.debug(`fileDir: ${fileDir}, funYamlPath: ${funYamlPath}, saveSPath: ${saveSPath}`);

    const funProfile = await ReadFile.getFunProfile();
    const template = await WriteFile.ros(saveSPath, await ReadFile.readYaml(funYamlPath));
    await WriteFile.s(saveSPath, inputs?.project?.access, region || funProfile.region || '***', {
      transform_fun: {
        component: 'devsapp/ros',
        props: {
          name: '****',
          region: '${vars.region}',
          template,
        }
      }
    });

    logger.info(`Reminder serverless devs yaml path: ${saveSPath}`);
    const deployTip = 's deploy -t ' + (target ? target : 's.yaml');
    logger.log(`\nTips for next step

======================
* Deploy Resources: ${deployTip}\n`, 'yellow');
  }
}
