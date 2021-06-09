import path from 'path';
import { isEmpty } from 'lodash';
import os from 'os';
import fs from 'fs-extra';
import yaml from 'js-yaml';

export default class ReadFile {
  static async getFunProfile() {
    const profPath = path.join(process.env.HOME || os.homedir(), '.fcli/config.yaml');
    const profYml = await this.readYaml(profPath);

    if (isEmpty(profYml)) {
      return profYml;
    }

    const profile: any = {};

    if (profYml.endpoint) {
      const extract = (regex, endpoint) => {
        var matchs = endpoint.match(regex);
        if (matchs) {
          return matchs[1];
        }
        return null;
      }

      profile.AccountID = extract(/^https?:\/\/([^.]+)\..+$/, profYml.endpoint);
      profile.region = extract(/^https?:\/\/[^.]+\.([^.]+)\..+$/, profYml.endpoint);
    }

    if (profYml.access_key_id) {
      profile.AccessKeyID = profYml.access_key_id;
    }

    if (profYml.access_key_secret) {
      profile.AccessKeySecret = profYml.access_key_secret;
    }

    profile.endpoint = profYml.endpoint;

    return profile;
  }

  static async readYaml(filePath: string) {
    if (!await fs.pathExists(filePath)) {
      return {};
    }
    const profContent = await fs.readFile(filePath, 'utf8');
    return await yaml.load(profContent);
  }
}
