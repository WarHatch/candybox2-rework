var QuestEntityAnimation = /** @class */ (function () {
    // Constructor
    function QuestEntityAnimation(intervalTime, currentTime, currentAsciiIndex) {
        var asciiNames = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            asciiNames[_i - 3] = arguments[_i];
        }
        this.intervalTime = intervalTime;
        this.currentTime = currentTime;
        this.currentAsciiIndex = currentAsciiIndex;
        this.asciiNames = asciiNames;
    }
    // Public methods
    QuestEntityAnimation.prototype.draw = function (renderArea) {
        renderArea.drawArray(Database.getAscii(this.asciiNames[this.currentAsciiIndex]));
    };
    QuestEntityAnimation.prototype.shouldUpdateRenderAreaAtThisFrame = function () {
        return (this.currentTime == this.intervalTime);
    };
    QuestEntityAnimation.prototype.update = function () {
        this.currentTime += 1;
        if (this.currentTime > this.intervalTime) {
            this.currentTime = 0;
            this.currentAsciiIndex += 1;
            if (this.currentAsciiIndex >= this.asciiNames.length)
                this.currentAsciiIndex = 0;
        }
    };
    // Public getters
    QuestEntityAnimation.prototype.getCurrentAsciiIndex = function () {
        return this.currentAsciiIndex;
    };
    return QuestEntityAnimation;
}());
//# sourceMappingURL=QuestEntityAnimation.js.map