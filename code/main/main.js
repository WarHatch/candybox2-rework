///<reference path="Game.ts"/>
///<reference path="C:\Users\Odysseus\Documents\Projects\candybox2\candybox2.github.io-master/libs/jquery.d.ts"/>
///<reference path="./MainLoadingType.ts"/>
var Main;
(function (Main) {
    // The game
    var game = null;
    // Information about loading
    var loadingType = MainLoadingType.NONE;
    var loadingString = null;
    // Information about the game mode
    var gameMode = null;
    // Public functions    
    function documentIsReady() {
        Keyboard.execute(); // Execute the Kayboard jquery stuff
        start(); // Start the game
    }
    Main.documentIsReady = documentIsReady;
    function reloadEverythingFromFile(fileContent) {
        // Clear intervals for the current game
        game.clearAllIntervals();
        // Set the loading type
        loadingType = MainLoadingType.FILE;
        // Set the loading string
        loadingString = fileContent;
        // Set the gamemode (null so that it is set from loading)
        gameMode = null;
        // We can't register anymore
        Saving.canRegister = false;
        // Finally start (this will erase the current game)
        start();
    }
    Main.reloadEverythingFromFile = reloadEverythingFromFile;
    function setUrlData(urlData) {
        // Create some variables
        var beforeEqual;
        var afterEqual;
        // If there's something in the url and we can find an equal sign and this equal sign isn't the last character of the string
        if (urlData != "" && urlData.indexOf("=") != -1 && urlData.indexOf("=") < urlData.length - 1) {
            // Strip the question mark
            urlData = urlData.substr(1);
            // Separate the data in two parts : before and after the equal sign
            beforeEqual = urlData.substr(0, urlData.indexOf("="));
            afterEqual = urlData.substr(urlData.indexOf("=") + 1);
            // Do different things depending on the value of beforeEqual
            switch (beforeEqual) {
                // If we're trying to load a local slot
                case "slot":
                    loadingType = MainLoadingType.LOCAL;
                    loadingString = "slot" + afterEqual;
                    break;
                // If we're trying to launch a new game with a special mode
                case "gamemode":
                    gameMode = afterEqual;
                    break;
            }
        }
    }
    Main.setUrlData = setUrlData;
    function start() {
        game = new Game(gameMode);
        Keyboard.setGame(game);
        Saving.load(game, loadingType, loadingString);
        game.postLoad();
    }
})(Main || (Main = {}));
$(document).ready(function () {
    Main.setUrlData(window.location.search);
    Main.documentIsReady();
});
//# sourceMappingURL=main.js.map