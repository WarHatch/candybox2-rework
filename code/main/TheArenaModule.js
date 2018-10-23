var TheArenaModule;
(function (TheArenaModule) {
    var quests = {};
    // Add a quest
    function addQuest(quest) {
        quests[quest.getQuestFolderName()] = quest;
    }
    TheArenaModule.addQuest = addQuest;
    // Get a quest
    function getQuest(questFolderName) {
        return quests[questFolderName];
    }
    TheArenaModule.getQuest = getQuest;
})(TheArenaModule || (TheArenaModule = {}));
//# sourceMappingURL=TheArenaModule.js.map