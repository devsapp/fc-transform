"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var Base = /** @class */ (function () {
    function Base() {
        this.VARS_REGION = '${vars.region}';
    }
    Base.prototype.isAuto = function (args) {
        return lodash_1.default.isString(args) && lodash_1.default.toLower(args) === 'auto';
    };
    Base.prototype.transformKey = function (args) {
        if (lodash_1.default.isEmpty(args)) {
            return undefined;
        }
        if (this.isAuto(args)) {
            return args;
        }
        else {
            return lodash_1.default.mapKeys(args, function (_value, key) { return lodash_1.default.lowerFirst(key); });
        }
    };
    return Base;
}());
exports.default = Base;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdHJhbnNmb3JtL2Jhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBdUI7QUFFdkI7SUFBQTtRQUdXLGdCQUFXLEdBQUcsZ0JBQWdCLENBQUM7SUFnQjFDLENBQUM7SUFkQyxxQkFBTSxHQUFOLFVBQVEsSUFBSTtRQUNWLE9BQU8sZ0JBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksZ0JBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssTUFBTSxDQUFDO0lBQ3hELENBQUM7SUFFRCwyQkFBWSxHQUFaLFVBQWEsSUFBSTtRQUNmLElBQUksZ0JBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDbkIsT0FBTyxTQUFTLENBQUM7U0FDbEI7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDckIsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNO1lBQ0wsT0FBTyxnQkFBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBQyxNQUFNLEVBQUUsR0FBRyxJQUFLLE9BQUEsZ0JBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQWpCLENBQWlCLENBQUMsQ0FBQTtTQUMzRDtJQUNILENBQUM7SUFDSCxXQUFDO0FBQUQsQ0FBQyxBQW5CRCxJQW1CQyJ9