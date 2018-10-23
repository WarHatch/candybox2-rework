var QuestEntitySpellColor = /** @class */ (function () {
    // Constructor
    function QuestEntitySpellColor(quest, position, size, color) {
        this.quest = quest;
        this.position = position;
        this.size = size;
        this.color = color;
    }
    // Public methods
    QuestEntitySpellColor.prototype.draw = function (renderArea, areaPosition) {
        var x1;
        var x2;
        var y;
        for (var i = 0; i < this.size.y; i++) {
            // x1
            x1 = this.position.x + areaPosition.x;
            if (x1 < this.quest.getRealQuestPosition().x)
                x1 = this.quest.getRealQuestPosition().x;
            // x2
            x2 = this.position.x + areaPosition.x + this.size.x;
            if (x2 > this.quest.getRealQuestPosition().x + this.quest.getRealQuestSize().x)
                x2 = this.quest.getRealQuestPosition().x + this.quest.getRealQuestSize().x;
            // y
            y = this.position.y + areaPosition.y + i;
            if (x1 < x2 && y >= this.quest.getRealQuestPosition().y && y < this.quest.getRealQuestPosition().y + this.quest.getRealQuestSize().y) {
                renderArea.addBackgroundColor(x1, x2, y, this.color);
            }
        }
    };
    return QuestEntitySpellColor;
}());
//# sourceMappingURL=QuestEntitySpellColor.js.map