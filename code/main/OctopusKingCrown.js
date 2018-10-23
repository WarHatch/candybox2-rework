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
var OctopusKingCrown = /** @class */ (function (_super) {
    __extends(OctopusKingCrown, _super);
    // Constructor
    function OctopusKingCrown() {
        return _super.call(this, "eqItemHatOctopusKingCrown", "eqItemHatOctopusKingCrownName", "eqItemHatOctopusKingCrownDescription", "eqItems/hats/octopusKingCrown") || this;
    }
    // Special ability
    OctopusKingCrown.prototype.getSpecialAbility = function () {
        return "You are a lot more confident.";
    };
    return OctopusKingCrown;
}(EqItem));
//# sourceMappingURL=OctopusKingCrown.js.map