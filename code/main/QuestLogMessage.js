var QuestLogMessage = /** @class */ (function () {
    // Constructor
    function QuestLogMessage(left, right, bold) {
        if (right === void 0) { right = null; }
        if (bold === void 0) { bold = false; }
        // Strings
        this.left = null;
        this.right = null;
        // Set the parameters
        this.left = left;
        this.right = right;
        this.bold = bold;
        // If the left string is too big
        if (this.left.length > 100 - (this.right != null ? this.right.length : 0)) {
            this.left = this.left.substr(0, 100 - (this.right != null ? this.right.length : 0) - 7) + " (...)";
        }
    }
    // Public methods
    QuestLogMessage.prototype.draw = function (renderArea, pos, width) {
        if (this.left != null) {
            renderArea.drawString(this.left, pos.x, pos.y);
            if (this.bold)
                renderArea.addBold(pos.x, pos.x + this.left.length, pos.y);
        }
        if (this.right != null) {
            renderArea.drawString(this.right, pos.x + width - this.right.length, pos.y);
            if (this.bold)
                renderArea.addBold(pos.x + width - this.right.length, width, pos.y);
        }
    };
    return QuestLogMessage;
}());
//# sourceMappingURL=QuestLogMessage.js.map