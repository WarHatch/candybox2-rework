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
var RedEnchantedGloves = /** @class */ (function (_super) {
    __extends(RedEnchantedGloves, _super);
    // Constructor
    function RedEnchantedGloves() {
        var _this = _super.call(this, "eqItemGlovesRedEnchantedGloves", "eqItemGlovesRedEnchantedGlovesName", "eqItemGlovesRedEnchantedGlovesDescription", "eqItems/gloves/redEnchantedGloves") || this;
        // The timer (to avoid casting fireballs too often..)
        _this.currentTimer = 0;
        _this.maxTimer = 5;
        return _this;
    }
    // Special ability
    RedEnchantedGloves.prototype.getSpecialAbility = function () {
        return "Randomly cast small fireballs around you (red enchanted gloves).";
    };
    // update
    RedEnchantedGloves.prototype.update = function (player, quest) {
        this.currentTimer += 1;
        // If the timer is ready
        if (this.currentTimer >= this.maxTimer) {
            // Cast the fireball
            this.castFireball(player, quest);
            // Reset the timer
            this.currentTimer = 0;
        }
    };
    // Private methods
    RedEnchantedGloves.prototype.castFireball = function (player, quest) {
        // Create the fireball
        var fireball = new Fireball(quest, player.getSpellCastingPosition(), new Naming("A small fireball", "a small fireball"), new Color(ColorType.RED_ENCHANTED_GLOVES_FIREBALL), new Pos(2, 1), 15, player.getAndPossiblyCreateSpellCastingDamageReason(new Naming("A small fireball", "a small fireball")));
        // Set the direction
        fireball.setTargetTypeNoTarget(Algo.getRandomNotImmobileDirectionUpToThisSpeed(1).multiply(new Pos(2, 2)));
        // Add the entity
        quest.addEntity(fireball);
    };
    return RedEnchantedGloves;
}(EqItem));
//# sourceMappingURL=RedEnchantedGloves.js.map