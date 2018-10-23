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
var OctopusKingCrownWithJaspers = /** @class */ (function (_super) {
    __extends(OctopusKingCrownWithJaspers, _super);
    // Constructor
    function OctopusKingCrownWithJaspers() {
        var _this = _super.call(this, "eqItemHatOctopusKingCrownWithJaspers", "eqItemHatOctopusKingCrownWithJaspersName", "eqItemHatOctopusKingCrownWithJaspersDescription", "eqItems/hats/octopusKingCrownWithJaspers") || this;
        // The timer (to avoid casting fireballs too often..)
        _this.currentTimer = 0;
        _this.maxTimer = 3;
        return _this;
    }
    // Special ability
    OctopusKingCrownWithJaspers.prototype.getSpecialAbility = function () {
        return "Randomly cast powerful fireballs around you (Octopus King crown with jaspers).";
    };
    // update
    OctopusKingCrownWithJaspers.prototype.update = function (player, quest) {
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
    OctopusKingCrownWithJaspers.prototype.castFireball = function (player, quest) {
        // Create the fireball
        var fireball = new Fireball(quest, player.getSpellCastingPosition(), new Naming("A small fireball", "a small fireball"), new Color(ColorType.RED_ENCHANTED_GLOVES_FIREBALL), new Pos(4, 2), 18, player.getAndPossiblyCreateSpellCastingDamageReason(new Naming("A fireball", "a fireball")));
        // Set the direction
        fireball.setTargetTypeNoTarget(Algo.getRandomNotImmobileDirectionUpToThisSpeed(1).multiply(new Pos(2, 2)));
        // Add the entity
        quest.addEntity(fireball);
    };
    return OctopusKingCrownWithJaspers;
}(EqItem));
//# sourceMappingURL=OctopusKingCrownWithJaspers.js.map