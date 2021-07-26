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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var base_1 = __importDefault(require("./base"));
var COMPONENT = 'devsapp/fc';
function extractOssCodeUri(ossUri) {
    var prefixLength = 'oss://'.length;
    var index = ossUri.indexOf('/', prefixLength);
    return {
        ossBucket: ossUri.substring(prefixLength, index),
        ossKey: ossUri.substring(index + 1)
    };
}
var Transform = /** @class */ (function (_super) {
    __extends(Transform, _super);
    function Transform() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Transform.prototype.transform = function (name, resource) {
        var _this = this;
        var properties = resource.Properties;
        var serviceConfig = this.transformService(name, properties);
        var services = {};
        lodash_1.default.forIn(resource, function (v, functionName) {
            if ((v || {}).Type === 'Aliyun::Serverless::Function') {
                var props = {
                    region: _this.VARS_REGION,
                    service: serviceConfig,
                };
                props.function = _this.transformFunction(functionName, v.Properties);
                if (v.Events) {
                    props.triggers = Object.keys(v.Events).map(function (triggerName) {
                        return _this.transformTrigger(triggerName, v.Events[triggerName]);
                    });
                }
                services["fc-" + name + "-" + functionName] = {
                    component: COMPONENT,
                    props: props,
                };
            }
        });
        return services;
    };
    Transform.prototype.transformService = function (name, properties) {
        var _this = this;
        var serviceConfig = {
            name: name,
            description: properties.Description,
            role: properties.Role,
            internetAccess: 'InternetAccess' in properties ? properties.InternetAccess : true,
        };
        var vpcConfig = properties.VpcConfig;
        var nasConfig = properties.NasConfig;
        var logConfig = properties.LogConfig;
        var tracingConfig = properties.TracingConfig;
        if (properties.Policies) {
            serviceConfig.role = {
                name: serviceConfig.role || serviceConfig.name + "DefaultRole",
                policies: lodash_1.default.isString(properties.Policies) ? [properties.Policies] : properties.Policies
            };
        }
        if (vpcConfig) {
            serviceConfig.vpcConfig = this.transformKey(vpcConfig);
        }
        if (nasConfig) {
            if (this.isAuto(nasConfig)) {
                serviceConfig.nasConfig = this.transformKey(nasConfig);
            }
            else {
                var tNasConfig = this.transformKey(nasConfig);
                tNasConfig.mountPoints = tNasConfig.mountPoints.map(function (item) {
                    var _a = _this.transformKey(item).serverAddr.split(':'), serverAddr = _a[0], nasDir = _a[1];
                    return { serverAddr: serverAddr, nasDir: nasDir, fcDir: item.MountDir };
                });
                serviceConfig.nasConfig = tNasConfig;
            }
        }
        if (logConfig) {
            serviceConfig.logConfig = this.transformKey(logConfig);
        }
        if (tracingConfig) {
            serviceConfig.tracingConfig = tracingConfig;
        }
        return serviceConfig;
    };
    Transform.prototype.transformFunction = function (name, funcProperties) {
        var resolvedFunctionConf = {
            name: name,
            description: funcProperties.Description,
            handler: funcProperties.Handler,
            initializer: funcProperties.Initializer,
            timeout: funcProperties.Timeout,
            initializationTimeout: funcProperties.InitializationTimeout,
            memorySize: funcProperties.MemorySize,
            runtime: funcProperties.Runtime,
            customContainerConfig: this.transformKey(funcProperties.CustomContainerConfig),
            cAPort: funcProperties.CAPort,
            instanceType: funcProperties.InstanceType,
            environmentVariables: funcProperties.EnvironmentVariables,
            instanceConcurrency: funcProperties.InstanceConcurrency,
            layers: funcProperties.Layers,
            asyncConfiguration: this.transformKey(funcProperties.AsyncConfiguration),
            instanceLifecycleConfig: this.transformKey(funcProperties.InstanceLifecycleConfig)
        };
        var codeUri = funcProperties.CodeUri;
        if (lodash_1.default.isString(codeUri) && codeUri.startsWith('oss://')) {
            Object.assign(resolvedFunctionConf, extractOssCodeUri(codeUri));
        }
        else {
            Object.assign(resolvedFunctionConf, { codeUri: codeUri });
        }
        return resolvedFunctionConf;
    };
    Transform.prototype.transformTrigger = function (name, triggerConfig) {
        // authType for http trigger should be transformed to be in lower case
        var transformedConfig = this.transformKey(triggerConfig.Properties);
        if (transformedConfig === null || transformedConfig === void 0 ? void 0 : transformedConfig.authType) {
            transformedConfig.authType = lodash_1.default.lowerCase(transformedConfig === null || transformedConfig === void 0 ? void 0 : transformedConfig.authType);
        }
        return {
            name: name,
            type: lodash_1.default.toLower(triggerConfig.Type),
            config: transformedConfig,
        };
    };
    return Transform;
}(base_1.default));
exports.default = Transform;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3RyYW5zZm9ybS9mYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBdUI7QUFDdkIsZ0RBQTBCO0FBRTFCLElBQU0sU0FBUyxHQUFHLFlBQVksQ0FBQztBQUMvQixTQUFTLGlCQUFpQixDQUFDLE1BQWM7SUFDdkMsSUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUVyQyxJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUVoRCxPQUFPO1FBQ0wsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQztRQUNoRCxNQUFNLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0tBQ3BDLENBQUM7QUFDSixDQUFDO0FBRUQ7SUFBdUMsNkJBQUk7SUFBM0M7O0lBdUhBLENBQUM7SUF0SEMsNkJBQVMsR0FBVCxVQUFVLElBQVksRUFBRSxRQUFhO1FBQXJDLGlCQTRCQztRQTNCQyxJQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBQ3ZDLElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFOUQsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLGdCQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxVQUFDLENBQU0sRUFBRSxZQUFZO1lBQ3JDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLDhCQUE4QixFQUFFO2dCQUNyRCxJQUFNLEtBQUssR0FBUTtvQkFDakIsTUFBTSxFQUFFLEtBQUksQ0FBQyxXQUFXO29CQUN4QixPQUFPLEVBQUUsYUFBYTtpQkFDdkIsQ0FBQztn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