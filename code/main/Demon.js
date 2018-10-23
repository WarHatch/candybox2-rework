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
var Demon = /** @class */ (function (_super) {
    __extends(Demon, _super);
    // Constructor
    function Demon(quest, pos) {
        var _this = _super.call(this, quest, pos, new Naming("A demon", "a demon"), new RenderArea(0, 0), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement()) || this;
        // Set gravity
        _this.getQuestEntityMovement().setGravity(true);
        // Set destructible
        _this.setDestructible(true);
        // Set the demon type, randomly-chosen
        switch (Random.between(0, 2)) {
            case 0:
                _this.type = DemonType.CUBE;
                break;
            case 1:
                _this.type = DemonType.EYES;
                break;
            case 2:
                _this.type = DemonType.BUBBLES;
                break;
        }
        // Depending on the type, resize the render area, add a collision box, and draw the ascii art, and add the weapon and its delay
        switch (_this.type) {
            case DemonType.CUBE:
                _this.getRenderArea().resize(5, 3);
                _this.getCbc().addCollisionBox(new CollisionBox(_this, new Pos(0, 0), new Pos(5, 3)));
                _this.getRenderArea().drawArray(Database.getAscii("places/quests/hell/demonCube"));
                _this.setTransparency(new RenderTransparency(" ", "%"));
                _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("Its huge body", "its huge body"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, 2), new Pos(7, 2))), 50));
                _this.getLastQuestEntityWeapon().getCloseCombatDelay().setFixedDelay(10);
                break;
            case DemonType.EYES:
                _this.getRenderArea().resize(5, 4);
                _this.getCbc().addCollisionBox(new CollisionBox(_this, new Pos(0, 1), new Pos(5, 3)));
                _this.getRenderArea().drawArray(Database.getAscii("places/quests/hell/demonEyes"));
                _this.setTransparency(new RenderTransparency(" ", "%"));
                _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("Demonish eyes", "demonish eyes"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, -1), new Pos(7, 6))), 10));
                _this.getLastQuestEntityWeapon().getCloseCombatDelay().setFixedDelay(0);
                break;
            case DemonType.BUBBLES:
                _this.getRenderArea().resize(5, 3);
                _this.getCbc().addCollisionBox(new CollisionBox(_this, new Pos(0, 0), new Pos(5, 3)));
                _this.getRenderArea().drawArray(Database.getAscii("places/quests/hell/demonBubbles" + Random.between(0, 6).toString()));
                _this.setTransparency(new RenderTransparency(" "));
                _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("Fire bubbles", "fire bubbles"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, -1), new Pos(7, 5))), 15));
                _this.getLastQuestEntityWeapon().getCloseCombatDelay().setFixedDelay(1);
                break;
        }
        // Set the health points, depending on the type
        switch (_this.type) {
            case DemonType.CUBE: // Cube : 120 hp
                _this.setMaxHp(120);
                _this.setHp(120);
                break;
            default: // Default : 30 / 40 / 50 / 60 / 70 / 80 / 90 / 100 hp
                _this.setMaxHp(30 + Random.between(0, 7) * 10);
                _this.setHp(_this.getMaxHp());
                break;
        }
        return _this;
    }
    // update()
    Demon.prototype.update = function () {
        // Try to go towards the player
        this.goTowards(this.getRenderAreaCenter(), this.getQuest().getGame().getPlayer().getRenderAreaCenter(), 0, new Pos(1, 0));
        // If we're far from the player, we try to jump
        if (Math.abs(this.getRenderAreaCenter().x - this.getQuest().getGame().getPlayer().getRenderAreaCenter().x) > 5)
            this.jump(3);
        // Call the mother class update method
        _super.prototype.update.call(this);
    };
    // willDie()
    Demon.prototype.willDie = function () {
        this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage(this.getDeathMessage() + " (and found " + Algo.pluralFormat(this.getQuest().foundCandies(5 + Random.upTo(5)), " candy", " candies") + ")", this.getQuest().getCandiesFoundMessage()));
    };
    return Demon;
}(QuestEntity));
//# sourceMappingURL=Demon.js.map