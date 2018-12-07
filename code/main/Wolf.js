///<reference path="QuestEntity.ts"/>
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
var Wolf = /** @class */ (function (_super) {
    __extends(Wolf, _super);
    // Constructor
    function Wolf(quest, pos) {
        var _this = _super.call(this, quest, pos, new Naming("A wolf", "a wolf"), new RenderArea(7, 3), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement()) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, 1), new Pos(7, 2))));
        // At first, we're not taking the decision to begin running
        _this.takeTheDecisionToRunTimer = null;
        // Set the area transparency
        _this.setTransparency(new RenderTransparency(" "));
        // At first we're looking left and standing
        _this.setIsLookingLeft(true);
        _this.setIsStanding(true);
        // Set gravity
        _this.getQuestEntityMovement().setGravity(true);
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(45);
        _this.setHp(45);
        // Set the weapon and its delay
        _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("Its fangs", "its fangs"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, 0), new Pos(9, 3))), 10));
        _this.getLastQuestEntityWeapon().getCloseCombatDelay().setFixedDelay(2);
        return _this;
    }
    // update()
    Wolf.prototype.update = function () {
        // Calculate the distance from the player
        var distanceFromPlayer = this.getGlobalPosition().plus(new Pos(3, 0)).getDistance(this.getQuest().getGame().getPlayer().getGlobalPosition());
        // If the player is on our left
        if (distanceFromPlayer.x > 0) {
            // We're looking left
            this.setIsLookingLeft(true);
        }
        // Else, the player is on our right
        else {
            // We're looking right
            this.setIsLookingLeft(false);
        }
        // If we're standing
        if (this.isStanding) {
            // If we're not already taking the decision to run BUT the running movement would be possible
            if (this.takeTheDecisionToRunTimer == null && this.testNewGlobalPosition(this.getGlobalPosition().plus(new Pos(this.getRunningSpeed(), 0)))) {
                // We take the decision to run by setting the timer
                this.takeTheDecisionToRunTimer = Random.between(2, 6);
            }
            // Else, if we already took the decision ro run
            else if (this.takeTheDecisionToRunTimer != null) {
                // We decrease the timer
                this.takeTheDecisionToRunTimer -= 1;
                // If the timer is <= 0 and the running movement would be possible
                if (this.takeTheDecisionToRunTimer <= 0 && this.testNewGlobalPosition(this.getGlobalPosition().plus(new Pos(this.getRunningSpeed(), 0)))) {
                    this.setIsStanding(false); // We run
                    this.takeTheDecisionToRunTimer = null; // Not taking any decision anymore
                }
            }
        }
        // Else, if we're running
        else {
            // If the running movement won't be possible next turn
            if (this.testNewGlobalPosition(this.getGlobalPosition().plus(new Pos(this.getRunningSpeed(), 0))) == false) {
                // We stand
                this.setIsStanding(true);
            }
        }
        // Call the mother class update
        _super.prototype.update.call(this);
    };
    // willDie()
    Wolf.prototype.willDie = function () {
        this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage(this.getDeathMessage() + " (and found " + Algo.pluralFormat(this.getQuest().foundCandies(100 + 50 * Random.upTo(10)), " candy", " candies") + ")", this.getQuest().getCandiesFoundMessage()));
    };
    // Private methods
    Wolf.prototype.getRunningSpeed = function () {
        return (this.isLookingLeft ? -1 : 1);
    };
    Wolf.prototype.reDrawArea = function () {
        this.getRenderArea().drawArray(Database.getAscii("places/quests/forest/wolf/" + (this.isLookingLeft ? "left" : "right") + (this.isStanding ? "Standing" : "Running")));
    };
    Wolf.prototype.setIsLookingLeft = function (isLookingLeft) {
        // If the value is different
        if (isLookingLeft != this.isLookingLeft) {
            this.isLookingLeft = isLookingLeft; // Set the value
            this.updateQuestEntityMovementOffset(); // Update the movement
            this.reDrawArea(); // Update the area
        }
    };
    Wolf.prototype.setIsStanding = function (isStanding) {
        // If the value is different
        if (isStanding != this.isStanding) {
            this.isStanding = isStanding; // Set the value
            this.updateQuestEntityMovementOffset(); // Update the movement
            this.reDrawArea(); // Update the area
        }
    };
    Wolf.prototype.updateQuestEntityMovementOffset = function () {
        // If we're standing
        if (this.isStanding) {
            // No movement
            this.getQuestEntityMovement().setOffset(new Pos(0, 0));
        }
        // Else, we're running
        else {
            // Set the movement depending on our orientation
            this.getQuestEntityMovement().setOffset(new Pos(this.getRunningSpeed(), 0));
        }
    };
    return Wolf;
}(QuestEntity));
//# sourceMappingURL=Wolf.js.map