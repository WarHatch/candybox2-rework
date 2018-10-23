var QuestItemFound = /** @class */ (function () {
    // Constructor
    function QuestItemFound(quest, savingName, foundText, getText) {
        this.quest = quest;
        this.savingName = savingName;
        this.foundText = foundText;
        this.getText = getText;
    }
    // Public methods
    QuestItemFound.prototype.found = function () {
        this.quest.getGame().getQuestLog().addMessage(new QuestLogMessage(this.foundText, null, true));
    };
    QuestItemFound.prototype.get = function () {
        this.quest.getGame().getQuestLog().addMessage(new QuestLogMessage(this.getText, null, true));
    };
    // Public getters    
    QuestItemFound.prototype.getSavingName = function () {
        return this.savingName;
    };
    return QuestItemFound;
}());
//# sourceMappingURL=QuestItemFound.js.map