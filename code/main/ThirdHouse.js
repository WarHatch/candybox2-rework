///<reference path="House.ts"/>
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
var ThirdHouse = /** @class */ (function (_super) {
    __extends(ThirdHouse, _super);
    // Constructor
    function ThirdHouse(game) {
        var _this = _super.call(this, game) || this;
        // The render area
        _this.renderArea = new RenderArea();
        // The game running
        _this.gameRunning = null;
        _this.renderArea.resizeFromArray(Database.getAscii("places/village/thirdHouse"), 0, 3);
        _this.update();
        return _this;
    }
    // getRenderArea()
    ThirdHouse.prototype.getRenderArea = function () {
        return this.renderArea;
    };
    // willBeDisplayed()
    ThirdHouse.prototype.willBeDisplayed = function () {
        this.getGame().getQuestCallbackCollection().addCallback(this.runGame.bind(this));
        // Add some hotkeys
        this.getGame().addHotkey(new Hotkey("up", new CallbackCollection(this.pressedUpButton.bind(this))));
        this.getGame().addHotkey(new Hotkey("down", new CallbackCollection(this.pressedDownButton.bind(this))));
        this.getGame().addHotkey(new Hotkey("space", new CallbackCollection(this.pressedSpaceButton.bind(this))));
    };
    // Private methods
    ThirdHouse.prototype.addControls = function (x, y) {
        // If there's a game running, we add the controls
        if (this.gameRunning != null) {
            // UP button
            this.renderArea.addAsciiButton(x, x + 4, y, "thirdHouseUpButton");
            this.renderArea.addLinkCall(".thirdHouseUpButton", new CallbackCollection(this.pressedUpButton.bind(this)));
            // Space button
            this.renderArea.addAsciiButton(x + 7, x + 25, y + 1, "thirdHouseSpaceButton");
            this.renderArea.addLinkCall(".thirdHouseSpaceButton", new CallbackCollection(this.pressedSpaceButton.bind(this)));
            // DOWN button
            this.renderArea.addAsciiButton(x + 28, x + 34, y, "thirdHouseDownButton");
            this.renderArea.addLinkCall(".thirdHouseDownButton", new CallbackCollection(this.pressedDownButton.bind(this)));
        }
    };
    ThirdHouse.prototype.addInsertCandiesButtons = function (x, y) {
        // First button (10 candies)
        this.renderArea.addAsciiButton(x, x + 4, y, "thirdHouseInsert10CandiesButton");
        this.renderArea.addLinkCall(".thirdHouseInsert10CandiesButton", new CallbackCollection(this.insert10Candies.bind(this)));
        // Second button (1000 candies)
        this.renderArea.addAsciiButton(x, x + 4, y + 2, "thirdHouseInsert1000CandiesButton");
        this.renderArea.addLinkCall(".thirdHouseInsert1000CandiesButton", new CallbackCollection(this.insert1000Candies.bind(this)));
    };
    ThirdHouse.prototype.insert10Candies = function () {
        // If we have enough candies
        if (this.getGame().getCandies().getCurrent() >= 10) {
            // We pay the price
            this.getGame().getCandies().add(-10);
            // We launch the game
            this.gameRunning = new SuperRPG(this);
        }
    };
    ThirdHouse.prototype.insert1000Candies = function () {
        // If we have enough candies
        if (this.getGame().getCandies().getCurrent() >= 1000) {
            // We pay the price
            this.getGame().getCandies().add(-1000);
            // We launch the game
            this.gameRunning = new GalacticWars(this);
        }
    };
    ThirdHouse.prototype.pressedDownButton = function () {
        if (this.gameRunning != null)
            this.gameRunning.pressedDownButton();
    };
    ThirdHouse.prototype.pressedSpaceButton = function () {
        if (this.gameRunning != null)
            this.gameRunning.pressedSpaceButton();
    };
    ThirdHouse.prototype.pressedUpButton = function () {
        if (this.gameRunning != null)
            this.gameRunning.pressedUpButton();
    };
    ThirdHouse.prototype.runGame = function () {
        // If there's a game running, we run it
        if (this.gameRunning != null) {
            // If it should stop running
            if (this.gameRunning.run() == true) {
                this.gameRunning = null; // We set it to null
                // We update
                this.update();
                this.getGame().updatePlace();
            }
            // Else
            else {
                // We update
                this.update();
                // We draw the game on the screen
                this.renderArea.drawArea(this.gameRunning.getRenderArea(), 19, 10);
                // We update at the game level
                this.getGame().updatePlace();
            }
        }
    };
    ThirdHouse.prototype.update = function () {
        // Erase everything
        this.renderArea.resetAllButSize();
        // Back to the village button
        this.addBackToTheVillageButton(this.renderArea, "thirdHouseBackToTheVillageButton");
        // Draw the house
        this.renderArea.drawArray(Database.getAscii("places/village/thirdHouse"), 0, 3);
        // Add the buttons to insert candies
        this.addInsertCandiesButtons(25, 28);
        // Add the buttons to control the game
        this.addControls(29, 24);
    };
    return ThirdHouse;
}(House));
//# sourceMappingURL=ThirdHouse.js.map