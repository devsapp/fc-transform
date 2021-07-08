"use strict";
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
var js_yaml_1 = __importDefault(require("js-yaml"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var WriteFile = /** @class */ (function () {
    function WriteFile() {
    }
    WriteFile.s = function (ymlPath, access, region, services) {
        return __awaiter(this, void 0, void 0, function () {
            var ymlConfig, tempServiceObj, tempServiceVarsList, tempServiceList, eveService, i, eveService, configStr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ymlConfig = {
                            edition: '1.0.0',
                            name: 'transform_fun',
                            access: access,
                            vars: { region: region },
                            services: JSON.parse(JSON.stringify(services))
                        };
                        tempServiceObj = {};
                        tempServiceVarsList = [];
                        tempServiceList = [];
                        for (eveService in ymlConfig.services) {
                            if (ymlConfig.services[eveService].component !== 'devsapp/fc') {
                                continue;
                            }
                            if (ymlConfig.services[eveService].props.service) {
                                if (ymlConfig.services[eveService].props.service.name) {
                                    if (tempServiceList.includes(ymlConfig.services[eveService].props.service.name)) {
                                        tempServiceObj[ymlConfig.services[eveService].props.service.name] = ymlConfig.services[eveService].props.service;
                                        tempServiceVarsList.push(ymlConfig.services[eveService].props.service.name);
                                    }
                                    tempServiceList.push(ymlConfig.services[eveService].props.service.name);
                                }
                            }
                        }
                        if (tempServiceVarsList.length > 0) {
                            for (i = 0; i < tempServiceVarsList.length; i++) {
                                ymlConfig.vars[tempServiceVarsList[i]] = tempServiceObj[tempServiceVarsList[i]];
                            }
                        }
                        for (eveService in ymlConfig.services) {
                            if (ymlConfig.services[eveService].component !== 'devsapp/fc') {
                                continue;
                            }
                            if (ymlConfig.services[eveService].props.service) {
                                if (ymlConfig.services[eveService].props.service.name) {
                                    if (tempServiceVarsList.includes(ymlConfig.services[eveService].props.service.name)) {
                                        ymlConfig.services[eveService].props.service = '${vars.' + ymlConfig.services[eveService].props.service.name + '}';
                                    }
                                }
                            }
                        }
                        configStr = js_yaml_1.default.dump(ymlConfig);
                        return [4 /*yield*/, fs_extra_1.default.writeFile(ymlPath, configStr)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WriteFile.ros = function (saveSPath, data) {
        return __awaiter(this, void 0, void 0, function () {
            var fileName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileName = saveSPath + ".json";
                        return [4 /*yield*/, fs_extra_1.default.writeFile(fileName, JSON.stringify(data, null, 2))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, fileName];
                }
            });
        });
    };
    return WriteFile;
}());
exports.default = WriteFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvd3JpdGUtZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUEyQjtBQUMzQixzREFBMkI7QUFFM0I7SUFBQTtJQXFEQSxDQUFDO0lBcERnQixXQUFDLEdBQWQsVUFBZSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFROzs7Ozs7d0JBQ3RDLFNBQVMsR0FBRzs0QkFDZCxPQUFPLEVBQUUsT0FBTzs0QkFDaEIsSUFBSSxFQUFFLGVBQWU7NEJBQ3JCLE1BQU0sUUFBQTs0QkFDTixJQUFJLEVBQUUsRUFBQyxNQUFNLFFBQUEsRUFBQzs0QkFDZCxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3lCQUNqRCxDQUFDO3dCQUNJLGNBQWMsR0FBRyxFQUFFLENBQUE7d0JBQ25CLG1CQUFtQixHQUFHLEVBQUUsQ0FBQTt3QkFDeEIsZUFBZSxHQUFHLEVBQUUsQ0FBQTt3QkFFMUIsS0FBVyxVQUFVLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRTs0QkFDekMsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxZQUFZLEVBQUU7Z0NBQzNELFNBQVM7NkJBQ1o7NEJBQ0QsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7Z0NBQzlDLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtvQ0FDbkQsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FB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