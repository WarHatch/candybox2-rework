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
var Camazotz = /** @class */ (function (_super) {
    __extends(Camazotz, _super);
    // Constructor
    function Camazotz(quest, pos) {
        var _this = _super.call(this, quest, pos, new Naming("Camazotz, the bat god", "Camazotz, the bat god"), new RenderArea(22, 8), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement()) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(8, 1), new Pos(6, 2)), new CollisionBox(_this, new Pos(2, 3), new Pos(18, 1)), new CollisionBox(_this, new Pos(1, 4), new Pos(20, 1)), new CollisionBox(_this, new Pos(0, 5), new Pos(22, 1)), new CollisionBox(_this, new Pos(9, 6), new Pos(4, 1)), new CollisionBox(_this, new Pos(10, 7), new Pos(2, 1))));
        // Set the drop a demon timer default value
        _this.resetDropADemonTimer();
        // Set the default distance from the player
        _this.distanceFromPlayer = 5;
        // Set the default tryToMoveAgainTimer
        _this.tryToMoveAgainTimer = 0;
        // Set gravity
        _this.getQuestEntityMovement().setGravity(false);
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(5000);
        _this.setHp(5000);
        // Set the ascii art and the transparent character
        _this.getRenderArea().drawArray(Database.getAscii("places/quests/hell/camazotz"));
        _this.setTransparency(new RenderTransparency(" ", "%"));
        // Set the weapon and its delay
        _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("Its claws", "its claws"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, 0), new Pos(24, 9))), 300));
        _this.getLastQuestEntityWeapon().getCloseCombatDelay().setBetweenDelay(20, 100); // This delay because Camazotz is quite busy throwing enemies to the player
        return _this;
    }
    // update()
    Camazotz.prototype.update = function () {
        // Handle the movement towards the player
        this.handleMovementTowardsPlayer();
        // Handle demon dropping
        this.handleDropADemon();
        // Call the mother class update method
        _super.prototype.update.call(this);
    };
    // willeDie()
    Camazotz.prototype.willDie = function () {
        this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage(this.getDeathMessage() + " (and found " + Algo.pluralFormat(this.getQuest().foundCandies(1000000), " candy", " candies") + ")", this.getQuest().getCandiesFoundMessage()));
    };
    // Private methods
    Camazotz.prototype.dropADemon = function () {
        // Create the demon
        var demon = new Demon(this.getQuest(), this.getGlobalPosition().plus(new Pos(8, 8)));
        // Set the health bar
        demon.setHealthBar(new QuestEntityHealthBar(demon, new Pos(6, 1)));
        // Add the demon
        this.getQuest().addEntity(demon);
    };
    Camazotz.prototype.handleDropADemon = function () {
        // If it's time to add one
        if (this.dropADemonTimer < 0) {
            // Drop a demon and reset the timer
            this.dropADemon();
            this.resetDropADemonTimer();
        }
        // Else
        else {
            // Decrese the timer
            this.dropADemonTimer -= 1;
        }
    };
    Camazotz.prototype.handleMovementTowardsPlayer = function () {
        // If we try to move
        if (this.tryToMoveAgainTimer <= 0) {
            // We go towards the player
            this.goTowards(this.getGlobalPosition(), this.getQuest().getGame().getPlayer().getGlobalPosition().plus(new Pos(this.distanceFromPlayer, 0)), 2, new Pos(2, 0), true);
            // We'll try to move again in 3 frames
            this.tryToMoveAgainTimer = 3;
        }
        // Else, we not moving, we decrese the timer, and possibly set we are moving to true
        else {
            this.tryToMoveAgainTimer -= 1;
        }
    };
    Camazotz.prototype.resetDropADemonTimer = function () {
        this.dropADemonTimer = Random.between(8, 12);
    };
    return Camazotz;
}(QuestEntity));
//# sourceMappingURL=Camazotz.js.map