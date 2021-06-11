interface yamlInputs {
    filePath?: undefined | string;
    fileName?: string;
}
export default class GetYaml {
    static getFunPaths({ filePath, fileName }: yamlInputs): Promise<{
        fileDir: any;
        filePath: any;
    }>;
    static getYamlFileNotExistPath({ fileDir, fileName, force }: {
        fileDir: any;
        fileName: any;
        force: any;
    }): Promise<string>;
    static getYamlFileName(fileDir: string, fileName: string): Promise<{
        fileYamlPath: string;
        fileYamlPathStatus: boolean;
    }>;
}
export {};
