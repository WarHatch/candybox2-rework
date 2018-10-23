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
var Teapot = /** @class */ (function (_super) {
    __extends(Teapot, _super);
    // Constructor
    function Teapot(quest, pos) {
        var _this = _super.call(this, quest, pos, new Naming("A teapot", "a teapot"), new RenderArea(19, 6), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement()) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, 1), new Pos(3, 1)), new CollisionBox(_this, new Pos(6, 1), new Pos(8, 1)), new CollisionBox(_this, new Pos(1, 2), new Pos(18, 1)), new CollisionBox(_this, new Pos(2, 3), new Pos(17, 1)), new CollisionBox(_this, new Pos(3, 4), new Pos(16, 1)), new CollisionBox(_this, new Pos(5, 5), new Pos(12, 1))));
        // Set gravity
        _this.getQuestEntityMovement().setGravity(true);
        _this.getQuestEntityMovement().setWormsLike(true);
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(1000000);
        _this.setHp(1000000);
        // Set the ascii art and the transparent character
        _this.getRenderArea().drawArray(Database.getAscii("places/quests/fortress/teapot"));
        _this.setTransparency(new RenderTransparency(" ", "%"));
        return _this;
    }
    // update()
    Teapot.prototype.update = function () {
        _super.prototype.update.call(this);
        console.log(this.getHp());
        // We heal ourselves if the player is too far on the left
        if (this.getQuest().getGame().getPlayer().getGlobalPosition().x < this.getGlobalPosition().x - 50)
            this.heal(50);
    };
    // willDie()
    Teapot.prototype.willDie = function () {
        // Candies
        this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage(this.getDeathMessage()));
        // The spoon
        this.getQuest().foundGridOrEqItem(new QuestItemFound(this.getQuest(), "eqItemWeaponGiantSpoon", "You found a giant spoon inside the teapot.", "You gain a giant spoon."));
    };
    return Teapot;
}(QuestEntity));
//# sourceMappingURL=Teapot.js.map