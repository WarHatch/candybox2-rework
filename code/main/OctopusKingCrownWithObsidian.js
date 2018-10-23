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
var OctopusKingCrownWithObsidian = /** @class */ (function (_super) {
    __extends(OctopusKingCrownWithObsidian, _super);
    // Constructor
    function OctopusKingCrownWithObsidian() {
        var _this = _super.call(this, "eqItemHatOctopusKingCrownWithObsidian", "eqItemHatOctopusKingCrownWithObsidianName", "eqItemHatOctopusKingCrownWithObsidianDescription", "eqItems/hats/octopusKingCrownWithObsidian") || this;
        // Reset the timer for the first time
        _this.resetTimer();
        return _this;
    }
    // Special ability
    OctopusKingCrownWithObsidian.prototype.getSpecialAbility = function () {
        return "Summon the Octopus King once in a while to help you.";
    };
    // update
    OctopusKingCrownWithObsidian.prototype.update = function (player, quest) {
        this.currentTimer -= 1;
        // If the timer is ready
        if (this.currentTimer <= 0) {
            // Summon the king
            if (this.summonOctopusKing(player, quest)) {
                // If it worked, reset the timer
                this.resetTimer();
            }
        }
    };
    // Private methods
    OctopusKingCrownWithObsidian.prototype.summonOctopusKing = function (player, quest) {
        // Create the king
        var king = new PlayerSummonedOctopusKing(quest, Random.fromPosition(new Pos(quest.getRealQuestSize().x - 1, quest.getRealQuestSize().y - 1)));
        // If we manage to add it, we return true
        if (quest.addEntity(king))
            return true;
        // No king added, we return false
        return false;
    };
    OctopusKingCrownWithObsidian.prototype.resetTimer = function () {
        this.currentTimer = Random.between(60, 120);
    };
    return OctopusKingCrownWithObsidian;
}(EqItem));
//# sourceMappingURL=OctopusKingCrownWithObsidian.js.map