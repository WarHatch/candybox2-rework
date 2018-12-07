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
var EnchantedKnightBodyArmour = /** @class */ (function (_super) {
    __extends(EnchantedKnightBodyArmour, _super);
    // Constructor
    function EnchantedKnightBodyArmour() {
        return _super.call(this, "eqItemBodyArmoursEnchantedKnightBodyArmour", "eqItemBodyArmoursEnchantedKnightBodyArmourName", "eqItemBodyArmoursEnchantedKnightBodyArmourDescription", "eqItems/bodyArmours/enchantedKnightBodyArmour") || this;
    }
    // Special ability
    EnchantedKnightBodyArmour.prototype.getSpecialAbility = function () {
        return "Dam. taken reduced by 80%, dam. inflicted divided by 2 (enchanted knight body armour)";
    };
    // hit()
    EnchantedKnightBodyArmour.prototype.hit = function (player, quest, questEntity, damage, reason) {
        return Math.ceil(damage / 2);
    };
    // inflictDamage()
    EnchantedKnightBodyArmour.prototype.inflictDamage = function (player, quest, damage, reason) {
        return Math.ceil(damage - damage * 80 / 100);
    };
    return EnchantedKnightBodyArmour;
}(EqItem));
//# sourceMappingURL=EnchantedKnightBodyArmour.js.map