///<reference path="Fireball.ts"/>
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
var DeveloperMagicBall = /** @class */ (function (_super) {
    __extends(DeveloperMagicBall, _super);
    // Constructor
    function DeveloperMagicBall(quest, pos, naming, color, size, damage, questEntityDamageReason, timeToLive) {
        var _this = 
        // Call the mother class constructor
        _super.call(this, quest, pos, naming, color, size, damage, questEntityDamageReason) || this;
        // Did we target the player already?
        _this.playerTargeted = false;
        // Set the time to live
        _this.timeToLive = timeToLive;
        return _this;
    }
    // Public methods
    DeveloperMagicBall.prototype.update = function () {
        // If the player isn't targeted yet
        if (this.playerTargeted == false) {
            // If it's time to target the player
            if (this.timeToLive <= 0) {
                // We target it
                this.setTargetTypeTargetEntity(this.getQuest().getGame().getPlayer(), null, new Pos(2, 1));
            }
            else
                this.timeToLive -= 1;
        }
        // Call the mother class update method
        _super.prototype.update.call(this);
    };
    // willDie()
    DeveloperMagicBall.prototype.willDie = function () { };
    return DeveloperMagicBall;
}(Fireball));
//# sourceMappingURL=DeveloperMagicBall.js.map