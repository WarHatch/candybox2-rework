var QuestEntityHealthBar = /** @class */ (function () {
    // Constructor
    function QuestEntityHealthBar(questEntity, barSize, position, // By default, the bar will be above the entity
    positionType, drawEvenIfFull, showText, barType) {
        if (position === void 0) { position = new Pos(0, -1); }
        if (positionType === void 0) { positionType = QuestEntityHealthBarPositionType.RELATIVE; }
        if (drawEvenIfFull === void 0) { drawEvenIfFull = false; }
        if (showText === void 0) { showText = false; }
        if (barType === void 0) { barType = BarType.UNICOLOR_HEALTH; }
        // Create the bar
        this.bar = new Bar(barType);
        // Set the parameters
        this.setBarSize(barSize);
        this.questEntity = questEntity;
        this.position = position;
        this.positionType = positionType;
        this.drawEvenIfFull = drawEvenIfFull;
        this.showText = showText;
        // Update for the first time
        this.update();
    }
    // Public methods
    QuestEntityHealthBar.prototype.draw = function (renderArea) {
        // Draw if we should be drawn
        if (this.shouldBeDrawn) {
            switch (this.positionType) {
                case QuestEntityHealthBarPositionType.FIXED_ON_PAGE:
                    renderArea.drawArea(this.bar, ((this.questEntity.getQuest().getRenderArea().getWidth() - 100) - this.questEntity.getQuest().getGap()) / 2 + this.questEntity.getQuest().getRealQuestPosition().x + this.position.x + this.questEntity.getQuest().getGlobalDrawingOffset().x, this.questEntity.getQuest().getRealQuestPosition().y + this.position.y + this.questEntity.getQuest().getGlobalDrawingOffset().y, new RenderTransparency(" "));
                    break;
                case QuestEntityHealthBarPositionType.FIXED:
                    renderArea.drawArea(this.bar, this.questEntity.getQuest().getRealQuestPosition().x + this.position.x + this.questEntity.getQuest().getGlobalDrawingOffset().x, this.questEntity.getQuest().getRealQuestPosition().y + this.position.y + this.questEntity.getQuest().getGlobalDrawingOffset().y, new RenderTransparency(" "));
                    break;
                case QuestEntityHealthBarPositionType.RELATIVE:
                    if (this.questEntity.getQuest().getRealQuestPosition().x + this.questEntity.getGlobalPosition().x + this.position.x > 0 && // If the bar fit at the left
                        this.questEntity.getQuest().getRealQuestPosition().x + this.questEntity.getGlobalPosition().x + this.position.x + this.bar.getWidth() <= renderArea.getWidth() && // And at the right too
                        this.questEntity.getGlobalPosition().y + this.position.y > 0 && // And at the top
                        this.questEntity.getGlobalPosition().y + this.position.y <= this.questEntity.getQuest().getRealQuestSize().y // And at the bottom
                    ) {
                        renderArea.drawArea(this.bar, this.questEntity.getQuest().getRealQuestPosition().x + this.questEntity.getGlobalPosition().x + this.position.x + this.questEntity.getQuest().getGlobalDrawingOffset().x, this.questEntity.getQuest().getRealQuestPosition().y + this.questEntity.getGlobalPosition().y + this.position.y + this.questEntity.getQuest().getGlobalDrawingOffset().y, new RenderTransparency(" "));
                    }
                    break;
            }
        }
    };
    QuestEntityHealthBar.prototype.update = function () {
        // If we should draw the bar even if full or it isn't full, then we set that we should draw it
        if (this.drawEvenIfFull || this.questEntity.getHp() / this.questEntity.getMaxHp() != 1) {
            this.shouldBeDrawn = true;
        }
        else
            this.shouldBeDrawn = false;
        // Update the bar only if it should be draw
        if (this.shouldBeDrawn) {
            // If we don't have to show text
            if (this.showText == false)
                this.bar.update(this.questEntity.getHp() / this.questEntity.getMaxHp(), this.questEntity.getHp().toString());
            // If we have to
            else
                this.bar.update(this.questEntity.getHp() / this.questEntity.getMaxHp(), this.questEntity.getNaming().getBeginning() + " : " + this.questEntity.getHp().toString() + "/" + this.questEntity.getMaxHp().toString());
        }
    };
    // Public setters
    QuestEntityHealthBar.prototype.setBarSize = function (barSize) {
        this.barSize = barSize;
        this.bar.resize(this.barSize.x, this.barSize.y);
    };
    QuestEntityHealthBar.prototype.setDrawEvenIfFull = function (value) {
        this.drawEvenIfFull = value;
    };
    return QuestEntityHealthBar;
}());
//# sourceMappingURL=QuestEntityHealthBar.js.map