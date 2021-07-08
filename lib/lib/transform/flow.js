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
var logger_1 = __importDefault(require("../../common/logger"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var base_1 = __importDefault(require("./base"));
var COMPONENT = 'devsapp/fnf';
var COMPONENT_RAM = 'devsapp/ram';
var Transform = /** @class */ (function (_super) {
    __extends(Transform, _super);
    function Transform() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Transform.prototype.transform = function (name, resource) {
        var servicesObj = {};
        var _a = resource.Properties, Description = _a.Description, DefinitionUri = _a.DefinitionUri, Definition = _a.Definition, Policies = _a.Policies, Role = _a.Role;
        var roleArnKey = name + "-role-" + new Date().getTime();
        var hasPolicies = !lodash_1.default.isEmpty(Policies);
        if (!Role && hasPolicies) {
            servicesObj[roleArnKey] = {
                component: COMPONENT_RAM,
                props: {
                    name: ("aliyunfnfgeneratedrole-" + name).replace(/_/g, '-'),
                    description: 'Function Flow Default Role',
                    service: 'fnf.aliyuncs.com',
                    policies: Policies,
                }
            };
        }
        var roleArn = Role;
        if (hasPolicies) {
            roleArn = '${roleArnKey.output}';
        }
        var definition = DefinitionUri;
        if (lodash_1.default.isString(Definition)) {
            var savaFilePath = name + "_" + new Date().getTime() + ".yaml";
            fs_extra_1.default.writeFileSync(savaFilePath, definition);
            definition = savaFilePath;
        }
        else if (!lodash_1.default.isEmpty(Definition)) {
            logger_1.default.error("The flow[" + name + "] definition in this format can not be converted.");
        }
        servicesObj[name] = {
            component: COMPONENT,
            props: {
                name: name,
                description: Description,
                definition: definition,
                roleArn: roleArn,
            },
        };
        return servicesObj;
    };
    return Transform;
}(base_1.default));
exports.default = Transform;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvdy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdHJhbnNmb3JtL2Zsb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0RBQXVCO0FBQ3ZCLCtEQUF5QztBQUN6QyxzREFBMkI7QUFDM0IsZ0RBQTBCO0FBRTFCLElBQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQztBQUNoQyxJQUFNLGFBQWEsR0FBRyxhQUFhLENBQUM7QUFFcEM7SUFBdUMsNkJBQUk7SUFBM0M7O0lBNENBLENBQUM7SUEzQ0MsNkJBQVMsR0FBVCxVQUFVLElBQVksRUFBRSxRQUFhO1FBQ25DLElBQU0sV0FBVyxHQUFRLEVBQUUsQ0FBQztRQUN0QixJQUFBLEtBQTZELFFBQVEsQ0FBQyxVQUFVLEVBQTlFLFdBQVcsaUJBQUEsRUFBRSxhQUFhLG1CQUFBLEVBQUUsVUFBVSxnQkFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLElBQUksVUFBd0IsQ0FBQztRQUN2RixJQUFNLFVBQVUsR0FBTSxJQUFJLGNBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUksQ0FBQztRQUUxRCxJQUFNLFdBQVcsR0FBRyxDQUFDLGdCQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLElBQUksV0FBVyxFQUFFO1lBQ3hCLFdBQVcsQ0FBQyxVQUFVLENBQUMsR0FBRztnQkFDeEIsU0FBUyxFQUFFLGFBQWE7Z0JBQ3hCLEtBQUssRUFBRTtvQkFDTCxJQUFJLEVBQUUsQ0FBQSw0QkFBMEIsSUFBTSxDQUFBLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7b0JBQ3pELFdBQVcsRUFBRSw0QkFBNEI7b0JBQ3pDLE9BQU8sRUFBRSxrQkFBa0I7b0JBQzNCLFFBQVEsRUFBRSxRQUFRO2lCQUNuQjthQUNGLENBQUM7U0FDSDtRQUVELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLFdBQVcsRUFBRTtZQUNmLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztTQUNsQztRQUNELElBQUksVUFBVSxHQUFHLGFBQWEsQ0FBQztRQUMvQixJQUFJLGdCQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzFCLElBQU0sWUFBWSxHQUFNLElBQUksU0FBSSxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFPLENBQUM7WUFDNUQsa0JBQUcsQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzVDLFVBQVUsR0FBRyxZQUFZLENBQUM7U0FDM0I7YUFBTSxJQUFJLENBQUMsZ0JBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDakMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsY0FBWSxJQUFJLHNEQUFtRCxDQUFDLENBQUM7U0FDbkY7UUFFRCxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUc7WUFDbEIsU0FBUyxFQUFFLFNBQVM7WUFDcEIsS0FBSyxFQUFFO2dCQUNMLElBQUksTUFBQTtnQkFDSixXQUFXLEVBQUUsV0FBVztnQkFDeEIsVUFBVSxZQUFBO2dCQUNWLE9BQU8sU0FBQTthQUNSO1NBQ0YsQ0FBQztRQUVGLE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFDSCxnQkFBQztBQUFELENBQUMsQUE1Q0QsQ0FBdUMsY0FBSSxHQTRDMUMifQ==