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
var CandyMerchantItem_LeatherBoots = /** @class */ (function (_super) {
    __extends(CandyMerchantItem_LeatherBoots, _super);
    function CandyMerchantItem_LeatherBoots() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // The item can't be shown if the inventory isn't shown yet
    CandyMerchantItem_LeatherBoots.prototype.canBeShown = function () {
        if (_super.prototype.canBeShown.call(this) == false)
            return false;
        if (Saving.loadBool("statusBarUnlockedInventory") == false)
            return false;
        return true;
    };
    return CandyMerchantItem_LeatherBoots;
}(CandyMerchantItem));
//# sourceMappingURL=CandyMerchantItem_LeatherBoots.js.map