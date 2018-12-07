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
var Monster = /** @class */ (function (_super) {
    __extends(Monster, _super);
    // Constructor
    function Monster(quest, globalPosition) {
        var _this = 
        // Call the mother constructor
        _super.call(this, quest, globalPosition, new Naming("The monster", "the monster"), new RenderArea(13, 4), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement()) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, 0), new Pos(13, 1)), new CollisionBox(_this, new Pos(1, 0), new Pos(11, 1)), new CollisionBox(_this, new Pos(2, 0), new Pos(9, 1)), new CollisionBox(_this, new Pos(3, 0), new Pos(7, 1))));
        // At first, no egg was destroyed
        _this.anEggWasDestroyed = false;
        // Set the ascii art
        _this.getRenderArea().drawArray(Database.getAscii("places/quests/castle/room3/monster"));
        _this.setTransparency(new RenderTransparency(" ", "%"));
        // Set the weapon and its delay
        _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("??", "??"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, -1), new Pos(15, 6))), 10000));
        _this.getLastQuestEntityWeapon().getCloseCombatDelay().setFixedDelay(0);
        return _this;
    }
    // update()
    Monster.prototype.update = function () {
        // If no egg was destroyed, we go towards the player but we stay on the roof
        if (this.anEggWasDestroyed == false) {
            this.goTowards(this.getGlobalPosition().plus(new Pos(6, 4)), this.getQuest().getGame().getPlayer().getGlobalPosition().plus(new Pos(1, 0)), 0, new Pos(2, 0), true);
        }
        // Else, we go down on the player
        else {
            this.goTowards(this.getGlobalPosition().plus(new Pos(6, 4)), this.getQuest().getGame().getPlayer().getGlobalPosition().plus(new Pos(1, 0)), 0, new Pos(4, 4));
        }
        // Call the mother classe update
        _super.prototype.update.call(this);
    };
    // Public methods
    Monster.prototype.eggDestroyed = function () {
        this.anEggWasDestroyed = true;
    };
    return Monster;
}(QuestEntity));
//# sourceMappingURL=Monster.js.map