///<reference path="QuestEntityWeapon.ts"/>


//The purpose of this class is to allow for all QEW functions while also having dynamic stats
class SweetToothQEW extends QuestEntityWeapon{

    //Private Variables
    private sweetTooth: SweetTooth;
    private baseDamage: number;

    constructor(quest: Quest, questEntity: QuestEntity, naming: Naming, cbc: CollisionBoxCollection = new CollisionBoxCollection(), damage: number = 0,
        sweetTooth: SweetTooth) {
        super(quest, questEntity, naming, cbc, damage);

        this.sweetTooth = sweetTooth;
        this.setBaseDamage();
        this.setTokenDamage();
        this.setSpeed();
    }

    public setTokenDamage(): void {
        var tokensEq = this.sweetTooth.getTokens();
        var power = 0;
        for (let token in tokensEq) {
            if (tokensEq[token].getType() == TokenType.STRENGTH) {
                power += tokensEq[token].getPower();
            }
        }
        this.damage = this.baseDamage + (this.baseDamage * (power / 10));
    }

    public setBaseDamage(): void {
        this.baseDamage = (this.questEntity.getHp() / 200);
    }

    public setSpeed(): void {
        var tokensEq = this.sweetTooth.getTokens();
        var hp = this.questEntity.getHp();
        var power = 0;
        for (let token in tokensEq) {
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
    }
}

/*        
    //This is exclusively for sweet tooths dynamic damage
           //     this.damage = (this.damage + (this.damage * (power / 10)));
        }
    }

        
*/