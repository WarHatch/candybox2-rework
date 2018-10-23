var Bugs;
(function (Bugs) {
    // Variables
    var graphicalBugLevel = 0;
    var questBugLevel = 0;
    var ultimateBugLevel = 0;
    // Various functions
    function changeRandomCharacter(str) {
        var index = Random.between(0, str.length - 1);
        return str.substr(0, index) + getRandomCharacter() + str.substr(index + 1);
    }
    Bugs.changeRandomCharacter = changeRandomCharacter;
    function getRandomCharacter() {
        return Random.fromArray(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
            "#", "_", "/", "-", "+", "*", "^", ";", ",", ".", ":", "!", "§", "$", "£", "ù", "è", "à", "@", ")", "(", "|", "]", "}", "{", "(",
            "~", "é", "<", ">", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "%", "`", "'", "ç"]);
    }
    Bugs.getRandomCharacter = getRandomCharacter;
    // Getters
    function getGraphicalBugLevel() {
        return graphicalBugLevel;
    }
    Bugs.getGraphicalBugLevel = getGraphicalBugLevel;
    function getQuestBugLevel() {
        return questBugLevel;
    }
    Bugs.getQuestBugLevel = getQuestBugLevel;
    function getUltimateBugLevel() {
        return ultimateBugLevel;
    }
    Bugs.getUltimateBugLevel = getUltimateBugLevel;
    // Setters    
    function setGraphicalBugLevel(graphicalBugLevel_) {
        graphicalBugLevel = graphicalBugLevel_;
    }
    Bugs.setGraphicalBugLevel = setGraphicalBugLevel;
    function setQuestBugLevel(questBugLevel_) {
        questBugLevel = questBugLevel_;
    }
    Bugs.setQuestBugLevel = setQuestBugLevel;
    function setUltimateBugLevel(ultimateBugLevel_) {
        ultimateBugLevel = ultimateBugLevel_;
    }
    Bugs.setUltimateBugLevel = setUltimateBugLevel;
})(Bugs || (Bugs = {}));
//# sourceMappingURL=Bugs.js.map