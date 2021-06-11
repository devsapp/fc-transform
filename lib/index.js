"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core = __importStar(require("@serverless-devs/core"));
var base_1 = __importDefault(require("./common/base"));
var logger_1 = __importDefault(require("./common/logger"));
var _ = __importStar(require("lodash"));
var help_1 = __importDefault(require("./lib/help"));
var yaml_path_1 = __importDefault(require("./lib/yaml-path"));
var read_file_1 = __importDefault(require("./lib/read-file"));
var write_file_1 = __importDefault(require("./lib/write-file"));
var transform_1 = __importDefault(require("./lib/transform"));
var ComponentDemo = /** @class */ (function (_super) {
    __extends(ComponentDemo, _super);
    function ComponentDemo(props) {
        return _super.call(this, props) || this;
    }
    ComponentDemo.prototype.report = function (componentName, command, accountID, access) {
        return __awaiter(this, void 0, void 0, function () {
            var uid, credentials;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uid = accountID;
                        if (!_.isEmpty(accountID)) return [3 /*break*/, 2];
                        return [4 /*yield*/, core.getCredential(access)];
                    case 1:
                        credentials = _a.sent();
                        uid = credentials.AccountID;
                        _a.label = 2;
                    case 2:
                        core.reportComponent(componentName, {
                            command: command,
                            uid: uid,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ComponentDemo.prototype.argsParser = function (args) {
        var apts = {
            boolean: ['help', 'force'],
            string: ['region', 'type', 'source', 'target'],
            alias: { 'help': 'h' },
        };
        var comParse = core.commandParse({ args: args }, apts);
        // 将Args转成Object
        var argsData = comParse.data || {};
        var region = argsData.region, source = argsData.source, force = argsData.force, target = argsData.target;
        if (argsData.help) {
            return { isHelp: true };
        }
        return {
            region: region,
            force: force,
            source: source,
            target: target
        };
    };
    /**
     * Funcraft配置转换为Serverless Devs配置
     * @param 'Optional --source [fun Yaml文件], --target [Serverless Devs目标文件]'
     * @typeParam Required --serviceName
     * @typeParam
     */
    ComponentDemo.prototype.fun2fc = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var access, _b, isHelp, region, source, force, target, _c, fileDir, funYamlPath, saveSPath, funConfig, funProfile, services, eventInvokeTip, httpInvokeTip, deployTip;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        logger_1.default.debug(inputs);
                        access = inputs.project.access;
                        // 数据采集
                        this.report('fc-transform', 'fc', (_a = inputs.credentials) === null || _a === void 0 ? void 0 : _a.AccountID, access);
                        _b = this.argsParser(inputs.args), isHelp = _b.isHelp, region = _b.region, source = _b.source, force = _b.force, target = _b.target;
                        if (isHelp) {
                            core.help(help_1.default);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, yaml_path_1.default.getFunPaths({
                                filePath: source,
                            })];
                    case 1:
                        _c = _d.sent(), fileDir = _c.fileDir, funYamlPath = _c.filePath;
                        logger_1.default.info("Using funcraft yaml: " + funYamlPath);
                        return [4 /*yield*/, yaml_path_1.default.getYamlFileNotExistPath({
                                fileDir: fileDir,
                                fileName: target || 's.yaml',
                                force: force,
                            })];
                    case 2:
                        saveSPath = _d.sent();
                        logger_1.default.debug("fileDir: " + fileDir + ", funYamlPath: " + funYamlPath + ", saveSPath: " + saveSPath);
                        return [4 /*yield*/, read_file_1.default.readYaml(funYamlPath)];
                    case 3:
                        funConfig = _d.sent();
                        return [4 /*yield*/, read_file_1.default.getFunProfile()];
                    case 4:
                        funProfile = _d.sent();
                        services = transform_1.default.resources(funConfig.Resources);
                        logger_1.default.debug(JSON.stringify(services, null, 2));
                        return [4 /*yield*/, write_file_1.default.s(saveSPath, access, region || funProfile.region || '***', services)];
                    case 5:
                        _d.sent();
                        logger_1.default.success("Reminder serverless devs yaml path: " + saveSPath);
                        eventInvokeTip = 's local invoke -t ' + target || 's.yaml';
                        httpInvokeTip = 's local start -t ' + target || 's.yaml';
                        deployTip = 's deploy -t ' + target || 's.yaml';
                        logger_1.default.log("\nTips for next step\n\n======================\n* Invoke Event Function: " + eventInvokeTip + "\n* Invoke Http Function: " + httpInvokeTip + "\n* Deploy Resources: " + deployTip + "\n", 'yellow');
                        return [2 /*return*/];
                }
            });
        });
    };
    return ComponentDemo;
}(base_1.default));
exports.default = ComponentDemo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBEQUE4QztBQUM5Qyx1REFBMEM7QUFDMUMsMkRBQXFDO0FBQ3JDLHdDQUE0QjtBQUM1QixvREFBOEI7QUFFOUIsOERBQXNDO0FBQ3RDLDhEQUF1QztBQUN2QyxnRUFBeUM7QUFDekMsOERBQXdDO0FBRXhDO0lBQTJDLGlDQUFhO0lBQ3RELHVCQUFZLEtBQUs7ZUFDZixrQkFBTSxLQUFLLENBQUM7SUFDZCxDQUFDO0lBRWEsOEJBQU0sR0FBcEIsVUFBcUIsYUFBcUIsRUFBRSxPQUFlLEVBQUUsU0FBa0IsRUFBRSxNQUFlOzs7Ozs7d0JBQzFGLEdBQUcsR0FBVyxTQUFTLENBQUM7NkJBQ3hCLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQXBCLHdCQUFvQjt3QkFDWSxxQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBNUQsV0FBVyxHQUFpQixTQUFnQzt3QkFDbEUsR0FBRyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUM7Ozt3QkFHOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUU7NEJBQ2xDLE9BQU8sU0FBQTs0QkFDUCxHQUFHLEtBQUE7eUJBQ0osQ0FBQyxDQUFDOzs7OztLQUNKO0lBRU8sa0NBQVUsR0FBbEIsVUFBbUIsSUFBWTtRQUM3QixJQUFNLElBQUksR0FBUTtZQUNoQixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO1lBQzFCLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQztZQUM5QyxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFDO1NBQ3RC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