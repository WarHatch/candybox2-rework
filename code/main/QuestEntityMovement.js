var QuestEntityMovement = /** @class */ (function () {
    // Constructor
    function QuestEntityMovement(offset, intervalTime, currentTime) {
        if (offset === void 0) { offset = new Pos(0, 0); }
        if (intervalTime === void 0) { intervalTime = 0; }
        if (currentTime === void 0) { currentTime = 0; }
        // Special bools
        this.gravity = false; // If true, then the entity which has this movement is affected by gravity
        this.wormsLike = false; // If true, then the entity which has this movement will move like a worms (in the Team 17 games) : it can climb steps of one character and don't "fall" if the go down of just one character
        this.offset = offset;
        this.intervalTime = intervalTime;
        this.currentTime = currentTime;
    }
    // Public methods
    QuestEntityMovement.prototype.shouldMoveAtThisFrame = function () {
        return (this.currentTime == this.intervalTime);
    };
    QuestEntityMovement.prototype.update = function () {
        this.currentTime += 1;
        if (this.currentTime > this.intervalTime)
            this.currentTime = 0;
    };
    // Public getters
    QuestEntityMovement.prototype.getCurrentFrameMovement = function () {
        if (this.shouldMoveAtThisFrame())
            return this.offset;
        else
            return new Pos(0, 0);
    };
    QuestEntityMovement.prototype.getGravity = function () {
        return this.gravity;
    };
    QuestEntityMovement.prototype.getOffset = function () {
        return this.offset;
    };
    QuestEntityMovement.prototype.getWormsLike = function () {
        return this.wormsLike;
    };
    // Public setters
    QuestEntityMovement.prototype.setGravity = function (value) {
        this.gravity = value;
    };
    QuestEntityMovement.prototype.setOffset = function (offset) {
        this.offset = offset;
    };
    QuestEntityMovement.prototype.setWormsLike = function (value) {
        this.wormsLike = value;
    };
    return QuestEntityMovement;
}());
//# sourceMappingURL=QuestEntityMovement.js.map