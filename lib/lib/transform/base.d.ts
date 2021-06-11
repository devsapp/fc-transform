export default abstract class Base {
    abstract transform(name: string, resource: any, services?: any): any;
    readonly VARS_REGION = "${vars.region}";
    isAuto(args: any): boolean;
    transformKey(args: any): any;
}
