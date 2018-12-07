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
var SuperRPGMenu_Ingame = /** @class */ (function (_super) {
    __extends(SuperRPGMenu_Ingame, _super);
    function SuperRPGMenu_Ingame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Public methods
    SuperRPGMenu_Ingame.prototype.draw = function (renderArea) {
        // First status bar line
        // Floor
        renderArea.drawString("Floor " + this.getSuperRPG().getFloor(), 0, 0);
        // Separation bar
        renderArea.drawString("|", 10, 0);
        // Shop / 1st monster / etc
        switch (this.getSuperRPG().getFloorStep()) {
            case SuperRPGFloorStep.SHOP:
                renderArea.drawString("shop", 15, 0);
                break;
            case SuperRPGFloorStep.MONSTER1:
                renderArea.drawString("1st monster", 12, 0);
                break;
            case SuperRPGFloorStep.MONSTER2:
                renderArea.drawString("2nd monster", 12, 0);
                break;
            case SuperRPGFloorStep.MONSTER3:
                renderArea.drawString("3rd monster", 12, 0);
                break;
        }
        // Separation bar
        renderArea.drawString("|", 24, 0);
        // Hp and max hp
        renderArea.drawString("HP " + this.getSuperRPG().getHp().toString() + "/" + this.getSuperRPG().getMaxHp().toString(), 26, 0);
        // Separation bar
        renderArea.drawString("|", 39, 0);
        // Coins
        renderArea.drawString("Coins " + this.getSuperRPG().getCoins(), 41, 0);
        // Second status bar line
        // ATK + weapon + damage
        renderArea.drawString("ATK " + this.getSuperRPG().getWeapon() + " (" + this.getSuperRPG().getDamage() + ")", 0, 1);
        // Separation bar
        renderArea.drawString("|", 24, 1);
        // DEF + defense item + defense
        renderArea.drawString("DEF " + this.getSuperRPG().getDefenseItem() + " (" + this.getSuperRPG().getDefense() + ")", 26, 1);
        // Call the mother class draw method
        _super.prototype.draw.call(this, renderArea);
    };
    return SuperRPGMenu_Ingame;
}(SuperRPGMenu));
//# sourceMappingURL=SuperRPGMenu_Ingame.js.map