"use strict";
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
var custom_domain_1 = __importDefault(require("./custom-domain"));
var Transform = /** @class */ (function () {
    function Transform() {
    }
    Transform.resources = function (resour) {
        var services = {};
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
                logger_1.default.error('Not currently supported transform Aliyun::Serverless::Log');
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
                logger_1.default.error('Not currently supported transform Aliyun::Serverless::MNSTopic');
            }
            else {
                logger_1.default.error("unknown resource " + name);
            }
        });
        var fcResources = Object.keys(services)
            .map(function (key) {
            var _a;
            var props = services[key].props;
            var hasHttpTigger = false;
            if (props.triggers) {
                hasHttpTigger = !lodash_1.isEmpty(props.triggers.filter(function (_a) {
                    var type = _a.type;
                    return type === 'http';
                }));
            }
            return ({
                key: key,
                serviceName: props.service.name,
                functionName: (_a = props.function) === null || _a === void 0 ? void 0 : _a.name,
                hasHttpTigger: hasHttpTigger
            });
        })
            .filter(function (_a) {
            var key = _a.key, hasHttpTigger = _a.hasHttpTigger;
            return hasHttpTigger && key.startsWith('Service-');
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
                services["CustomDomain-" + name_1] = customDomain;
            }
        }
        return services;
    };
    return Transform;
}());
exports.default = Transform;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3RyYW5zZm9ybS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBb0M7QUFDcEMsK0RBQXlDO0FBQ3pDLDRDQUFzQjtBQUN0QixrRUFBMkM7QUFFM0M7SUFBQTtJQThEQSxDQUFDO0lBN0RRLG1CQUFTLEdBQWhCLFVBQWlCLE1BQVc7UUFDMUIsSUFBTSxRQUFRLEdBQVEsRUFBRSxDQUFDO1FBRXpCLElBQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUV6QixnQkFBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsVUFBQyxRQUFhLEVBQUUsSUFBSTtZQUNsQyxJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQzNCLElBQUksSUFBSSxLQUFLLDZCQUE2QixFQUFFO2dCQUMxQyxJQUFNLGFBQVcsR0FBRyxJQUFJLFlBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3ZELE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLGFBQVcsQ0FBQyxDQUFDO2FBQ3RDO2lCQUFNLElBQUksSUFBSSxLQUFLLHlCQUF5QixFQUFFO2dCQUM3QyxnQkFBTSxDQUFDLEtBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFDO2FBQzNFO2lCQUFNLElBQUksSUFBSSxLQUFLLGdDQUFnQyxFQUFFO2dCQUNwRCxnQkFBTSxDQUFDLEtBQUssQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDO2FBQ2xGO2lCQUFNLElBQUksSUFBSSxLQUFLLHlCQUF5QixFQUFFO2dCQUM3QyxnQkFBTSxDQUFDLEtBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFDO2FBQzNFO2lCQUFNLElBQUksSUFBSSxLQUFLLGtDQUFrQyxFQUFFO2dCQUN0RCxhQUFhLENBQUMsSUFBSSxDQUFDO29CQUNqQixJQUFJLE1B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