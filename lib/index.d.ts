import BaseComponent from './common/base';
import { InputProps } from './common/entity';
export default class ComponentDemo extends BaseComponent {
    constructor(props: any);
    private report;
    private argsParser;
    /**
     * Funcraft配置转换为Serverless Devs配置
     * @param 'Optional --source [fun Yaml文件], --target [Serverless Devs目标文件]'
     * @typeParam Required --serviceName
     * @typeParam
     */
    fun2fc(inputs: InputProps): Promise<void>;
    /**
     * Funcraft配置转换为Serverless Devs配置
     * @param 'Optional --source [fun Yaml文件], --target [Serverless Devs目标文件]'
     * @typeParam Required --serviceName
     * @typeParam
     */
    fun2ros(inputs: InputProps): Promise<void>;
}
