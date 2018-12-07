var YourselfSentence = /** @class */ (function () {
    // Constructor
    function YourselfSentence(quest, text, isGoingRight, y) {
        // Set from parameters
        this.quest = quest;
        this.text = text;
        this.isGoingRight = isGoingRight;
        // Set the position
        if (this.isGoingRight)
            this.position = new Pos(-this.text.length, y);
        else
            this.position = new Pos(100, y);
    }
    // Public methods
    YourselfSentence.prototype.draw = function (renderArea) {
        renderArea.drawString(this.text, this.quest.getRealQuestPosition().x + this.quest.getGlobalDrawingOffset().x + this.position.x, this.quest.getRealQuestPosition().y + this.quest.getGlobalDrawingOffset().y + this.position.y);
    };
    YourselfSentence.prototype.update = function () {
        if (this.isGoingRight) {
            this.position.x += 1;
            if (this.position.x > 100) // Out of the screen?
                return true; // Delete the sentence
        }
        else {
            this.position.x -= 1;
            if (this.position.x < -this.text.length) // Out of the screen?
                return true; // Delete the sentence
        }
        // We don't delete the sentence : we return false
        return false;
    };
    return YourselfSentence;
}());
//# sourceMappingURL=YourselfSentence.js.map