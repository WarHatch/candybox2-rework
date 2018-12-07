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
var YourselfEntity = /** @class */ (function (_super) {
    __extends(YourselfEntity, _super);
    // Constructor
    function YourselfEntity(quest, pos) {
        var _this = _super.call(this, quest, pos, new Naming("Yourself", "yourself"), new RenderArea(3, 1), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement(new Pos(-1, 0))) || this;
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, 0), new Pos(3, 1))));
        // Set gravity
        _this.getQuestEntityMovement().setGravity(true);
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(_this.getQuest().getGame().getPlayer().getMaxHp());
        _this.setHp(_this.getQuest().getGame().getPlayer().getHp());
        // Set the ascii art
        _this.getRenderArea().drawString("\\o/");
        // Set the weapon and its delay
        _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("The same weapon as yours", "the same weapon as yours"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, -1), new Pos(5, 3))), 0));
        _this.getLastQuestEntityWeapon().getCloseCombatDelay().setFixedDelay();
        return _this;
    }
    // setHp()
    YourselfEntity.prototype.setHp = function (hp) {
        // If we don't have the crown
        if (this.getQuest().getGame().isEquipped("hat", "eqItemHatOctopusKingCrown") == false) {
            // When anyone want to change our hp, we change the player's hp first :)
            this.getQuest().getGame().getPlayer().setHp(hp);
        }
        // Else, we have the crown
        else {
            // When anyone want to change our hp, we change the player's hp first :) (but here we keep it over 0!)
            if (hp > 0)
                this.getQuest().getGame().getPlayer().setHp(hp);
            else
                this.getQuest().getGame().getPlayer().setHp(1);
        }
        _super.prototype.setHp.call(this, hp);
    };
    // willDie()
    YourselfEntity.prototype.willDie = function () {
        this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage(this.getDeathMessage() + " (and found " + Algo.pluralFormat(this.getQuest().foundCandies(Math.floor(this.getQuest().getGame().getCandies().getCurrent() / 10)), " candy", " candies") + ")", this.getQuest().getCandiesFoundMessage()));
        this.getQuest().foundGridOrEqItem(new QuestItemFound(this.getQuest(), "eqItemBootsBootsOfIntrospection", "You found the boots of introspection", "You gain the boots of introspection"));
    };
    return YourselfEntity;
}(QuestEntity));
//# sourceMappingURL=YourselfEntity.js.map