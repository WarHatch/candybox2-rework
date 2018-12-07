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
///<reference path="EqItem.ts"/>
var SweetTooth = /** @class */ (function (_super) {
    __extends(SweetTooth, _super);
    // private player: Player;
    // Constructor
    function SweetTooth(player) {
        var _this = _super.call(this, "eqItemWeaponSweetTooth", "eqItemWeaponSweetToothName", "eqItemWeaponSweetToothDescription", "eqItems/weapons/sweetTooth") || this;
        //private variables
        _this.tokensEq = [new Token(TokenType.FIRE, 2, _this), new Token(TokenType.PURPLE, 2, _this), new Token(TokenType.REGEN, 2, _this)];
        return _this;
    }
    // Public getters
    SweetTooth.prototype.getQuestEntityWeapon = function (quest, player) {
        var qew = new QuestEntityWeapon(quest, player, new Naming("The Legendary Sweet Tooth", "the Sweet Tooth"), player.getClassicCollisionBoxCollection(), 0 // the sweet tooth only gives power to those of the sweetest hearts
        );
        // qew.getCloseCombatDelay().setFixedDelay();
        return qew;
    };
    SweetTooth.prototype.update = function (player, quest) {
        for (var tokens in this.tokensEq) {
            this.tokensEq[tokens].update(player, quest);
        }
    };
    return SweetTooth;
}(EqItem));
//# sourceMappingURL=SweetTooth.js.map