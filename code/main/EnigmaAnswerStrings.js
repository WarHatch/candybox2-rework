///<reference path="EnigmaAnswer.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EnigmaAnswerStrings = /** @class */ (function (_super) {
    __extends(EnigmaAnswerStrings, _super);
    // Constructor
    function EnigmaAnswerStrings(validStrings) {
        var _this = _super.call(this) || this;
        _this.validStrings = validStrings;
        return _this;
    }
    // Public methods
    EnigmaAnswerStrings.prototype.isRight = function (answer) {
        for (var i = 0; i < this.validStrings.length; i++) {
            if (Algo.simplifyString(answer) == this.validStrings[i]) {
                // The answer is correct
                return true;
            }
        }
        // The answer isn't correct
        return false;
    };
    return EnigmaAnswerStrings;
}(EnigmaAnswer));
//# sourceMappingURL=EnigmaAnswerStrings.js.map