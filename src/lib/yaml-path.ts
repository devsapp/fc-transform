import fs from 'fs-extra';
import path from 'path';

interface yamlInputs {
  filePath?: undefined | string;
}

export default class GetYaml {
  static async getFunPaths({ filePath }: yamlInputs) {
    let fileDir;

    if (!filePath) {
      fileDir = process.cwd();

      let fileName = 'template.yml'
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

      throw new Error(`Not fount file: ${fileDir}/template.[yaml|yml]`);
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

  static async getYamlFileNotExistPath({ fileDir, fileName, force, command }) {
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

    throw new Error(`${fileName} File already exists: ${fileDir}, if you want force this action, you could run [s fc-transform ${command} --force]`);
  }

  static async getYamlFileName(fileDir: string, fileName: string) {
    const fileYamlPath = path.join(fileDir, fileName);

    return {
      fileYamlPath,
      fileYamlPathStatus: await fs.pathExists(fileYamlPath),
    };
  }
}
