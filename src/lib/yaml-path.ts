import fs from 'fs-extra';
import path from 'path';

interface yamlInputs {
  filePath?: undefined | string;
  fileName?: string;
}

export default class GetYaml {
  static async getFunPaths({ filePath, fileName = 'template' }: yamlInputs) {
    let fileDir;
  
    if (!filePath) {
      fileDir = process.cwd();
  
      const {
        fileYmlPath,
        fileYamlPath,
        fileYmlPathStatu,
        fileYamlPathStatu,
      } = await this.getYamlFileName(fileDir, fileName);
      
      if (fileYmlPathStatu) {
        return {
          fileDir,
          filePath: fileYmlPath,
        }
      }
      
      if (fileYamlPathStatu) {
        return {
          fileDir,
          filePath: fileYamlPath,
        }
      }
  
      throw new Error(`Not fount file: ${filePath}`);
    }
    const isExists = await fs.pathExists(filePath);
  
    if (!isExists) {
      throw new Error(`Not fount file: ${filePath}`);
    }
  
    fileDir = path.dirname(path.resolve(filePath));
    
    return {
      fileDir,
      filePath,
    }
  }

  static async getYamlFileNotExistPath({ fileDir, fileName }) {
    const {
      fileYmlPath,
      fileYamlPath,
      fileYmlPathStatu,
      fileYamlPathStatu,
    } = await this.getYamlFileName(fileDir, fileName);
    return fileYmlPath;
    if (!fileYmlPathStatu) {
      return fileYmlPath;
    }
    
    if (!fileYamlPathStatu) {
      return fileYamlPath;
    }

    throw new Error(`${fileName}.[Yaml|yml] File already exists: ${fileDir}`);
  }

  static async getYamlFileName(fileDir: string, fileName: string) {
    const fileYamlPath = path.join(fileDir, `${fileName}.yaml`);
    const fileYmlPath = path.join(fileDir, `${fileName}.yml`);
  
    return {
      fileYmlPath,
      fileYamlPath,
      fileYmlPathStatu: await fs.pathExists(fileYmlPath),
      fileYamlPathStatu: await fs.pathExists(fileYamlPath),
    };
  }
}
