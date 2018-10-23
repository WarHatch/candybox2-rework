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
var LostTribeWarrior = /** @class */ (function (_super) {
    __extends(LostTribeWarrior, _super);
    // Constructor
    function LostTribeWarrior(quest, pos, watchedAreaPosition, watchedAreaPosition2) {
        var _this = _super.call(this, quest, pos, new Naming("A lost tribe warrior", "a lost tribe warrior"), new RenderArea(4, 4), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement()) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, 0), new Pos(1, 1)), new CollisionBox(_this, new Pos(0, 1), new Pos(4, 3))));
        // Create the watched area
        _this.watchedAreaPosition = watchedAreaPosition;
        _this.watchedAreaPosition2 = watchedAreaPosition2;
        // Set gravity
        _this.getQuestEntityMovement().setGravity(true);
        _this.getQuestEntityMovement().setWormsLike(true);
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(200);
        _this.setHp(200);
        // Set the ascii art and the transparent character
        _this.getRenderArea().drawArray(Database.getAscii("places/quests/theHole/lostTribeWarrior"));
        _this.setTransparency(new RenderTransparency(" "));
        // Set the weapon and its delay
        _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("A tribal spear", "a tribal spear"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, -1), new Pos(6, 6))), 80));
        _this.getLastQuestEntityWeapon().getCloseCombatDelay().setBetweenDelay(1, 2);
        return _this;
    }
    // update()
    LostTribeWarrior.prototype.update = function () {
        _super.prototype.update.call(this);
        // If the player is inside the watched area
        if (this.playerInsideWatchedArea()) {
            // We go towards the player
            this.goTowards(this.getRenderAreaCenter(), this.getQuest().getGame().getPlayer().getRenderAreaCenter());
        }
        // Else
        else {
            // We heal ourselves
            this.heal(1);
        }
    };
    // willDie()
    LostTribeWarrior.prototype.willDie = function () {
        // Candies
        this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage(this.getDeathMessage() + " (and found " + Algo.pluralFormat(this.getQuest().foundCandies(3000), " candy", " candies") + ")", this.getQuest().getCandiesFoundMessage()));
        // The tribal spear
        this.getQuest().foundGridOrEqItem(new QuestItemFound(this.getQuest(), "eqItemWeaponTribalSpear", "You found a tribal spear.", "You gain a tribal spear."));
    };
    // Private methods
    LostTribeWarrior.prototype.playerInsideWatchedArea = function () {
        if (this.getQuest().getGame().getPlayer().getGlobalPosition().x < this.watchedAreaPosition.x)
            return false;
        if (this.getQuest().getGame().getPlayer().getGlobalPosition().x > this.watchedAreaPosition2.x)
            return false;
        if (this.getQuest().getGame().getPlayer().getGlobalPosition().y < this.watchedAreaPosition.y)
            return false;
        if (this.getQuest().getGame().getPlayer().getGlobalPosition().y > this.watchedAreaPosition2.y)
            return false;
        // Else, the player is inside : return true
        return true;
    };
    return LostTribeWarrior;
}(QuestEntity));
//# sourceMappingURL=LostTribeWarrior.js.map