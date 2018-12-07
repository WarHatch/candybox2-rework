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
var Spikes = /** @class */ (function (_super) {
    __extends(Spikes, _super);
    // Constructor
    function Spikes(quest, globalPosition, width, damage, inverted) {
        if (damage === void 0) { damage = 200; }
        if (inverted === void 0) { inverted = false; }
        var _this = 
        // Call the mother constructor
        _super.call(this, quest, globalPosition, new Naming("Some spikes", "some spikes"), new RenderArea(), new Pos(0, 0), new CollisionBoxCollection()) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, 0), new Pos(width, 1))));
        // Set the team (nature)
        _this.setTeam(QuestEntityTeam.NATURE);
        // Set the weapon and its delay
        _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("Its spikes", "its spikes"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, (inverted ? 1 : -1)), new Pos(width, 1))), damage));
        _this.getLastQuestEntityWeapon().getCloseCombatDelay().setFixedDelay(0);
        // Draw the ascii art
        _this.getRenderArea().resize(width, 1);
        for (var i = 0; i < Math.floor(width / 2); i++) {
            if (inverted == false)
                _this.getRenderArea().drawString("/\\", i * 2, 0);
            else
                _this.getRenderArea().drawString("\\/", i * 2, 0);
        }
        return _this;
    }
    return Spikes;
}(QuestEntity));
//# sourceMappingURL=Spikes.js.map