///<reference path="Place.ts"/>
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
var Village = /** @class */ (function (_super) {
    __extends(Village, _super);
    // Constructor
    function Village(game) {
        var _this = _super.call(this, game) || this;
        // Render areas
        _this.renderArea = new RenderArea();
        // Smoke
        _this.smokes = [new Smoke(8, 26, 1, 3, 1, 3),
            new Smoke(64, 26, 2, 4, 0, 0),
            new Smoke(80, 26, 1, 3, 1, 3),
            new Smoke(59, 42, 1, 3, 1, 3)
        ];
        // Resize the area
        _this.renderArea.resizeFromArray(Database.getAscii("places/village/village"), 0, 3);
        // Update
        _this.update();
        return _this;
    }
    // Public methods    
    Village.prototype.willBeDisplayed = function () {
        this.getGame().getOneSecondCallbackCollection().addCallback(this.actionSmokes.bind(this));
        this.update(); // We update. This is needed because the village is the first thing to be loaded when we launch the game
    };
    // getRenderArea()
    Village.prototype.getRenderArea = function () {
        return this.renderArea;
    };
    // Private methods
    Village.prototype.actionSmokes = function () {
        // We make the smokes move
        for (var i = 0; i < this.smokes.length; i++) {
            this.smokes[i].move();
        }
        // We update on the page
        this.update();
        this.getGame().updatePlace();
    };
    Village.prototype.update = function () {
        // Erase everything
        this.renderArea.resetAllButSize();
        // Back to the map button only if we possess the main map
        if (Saving.loadBool("gridItemPossessedMainMap"))
            this.addBackToMainMapButton(this.renderArea, "villageBackToTheMapButton");
        // Draw the ascii
        this.renderArea.drawArray(Database.getAscii("places/village/village"), 0, 3);
        // Draw smokes
        for (var i = 0; i < this.smokes.length; i++) {
            this.smokes[i].draw(this.renderArea);
        }
        // Load various things
        this.loadFirstHouse(2, 3 + 24);
        this.loadSecondHouse(18, 3 + 21);
        this.loadThirdHouse(32, 3 + 25);
        this.loadForge(61, 3 + 24);
        this.loadFourthHouse(77, 3 + 24);
        this.loadFifthHouse(91, 3 + 25);
    };
    // Private "go to" methods
    Village.prototype.goToFirstHouse = function () {
        alert("yay");
    };
    Village.prototype.goToSecondHouse = function () {
        this.getGame().setPlace(new SecondHouse(this.getGame()));
    };
    Village.prototype.goToThirdHouse = function () {
        this.getGame().setPlace(new ThirdHouse(this.getGame()));
    };
    Village.prototype.goToForge = function () {
        this.getGame().setPlace(new Forge(this.getGame()));
    };
    Village.prototype.goToFourthHouse = function () {
        this.getGame().setPlace(new FourthHouse(this.getGame()));
    };
    Village.prototype.goToFifthHouse = function () {
        this.getGame().setPlace(new FifthHouse(this.getGame()));
    };
    // Private "load" methods
    Village.prototype.loadFirstHouse = function (x, y) {
        // Buttons
        this.renderArea.addMultipleAsciiNinjaButtons("mapVillageFirstHouseButton", x + 6, x + 8, y, x + 1, x + 10, y + 1, x, x + 11, y + 2, x - 1, x + 12, y + 3, x, x + 11, y + 4, x, x + 11, y + 5);
        // Comments
        this.renderArea.addFullComment(x + 6, y + 6, Database.getText("mapVillageLockedHouseComment"), Database.getTranslatedText("mapVillageLockedHouseComment"), "mapVillageFirstHouseComment");
        // Interactions
        this.renderArea.addLinkOver(".mapVillageFirstHouseButton, .mapVillageFirstHouseComment", ".mapVillageFirstHouseComment");
    };
    Village.prototype.loadSecondHouse = function (x, y) {
        // Buttons
        this.renderArea.addMultipleAsciiButtons("mapVillageSecondHouseButton", x + 1, x + 9, y, x, x + 10, y + 1, x - 1, x + 11, y + 2, x, x + 10, y + 3, x, x + 10, y + 4, x, x + 10, y + 5, x, x + 10, y + 6, x, x + 10, y + 7, x, x + 10, y + 8);
        // Comments
        this.renderArea.addFullComment(x + 5, y + 9, Database.getText("mapVillageTheShopComment"), Database.getTranslatedText("mapVillageTheShopComment"), "mapVillageSecondHouseComment");
        // Interactions
        this.renderArea.addLinkOver(".mapVillageSecondHouseButton, .mapVillageSecondHouseComment", ".mapVillageSecondHouseComment");
        this.renderArea.addLinkCall(".mapVillageSecondHouseButton, .mapVillageSecondHouseComment", new CallbackCollection(this.goToSecondHouse.bind(this)));
    };
    Village.prototype.loadThirdHouse = function (x, y) {
        // If we have the key to the third house
        if (Saving.loadBool("gridItemPossessedThirdHouseKey")) {
            // Buttons
            this.renderArea.addMultipleAsciiButtons("mapVillageThirdHouseButton", x + 1, x + 7, y, x, x + 8, y + 1, x - 1, x + 9, y + 2, x, x + 8, y + 3, x, x + 8, y + 4);
            // Comments
            this.renderArea.addFullComment(x + 4, y + 5, Database.getText("mapVillageAHouseComment"), Database.getTranslatedText("mapVillageAHouseComment"), "mapVillageThirdHouseComment");
            // Interactions
            this.renderArea.addLinkOver(".mapVillageThirdHouseButton, .mapVillageThirdHouseComment", ".mapVillageThirdHouseComment");
            this.renderArea.addLinkCall(".mapVillageThirdHouseButton, .mapVillageThirdHouseComment", new CallbackCollection(this.goToThirdHouse.bind(this)));
        }
        // Else, we don't have the key
        else {
            // Buttons
            this.renderArea.addMultipleAsciiNinjaButtons("mapVillageThirdHouseButton", x + 1, x + 7, y, x, x + 8, y + 1, x - 1, x + 9, y + 2, x, x + 8, y + 3, x, x + 8, y + 4);
            // Comments
            this.renderArea.addFullComment(x + 4, y + 5, Database.getText("mapVillageLockedHouseComment"), Database.getTranslatedText("mapVillageLockedHouseComment"), "mapVillageThirdHouseComment");
            // Interactions
            this.renderArea.addLinkOver(".mapVillageThirdHouseButton, .mapVillageThirdHouseComment", ".mapVillageThirdHouseComment");
        }
    };
    Village.prototype.loadForge = function (x, y) {
        // Buttons
        this.renderArea.addMultipleAsciiButtons("mapVillageForgeButton", x + 3, x + 6, y, x + 1, x + 10, y + 1, x, x + 11, y + 2, x - 1, x + 12, y + 3, x, x + 11, y + 4, x, x + 11, y + 5);
        // Comments
        this.renderArea.addFullComment(x + 6, y + 6, Database.getText("mapVillageForgeComment"), Database.getTranslatedText("mapVillageForgeComment"), "mapVillageForgeComment");
        // Interactions
        this.renderArea.addLinkOver(".mapVillageForgeButton, .mapVillageForgeComment", ".mapVillageForgeComment");
        this.renderArea.addLinkCall(".mapVillageForgeButton, .mapVillageForgeComment", new CallbackCollection(this.goToForge.bind(this)));
    };
    Village.prototype.loadFourthHouse = function (x, y) {
        // Buttons
        this.renderArea.addMultipleAsciiButtons("mapVillageFourthHouseButton", x + 3, x + 5, y, x + 1, x + 10, y + 1, x, x + 11, y + 2, x - 1, x + 12, y + 3, x, x + 11, y + 4, x, x + 11, y + 5);
        // Comments
        this.renderArea.addFullComment(x + 6, y + 6, Database.getText("mapVillageAHouseComment"), Database.getTranslatedText("mapVillageAHouseComment"), "mapVillageFourthHouseComment");
        // Interactions
        this.renderArea.addLinkOver(".mapVillageFourthHouseButton, .mapVillageFourthHouseComment", ".mapVillageFourthHouseComment");
        this.renderArea.addLinkCall(".mapVillageFourthHouseButton, .mapVillageFourthHouseComment", new CallbackCollection(this.goToFourthHouse.bind(this)));
    };
    Village.prototype.loadFifthHouse = function (x, y) {
        // Buttons
        this.renderArea.addMultipleAsciiButtons("mapVillageFifthHouseButton", x + 1, x + 9, y, x, x + 10, y + 1, x - 1, x + 11, y + 2, x, x + 10, y + 3, x, x + 10, y + 4);
        // Comments
        this.renderArea.addFullComment(x + 5, y + 5, Database.getText("mapVillageAHouseComment"), Database.getTranslatedText("mapVillageAHouseComment"), "mapVillageFifthHouseComment");
        // Interactions
        this.renderArea.addLinkOver(".mapVillageFifthHouseButton, .mapVillageFifthHouseComment", ".mapVillageFifthHouseComment");
        this.renderArea.addLinkCall(".mapVillageFifthHouseButton, .mapVillageFifthHouseComment", new CallbackCollection(this.goToFifthHouse.bind(this)));
    };
    return Village;
}(Place));
//# sourceMappingURL=Village.js.map