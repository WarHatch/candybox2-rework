var CallbackCollection = /** @class */ (function () {
    // Constructor
    function CallbackCollection() {
        var callbacks = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            callbacks[_i] = arguments[_i];
        }
        this.callbacks = []; // Array of functions returning void
        this.callbacks = callbacks;
    }
    // Public methods
    CallbackCollection.prototype.addCallback = function (callback) {
        this.callbacks.push(callback);
        return this;
    };
    CallbackCollection.prototype.fire = function () {
        for (var i = 0; i < this.callbacks.length; i++) {
            this.callbacks[i]();
        }
    };
    CallbackCollection.prototype.reset = function () {
        this.callbacks = [];
    };
    return CallbackCollection;
}());
//# sourceMappingURL=CallbackCollection.js.map