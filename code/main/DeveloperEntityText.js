var DeveloperEntityText = /** @class */ (function () {
    // Constructor
    function DeveloperEntityText(damage, textPos, timeToLive, text) {
        // Set from parameters
        this.damage = damage;
        this.text = text;
        this.textPos = textPos;
        this.timeToLive = timeToLive;
        // Set the default x position
        this.xPos = 0;
    }
    // Public methods
    DeveloperEntityText.prototype.update = function (dev) {
        // Iterate over strings
        for (var i = 0; i < this.text.length; i++) {
            // If there's a character at the current xPos of this string
            if (this.xPos < this.text[i].length && this.text[i][this.xPos] != " ") {
                // Add a magic ball, depending on the character
                switch (this.text[i][this.xPos]) {
                    case "B":
                        dev.addMagicBall(this.textPos.plus(new Pos(this.xPos, i)), this.damage, this.timeToLive - this.xPos, ColorType.DEVELOPER_BLUE);
                        break;
                    case "Y":
                        dev.addMagicBall(this.textPos.plus(new Pos(this.xPos, i)), this.damage, this.timeToLive - this.xPos, ColorType.DEVELOPER_YELLOW);
                        break;
                    case "O":
                        dev.addMagicBall(this.textPos.plus(new Pos(this.xPos, i)), this.damage, this.timeToLive - this.xPos, ColorType.DEVELOPER_ORANGE);
                        break;
                }
            }
        }
        // Increase xPos
        this.xPos += 1;
    };
    return DeveloperEntityText;
}());
//# sourceMappingURL=DeveloperEntityText.js.map