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
var path_1 = __importDefault(require("path"));
var lodash_1 = require("lodash");
var os_1 = __importDefault(require("os"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var js_yaml_1 = __importDefault(require("js-yaml"));
var ReadFile = /** @class */ (function () {
    function ReadFile() {
    }
    ReadFile.getFunProfile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var profPath, profYml, profile, extract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        profPath = path_1.default.join(process.env.HOME || os_1.default.homedir(), '.fcli/config.yaml');
                        return [4 /*yield*/, this.readYaml(profPath)];
                    case 1:
                        profYml = _a.sent();
                        if (lodash_1.isEmpty(profYml)) {
                            return [2 /*return*/, profYml];
                        }
                        profile = {};
                        if (profYml.endpoint) {
                            extract = function (regex, endpoint) {
                                var matchs = endpoint.match(regex);
                                if (matchs) {
                                    return matchs[1];
                                }
                                return null;
                            };
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
                        return [2 /*return*/, profile];
                }
            });
        });
    };
    ReadFile.readYaml = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var profContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_extra_1.default.pathExists(filePath)];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/, {}];
                        }
                        return [4 /*yield*/, fs_extra_1.default.readFile(filePath, 'utf8')];
                    case 2:
                        profContent = _a.sent();
                        return [4 /*yield*/, js_yaml_1.default.load(profContent)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ReadFile;
}());
exports.default = ReadFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1maWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9yZWFkLWZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBd0I7QUFDeEIsaUNBQWlDO0FBQ2pDLDBDQUFvQjtBQUNwQixzREFBMEI7QUFDMUIsb0RBQTJCO0FBRTNCO0lBQUE7SUE0Q0EsQ0FBQztJQTNDYyxzQkFBYSxHQUExQjs7Ozs7O3dCQUNRLFFBQVEsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLFlBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO3dCQUNsRSxxQkFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFBOzt3QkFBdkMsT0FBTyxHQUFHLFNBQTZCO3dCQUU3QyxJQUFJLGdCQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7NEJBQ3BCLHNCQUFPLE9BQU8sRUFBQzt5QkFDaEI7d0JBRUssT0FBTyxHQUFRLEVBQUUsQ0FBQzt3QkFFeEIsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFOzRCQUNkLE9BQU8sR0FBRyxVQUFDLEtBQUssRUFBRSxRQUFRO2dDQUM5QixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dDQUNuQyxJQUFJLE1BQU0sRUFBRTtvQ0FDVixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQ0FDbEI7Z0NBQ0QsT0FBTyxJQUFJLENBQUM7NEJBQ2QsQ0FBQyxDQUFBOzRCQUVELE9BQU8sQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFDMUUsT0FBTyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsaUNBQWlDLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3lCQUMvRTt3QkFFRCxJQUFJLE9BQU8sQ0FBQyxhQUFhLEVBQUU7NEJBQ3pCLE9BQU8sQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQzt5QkFDN0M7d0JBRUQsSUFBSSxPQUFPLENBQUMsaUJBQWlCLEVBQUU7NEJBQzdCLE9BQU8sQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO3lCQUNyRDt3QkFFRCxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBRXBDLHNCQUFPLE9BQU8sRUFBQzs7OztLQUNoQjtJQUVZLGlCQUFRLEdBQXJCLFVBQXNCLFFBQWdCOzs7Ozs0QkFDL0IscUJBQU0sa0JBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUE7O3dCQUFsQyxJQUFJLENBQUMsQ0FBQSxTQUE2QixDQUFBLEVBQUU7NEJBQ2xDLHNCQUFPLEVBQUUsRUFBQzt5QkFDWDt3QkFDbUIscUJBQU0sa0JBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFBOzt3QkFBakQsV0FBVyxHQUFHLFNBQW1DO3dCQUNoRCxxQkFBTSxpQkFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBQTs0QkFBbkMsc0JBQU8sU0FBNEIsRUFBQzs7OztLQUNyQztJQUNILGVBQUM7QUFBRCxDQUFDLEFBNUNELElBNENDIn0=