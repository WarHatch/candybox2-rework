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
var RocketBoots = /** @class */ (function (_super) {
    __extends(RocketBoots, _super);
    // Constructor
    function RocketBoots() {
        return _super.call(this, "eqItemBootsRocketBoots", "eqItemBootsRocketBootsName", "eqItemBootsRocketBootsDescription", "eqItems/boots/rocketBoots") || this;
    }
    // Special ability
    RocketBoots.prototype.getSpecialAbility = function () {
        return "Jump in mid-air without limit (rocket boots).";
    };
    return RocketBoots;
}(EqItem));
//# sourceMappingURL=RocketBoots.js.map