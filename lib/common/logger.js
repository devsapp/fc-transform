"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var i18n_1 = __importDefault(require("./i18n"));
var core_1 = require("@serverless-devs/core");
var ComponentLogger = /** @class */ (function () {
    function ComponentLogger() {
    }
    ComponentLogger.setContent = function (content) {
        ComponentLogger.CONTENT = content;
    };
    ComponentLogger.log = function (m, c) {
        core_1.Logger.log(i18n_1.default.__(m) || m, c);
    };
    ComponentLogger.info = function (m) {
        core_1.Logger.info(ComponentLogger.CONTENT, i18n_1.default.__(m) || m);
    };
    ComponentLogger.debug = function (m) {
        core_1.Logger.debug(ComponentLogger.CONTENT, i18n_1.default.__(m) || m);
    };
    ComponentLogger.error = function (m) {
        core_1.Logger.error(ComponentLogger.CONTENT, i18n_1.default.__(m) || m);
    };
    ComponentLogger.warning = function (m) {
        core_1.Logger.warn(ComponentLogger.CONTENT, i18n_1.default.__(m) || m);
    };
    ComponentLogger.success = function (m) {
        core_1.Logger.log(i18n_1.default.__(m) || m, 'green');
    };
    ComponentLogger.CONTENT = 'FC-TRANSFORM';
    return ComponentLogger;
}());
exports.default = ComponentLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1vbi9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxnREFBMEI7QUFDMUIsOENBQStDO0FBRS9DO0lBQUE7SUE2QkEsQ0FBQztJQTNCVSwwQkFBVSxHQUFqQixVQUFrQixPQUFPO1FBQ3JCLGVBQWUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3RDLENBQUM7SUFDTSxtQkFBRyxHQUFWLFVBQVcsQ0FBQyxFQUFFLENBQUU7UUFDWixhQUFNLENBQUMsR0FBRyxDQUFDLGNBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFDTSxvQkFBSSxHQUFYLFVBQVksQ0FBQztRQUNULGFBQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxjQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFTSxxQkFBSyxHQUFaLFVBQWEsQ0FBQztRQUNWLGFBQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxjQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFTSxxQkFBSyxHQUFaLFVBQWEsQ0FBQztRQUNWLGFBQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxjQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFTSx1QkFBTyxHQUFkLFVBQWUsQ0FBQztRQUNaLGFBQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxjQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFHTSx1QkFBTyxHQUFkLFVBQWUsQ0FBQztRQUNaLGFBQU0sQ0FBQyxHQUFHLENBQUMsY0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQTFCTSx1QkFBTyxHQUFHLGNBQWMsQ0FBQztJQTRCcEMsc0JBQUM7Q0FBQSxBQTdCRCxJQTZCQztrQkE3Qm9CLGVBQWUifQ==