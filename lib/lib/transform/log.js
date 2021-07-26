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
var COMPONENT = 'devsapp/sls';
var Transform = /** @class */ (function (_super) {
    __extends(Transform, _super);
    function Transform() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Transform.prototype.transform = function (name, resource) {
        var _a;
        var servicesObj = {};
        var logstores = [];
        lodash_1.default.forIn(resource, function (v, logstoreName) {
            if ((v || {}).Type === 'Aliyun::Serverless::Log::Logstore') {
                logstores.push({
                    name: logstoreName,
                    option: [{
                            ttl: v.Properties.TTL,
                            shardCount: v.Properties.ShardCount,
                        }]
                });
            }
        });
        var props = {
            regionId: this.VARS_REGION,
            project: name,
            description: ((_a = resource === null || resource === void 0 ? void 0 : resource.Properties) === null || _a === void 0 ? void 0 : _a.Description) || '',
            logstore: logstores,
        };
        servicesObj[name] = {
            component: COMPONENT,
            props: props,
        };
        return servicesObj;
    };
    return Transform;
}(base_1.default));
exports.default = Transform;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi90cmFuc2Zvcm0vbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtEQUF1QjtBQUN2QixnREFBMEI7QUFFMUIsSUFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDO0FBRWhDO0lBQXVDLDZCQUFJO0lBQTNDOztJQThCQSxDQUFDO0lBN0JDLDZCQUFTLEdBQVQsVUFBVSxJQUFZLEVBQUUsUUFBYTs7UUFDbkMsSUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBRXZCLElBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNyQixnQkFBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsVUFBQyxDQUFNLEVBQUUsWUFBWTtZQUNyQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxtQ0FBbUMsRUFBRTtnQkFDMUQsU0FBUyxDQUFDLElBQUksQ0FBQztvQkFDYixJQUFJLEVBQUUsWUFBWTtvQkFDbEIsTUFBTSxFQUFFLENBQUM7NEJBQ1AsR0FBRyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRzs0QkFDckIsVUFBVSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVTt5QkFDcEMsQ0FBQztpQkFDSCxDQUFDLENBQUE7YUFDSDtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBTSxLQUFLLEdBQVE7WUFDakIsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzFCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsV0FBVyxFQUFFLE9BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFVBQVUsMENBQUUsV0FBVyxLQUFJLEVBQUU7WUFDcEQsUUFBUSxFQUFFLFNBQVM7U0FDcEIsQ0FBQztRQUVGLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRztZQUNsQixTQUFTLEVBQUUsU0FBUztZQUNwQixLQUFLLE9BQUE7U0FDTixDQUFDO1FBRUYsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUNILGdCQUFDO0FBQUQsQ0FBQyxBQTlCRCxDQUF1QyxjQUFJLEdBOEIxQyJ9