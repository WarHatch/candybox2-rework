///<reference path="Item.ts"/>
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
var EqItem = /** @class */ (function (_super) {
    __extends(EqItem, _super);
    function EqItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Public methods    
    EqItem.prototype.update = function (player, quest) {
    };
    // Public getters
    EqItem.prototype.getQuestEntityWeapon = function (quest, player) {
        return new QuestEntityWeapon(quest, player, new Naming("???", "???"));
    };
    EqItem.prototype.getTokens = function () { };
    return EqItem;
}(Item));
//# sourceMappingURL=EqItem.js.map