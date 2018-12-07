var SuperRPGMenu = /** @class */ (function () {
    // Constructor
    function SuperRPGMenu(superRPG, asciiName, currentlySelectedEntryIndex) {
        // Menu entries
        this.entries = [];
        // Set from parameters
        this.superRPG = superRPG;
        this.asciiName = asciiName;
        this.currentlySelectedEntryIndex = currentlySelectedEntryIndex;
    }
    // Public methods
    SuperRPGMenu.prototype.addEntry = function (entry) {
        this.entries.push(entry);
    };
    SuperRPGMenu.prototype.draw = function (renderArea) {
        // Draw the separating line
        renderArea.drawVerticalLine("|", 26, 3, 11);
        // Draw the ascii art on the left
        renderArea.drawArray(Database.getAscii(this.asciiName), 0 + Math.floor((26 - Database.getAsciiWidth(this.asciiName)) / 2), 2 + Math.floor((10 - Database.getAsciiHeight(this.asciiName)) / 2));
        // Draw the entries
        for (var i = 0; i < this.entries.length; i++) {
            this.entries[i].draw(renderArea, 27, 3 + Math.floor((10 - (this.entries.length * 2)) / 2) + i * 2, (this.currentlySelectedEntryIndex == i), 26);
        }
    };
    SuperRPGMenu.prototype.pressedDownButton = function () {
        this.currentlySelectedEntryIndex += 1;
        if (this.currentlySelectedEntryIndex >= this.entries.length)
            this.currentlySelectedEntryIndex = this.entries.length - 1;
    };
    SuperRPGMenu.prototype.pressedSpaceButton = function () {
        this.entries[this.currentlySelectedEntryIndex].getCallbackCollection().fire();
    };
    SuperRPGMenu.prototype.pressedUpButton = function () {
        this.currentlySelectedEntryIndex -= 1;
        if (this.currentlySelectedEntryIndex < 0)
            this.currentlySelectedEntryIndex = 0;
    };
    // Public getters
    SuperRPGMenu.prototype.getSuperRPG = function () {
        return this.superRPG;
    };
    // Public setters
    SuperRPGMenu.prototype.setAsciiName = function (asciiName) {
        this.asciiName = asciiName;
    };
    SuperRPGMenu.prototype.setEntries = function () {
        var entries = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            entries[_i] = arguments[_i];
        }
        this.entries = entries;
    };
    return SuperRPGMenu;
}());
//# sourceMappingURL=SuperRPGMenu.js.map