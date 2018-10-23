var Smoke = /** @class */ (function () {
    // Constructor
    function Smoke(x, y, width, height, minWaitingTime, maxWaitingTime) {
        if (minWaitingTime === void 0) { minWaitingTime = 0; }
        if (maxWaitingTime === void 0) { maxWaitingTime = 0; }
        // Position
        this.x = x;
        this.y = y;
        // Size
        this.width = width;
        this.height = height;
        // Waiting time
        this.minWaitingTime = minWaitingTime;
        this.maxWaitingTime = maxWaitingTime;
        // Init the smoke
        this.init(false);
    }
    // Public methods
    Smoke.prototype.draw = function (renderArea) {
        // If we're not waiting, we draw a smoke
        if (this.weAreWaiting == false) {
            if (this.inverted == false) {
                renderArea.drawString("(", this.x + this.xGap, this.y + this.yGap);
                renderArea.drawString(")", this.x + this.xGap + 1, this.y + this.yGap - 1);
            }
            else {
                renderArea.drawString("(", this.x + this.xGap, this.y + this.yGap - 1);
                renderArea.drawString(")", this.x + this.xGap + 1, this.y + this.yGap);
            }
        }
    };
    Smoke.prototype.move = function () {
        if (this.weAreWaiting == false) {
            // We make the smoke going up
            this.yGap--;
            // If it's too high, we call init()
            if (-this.yGap >= this.height) {
                this.init();
            }
            // Else we invert it
            else {
                this.inverted = !this.inverted;
            }
        }
        else {
            this.currentWaitingTime++;
            if (this.currentWaitingTime > this.chosenWaitingTime)
                this.weAreWaiting = false;
        }
    };
    // Private methods
    Smoke.prototype.init = function (weMustBeWaitingAtFirst) {
        if (weMustBeWaitingAtFirst === void 0) { weMustBeWaitingAtFirst = true; }
        // Inverted
        this.inverted = Random.flipACoin();
        // Step
        this.xGap = Random.upTo(this.width - 1);
        // At first we're not waiting
        if (Random.flipACoin() && weMustBeWaitingAtFirst == false) {
            // Y position
            this.yGap = -Random.upTo(this.height - 1);
            // Waiting stuff
            this.weAreWaiting = false;
        }
        // At first we are waiting
        else {
            // Y position
            this.yGap = 0;
            // Waiting stuff
            this.weAreWaiting = true;
            this.chosenWaitingTime = Random.between(this.minWaitingTime, this.maxWaitingTime); // We choose the waiting time
            this.currentWaitingTime = 0; // We begin at 0
        }
    };
    return Smoke;
}());
//# sourceMappingURL=Smoke.js.map