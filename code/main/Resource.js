///<reference path="CallbackCollection.ts"/>
var Resource = /** @class */ (function () {
    // Constructor
    function Resource(savingPrefix) {
        if (savingPrefix === void 0) { savingPrefix = null; }
        // Attributes
        this.accumulated = 0;
        this.current = 0;
        this.max = 0;
        this.callbackCollection = new CallbackCollection();
        // Set the saving prefix
        this.savingPrefix = savingPrefix;
    }
    // Public methods
    Resource.prototype.add = function (n) {
        // If the operation would leave an < 0 value, we stop
        if (this.current + n < 0)
            return false;
        // If we add a positive value, we also add it to the accumulated
        if (n > 0)
            this.setAccumulated(this.accumulated + n);
        // We add to the current value
        this.setCurrent(this.current + n);
        // We return true
        return true;
    };
    Resource.prototype.load = function () {
        this.setAccumulated(Saving.loadNumber(this.savingPrefix + "Accumulated"));
        this.setCurrent(Saving.loadNumber(this.savingPrefix + "Current"));
        this.setMax(Saving.loadNumber(this.savingPrefix + "Max"));
    };
    Resource.prototype.save = function () {
        Saving.saveNumber(this.savingPrefix + "Accumulated", this.getAccumulated());
        Saving.saveNumber(this.savingPrefix + "Current", this.getCurrent());
        Saving.saveNumber(this.savingPrefix + "Max", this.getMax());
    };
    Resource.prototype.transferTo = function (resource, howMany, ratio) {
        if (howMany === void 0) { howMany = -1; }
        if (ratio === void 0) { ratio = 1; }
        // If howMany is below 0, then we transfer everything
        if (howMany < 0)
            howMany = this.current;
        else {
            // If we don't have enough to transfer, we return false
            if (howMany > this.current)
                return false;
        }
        // We lower our current quantity
        this.add(-howMany);
        // We add to the other resource
        resource.add(howMany * ratio);
        // We return true
        return true;
    };
    // Public getters
    Resource.prototype.getAccumulated = function () {
        return this.accumulated;
    };
    Resource.prototype.getCurrent = function () {
        return this.current;
    };
    Resource.prototype.getCurrentAsString = function () {
        return this.current.toString();
    };
    Resource.prototype.getCallbackCollection = function () {
        return this.callbackCollection;
    };
    Resource.prototype.getMax = function () {
        return this.max;
    };
    // Public setters
    Resource.prototype.setCurrent = function (n) {
        // Set the value
        this.current = n;
        // Check if the max value should change
        if (this.current > this.max)
            this.max = this.current;
        // Fire the callbacks
        this.callbackCollection.fire();
    };
    // Private methods
    Resource.prototype.setAccumulated = function (n) {
        this.accumulated = n;
    };
    Resource.prototype.setMax = function (n) {
        this.max = n;
    };
    return Resource;
}());
//# sourceMappingURL=Resource.js.map