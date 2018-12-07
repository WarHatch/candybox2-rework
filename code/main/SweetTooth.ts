///<reference path="EqItem.ts"/>
class SweetTooth extends EqItem {

    //private variables
    private tokensEq = [new Token(TokenType.FIRE, 2, this), new Token(TokenType.PURPLE, 2, this), new Token(TokenType.REGEN, 2, this)];   
   // private player: Player;
    // Constructor
    constructor(player: Player) {
        super("eqItemWeaponSweetTooth",
            "eqItemWeaponSweetToothName",
            "eqItemWeaponSweetToothDescription",
            "eqItems/weapons/sweetTooth");
    }

    // Public getters
    public getQuestEntityWeapon(quest: Quest, player: Player): QuestEntityWeapon {
        var qew: QuestEntityWeapon =
            new QuestEntityWeapon(quest,
                player,
                new Naming("The Legendary Sweet Tooth", "the Sweet Tooth"),
                player.getClassicCollisionBoxCollection(),
                0// the sweet tooth only gives power to those of the sweetest hearts
            );
       // qew.getCloseCombatDelay().setFixedDelay();
        return qew;
    }

    public update(player: Player, quest: Quest): void {
        for (let tokens in this.tokensEq) {
            this.tokensEq[tokens].update(player, quest);
        }
    }
 //   public getPlayer(): Player{
   //     return this.player;
 //   }
}