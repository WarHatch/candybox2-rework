///<reference path="SuperRPGMenu.ts"/>
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
var SuperRPGMenu_Main = /** @class */ (function (_super) {
    __extends(SuperRPGMenu_Main, _super);
    // Constructor
    function SuperRPGMenu_Main(superRPG) {
        var _this = _super.call(this, superRPG, "places/village/thirdHouseGames/SuperRPG/mainMenu", 0) || this;
        _this.addEntry(new SuperRPGMenuEntry("Start", new CallbackCollection(_this.getSuperRPG().startGame.bind(_this.getSuperRPG(), false))));
        if (Saving.loadBool("SuperRPGUnlockedHardmode"))
            _this.addEntry(new SuperRPGMenuEntry("Start (hardmode)", new CallbackCollection(_this.getSuperRPG().startGame.bind(_this.getSuperRPG(), true))));
        _this.addEntry(new SuperRPGMenuEntry("Exit", new CallbackCollection(_this.getSuperRPG().exitGame.bind(_this.getSuperRPG()))));
        return _this;
    }
    // Public methods
    SuperRPGMenu_Main.prototype.draw = function (renderArea) {
        // Draw the "main menu" text
        renderArea.drawString("Main menu", 22, 0);
        // Mother class draw method
        _super.prototype.draw.call(this, renderArea);
    };
    return SuperRPGMenu_Main;
}(SuperRPGMenu));
//# sourceMappingURL=SuperRPGMenu_Main.js.map