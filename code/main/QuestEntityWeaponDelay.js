var QuestEntityWeaponDelay = /** @class */ (function () {
    // Constructor
    function QuestEntityWeaponDelay() {
        // By default, the type is FIXED and the maxDelay is 0
        this.type = QuestEntityWeaponDelayType.FIXED;
        this.currentDelay = 0;
        this.maxDelay = 0;
    }
    // Public methods
    QuestEntityWeaponDelay.prototype.getText = function () {
        // Create the delay var
        var delay;
        // Set the delay we should use
        if (this.type == QuestEntityWeaponDelayType.BETWEEN)
            delay = Math.floor(this.minBetweenDelay + (this.maxBetweenDelay - this.minBetweenDelay) / 2);
        else
            delay = this.maxDelay;
        // Return the text depending on this delay
        //TODO:FIX FEEDBACK BASED ON INTERGERS
        switch (delay) {
            case 0: return "incredibly fast";
            case 1: return "very fast";
            case 2: return "fast";
            case 3: return "rather fast";
            case 4: return "medium speed";
            case 5: return "rather slow";
            case 6:
            case 7: return "slow";
            case 8:
            case 9: return "very slow";
            case 10:
            case 11:
            case 12:
            case 13:
            case 14: return "incredibly slow";
            default: return "couldn't be slower";
        }
    };
    QuestEntityWeaponDelay.prototype.tryToAttack = function () {
        // We increase the current delay
        this.currentDelay++;
        switch (this.type) {
            case QuestEntityWeaponDelayType.FIXED:
                // If it's time to attack
                if (this.currentDelay > this.maxDelay) {
                    this.currentDelay = 0;
                    return true;
                }
                break;
            case QuestEntityWeaponDelayType.BETWEEN:
                // If it's time to attack
                if (this.currentDelay > this.maxDelay) {
                    this.currentDelay = 0;
                    this.chooseBetweenDelay();
                    return true;
                }
                break;
            case QuestEntityWeaponDelayType.ONCE_THEN_WAIT:
                // If it's time to attack
                if (this.currentDelay > this.maxDelay) {
                    return true;
                }
                break;
        }
        return false;
    };
    QuestEntityWeaponDelay.prototype.setBetweenDelay = function (minBetweenDelay, maxBetweenDelay, currentDelay) {
        if (currentDelay === void 0) { currentDelay = 0; }
        this.type = QuestEntityWeaponDelayType.BETWEEN;
        this.minBetweenDelay = minBetweenDelay;
        this.maxBetweenDelay = maxBetweenDelay;
        this.chooseBetweenDelay();
    };
    QuestEntityWeaponDelay.prototype.setFixedDelay = function (maxDelay, currentDelay) {
        if (maxDelay === void 0) { maxDelay = 0; }
        if (currentDelay === void 0) { currentDelay = 0; }
        this.type = QuestEntityWeaponDelayType.FIXED;
        this.maxDelay = maxDelay;
        this.currentDelay = currentDelay;
    };
    QuestEntityWeaponDelay.prototype.setOnceThenWaitDelay = function (maxDelay, currentDelay) {
        if (maxDelay === void 0) { maxDelay = 0; }
        if (currentDelay === void 0) { currentDelay = 0; }
        this.type = QuestEntityWeaponDelayType.ONCE_THEN_WAIT;
        this.maxDelay = maxDelay;
        this.currentDelay = currentDelay;
    };
    QuestEntityWeaponDelay.prototype.theWeaponAttacked = function () {
        if (this.type == QuestEntityWeaponDelayType.ONCE_THEN_WAIT)
            this.currentDelay = 0;
    };
    // Private methods
    QuestEntityWeaponDelay.prototype.chooseBetweenDelay = function () {
        this.maxDelay = Random.between(this.minBetweenDelay, this.maxBetweenDelay);
    };
    return QuestEntityWeaponDelay;
}());
//# sourceMappingURL=QuestEntityWeaponDelay.js.map