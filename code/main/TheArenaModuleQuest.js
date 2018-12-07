var TheArenaModuleQuest = /** @class */ (function () {
    // Constructor
    function TheArenaModuleQuest(questFolderName, specialCallback) {
        // Set from parameters
        this.questFolderName = questFolderName;
        this.specialCallback = specialCallback;
    }
    // Public methods
    TheArenaModuleQuest.prototype.drawLogo = function (renderArea, x, y, game) {
        // Draw the logo ascii art
        renderArea.drawArray(Database.getAscii("arena/" + this.questFolderName + "/logo"), x + 1, y + 1);
        // Add the button and the link
        renderArea.addMultipleAsciiButtons("theArenaQuest" + this.questFolderName, x + 1, x + 19, y + 1, x + 1, x + 19, y + 2, x + 1, x + 19, y + 3, x + 1, x + 19, y + 4);
        renderArea.addLinkCall(".theArenaQuest" + this.questFolderName, new CallbackCollection(this.launchQuest.bind(this, game)));
    };
    // Public getters
    TheArenaModuleQuest.prototype.getQuestFolderName = function () {
        return this.questFolderName;
    };
    // Private methods
    TheArenaModuleQuest.prototype.launchQuest = function (game) {
        if (game.canStartQuest()) {
            game.getStatusBar().selectTabByType(StatusBarTabType.MAP);
            game.goToMap();
            game.setPlace(this.specialCallback(game));
        }
    };
    return TheArenaModuleQuest;
}());
//# sourceMappingURL=TheArenaModuleQuest.js.map