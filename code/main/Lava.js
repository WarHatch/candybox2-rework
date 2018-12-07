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
var Lava = /** @class */ (function (_super) {
    __extends(Lava, _super);
    // Constructor
    function Lava(quest, globalPosition, size) {
        var _this = 
        // Call the mother constructor
        _super.call(this, quest, globalPosition, new Naming("Lava", "lava")) || this;
        // Set the team (nature)
        _this.setTeam(QuestEntityTeam.NATURE);
        // Set the weapon and its delay
        _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("Fire", "fire"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, 0), size)), 1000));
        _this.getLastQuestEntityWeapon().getCloseCombatDelay().setFixedDelay(0);
        return _this;
    }
    return Lava;
}(QuestEntity));
//# sourceMappingURL=Lava.js.map