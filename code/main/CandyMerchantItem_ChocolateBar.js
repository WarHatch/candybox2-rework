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
var CandyMerchantItem_ChocolateBar = /** @class */ (function (_super) {
    __extends(CandyMerchantItem_ChocolateBar, _super);
    function CandyMerchantItem_ChocolateBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // When we buy, we get one chocolate bar
    CandyMerchantItem_ChocolateBar.prototype.buy = function () {
        _super.prototype.buy.call(this);
        this.getGame().getChocolateBars().add(1);
    };
    return CandyMerchantItem_ChocolateBar;
}(CandyMerchantItem));
//# sourceMappingURL=CandyMerchantItem_ChocolateBar.js.map