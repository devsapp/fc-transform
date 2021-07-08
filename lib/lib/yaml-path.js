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
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var GetYaml = /** @class */ (function () {
    function GetYaml() {
    }
    GetYaml.getFunPaths = function (_a) {
        var filePath = _a.filePath;
        return __awaiter(this, void 0, void 0, function () {
            var fileDir, fileName, fileYamlPath, fileYamlPathStatus, fileYaml, isExists;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!filePath) return [3 /*break*/, 3];
                        fileDir = process.cwd();
                        fileName = 'template.yml';
                        fileYamlPath = void 0;
                        fileYamlPathStatus = void 0;
                        return [4 /*yield*/, this.getYamlFileName(fileDir, fileName)];
                    case 1:
                        fileYaml = _b.sent();
                        fileYamlPath = fileYaml.fileYamlPath;
                        fileYamlPathStatus = fileYaml.fileYamlPathStatus;
                        if (fileYamlPathStatus) {
                            return [2 /*return*/, {
                                    fileDir: fileDir,
                                    filePath: fileYamlPath,
                                }];
                        }
                        fileName = 'template.yaml';
                        return [4 /*yield*/, this.getYamlFileName(fileDir, fileName)];
                    case 2:
                        fileYaml = _b.sent();
                        fileYamlPath = fileYaml.fileYamlPath;
                        fileYamlPathStatus = fileYaml.fileYamlPathStatus;
                        if (fileYamlPathStatus) {
                            return [2 /*return*/, {
                                    fileDir: fileDir,
                                    filePath: fileYamlPath,
                                }];
                        }
                        throw new Error("Not fount file: " + fileDir + "/template.[yaml|yml]");
                    case 3: return [4 /*yield*/, fs_extra_1.default.pathExists(filePath)];
                    case 4:
                        isExists = _b.sent();
                        if (!isExists) {
                            throw new Error("Not fount file: " + filePath);
                        }
                        fileDir = path_1.default.dirname(path_1.default.resolve(filePath));
                        return [2 /*return*/, {
                                fileDir: fileDir,
                                filePath: filePath,
                            }];
                }
            });
        });
    };
    GetYaml.getYamlFileNotExistPath = function (_a) {
        var fileDir = _a.fileDir, fileName = _a.fileName, force = _a.force, command = _a.command;
        return __awaiter(this, void 0, void 0, function () {
            var _b, fileYamlPath, fileYamlPathStatus;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getYamlFileName(fileDir, fileName)];
                    case 1:
                        _b = _c.sent(), fileYamlPath = _b.fileYamlPath, fileYamlPathStatus = _b.fileYamlPathStatus;
                        if (force) {
                            return [2 /*return*/, fileYamlPath];
                        }
                        if (!fileYamlPathStatus) {
                            return [2 /*return*/, fileYamlPath];
                        }
                        throw new Error(fileName + " File already exists: " + fileDir + ", if you want force this action, you could run [s fc-transform " + command + " --force]");
                }
            });
        });
    };
    GetYaml.getYamlFileName = function (fileDir, fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var fileYamlPath, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fileYamlPath = path_1.default.join(fileDir, fileName);
                        _a = {
                            fileYamlPath: fileYamlPath
                        };
                        return [4 /*yield*/, fs_extra_1.default.pathExists(fileYamlPath)];
                    case 1: return [2 /*return*/, (_a.fileYamlPathStatus = _b.sent(),
                            _a)];
                }
            });
        });
    };
    return GetYaml;
}());
exports.default = GetYaml;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWFtbC1wYXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi95YW1sLXBhdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBMEI7QUFDMUIsOENBQXdCO0FBTXhCO0lBQUE7SUF1RUEsQ0FBQztJQXRFYyxtQkFBVyxHQUF4QixVQUF5QixFQUF3QjtZQUF0QixRQUFRLGNBQUE7Ozs7Ozs2QkFHN0IsQ0FBQyxRQUFRLEVBQVQsd0JBQVM7d0JBQ1gsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQzt3QkFFcEIsUUFBUSxHQUFHLGNBQWMsQ0FBQTt3QkFDekIsWUFBWSxTQUFBLENBQUE7d0JBQ1osa0JBQWtCLFNBQUEsQ0FBQTt3QkFDUCxxQkFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsRUFBQTs7d0JBQXhELFFBQVEsR0FBRyxTQUE2Qzt3QkFDNUQsWUFBWSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUE7d0JBQ3BDLGtCQUFrQixHQUFJLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQTt3QkFDakQsSUFBSSxrQkFBa0IsRUFBRTs0QkFDdEIsc0JBQU87b0NBQ0wsT0FBTyxTQUFBO29DQUNQLFFBQVEsRUFBRSxZQUFZO2lDQUN2QixFQUFBO3lCQUNGO3dCQUVELFFBQVEsR0FBRyxlQUFlLENBQUE7d0JBQ2YscUJBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLEVBQUE7O3dCQUF4RCxRQUFRLEdBQUcsU0FBNkMsQ0FBQzt3QkFDekQsWUFBWSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUE7d0JBQ3BDLGtCQUFrQixHQUFJLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQTt3QkFDakQsSUFBSSxrQkFBa0IsRUFBRTs0QkFDdEIsc0JBQU87b0NBQ0wsT0FBTyxTQUFBO29DQUNQLFFBQVEsRUFBRSxZQUFZO2lDQUN2QixFQUFBO3lCQUNGO3dCQUVELE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQW1CLE9BQU8seUJBQXNCLENBQUMsQ0FBQzs0QkFFbkQscUJBQU0sa0JBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUE7O3dCQUF4QyxRQUFRLEdBQUcsU0FBNkI7d0JBRTlDLElBQUksQ0FBQyxRQUFRLEVBQUU7NEJBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBbUIsUUFBVSxDQUFDLENBQUM7eUJBQ2hEO3dCQUVELE9BQU8sR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLGNBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFFL0Msc0JBQU87Z0NBQ0wsT0FBTyxTQUFBO2dDQUNQLFFBQVEsVUFBQTs2QkFDVCxFQUFBOzs7O0tBQ0Y7SUFFWSwrQkFBdUIsR0FBcEMsVUFBcUMsRUFBcUM7WUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsS0FBSyxXQUFBLEVBQUUsT0FBTyxhQUFBOzs7Ozs0QkFJbEUscUJBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLEVBQUE7O3dCQUgzQyxLQUdGLFNBQTZDLEVBRi9DLFlBQVksa0JBQUEsRUFDWixrQkFBa0Isd0JBQUE7d0JBRXBCLElBQUksS0FBSyxFQUFFOzRCQUNULHNCQUFPLFlBQVksRUFBQzt5QkFDckI7d0JBRUQsSUFBSSxDQUFDLGtCQUFrQixFQUFFOzRCQUN2QixzQkFBTyxZQUFZLEVBQUM7eUJBQ3JCO3dCQUVELE1BQU0sSUFBSSxLQUFLLENBQUksUUFBUSw4QkFBeUIsT0FBTyx1RUFBa0UsT0FBTyxjQUFXLENBQUMsQ0FBQzs7OztLQUNsSjtJQUVZLHVCQUFlLEdBQTVCLFVBQTZCLE9BQWUsRUFBRSxRQUFnQjs7Ozs7O3dCQUN0RCxZQUFZLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7OzRCQUdoRCxZQUFZLGNBQUE7O3dCQUNRLHFCQUFNLGtCQUFFLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFBOzRCQUZ2RCx1QkFFRSxxQkFBa0IsR0FBRSxTQUFpQztpQ0FDckQ7Ozs7S0FDSDtJQUNILGNBQUM7QUFBRCxDQUFDLEFBdkVELElBdUVDIn0=