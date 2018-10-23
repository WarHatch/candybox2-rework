///<reference path="CastleRoom.ts"/>
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
Saving.registerBool("castleRoom2LitFire", false);
Saving.registerBool("castleRoom2TookObject", false);
var CastleRoom2 = /** @class */ (function (_super) {
    __extends(CastleRoom2, _super);
    function CastleRoom2(game) {
        var _this = _super.call(this, game) || this;
        // The render area
        _this.renderArea = new RenderArea();
        // The smokes
        _this.smokes = [];
        // If needed, we add smokes
        if (Saving.loadBool("castleRoom2LitFire") == true) {
            _this.addSmokes();
        }
        _this.renderArea.resize(100, 30);
        _this.update();
        return _this;
    }
    // getRenderArea()
    CastleRoom2.prototype.getRenderArea = function () {
        return this.renderArea;
    };
    CastleRoom2.prototype.willBeDisplayed = function () {
        this.getGame().getOneSecondCallbackCollection().addCallback(this.actionSmokes.bind(this));
    };
    // update()
    CastleRoom2.prototype.update = function () {
        // Reset the area
        this.renderArea.resetAllButSize();
        // Add the button to go back to the castle
        this.addBackToTheCastleButton(this.renderArea, "castleRoom2BackToTheCastleButton");
        // If the fire isn't lit yet
        if (Saving.loadBool("castleRoom2LitFire") == false) {
            // Draw the dark color
            this.drawDark(0, 3, 100, 27);
            // Add the button on the fire
            this.drawFireButton(42, 20);
        }
        // Else, the fire is lit
        else {
            // We draw the fire
            this.drawFire(42, 20);
            // If we didn't take the object yet
            if (Saving.loadBool("castleRoom2TookObject") == false) {
                this.drawObject(21, 12);
            }
        }
    };
    // Private methods
    CastleRoom2.prototype.actionSmokes = function () {
        // If there's at least one smoke
        if (this.smokes.length > 0) {
            // We make the smokes move
            for (var i = 0; i < this.smokes.length; i++) {
                this.smokes[i].move();
            }
            // We update on the page
            this.update();
            this.getGame().updatePlace();
        }
    };
    CastleRoom2.prototype.addSmokes = function () {
        this.smokes.push(new Smoke(45, Random.between(20, 21), 11, Random.between(3, 7), 0, 5));
        this.smokes.push(new Smoke(45, Random.between(20, 21), 11, Random.between(2, 6), 0, 5));
        this.smokes.push(new Smoke(45, Random.between(20, 21), 11, Random.between(2, 6), 0, 5));
        this.smokes.push(new Smoke(45, Random.between(20, 21), 11, Random.between(2, 6), 0, 5));
        this.smokes.push(new Smoke(45, Random.between(20, 21), 11, Random.between(2, 6), 0, 5));
    };
    CastleRoom2.prototype.drawDark = function (x, y, width, height) {
        for (var i = y; i < y + height; i++) {
            this.renderArea.addBackgroundColor(x, x + width, i, new Color(ColorType.CASTLE_DARK_ROOM, true));
        }
    };
    CastleRoom2.prototype.drawFire = function (x, y) {
        // Draw the fire ascii art
        this.renderArea.drawArray(Database.getAscii("places/castle/room2/fire"), x, y);
        // Draw the smokes
        for (var i = 0; i < this.smokes.length; i++) {
            this.smokes[i].draw(this.renderArea);
        }
    };
    CastleRoom2.prototype.drawFireButton = function (x, y) {
        // Add the button
        this.renderArea.addMultipleAsciiButtons("castleRoom2LightFireButton", x, x + 16, y, x, x + 16, y + 1, x, x + 16, y + 2, x, x + 16, y + 3, x, x + 16, y + 4, x, x + 16, y + 5);
        // Add the link
        this.renderArea.addLinkCall(".castleRoom2LightFireButton", new CallbackCollection(this.lightFire.bind(this)));
    };
    CastleRoom2.prototype.drawObject = function (x, y) {
        // Draw the ascii art
        this.renderArea.drawArray(Database.getAscii("places/castle/room2/pitchfork"), x, y);
        // Add the button
        this.renderArea.addMultipleAsciiButtons("castleRoom2TakeObjectButton", x + 6, x + 12, y, x + 5, x + 11, y + 1, x + 4, x + 10, y + 2, x + 3, x + 9, y + 3, x + 2, x + 8, y + 4, x + 1, x + 7, y + 5, x + 1, x + 5, y + 6, x, x + 4, y + 7);
        // Add the link
        this.renderArea.addLinkCall(".castleRoom2TakeObjectButton", new CallbackCollection(this.takeObject.bind(this)));
    };
    CastleRoom2.prototype.lightFire = function () {
        // Change the bool
        Saving.saveBool("castleRoom2LitFire", true);
        // Add the smokes
        this.addSmokes();
        // Update
        this.update();
        this.getGame().updatePlace();
    };
    CastleRoom2.prototype.takeObject = function () {
        // Set the bool
        Saving.saveBool("castleRoom2TookObject", true);
        // Take it
        this.getGame().gainItem("gridItemPossessedPitchfork");
        // Re-calc the farm production
        this.getGame().calcLollipopFarmProduction();
        // Update
        this.update();
        this.getGame().updatePlace();
    };
    return CastleRoom2;
}(CastleRoom));
//# sourceMappingURL=CastleRoom2.js.map