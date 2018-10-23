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
var MonkeyWizardMagicalPurpleBall = /** @class */ (function (_super) {
    __extends(MonkeyWizardMagicalPurpleBall, _super);
    // Constructor
    function MonkeyWizardMagicalPurpleBall(quest, pos, naming, color, size, damage, questEntityDamageReason, timer) {
        var _this = 
        // Call the mother class constructor
        _super.call(this, quest, pos, naming, color, size, damage, questEntityDamageReason) || this;
        // Set the timer
        _this.timer = timer;
        return _this;
    }
    // Public methods
    MonkeyWizardMagicalPurpleBall.prototype.update = function () {
        // If the timer isn't null (which means we should be stored and then go down)
        if (this.timer != null) {
            // If the timer is > 0, decrease it
            if (this.timer > 0)
                this.timer -= 1;
            // Else, if the timer is <= 0, we go towards the player now!
            else {
                this.timer = null; // No more timer
                this.setTargetTypeTargetEntity(this.getQuest().getGame().getPlayer());
            }
        }
        // Call the fireball update method
        _super.prototype.update.call(this);
    };
    return MonkeyWizardMagicalPurpleBall;
}(Fireball));
//# sourceMappingURL=MonkeyWizardMagicalPurpleBall.js.map