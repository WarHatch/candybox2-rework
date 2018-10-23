///<reference path="EqItem.ts"/>
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
var MerchantHat = /** @class */ (function (_super) {
    __extends(MerchantHat, _super);
    // Constructor
    function MerchantHat() {
        return _super.call(this, "eqItemHatMerchantHat", "eqItemHatMerchantHatName", "eqItemHatMerchantHatDescription", "eqItems/hats/merchantHat") || this;
    }
    // Special ability
    MerchantHat.prototype.getSpecialAbility = function () {
        return "Multiplies the number of candies found in quests by 7 (merchant hat).";
    };
    // Candies found * 7
    MerchantHat.prototype.foundCandies = function (player, quest, howMany) {
        return howMany * 7;
    };
    return MerchantHat;
}(EqItem));
//# sourceMappingURL=MerchantHat.js.map