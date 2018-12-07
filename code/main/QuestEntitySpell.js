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
var QuestEntitySpell = /** @class */ (function (_super) {
    __extends(QuestEntitySpell, _super);
    // Constructor
    function QuestEntitySpell(quest, pos, naming, renderArea, renderAreaPosition, cbc, questEntityMovement, questEntityAnimation) {
        if (renderArea === void 0) { renderArea = null; }
        if (renderAreaPosition === void 0) { renderAreaPosition = new Pos(0, 0); }
        if (cbc === void 0) { cbc = null; }
        if (questEntityMovement === void 0) { questEntityMovement = null; }
        if (questEntityAnimation === void 0) { questEntityAnimation = null; }
        var _this = _super.call(this, quest, pos, naming, renderArea, renderAreaPosition, cbc, questEntityMovement, questEntityAnimation) || this;
        // Colors
        _this.colors = [];
        // Set isASpell
        _this.setIsASpell(true);
        return _this;
    }
    // Public methods
    QuestEntitySpell.prototype.addColor = function (color) {
        this.colors.push(color);
    };
    QuestEntitySpell.prototype.draw = function (renderArea) {
        // Call the mother class draw method
        _super.prototype.draw.call(this, renderArea);
        // Draw the colors
        for (var i = 0; i < this.colors.length; i++) {
            this.colors[i].draw(renderArea, this.getQuest().getRealQuestPosition().plus(this.getGlobalPosition()).plus(this.getQuest().getGlobalDrawingOffset()));
        }
    };
    QuestEntitySpell.prototype.removeColors = function () {
        this.colors = [];
    };
    return QuestEntitySpell;
}(QuestEntity));
//# sourceMappingURL=QuestEntitySpell.js.map