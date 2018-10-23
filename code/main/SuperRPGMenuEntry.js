var SuperRPGMenuEntry = /** @class */ (function () {
    // Constructor
    function SuperRPGMenuEntry(text, callbackCollection) {
        this.text = text;
        this.callbackCollection = callbackCollection;
    }
    // Public methods
    SuperRPGMenuEntry.prototype.draw = function (renderArea, x, y, selected, width) {
        // Create a var which will contain the text to draw
        var textToDraw;
        // Set the text to draw
        if (selected)
            textToDraw = "> " + this.text + " <";
        else
            textToDraw = this.text;
        // Draw the text to draw
        renderArea.drawString(textToDraw, x + Math.floor((width - textToDraw.length) / 2), y);
    };
    // Public getters
    SuperRPGMenuEntry.prototype.getCallbackCollection = function () {
        return this.callbackCollection;
    };
    return SuperRPGMenuEntry;
}());
//# sourceMappingURL=SuperRPGMenuEntry.js.map