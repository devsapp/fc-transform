import _ from 'lodash';

export default abstract class Base {
  abstract transform(name: string, resource: any, services?);

  readonly VARS_REGION = '${vars.region}';

  isAuto (args) {
    return _.isString(args) && _.toLower(args) === 'auto';
  }

  transformKey(args) {
    if (_.isEmpty(args)) {
      return undefined;
    }
    if (this.isAuto(args)) {
      return args;
    } else {
      return _.mapKeys(args, (_value, key) => _.lowerFirst(key))
    }
  }
}