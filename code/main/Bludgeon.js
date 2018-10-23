///<reference path="QuestEntityWeapon.ts"/>
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
var Bludgeon = /** @class */ (function (_super) {
    __extends(Bludgeon, _super);
    function Bludgeon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Public methods
    Bludgeon.prototype.getRealDamage = function () {
        return Random.between(15, 25);
    };
    Bludgeon.prototype.getRealDamageText = function () {
        return "15-25";
    };
    return Bludgeon;
}(QuestEntityWeapon));
//# sourceMappingURL=Bludgeon.js.map