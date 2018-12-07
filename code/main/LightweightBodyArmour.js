///<reference path="EqItem.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LightweightBodyArmour = /** @class */ (function (_super) {
    __extends(LightweightBodyArmour, _super);
    // Constructor
    function LightweightBodyArmour() {
        return _super.call(this, "eqItemBodyArmoursLightweightBodyArmour", "eqItemBodyArmoursLightweightBodyArmourName", "eqItemBodyArmoursLightweightBodyArmourDescription", "eqItems/bodyArmours/lightweightBodyArmour") || this;
    }
    // Special ability
    LightweightBodyArmour.prototype.getSpecialAbility = function () {
        return "Damage taken reduced by 15% (lightweight body armour)";
    };
    // inflictDamage()
    LightweightBodyArmour.prototype.inflictDamage = function (player, quest, damage, reason) {
        return Math.ceil(damage - damage * 15 / 100);
    };
    return LightweightBodyArmour;
}(EqItem));
//# sourceMappingURL=LightweightBodyArmour.js.map