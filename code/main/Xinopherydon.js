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
var Xinopherydon = /** @class */ (function (_super) {
    __extends(Xinopherydon, _super);
    // Constructor
    function Xinopherydon(quest, pos) {
        var _this = _super.call(this, quest, pos, new Naming("A xinopherydon", "a xinopherydon"), new RenderArea(17, 6), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement()) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, 1), new Pos(5, 1)), new CollisionBox(_this, new Pos(0, 2), new Pos(9, 1)), new CollisionBox(_this, new Pos(12, 2), new Pos(5, 1)), new CollisionBox(_this, new Pos(3, 3), new Pos(14, 1)), new CollisionBox(_this, new Pos(4, 4), new Pos(5, 1)), new CollisionBox(_this, new Pos(10, 4), new Pos(5, 1)), new CollisionBox(_this, new Pos(5, 5), new Pos(3, 1)), new CollisionBox(_this, new Pos(11, 5), new Pos(3, 1))));
        // Set gravity
        _this.getQuestEntityMovement().setGravity(true);
        _this.getQuestEntityMovement().setWormsLike(true);
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(5000);
        _this.setHp(5000);
        // Set the ascii art and the transparent character
        _this.getRenderArea().drawArray(Database.getAscii("places/quests/fortress/xinopherydon"));
        _this.setTransparency(new RenderTransparency(" "));
        // Set the weapon and its delay
        _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("Its huge body", "its huge body"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, -1), new Pos(19, 8))), 800));
        _this.getLastQuestEntityWeapon().getCloseCombatDelay().setFixedDelay(20);
        return _this;
    }
    // update()
    Xinopherydon.prototype.update = function () {
        _super.prototype.update.call(this);
        console.log(this.getHp());
        // We heal ourselves if the player is too far on the left
        if (this.getQuest().getGame().getPlayer().getGlobalPosition().x < this.getGlobalPosition().x - 50)
            this.heal(50);
    };
    // willDie()
    Xinopherydon.prototype.willDie = function () {
        // Candies
        this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage(this.getDeathMessage() + " (and found " + Algo.pluralFormat(this.getQuest().foundCandies(30000), " candy", " candies") + ")", this.getQuest().getCandiesFoundMessage()));
        // The claw
        this.getQuest().foundGridOrEqItem(new QuestItemFound(this.getQuest(), "gridItemPossessedXinopherydonClaw", "You found a strange claw on the xinopherydon's corpse.", "You gain a strange claw."));
    };
    return Xinopherydon;
}(QuestEntity));
//# sourceMappingURL=Xinopherydon.js.map