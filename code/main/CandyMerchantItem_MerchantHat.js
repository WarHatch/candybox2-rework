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
var CandyMerchantItem_MerchantHat = /** @class */ (function (_super) {
    __extends(CandyMerchantItem_MerchantHat, _super);
    function CandyMerchantItem_MerchantHat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // When we buy, we get the merchant hat
    CandyMerchantItem_MerchantHat.prototype.buy = function () {
        _super.prototype.buy.call(this);
        this.getGame().gainItem("eqItemHatMerchantHat");
    };
    // The item can't be clicked if the inventory isn't shown yet
    CandyMerchantItem_MerchantHat.prototype.canBeClicked = function () {
        if (_super.prototype.canBeClicked.call(this) == false)
            return false;
        if (Saving.loadBool("statusBarUnlockedInventory") == false)
            return false;
        return true;
    };
    return CandyMerchantItem_MerchantHat;
}(CandyMerchantItem));
//# sourceMappingURL=CandyMerchantItem_MerchantHat.js.map