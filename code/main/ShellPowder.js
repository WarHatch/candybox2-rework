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
var ShellPowder = /** @class */ (function (_super) {
    __extends(ShellPowder, _super);
    // Constructor
    function ShellPowder(quest, leftDownCornerPosition) {
        var _this = this;
        // Create the real global position
        var globalPosition = leftDownCornerPosition;
        globalPosition.add(new Pos(0, -Database.getAsciiHeight("places/quests/theSea/shellPowder") + 1));
        // Call the mother constructor
        _this = _super.call(this, quest, globalPosition, new Naming("Shell powder", "shell powder"), new RenderArea(), new Pos(0, 0), new CollisionBoxCollection()) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, 0), new Pos(6, 3))));
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(10);
        _this.setHp(10);
        // Set the team (nature)
        _this.setTeam(QuestEntityTeam.NATURE);
        // Draw the ascii art
        _this.getRenderArea().resizeFromArray(Database.getAscii("places/quests/theSea/shellPowder"));
        _this.getRenderArea().drawArray(Database.getAscii("places/quests/theSea/shellPowder"));
        return _this;
    }
    // willDie()
    ShellPowder.prototype.willDie = function () {
        _super.prototype.willDie.call(this);
        this.getQuest().foundGridOrEqItem(new QuestItemFound(this.getQuest(), "gridItemPossessedShellPowder", "You found shell powder.", "You gain shell powder."));
    };
    return ShellPowder;
}(QuestEntity));
//# sourceMappingURL=ShellPowder.js.map