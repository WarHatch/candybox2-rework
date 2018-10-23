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
var OctopusKing = /** @class */ (function (_super) {
    __extends(OctopusKing, _super);
    // Constructor
    function OctopusKing(quest, pos) {
        var _this = _super.call(this, quest, pos, new Naming("The Octopus King", "the Octopus King"), new RenderArea(6, 4), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement()) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(2, 0), new Pos(2, 1)), new CollisionBox(_this, new Pos(1, 1), new Pos(4, 1)), new CollisionBox(_this, new Pos(1, 2), new Pos(4, 1)), new CollisionBox(_this, new Pos(0, 3), new Pos(6, 1))));
        // Set gravity
        _this.getQuestEntityMovement().setGravity(true);
        _this.getQuestEntityMovement().setWormsLike(false);
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(380);
        _this.setHp(380);
        // Set the ascii art and the transparent character
        _this.getRenderArea().drawArray(Database.getAscii("places/quests/octopusKing/octopusKing"));
        _this.setTransparency(new RenderTransparency(" "));
        // Set the weapon and its delay
        _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("Its tentacles", "its tentacles"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, -1), new Pos(8, 6))), 16));
        _this.getLastQuestEntityWeapon().getCloseCombatDelay().setFixedDelay(3);
        return _this;
    }
    // update()
    OctopusKing.prototype.update = function () {
        // Go towards the player
        this.goTowards(this.getGlobalPosition(), this.getQuest().getGame().getPlayer().getGlobalPosition(), 0, new Pos(1, 0));
        // Call the mother class update method
        _super.prototype.update.call(this);
    };
    // willDie()
    OctopusKing.prototype.willDie = function () {
        // Candies
        this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage(this.getDeathMessage() + " (and found " + Algo.pluralFormat(this.getQuest().foundCandies(4000), " candy", " candies") + ")", this.getQuest().getCandiesFoundMessage()));
        // The monkey wizard staff
        this.getQuest().foundGridOrEqItem(new QuestItemFound(this.getQuest(), "eqItemHatOctopusKingCrown", "You found the Octopus King crown.", "You gain the Octopus King crown."));
    };
    return OctopusKing;
}(QuestEntity));
//# sourceMappingURL=OctopusKing.js.map