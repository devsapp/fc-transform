
import { Logger } from '@serverless-devs/core';

export default class ComponentLogger {
    static CONTENT = 'FC-TRANSFORM';
    static setContent(content) {
        ComponentLogger.CONTENT = content;
    }
    static log(m, c?) {
        Logger.log(m, c);
    }
    static info(m) {
        Logger.info(ComponentLogger.CONTENT, m);
    }

    static debug(m) {
        Logger.debug(ComponentLogger.CONTENT, m);
    }

    static error(m) {
        Logger.error(ComponentLogger.CONTENT, m);
    }

    static warning(m) {
        Logger.warn(ComponentLogger.CONTENT, m);
    }


    static success(m) {
        Logger.log(m, 'green');
    }

}



