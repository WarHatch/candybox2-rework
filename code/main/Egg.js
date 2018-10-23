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
var Egg = /** @class */ (function (_super) {
    __extends(Egg, _super);
    // Constructor
    function Egg(quest, globalPosition, callbackWhenDying) {
        var _this = 
        // Call the mother constructor
        _super.call(this, quest, globalPosition, new Naming("An egg", "an egg"), new RenderArea(2, 1), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement()) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, 0), new Pos(2, 1))));
        // Set the callback from parameter
        _this.callbackWhenDying = callbackWhenDying;
        // Set gravity
        _this.getQuestEntityMovement().setGravity(true);
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(4);
        _this.setHp(4);
        // Set the ascii art
        _this.getRenderArea().drawArray(Database.getAscii("places/quests/castle/room3/egg"));
        return _this;
    }
    // willDie()
    Egg.prototype.willDie = function () {
        this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage("An egg was destroyed."));
        this.callbackWhenDying.fire();
    };
    return Egg;
}(QuestEntity));
//# sourceMappingURL=Egg.js.map