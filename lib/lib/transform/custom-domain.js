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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var base_1 = __importDefault(require("./base"));
var COMPONENT = 'devsapp/fc-domain';
var Transform = /** @class */ (function (_super) {
    __extends(Transform, _super);
    function Transform() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Transform.prototype.transform = function (name, resource, serviceConfig) {
        var _this = this;
        var properties = resource.Properties;
        var routes = properties.RouteConfig.Routes;
        var routeConfigs = Object.keys(routes).map(function (key) { return (__assign(__assign({}, _this.transformKey(routes[key])), { path: key })); });
        var customDomain = {
            domainName: properties.DomainName || name,
            protocol: properties.Protocol,
            certConfig: this.transformKey(properties.CertConfig),
            routeConfigs: routeConfigs,
        };
        var _loop_1 = function (serviceName, functionName) {
            var index = lodash_1.default.findIndex(serviceConfig, function (item) { return item.serviceName === serviceName && item.functionName && functionName; });
            if (index !== -1) {
                return { value: {
                        key: serviceConfig[0].key,
                        customDomain: customDomain,
                    } };
            }
        };
        for (var _i = 0, routeConfigs_1 = routeConfigs; _i < routeConfigs_1.length; _i++) {
            var _a = routeConfigs_1[_i], serviceName = _a.serviceName, functionName = _a.functionName;
            var state_1 = _loop_1(serviceName, functionName);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return {
            component: COMPONENT,
            props: {
                region: this.VARS_REGION,
                customDomain: customDomain,
            }
        };
    };
    return Transform;
}(base_1.default));
exports.default = Transform;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWRvbWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdHJhbnNmb3JtL2N1c3RvbS1kb21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBdUI7QUFDdkIsZ0RBQTBCO0FBRTFCLElBQU0sU0FBUyxHQUFHLG1CQUFtQixDQUFDO0FBRXRDO0lBQXVDLDZCQUFJO0lBQTNDOztJQW1DQSxDQUFDO0lBbENDLDZCQUFTLEdBQVQsVUFBVSxJQUFZLEVBQUUsUUFBYSxFQUFFLGFBQWE7UUFBcEQsaUJBaUNDO1FBaENDLElBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFFdkMsSUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFDN0MsSUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSx1QkFDL0MsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FDakMsSUFBSSxFQUFFLEdBQUcsSUFDVCxFQUhrRCxDQUdsRCxDQUFDLENBQUM7UUFFSixJQUFNLFlBQVksR0FBRztZQUNuQixVQUFVLEVBQUUsVUFBVSxDQUFDLFVBQVUsSUFBSSxJQUFJO1lBQ3pDLFFBQVEsRUFBRSxVQUFVLENBQUMsUUFBUTtZQUM3QixVQUFVLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO1lBQ3BELFlBQVksY0FBQTtTQUNiLENBQUM7Z0NBRVcsV0FBVyxFQUFFLFlBQVk7WUFDcEMsSUFBTSxLQUFLLEdBQUcsZ0JBQUMsQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLFVBQUMsSUFBUyxJQUFLLE9BQUEsSUFBSSxDQUFDLFdBQVcsS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxZQUFZLEVBQXJFLENBQXFFLENBQUMsQ0FBQztZQUMvSCxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtnQ0FDVDt3QkFDTCxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUc7d0JBQ3pCLFlBQVksY0FBQTtxQkFDYjthQUNGOztRQVBILEtBQTRDLFVBQVksRUFBWiw2QkFBWSxFQUFaLDBCQUFZLEVBQVosSUFBWTtZQUE3QyxJQUFBLHVCQUE2QixFQUEzQixXQUFXLGlCQUFBLEVBQUUsWUFBWSxrQkFBQTtrQ0FBekIsV0FBVyxFQUFFLFlBQVk7OztTQVFyQztRQUVELE9BQU87WUFDTCxTQUFTLEVBQUUsU0FBUztZQUNwQixLQUFLLEVBQUU7Z0JBQ0wsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXO2dCQUN4QixZQUFZLGNBQUE7YUFDYjtTQUNGLENBQUM7SUFDSixDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDLEFBbkNELENBQXVDLGNBQUksR0FtQzFDIn0=