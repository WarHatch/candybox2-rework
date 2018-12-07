var QuestLog = /** @class */ (function () {
    // Constructor
    function QuestLog() {
        // Array of messages contained in the quest log
        this.messages = [];
    }
    // Public method
    QuestLog.prototype.addDelimiter = function () {
        this.messages.push(new QuestLogMessage("----------------------------------------------------------------------------------------------------"));
        this.messages.push(new QuestLogMessage(""));
    };
    QuestLog.prototype.addMessage = function (message) {
        // We add the message
        this.messages.push(message);
        // We check the log size
        this.checkLogSize();
    };
    QuestLog.prototype.draw = function (renderArea, pos) {
        // We draw the lines
        renderArea.drawHorizontalLine("-", pos.x, pos.x + 100, pos.y);
        renderArea.drawHorizontalLine("-", pos.x, pos.x + 100, pos.y + 11);
        // We draw the messages
        for (var i = 0; i < this.messages.length; i++) {
            this.messages[i].draw(renderArea, new Pos(pos.x, 1 + pos.y + this.messages.length - 1 - i), 100);
        }
    };
    // Private methods
    QuestLog.prototype.checkLogSize = function () {
        if (this.messages.length > 10) {
            this.messages.splice(0, this.messages.length - 10);
        }
    };
    return QuestLog;
}());
//# sourceMappingURL=QuestLog.js.map