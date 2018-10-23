// Saving stuff related to the status bar itself
Saving.registerBool("statusBarUnlocked", false);
// Saving stuff related to unlocked tabs
Saving.registerBool("statusBarUnlockedCfg", false);
Saving.registerBool("statusBarUnlockedSave", false);
Saving.registerBool("statusBarUnlockedMap", false);
Saving.registerBool("statusBarUnlockedInventory", false);
Saving.registerBool("statusBarUnlockedLollipopFarm", false);
Saving.registerBool("statusBarUnlockedCauldron", false);
Saving.registerBool("statusBarUnlockedInsideYourBox", false);
Saving.registerBool("statusBarUnlockedTheComputer", false);
Saving.registerBool("statusBarUnlockedTheArena", false);
// Saving stuff for the unlocked health bar
Saving.registerBool("statusBarUnlockedHealthBar", false);
// The corner step
Saving.registerNumber("statusBarCornerStep", 0);
var StatusBar = /** @class */ (function () {
    // Constructor
    function StatusBar(game, selectedTabIndex) {
        // Render areas
        this.playerHealthBar = null;
        this.renderArea = new RenderArea(100, 6, " ");
        // Tabs
        this.tabs = [];
        // Se the game
        this.game = game;
        // Set the default selected tab index
        this.selectedTabIndex = selectedTabIndex;
        // Add everything for the first time
        this.deleteAndReAddEverything();
    }
    // Public methods
    StatusBar.prototype.deleteAndReAddEverything = function () {
        // Delete tabs
        this.tabs = [];
        // Reset special hotkeys
        this.game.resetSpecialHotkeys();
        // Delete the player health bar
        this.playerHealthBar = null;
        // Add the player health bar
        if (Saving.loadBool("statusBarUnlockedHealthBar")) {
            this.playerHealthBar = new Bar(BarType.HEALTH);
            this.playerHealthBar.resize(72, 1);
        }
        // Add tabs
        if (Saving.loadBool("statusBarUnlocked"))
            this.addTab(StatusBarTabType.CANDY_BOX, 0, " THE", "CANDY", " BOX", new CallbackCollection(this.game.goToCandyBox.bind(this.game)));
        if (Saving.loadBool("statusBarUnlockedInventory"))
            this.addTab(StatusBarTabType.INVENTORY, 8, "INV", " ENT", "ORY", new CallbackCollection(this.game.goToInventory.bind(this.game)));
        if (Saving.loadBool("statusBarUnlockedMap"))
            this.addTab(StatusBarTabType.MAP, 15, "", "MAP", "", new CallbackCollection(this.game.goToMap.bind(this.game)));
        if (Saving.loadBool("statusBarUnlockedLollipopFarm"))
            this.addTab(StatusBarTabType.FARM, 21, "LOLL", "IPOP", "FARM", new CallbackCollection(this.game.goToLollipopFarm.bind(this.game)));
        if (Saving.loadBool("statusBarUnlockedCauldron"))
            this.addTab(StatusBarTabType.CAULDRON, 28, "", "CLDR", "", new CallbackCollection(this.game.goToCauldron.bind(this.game)));
        if (Saving.loadBool("statusBarUnlockedInsideYourBox"))
            this.addTab(StatusBarTabType.INSIDE_YOUR_BOX, 35, "INSIDE", " YOUR", " BOX!", new CallbackCollection(this.game.goToInsideYourBox.bind(this.game)));
        if (Saving.loadBool("statusBarUnlockedTheComputer"))
            this.addTab(StatusBarTabType.THE_COMPUTER, 44, " THE", " COM", "PUTER", new CallbackCollection(this.game.goToTheComputer.bind(this.game)));
        if (Saving.loadBool("statusBarUnlockedTheArena"))
            this.addTab(StatusBarTabType.THE_ARENA, 52, " THE", "ARENA", " /!\\", new CallbackCollection(this.game.goToTheArena.bind(this.game)));
        if (Saving.loadBool("statusBarUnlockedSave"))
            this.addTab(StatusBarTabType.SAVE, 60, "", "SAVE", "", new CallbackCollection(this.game.goToSave.bind(this.game)));
        if (Saving.loadBool("statusBarUnlockedCfg"))
            this.addTab(StatusBarTabType.CFG, 67, "C", "F", "G", new CallbackCollection(this.game.goToCfg.bind(this.game)));
        // Add special hotkeys to go to the next or previous tab
        if (Saving.loadBool("statusBarUnlocked")) {
            this.game.addSpecialHotkey(new Hotkey("n", new CallbackCollection(this.nextTab.bind(this))));
        }
    };
    StatusBar.prototype.selectTab = function (index) {
        this.selectedTabIndex = index;
        this.game.updateStatusBar();
    };
    StatusBar.prototype.selectTabByType = function (type) {
        for (var i = 0; i < this.tabs.length; i++) {
            // If this is the tab we're searching for
            if (this.tabs[i].getType() == type) {
                // We select it and we break
                this.selectedTabIndex = i;
                this.game.updateStatusBar();
            }
        }
    };
    StatusBar.prototype.updateAll = function () {
        // We erase
        this.renderArea.resetAllButSize();
        // We draw the borders
        if (Saving.loadBool("statusBarUnlocked")) {
            this.renderArea.drawString("+", 0, 0);
            this.renderArea.drawString("+", this.renderArea.getWidth() - 1, 0);
            this.renderArea.drawString("+", 0, 5);
            this.renderArea.drawString("+", this.renderArea.getWidth() - 1, 5);
            this.renderArea.drawVerticalLine("|", 0, 1, 4);
            this.renderArea.drawVerticalLine("|", this.renderArea.getWidth() - 1, 1, 4);
            this.renderArea.drawHorizontalLine("-", 1, this.renderArea.getWidth() - 1, 0);
            this.renderArea.drawHorizontalLine("-", 1, this.renderArea.getWidth() - 1, 5);
        }
        // We draw the candies we have
        this.renderArea.drawString(this.game.getCandies().getCurrentAsString(26), 2, 1);
        // We draw the lollipops we have, if we had at least one at some point
        if (this.game.getLollipops().getMax() > 0)
            this.renderArea.drawString(this.game.getLollipops().getCurrentAsString(26), 2, 2);
        // We draw the chocolate bars we have, if we had at least one at some point
        if (this.game.getChocolateBars().getMax() > 0)
            this.renderArea.drawString(this.game.getChocolateBars().getCurrentAsString(26), 2, 3);
        // We draw the pains au chocolat we have, if we had at least one at some point
        if (this.game.getPainsAuChocolat().getMax() > 0)
            this.renderArea.drawString(this.game.getPainsAuChocolat().getCurrentAsString(26), 2, 4);
        // We draw tabs
        this.drawTabs();
        // We draw the health bar
        this.updateHealthBar();
        // We draw the stuff about the status bar's corners
        this.drawStatusBarCornersStuff();
    };
    StatusBar.prototype.updateHealthBar = function () {
        // We update the health bar if it isn't null
        if (this.playerHealthBar != null) {
            // We update the bar from the player's health
            this.playerHealthBar.update(this.game.getPlayer().getHp() / this.game.getPlayer().getMaxHp(), "Your health : " + this.game.getPlayer().getHp() + "/" + this.game.getPlayer().getMaxHp());
            // We draw the bar
            this.renderArea.drawArea(this.playerHealthBar, 28, 4);
        }
    };
    // Public getters
    StatusBar.prototype.getRenderArea = function () {
        return this.renderArea;
    };
    // Private methods
    StatusBar.prototype.addTab = function (type, xPos, text1, text2, text3, callbackCollection) {
        // We add the tab
        this.tabs.push(new StatusBarTab(this, type, xPos, text1, text2, text3, this.tabs.length, callbackCollection));
    };
    StatusBar.prototype.clickedOnCorner = function () {
        this.setNextCornerStep();
        this.game.updateStatusBar();
    };
    StatusBar.prototype.drawAllCorners = function (character) {
        this.drawUpLeftCorner(character);
        this.drawUpRightCorner(character);
        this.drawDownLeftCorner(character);
        this.drawDownRightCorner(character);
    };
    StatusBar.prototype.drawDownLeftCorner = function (character) {
        this.renderArea.drawString(character, 0, 5);
    };
    StatusBar.prototype.drawDownRightCorner = function (character) {
        this.renderArea.drawString(character, 99, 5);
    };
    StatusBar.prototype.drawStatusBarCornersStuff = function () {
        // We add buttons
        this.renderArea.addAsciiNinjaButton(0, 1, 0, "statusBarCornerButton");
        this.renderArea.addAsciiNinjaButton(99, 100, 0, "statusBarCornerButton");
        this.renderArea.addAsciiNinjaButton(0, 1, 5, "statusBarCornerButton");
        this.renderArea.addAsciiNinjaButton(99, 100, 5, "statusBarCornerButton");
        // We add the link
        this.renderArea.addLinkCall(".statusBarCornerButton", new CallbackCollection(this.clickedOnCorner.bind(this)));
        // We possibly draw a different corner, depending on the corner step
        switch (Saving.loadNumber("statusBarCornerStep")) {
            case 0: break; // Default corner, we do nothing
            case 1:
                this.drawAllCorners("*");
                break;
            case 2:
                this.drawAllCorners("#");
                break;
            case 3:
                this.drawAllCorners("-");
                break;
            case 4:
                this.drawUpLeftCorner("A");
                this.drawUpRightCorner("B");
                this.drawDownRightCorner("C");
                this.drawDownLeftCorner("D");
                break;
            case 5:
                this.drawUpLeftCorner("0");
                this.drawUpRightCorner("1");
                this.drawDownRightCorner("2");
                this.drawDownLeftCorner("3");
                break;
            case 6:
                this.drawAllCorners("@");
                break;
        }
    };
    StatusBar.prototype.drawTabs = function () {
        if (Saving.loadBool("statusBarUnlocked")) {
            this.renderArea.drawVerticalLine("|", 28, 1, 4);
            for (var i = 0; i < this.tabs.length; i++) {
                this.tabs[i].render(this.renderArea, 29, 1, (this.selectedTabIndex == i ? true : false));
            }
        }
    };
    StatusBar.prototype.drawUpLeftCorner = function (character) {
        this.renderArea.drawString(character, 0, 0);
    };
    StatusBar.prototype.drawUpRightCorner = function (character) {
        this.renderArea.drawString(character, 99, 0);
    };
    StatusBar.prototype.previousTab = function () {
        if (this.selectedTabIndex - 1 >= 0)
            this.tabs[this.selectedTabIndex - 1].clicked();
    };
    StatusBar.prototype.nextTab = function () {
        // If we're allowed to.. (this will be disable when using the computer)
        if (this.game.getIsStatusBarAllowedToUseTheNKey()) {
            if (this.selectedTabIndex + 1 < this.tabs.length)
                this.tabs[this.selectedTabIndex + 1].clicked();
            else
                this.tabs[0].clicked();
        }
    };
    StatusBar.prototype.setNextCornerStep = function () {
        var nextCornerStep = Saving.loadNumber("statusBarCornerStep");
        nextCornerStep += 1;
        if (nextCornerStep > 6)
            nextCornerStep = 0;
        Saving.saveNumber("statusBarCornerStep", nextCornerStep);
    };
    return StatusBar;
}());
//# sourceMappingURL=StatusBar.js.map