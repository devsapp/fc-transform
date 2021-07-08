"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importStar(require("lodash"));
var logger_1 = __importDefault(require("../../common/logger"));
var fc_1 = __importDefault(require("./fc"));
var log_1 = __importDefault(require("./log"));
var flow_1 = __importDefault(require("./flow"));
var custom_domain_1 = __importDefault(require("./custom-domain"));
var Transform = /** @class */ (function () {
    function Transform() {
    }
    Transform.resources = function (resour) {
        var services = {};
        var logs = {};
        var flow = {};
        var cnames = {};
        var customDomains = [];
        lodash_1.default.forIn(resour, function (resource, name) {
            var type = resource.Type;
            if (type === 'Aliyun::Serverless::Service') {
                var fcResources_1 = new fc_1.default().transform(name, resource);
                Object.assign(services, fcResources_1);
            }
            else if (type === 'Aliyun::Serverless::Api') {
                logger_1.default.error('Not currently supported transform Aliyun::Serverless::Api');
            }
            else if (type === 'Aliyun::Serverless::TableStore') {
                logger_1.default.error('Not currently supported transform Aliyun::Serverless::TableStore');
            }
            else if (type === 'Aliyun::Serverless::Log') {
                var logResources = new log_1.default().transform(name, resource);
                Object.assign(logs, logResources);
            }
            else if (type === 'Aliyun::Serverless::CustomDomain') {
                customDomains.push({
                    name: name,
                    resource: resource,
                });
            }
            else if (type === 'Aliyun::Serverless::MNSTopic') {
                logger_1.default.error('Not currently supported transform Aliyun::Serverless::MNSTopic');
            }
            else if (type === 'Aliyun::Serverless::Flow') {
                Object.assign(flow, new flow_1.default().transform(name, resource));
            }
            else {
                logger_1.default.error("unknown resource " + name);
            }
        });
        var fcResources = Object.keys(services)
            .map(function (key) {
            var _a;
            var props = services[key].props;
            return ({
                key: key,
                serviceName: props.service.name,
                functionName: (_a = props.function) === null || _a === void 0 ? void 0 : _a.name,
                hasHttpTrigger: props.triggers ? !lodash_1.isEmpty(props.triggers.filter(function (_a) {
                    var type = _a.type;
                    return type === 'http';
                })) : false,
            });
        })
            .filter(function (_a) {
            var hasHttpTrigger = _a.hasHttpTrigger;
            return hasHttpTrigger;
        });
        for (var _i = 0, customDomains_1 = customDomains; _i < customDomains_1.length; _i++) {
            var _a = customDomains_1[_i], name_1 = _a.name, resource = _a.resource;
            var customDomain = new custom_domain_1.default().transform(name_1, resource, fcResources);
            if (customDomain.key) {
                if (!services[customDomain.key].props.customDomains) {
                    services[customDomain.key].props.customDomains = [];
                }
                services[customDomain.key].props.customDomains.push(customDomain.customDomain);
            }
            else {
                cnames["CustomDomain-" + name_1] = customDomain;
            }
        }
        return __assign(__assign(__assign(__assign({}, logs), cnames), flow), services);
    };
    return Transform;
}());
exports.default = Transform;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3RyYW5zZm9ybS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFvQztBQUNwQywrREFBeUM7QUFDekMsNENBQXNCO0FBQ3RCLDhDQUF3QjtBQUN4QixnREFBMEI7QUFDMUIsa0VBQTJDO0FBRTNDO0lBQUE7SUFrRUEsQ0FBQztJQWpFUSxtQkFBUyxHQUFoQixVQUFpQixNQUFXO1FBQzFCLElBQU0sUUFBUSxHQUFRLEVBQUUsQ0FBQztRQUN6QixJQUFNLElBQUksR0FBUSxFQUFFLENBQUM7UUFDckIsSUFBTSxJQUFJLEdBQVEsRUFBRSxDQUFDO1FBQ3JCLElBQU0sTUFBTSxHQUFRLEVBQUUsQ0FBQztRQUN2QixJQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFFekIsZ0JBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQUMsUUFBYSxFQUFFLElBQUk7WUFDbEMsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztZQUMzQixJQUFJLElBQUksS0FBSyw2QkFBNkIsRUFBRTtnQkFDMUMsSUFBTSxhQUFXLEdBQUcsSUFBSSxZQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUN2RCxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxhQUFXLENBQUMsQ0FBQzthQUN0QztpQkFBTSxJQUFJLElBQUksS0FBSyx5QkFBeUIsRUFBRTtnQkFDN0MsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsMkRBQTJELENBQUMsQ0FBQzthQUMzRTtpQkFBTSxJQUFJLElBQUksS0FBSyxnQ0FBZ0MsRUFBRTtnQkFDcEQsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsa0VBQWtFLENBQUMsQ0FBQzthQUNsRjtpQkFBTSxJQUFJLElBQUksS0FBSyx5QkFBeUIs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