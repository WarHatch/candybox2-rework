///<reference path="Item.ts"/>

class EqItem extends Item{
    // Public methods    
    public update(player: Player, quest: Quest): void{
        
    }
    
    // Public getters
    public getQuestEntityWeapon(quest: Quest, player: Player): QuestEntityWeapon{
        return new QuestEntityWeapon(quest, player, new Naming("???", "???")); 
    }

    //for generic weapon variables
    public getTokens(): void { }
    public setToken(newToken: Token, tokenSpot: number): void { }
}