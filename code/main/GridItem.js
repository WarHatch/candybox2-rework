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
var GridItem = /** @class */ (function (_super) {
    __extends(GridItem, _super);
    // Constructor
    function GridItem(savingName, databaseName, databaseDescriptionName, ascii, position) {
        var _this = _super.call(this, savingName, databaseName, databaseDescriptionName, ascii) || this;
        _this.position = position;
        return _this;
    }
    // Public methods
    GridItem.prototype.update = function (player, quest) {
    };
    // Public getters
    GridItem.prototype.getPosition = function () {
        return this.position;
    };
    return GridItem;
}(Item));
//# sourceMappingURL=GridItem.js.map