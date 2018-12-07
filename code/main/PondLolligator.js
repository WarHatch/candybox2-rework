var PondLolligator = /** @class */ (function () {
    // Constructor
    function PondLolligator(pondLines, pondLineIndex) {
        // Out width
        this.width = 13;
        // Set from the parameters
        this.pondLines = pondLines;
        this.pondLineIndex = pondLineIndex;
        // Set the orientation (randomly)
        this.isLeft = Random.flipACoin();
        // Set the position (depending on the orientation)
        if (this.isLeft == false) // If the lolligator is looking right
            this.x = this.pondLines[this.pondLineIndex].getX1();
        else
            this.x = this.pondLines[this.pondLineIndex].getX2() - this.width;
        // At first, we're not fully visible
        this.visibleType = PondLolligatorVisibleType.NOT_FULLY_VISIBLE_YET;
        // Set isUsed for the pond lines we use
        this.setIsUsedForPondLines(true);
    }
    // Public methods
    PondLolligator.prototype.draw = function (renderArea, x, y) {
        renderArea.drawArray(Database.getAscii("places/lollipopFarm/lolligator" + (this.isLeft ? "Left" : "Right") + (this.visibleType == PondLolligatorVisibleType.FULLY_VISIBLE ? "Full" : "Top")), x + this.x, y + this.pondLineIndex);
    };
    PondLolligator.prototype.move = function () {
        // If the lolligator is facing left, then it goes to the left
        if (this.isLeft) {
            this.x -= 1;
            // If we're not fully visible but we should be
            if (this.visibleType == PondLolligatorVisibleType.NOT_FULLY_VISIBLE_YET && this.x + this.width < this.pondLines[this.pondLineIndex].getX2() - 2 && Random.oneChanceOutOf(5))
                this.visibleType = PondLolligatorVisibleType.FULLY_VISIBLE;
            else if (this.visibleType == PondLolligatorVisibleType.FULLY_VISIBLE && (this.x < this.pondLines[this.pondLineIndex].getX1() + 2 || Random.oneChanceOutOf(2)))
                this.visibleType = PondLolligatorVisibleType.NOT_FULLY_VISIBLE_ANYMORE;
        }
        // Else it goes to the right
        else {
            this.x += 1;
            // If we're not fully visible but we should be
            if (this.visibleType == PondLolligatorVisibleType.NOT_FULLY_VISIBLE_YET && this.x > this.pondLines[this.pondLineIndex].getX1() + 2 && Random.oneChanceOutOf(5))
                this.visibleType = PondLolligatorVisibleType.FULLY_VISIBLE;
            else if (this.visibleType == PondLolligatorVisibleType.FULLY_VISIBLE && (this.x + this.width > this.pondLines[this.pondLineIndex].getX2() - 2 || Random.oneChanceOutOf(2)))
                this.visibleType = PondLolligatorVisibleType.NOT_FULLY_VISIBLE_ANYMORE;
        }
    };
    // Called to know if the lolligator should be deleted or not
    PondLolligator.prototype.shouldBeDeleted = function () {
        // It depends on the orientation
        if (this.isLeft == false) {
            // If we're too much on the right, return true
            if (this.x + this.width > this.pondLines[this.pondLineIndex].getX2())
                return true;
            return false;
        }
        else {
            // If we're too much on the left, return true
            if (this.x < this.pondLines[this.pondLineIndex].getX1())
                return true;
            return false;
        }
    };
    // Called just before the lolligator is deleted
    PondLolligator.prototype.willBeDeleted = function () {
        this.setIsUsedForPondLines(false);
    };
    // Private setters
    PondLolligator.prototype.setIsUsedForPondLines = function (isUsed) {
        // Set for the line of the lolligator
        this.pondLines[this.pondLineIndex].setIsUsed(isUsed);
        // Set for the line above if there's a line above
        if (this.pondLineIndex > 0)
            this.pondLines[this.pondLineIndex - 1].setIsUsed(isUsed);
    };
    return PondLolligator;
}());
//# sourceMappingURL=PondLolligator.js.map