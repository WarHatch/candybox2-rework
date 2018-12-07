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
var Troll = /** @class */ (function (_super) {
    __extends(Troll, _super);
    // Constructor
    function Troll(quest, pos) {
        var _this = _super.call(this, quest, pos, new Naming("A troll", "a troll"), new RenderArea(15, 10), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement()) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(11, 0), new Pos(2, 1)), // Upper part of the bludgeon
        new CollisionBox(_this, new Pos(4, 1), new Pos(3, 3)), // The head
        new CollisionBox(_this, new Pos(9, 1), new Pos(6, 2)), // Main part of the bludgeon
        new CollisionBox(_this, new Pos(0, 4), new Pos(8, 4)), // Main body and right arm
        new CollisionBox(_this, new Pos(2, 8), new Pos(5, 2)), // The legs & feet
        new CollisionBox(_this, new Pos(8, 4), new Pos(4, 2)), // The left arm
        new CollisionBox(_this, new Pos(11, 3), new Pos(2, 4)) // The lowest part of the bludgeon
        ));
        // Set gravity
        _this.getQuestEntityMovement().setGravity(true);
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(80);
        _this.setHp(80);
        // Set the ascii art and the transparent character
        _this.getRenderArea().drawArray(Database.getAscii("places/quests/bridge/troll"));
        _this.setTransparency(new RenderTransparency(" "));
        // Set the weapon and its delay
        _this.addQuestEntityWeapon(new Bludgeon(_this.getQuest(), _this, new Naming("Its bludgeon", "its bludgeon"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, -1), new Pos(17, 11))), 15));
        _this.getLastQuestEntityWeapon().getCloseCombatDelay().setFixedDelay(6);
        return _this;
    }
    // Public methods
    Troll.prototype.draw = function (renderArea) {
        _super.prototype.draw.call(this, renderArea);
        // We add the missing "<" on the troll's bludgeon as a tag
        renderArea.addTag(new RenderTagLt(this.getQuest().getRealQuestPosition().x + this.getGlobalPosition().x + this.getRenderAreaPosition().x + 9), this.getQuest().getRealQuestPosition().y + this.getGlobalPosition().y + this.getRenderAreaPosition().y + 1);
    };
    Troll.prototype.willDie = function () {
        this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage(this.getDeathMessage() + " (and found " + Algo.pluralFormat(this.getQuest().foundCandies(500), " candy", " candies") + ")", this.getQuest().getCandiesFoundMessage()));
        this.getQuest().foundGridOrEqItem(new QuestItemFound(this.getQuest(), "eqItemWeaponTrollBludgeon", "You picked up the troll's bludgeon from the floor", "You gain the troll's bludgeon"));
    };
    return Troll;
}(QuestEntity));
//# sourceMappingURL=Troll.js.map