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
var PinkEnchantedGloves = /** @class */ (function (_super) {
    __extends(PinkEnchantedGloves, _super);
    // Constructor
    function PinkEnchantedGloves() {
        return _super.call(this, "eqItemGlovesPinkEnchantedGloves", "eqItemGlovesPinkEnchantedGlovesName", "eqItemGlovesPinkEnchantedGlovesDescription", "eqItems/gloves/pinkEnchantedGloves") || this;
    }
    // Special ability
    PinkEnchantedGloves.prototype.getSpecialAbility = function () {
        return "Slowly regain your health points in quests (pink enchanted gloves).";
    };
    // update
    PinkEnchantedGloves.prototype.update = function (player, quest) {
        player.heal(1);
    };
    return PinkEnchantedGloves;
}(EqItem));
//# sourceMappingURL=PinkEnchantedGloves.js.map