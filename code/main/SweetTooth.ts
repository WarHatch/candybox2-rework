///<reference path="EqItem.ts"/>
class SweetTooth extends EqItem {

    //private variables
    private tokensEq = [new Token(), new Token(), new Token()];   
   // private player: Player;
    // Constructor
    constructor() {
        super("eqItemWeaponSweetTooth",
            "eqItemWeaponSweetToothName",
            "eqItemWeaponSweetToothDescription",
            "eqItems/weapons/sweetTooth");
    }

    // Public getters
    public getQuestEntityWeapon(quest: Quest, player: Player): QuestEntityWeapon {
        var qew: SweetToothQEW =
            new SweetToothQEW(quest,
                player,
                new Naming("The Legendary Sweet Tooth", "the Sweet Tooth"),
                player.getClassicCollisionBoxCollection(),
                0,// the sweet tooth only gives power to those of the sweetest hearts
                this
            );
        return qew;
    }

    //update is ran during a quest
    public update(player: Player, quest: Quest): void {
        for (let tokens in this.tokensEq) {
            this.tokensEq[tokens].update(player, quest);
        }
    }


    //setToken will be needed when switching out tokens
    public setToken(newToken: Token, tokenSpot: number): void {
        if (tokenSpot < 3 && tokenSpot > -1)
            this.tokensEq[tokenSpot] = newToken;
    }

    public getTokens(): Token[] {
        return this.tokensEq;
    }

    public printTokens(): string{
        var retVal = "";
        for (let tokens in this.tokensEq) {
            var spot = 1 + Number(tokens);
            retVal += "|SPOT: " + spot + " |TYPE: " + this.tokensEq[tokens].printType() + " |POWER: " + this.tokensEq[tokens].getPower().toString() + "\n";
        }
        return retVal;
    }
}