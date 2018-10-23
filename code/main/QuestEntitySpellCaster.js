var QuestEntitySpellCaster = /** @class */ (function () {
    // Constructor
    function QuestEntitySpellCaster(callbackCollection) {
        // The delay
        this.delay = new QuestEntityWeaponDelay();
        this.callbackCollection = callbackCollection;
    }
    // Public methods
    QuestEntitySpellCaster.prototype.tryToCast = function () {
        if (this.delay.tryToAttack()) {
            this.callbackCollection.fire();
        }
    };
    // Public getters
    QuestEntitySpellCaster.prototype.getDelay = function () {
        return this.delay;
    };
    return QuestEntitySpellCaster;
}());
//# sourceMappingURL=QuestEntitySpellCaster.js.map