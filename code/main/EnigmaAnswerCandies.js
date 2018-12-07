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
var EnigmaAnswerCandies = /** @class */ (function (_super) {
    __extends(EnigmaAnswerCandies, _super);
    // Constructor
    function EnigmaAnswerCandies(game) {
        var _this = _super.call(this) || this;
        _this.game = game;
        return _this;
    }
    // Public methods
    EnigmaAnswerCandies.prototype.isRight = function (answer) {
        // If the answer is the current number of candies we possess
        if (Algo.simplifyString(answer) == this.game.getCandies().getCurrent().toString() ||
            Algo.simplifyString(answer) == (this.game.getCandies().getCurrent() + 1).toString() ||
            Algo.simplifyString(answer) == (this.game.getCandies().getCurrent() + 2).toString() ||
            Algo.simplifyString(answer) == (this.game.getCandies().getCurrent() + 3).toString() ||
            Algo.simplifyString(answer) == (this.game.getCandies().getCurrent() - 1).toString() ||
            Algo.simplifyString(answer) == (this.game.getCandies().getCurrent() - 2).toString() ||
            Algo.simplifyString(answer) == (this.game.getCandies().getCurrent() - 3).toString())
            return true;
        // The answer isn't correct
        return false;
    };
    return EnigmaAnswerCandies;
}(EnigmaAnswer));
//# sourceMappingURL=EnigmaAnswerCandies.js.map