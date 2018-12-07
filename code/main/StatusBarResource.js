///<reference path="Resource.ts"/>
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
var StatusBarResource = /** @class */ (function (_super) {
    __extends(StatusBarResource, _super);
    // Constructor
    function StatusBarResource(game, savingPrefix) {
        var _this = _super.call(this, savingPrefix) || this;
        _this.game = game;
        return _this;
    }
    // Public setters
    StatusBarResource.prototype.setCurrent = function (n, reCalcPlayerMaxHp) {
        if (reCalcPlayerMaxHp === void 0) { reCalcPlayerMaxHp = false; }
        _super.prototype.setCurrent.call(this, n);
        if (reCalcPlayerMaxHp)
            this.game.getPlayer().reCalcMaxHp();
        else
            this.game.updateStatusBar();
    };
    return StatusBarResource;
}(Resource));
//# sourceMappingURL=StatusBarResource.js.map