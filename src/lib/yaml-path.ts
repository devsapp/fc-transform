import fs from 'fs-extra';
import path from 'path';

interface yamlInputs {
  filePath?: undefined | string;
  fileName?: string;
}

export default class GetYaml {
  static async getFunPaths({ filePath, fileName}: yamlInputs) {
    let fileDir;

    if (!filePath) {
      fileDir = process.cwd();

      fileName = 'template.yml'
      let fileYamlPath
      let fileYamlPathStatus
      let fileYaml = await this.getYamlFileName(fileDir, fileName)
      fileYamlPath = fileYaml.fileYamlPath
      fileYamlPathStatus  = fileYaml.fileYamlPathStatus
      if (fileYamlPathStatus) {
        return {
          fileDir,
          filePath: fileYamlPath,
        }
      }

      fileName = 'template.yaml'
      fileYaml = await this.getYamlFileName(fileDir, fileName);
      fileYamlPath = fileYaml.fileYamlPath
      fileYamlPathStatus  = fileYaml.fileYamlPathStatus
      if (fileYamlPathStatus) {
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

  static async getYamlFileNotExistPath({ fileDir, fileName, force }) {
    const {
      fileYamlPath,
      fileYamlPathStatus,
    } = await this.getYamlFileName(fileDir, fileName);
    if (force) {
      return fileYamlPath;
    }

    if (!fileYamlPathStatus) {
      return fileYamlPath;
    }

    throw new Error(`${fileName} File already exists: ${fileDir}, ff you want force this action, you could run [s fc-transform fun2fc --force]`);
  }

  static async getYamlFileName(fileDir: string, fileName: string) {
    const fileYamlPath = path.join(fileDir, fileName);

    return {
      fileYamlPath,
      fileYamlPathStatus: await fs.pathExists(fileYamlPath),
    };
  }
}
