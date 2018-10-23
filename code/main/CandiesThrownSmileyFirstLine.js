///<reference path="CandiesThrownSmiley.ts"/>
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
var CandiesThrownSmileyFirstLine = /** @class */ (function (_super) {
    __extends(CandiesThrownSmileyFirstLine, _super);
    // Constructor
    function CandiesThrownSmileyFirstLine(line) {
        var _this = _super.call(this) || this;
        _this.line = line;
        return _this;
    }
    // draw()
    CandiesThrownSmileyFirstLine.prototype.draw = function (renderArea, x, y, base) {
        renderArea.drawString(base + this.line, x, y);
        return 0;
    };
    return CandiesThrownSmileyFirstLine;
}(CandiesThrownSmiley));
//# sourceMappingURL=CandiesThrownSmileyFirstLine.js.map