var StatusBarTab = /** @class */ (function () {
    // Constructor
    function StatusBarTab(statusBar, type, xPos, text1, text2, text3, tabIndexWhenSelected, callbackCollectionWhenSelected) {
        if (tabIndexWhenSelected === void 0) { tabIndexWhenSelected = -1; }
        if (callbackCollectionWhenSelected === void 0) { callbackCollectionWhenSelected = new CallbackCollection(); }
        // Set the status bar
        this.statusBar = statusBar;
        // Set teh type
        this.type = type;
        // Set xPos
        this.xPos = xPos;
        // Add the three strings to our 3 strings array
        this.setText(text1, text2, text3);
        // Set the rest
        this.tabIndexWhenSelected = tabIndexWhenSelected;
        this.callbackCollectionWhenSelected = callbackCollectionWhenSelected;
    }
    // Public methods
    StatusBarTab.prototype.clicked = function () {
        this.callbackCollectionWhenSelected.fire();
        this.statusBar.selectTab(this.tabIndexWhenSelected);
    };
    StatusBarTab.prototype.render = function (renderArea, x, y, selected) {
        // We draw the borders
        renderArea.drawVerticalLine("|", x + this.xPos - 1, y, 3);
        renderArea.drawVerticalLine("|", x + this.xPos + this.width, y, 3);
        // We draw the text
        for (var i = 0; i < 3; i++) {
            // We draw the string
            renderArea.drawString(this.text[i], x + this.xPos + 1, y + i);
            // If the tab is selected, we add a special color
            if (selected)
                renderArea.addBackgroundColor(x + this.xPos, x + this.xPos + this.width, y + i, new Color(ColorType.STATUS_BAR_SELECTED_TAB, true));
        }
        // If the tab isn't selected, we add a button to click it !
        if (selected == false) {
            renderArea.addMultipleAsciiButtons("statusBarTabButton" + this.tabIndexWhenSelected, x + this.xPos, x + this.xPos + this.width, y, x + this.xPos, x + this.xPos + this.width, y + 1, x + this.xPos, x + this.xPos + this.width, y + 2);
            renderArea.addLinkCall(".statusBarTabButton" + this.tabIndexWhenSelected, new CallbackCollection(this.clicked.bind(this)));
        }
    };
    // Public getters
    StatusBarTab.prototype.getType = function () {
        return this.type;
    };
    StatusBarTab.prototype.getWidth = function () {
        return this.width;
    };
    // Private methods
    StatusBarTab.prototype.calculateWidth = function () {
        this.width = 0;
        for (var i = 0; i < 3; i++) {
            if (this.text[i].length > this.width)
                this.width = this.text[i].length;
        }
        // We add two ! (because a tab has two spaces on left and right
        this.width += 2;
    };
    StatusBarTab.prototype.setText = function (text1, text2, text3) {
        // We empty the text array
        this.text = [];
        // We add the three strings given in parameters
        this.text.push(text1);
        this.text.push(text2);
        this.text.push(text3);
        // We re-calculate the tab's width
        this.calculateWidth();
    };
    return StatusBarTab;
}());
//# sourceMappingURL=StatusBarTab.js.map