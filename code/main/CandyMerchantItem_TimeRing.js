///<reference path="CandyMerchantItem.ts"/>
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
var CandyMerchantItem_TimeRing = /** @class */ (function (_super) {
    __extends(CandyMerchantItem_TimeRing, _super);
    function CandyMerchantItem_TimeRing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // When we buy, we get the time ring
    CandyMerchantItem_TimeRing.prototype.buy = function () {
        _super.prototype.buy.call(this);
        this.getGame().gainItem("gridItemPossessedTimeRing");
    };
    // The item can't be shown if the inventory isn't shown yet
    CandyMerchantItem_TimeRing.prototype.canBeShown = function () {
        if (_super.prototype.canBeShown.call(this) == false)
            return false;
        if (Saving.loadBool("statusBarUnlockedInventory") == false)
            return false;
        return true;
    };
    return CandyMerchantItem_TimeRing;
}(CandyMerchantItem));
//# sourceMappingURL=CandyMerchantItem_TimeRing.js.map