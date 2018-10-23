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
var KnightBodyArmour = /** @class */ (function (_super) {
    __extends(KnightBodyArmour, _super);
    // Constructor
    function KnightBodyArmour() {
        return _super.call(this, "eqItemBodyArmoursKnightBodyArmour", "eqItemBodyArmoursKnightBodyArmourName", "eqItemBodyArmoursKnightBodyArmourDescription", "eqItems/bodyArmours/knightBodyArmour") || this;
    }
    // Special ability
    KnightBodyArmour.prototype.getSpecialAbility = function () {
        return "Damage taken reduced by 30% (knight body armour)";
    };
    // inflictDamage()
    KnightBodyArmour.prototype.inflictDamage = function (player, quest, damage, reason) {
        return Math.ceil(damage - damage * 30 / 100);
    };
    return KnightBodyArmour;
}(EqItem));
//# sourceMappingURL=KnightBodyArmour.js.map