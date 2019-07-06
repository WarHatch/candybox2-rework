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
//The purpose of this class is to allow for all QEW functions while also having dynamic stats
var SweetToothQEW = /** @class */ (function (_super) {
    __extends(SweetToothQEW, _super);
    function SweetToothQEW(quest, questEntity, naming, cbc, damage, sweetTooth) {
        if (cbc === void 0) { cbc = new CollisionBoxCollection(); }
        if (damage === void 0) { damage = 0; }
        var _this = _super.call(this, quest, questEntity, naming, cbc, damage) || this;
        _this.sweetTooth = sweetTooth;
        _this.setBaseDamage();
        _this.setTokenDamage();
        _this.setSpeed();
        return _this;
    }
    SweetToothQEW.prototype.setTokenDamage = function () {
        var tokensEq = this.sweetTooth.getTokens();
        var power = 0;
        for (var token in tokensEq) {
            if (tokensEq[token].getType() == TokenType.STRENGTH) {
                power += tokensEq[token].getPower();
            }
        }
        this.damage = this.baseDamage + (this.baseDamage * (power / 10));
    };
    SweetToothQEW.prototype.setBaseDamage = function () {
        this.baseDamage = (this.questEntity.getHp() / 200);
    };
    SweetToothQEW.prototype.setSpeed = function () {
        var tokensEq = this.sweetTooth.getTokens();
        var hp = this.questEntity.getHp();
        var power = 0;
        for (var token in tokensEq) {
            if (tokensEq[token].getType() == TokenType.SPEED) {
                power += tokensEq[token].getPower();
            }
        }
        //If theres a token, you get a nice fixed delay with power on your side
        if (power > 0) {
            power = power + hp;
            if (power > 1500)
                this.closeCombatDelay.setFixedDelay(Math.random() * 3);
            else {
                this.closeCombatDelay.setFixedDelay(Math.random() * 4);
            }
        }
        else {
            power = power + hp;
            if (hp >= 200) {
                this.closeCombatDelay.setBetweenDelay(0, Math.random() * 6);
            }
            else {
                this.closeCombatDelay.setOnceThenWaitDelay(Math.random() * 6);
            }
        }
        //this.closeCombatDelay.
    };
    return SweetToothQEW;
}(QuestEntityWeapon));
/*
    //This is exclusively for sweet tooths dynamic damage
           //     this.damage = (this.damage + (this.damage * (power / 10)));
        }
    }

        
*/ 
//# sourceMappingURL=SweetToothQEW.js.map