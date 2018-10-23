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
var MonkeyWizardStaffMotherClass = /** @class */ (function (_super) {
    __extends(MonkeyWizardStaffMotherClass, _super);
    function MonkeyWizardStaffMotherClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Public methods which the daughter classes can use
    MonkeyWizardStaffMotherClass.prototype.castPurpleBall = function (player, quest, target, speed) {
        if (speed === void 0) { speed = new Pos(2, 1); }
        var ball = new Fireball(quest, player.getSpellCastingPosition(), new Naming("An magical purple ball", "a magical purple ball"), new Color(ColorType.MONKEY_WIZARD_BALL), new Pos(2, 1), 15, player.getAndPossiblyCreateSpellCastingDamageReason(new Naming("An magical purple ball", "a magical purple ball")));
        // Set the target
        ball.setTargetTypeTargetEntity(target, null, speed);
        // Add it to the quest
        quest.addEntity(ball);
    };
    MonkeyWizardStaffMotherClass.prototype.getRandomEnemy = function (player, quest) {
        // Array which will contain the indices (in the entities array) of all possible enemies
        var indices = [];
        // Fill the indices array
        for (var i = 0; i < quest.getEntities().length; i++) {
            // If this entity is destructible and is from a different team then the player
            if (quest.getEntities()[i].getDestructible() && quest.getEntities()[i].getTeam() != player.getTeam()) {
                // We add its index
                indices.push(i);
            }
        }
        // We return a random entity from the indices index
        if (indices.length > 0)
            return quest.getEntities()[indices[Random.between(0, indices.length - 1)]];
        else
            return null;
    };
    return MonkeyWizardStaffMotherClass;
}(EqItem));
//# sourceMappingURL=MonkeyWizardStaffMotherClass.js.map