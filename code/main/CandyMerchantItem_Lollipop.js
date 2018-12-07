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
var CandyMerchantItem_Lollipop = /** @class */ (function (_super) {
    __extends(CandyMerchantItem_Lollipop, _super);
    function CandyMerchantItem_Lollipop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // When we buy, we get one lollipop
    CandyMerchantItem_Lollipop.prototype.buy = function () {
        _super.prototype.buy.call(this);
        this.getGame().getLollipops().add(1);
    };
    return CandyMerchantItem_Lollipop;
}(CandyMerchantItem));
//# sourceMappingURL=CandyMerchantItem_Lollipop.js.map