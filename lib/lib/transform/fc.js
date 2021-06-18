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
        return {
            name: name,
            description: funcProperties.Description,
            handler: funcProperties.Handler,
            initializer: funcProperties.Initializer,
            timeout: funcProperties.Timeout,
            initializationTimeout: funcProperties.InitializationTimeout,
            memorySize: funcProperties.MemorySize,
            runtime: funcProperties.Runtime,
            codeUri: funcProperties.CodeUri,
            customContainerConfig: this.transformKey(funcProperties.CustomContainerConfig),
            cAPort: funcProperties.CAPort,
            instanceType: funcProperties.InstanceType,
            environmentVariables: funcProperties.EnvironmentVariables,
            instanceConcurrency: funcProperties.InstanceConcurrency,
            layers: funcProperties.Layers,
            asyncConfiguration: this.transformKey(funcProperties.AsyncConfiguration),
            instanceLifecycleConfig: this.transformKey(funcProperties.InstanceLifecycleConfig)
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3RyYW5zZm9ybS9mYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBdUI7QUFDdkIsZ0RBQTBCO0FBRTFCLElBQU0sU0FBUyxHQUFHLFlBQVksQ0FBQztBQUUvQjtJQUF1Qyw2QkFBSTtJQUEzQzs7SUFpSEEsQ0FBQztJQWhIQyw2QkFBUyxHQUFULFVBQVUsSUFBWSxFQUFFLFFBQWE7UUFBckMsaUJBNEJDO1FBM0JDLElBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDdkMsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztRQUU5RCxJQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDcEIsZ0JBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFVBQUMsQ0FBTSxFQUFFLFlBQVk7WUFDckMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssOEJBQThCLEVBQUU7Z0JBQ3JELElBQU0sS0FBSyxHQUFRO29CQUNqQixNQUFNLEVBQUUsS0FBSSxDQUFDLFdBQVc7b0JBQ3hCLE9BQU8sRUFBRSxhQUFhO2lCQUN2QixDQUFDO2dCQUVGLEtBQUssQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBRXBFLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRTtvQkFDWixLQUFLLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLFdBQVc7d0JBQ3BELE9BQUEsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FB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