var Place = /** @class */ (function () {
    // Constructor
    function Place(game) {
        this.game = game;
    }
    // Public methods
    Place.prototype.addBackToButton = function (renderArea, callbackCollection, text, translated, otherClass, y, x) {
        if (y === void 0) { y = 0; }
        if (x === void 0) { x = -1; }
        // If the x position is under zero, we set it so that the button will be centered
        if (x < 0) {
            x = renderArea.getWidth() / 2 - text.length / 2;
        }
        renderArea.addAsciiRealButton(text, x, y, otherClass, translated, true);
        renderArea.addLinkCall("." + otherClass, callbackCollection);
    };
    Place.prototype.addBackToMainMapButton = function (renderArea, otherClass, textName) {
        if (textName === void 0) { textName = "buttonBackToTheMap"; }
        this.addBackToButton(renderArea, new CallbackCollection(this.getGame().goToMainMap.bind(this.getGame())), Database.getText(textName), Database.getTranslatedText(textName), otherClass);
    };
    // Public getters
    Place.prototype.getDefaultScroll = function () {
        return 0;
    };
    Place.prototype.getGame = function () {
        return this.game;
    };
    Place.prototype.getGap = function () {
        return 0;
    };
    Place.prototype.getRenderArea = function () {
        return new RenderArea(); // We return a new render area, but this should not happen, since our daughter class should override this function
    };
    Place.prototype.getScrolling = function () {
        return false; // By default, we disable scrolling on the place
    };
    Place.prototype.willBeClosed = function () { };
    Place.prototype.willBeDisplayed = function () { };
    Place.prototype.willStopBeingDisplayed = function () { };
    return Place;
}());
//# sourceMappingURL=Place.js.map