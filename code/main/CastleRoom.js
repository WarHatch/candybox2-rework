///<reference path="Place.ts"/>
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
var CastleRoom = /** @class */ (function (_super) {
    __extends(CastleRoom, _super);
    // Constructor
    function CastleRoom(game) {
        return _super.call(this, game) || this;
    }
    // Special method used to add a button to go back to the castle
    CastleRoom.prototype.addBackToTheCastleButton = function (renderArea, otherClass) {
        this.addBackToButton(renderArea, new CallbackCollection(this.getGame().goToCastle.bind(this.getGame())), Database.getText("buttonBackToTheCastle"), Database.getTranslatedText("buttonBackToTheCastle"), otherClass);
    };
    return CastleRoom;
}(Place));
//# sourceMappingURL=CastleRoom.js.map