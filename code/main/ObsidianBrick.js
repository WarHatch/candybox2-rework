///<reference path="QuestEntitySpell.ts"/>
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
var ObsidianBrick = /** @class */ (function (_super) {
    __extends(ObsidianBrick, _super);
    // Constructor
    function ObsidianBrick(quest, pos, hp) {
        var _this = _super.call(this, quest, pos, new Naming("An obsidian brick", "an obsidian brick"), null, new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement()) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, 0), new Pos(2, 1))));
        // Set gravity
        _this.getQuestEntityMovement().setGravity(true);
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(hp);
        _this.setHp(hp);
        // Add the color
        _this.addColor(new QuestEntitySpellColor(_this.getQuest(), new Pos(0, 0), new Pos(2, 1), new Color(ColorType.PLAYER_OBSIDIAN_BRICK)));
        return _this;
    }
    return ObsidianBrick;
}(QuestEntitySpell));
//# sourceMappingURL=ObsidianBrick.js.map