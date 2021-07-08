interface yamlInputs {
    filePath?: undefined | string;
}
export default class GetYaml {
    static getFunPaths({ filePath }: yamlInputs): Promise<{
        fileDir: any;
        filePath: any;
    }>;
    static getYamlFileNotExistPath({ fileDir, fileName, force, command }: {
        fileDir: any;
        fileName: any;
        force: any;
        command: any;
    }): Promise<string>;
    static getYamlFileName(fileDir: string, fileName: string): Promise<{
        fileYamlPath: string;
        fileYamlPathStatus: boolean;
    }>;
}
export {};
