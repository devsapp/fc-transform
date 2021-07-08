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
        var _this = this;
        var servicesObj = {};
        lodash_1.default.forIn(resource, function (v, logstoreName) {
            var _a;
            if ((v || {}).Type === 'Aliyun::Serverless::Log::Logstore') {
                var props = {
                    regionId: _this.VARS_REGION,
                    project: name,
                    description: ((_a = resource === null || resource === void 0 ? void 0 : resource.Properties) === null || _a === void 0 ? void 0 : _a.Description) || '',
                    logstore: logstoreName,
                    logstoreOption: {
                        ttl: v.Properties.TTL,
                        shardCount: v.Properties.ShardCount,
                    }
                };
                servicesObj[name] = {
                    component: COMPONENT,
                    props: props,
                };
            }
        });
        return servicesObj;
    };
    return Transform;
}(base_1.default));
exports.default = Transform;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi90cmFuc2Zvcm0vbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtEQUF1QjtBQUN2QixnREFBMEI7QUFFMUIsSUFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDO0FBRWhDO0lBQXVDLDZCQUFJO0lBQTNDOztJQTBCQSxDQUFDO0lBekJDLDZCQUFTLEdBQVQsVUFBVSxJQUFZLEVBQUUsUUFBYTtRQUFyQyxpQkF3QkM7UUF2QkMsSUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBRXZCLGdCQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxVQUFDLENBQU0sRUFBRSxZQUFZOztZQUNyQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxtQ0FBbUMsRUFBRTtnQkFDMUQsSUFBTSxLQUFLLEdBQVE7b0JBQ2pCLFFBQVEsRUFBRSxLQUFJLENBQUMsV0FBVztvQkFDMUIsT0FBTyxFQUFFLElBQUk7b0JBQ2IsV0FBVyxFQUFFLE9BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFVBQVUsMENBQUUsV0FBVyxLQUFJLEVBQUU7b0JBQ3BELFFBQVEsRUFBRSxZQUFZO29CQUN0QixjQUFjLEVBQUU7d0JBQ2QsR0FBRyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRzt3QkFDckIsVUFBVSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVTtxQkFDcEM7aUJBQ0YsQ0FBQztnQkFFRixXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUc7b0JBQ2xCLFNBQVMsRUFBRSxTQUFTO29CQUNwQixLQUFLLE9BQUE7aUJBQ04sQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDLEFBMUJELENBQXVDLGNBQUksR0EwQjFDIn0=