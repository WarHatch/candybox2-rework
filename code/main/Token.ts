///<reference path = "Item.ts"/>
class Token extends Item
{
    //Typical variables
    private sweetTooth: SweetTooth;
    private tokenType: TokenType = null;
    private power = 2;
    private tokenName: string;

    //Unique variables
    //TODO make new(?) classes based on token type
    private currentTimer: number = 0;
    private maxTimer: number;

    constructor(type = null) {
        super(
            "token",//savingName
            "tokenName",//databaseName
            "tokenDescription",//databaseDescriptionName 
            "gridItems/token"//ascii 
        );
        if (type == null) {
            this.tokenType = Math.floor(Math.random() * 6);
        }
        else {
            this.tokenType = type;
        }
        if (type == TokenType.NONE) {
            this.power = 0;
        }
        else {        
            this.power = Math.floor((Math.random() * 10) + 1);
        }
        this.setName();
        this.maxTimer = 12 - this.power;
    }

    public update(player: Player, quest: Quest): void {
        switch (this.tokenType) {
            case TokenType.REGEN: {
                player.heal(this.power / 5);
                break;
            }
            case TokenType.FIRE: {
                 this.currentTimer += 1;

                // If the timer is ready
                if (this.currentTimer >= this.maxTimer) {
                    // Cast the fireball
                    this.castFireball(player, quest);
                    // Reset the timer
                    this.currentTimer = 0;
                }
                break;
            }
            case TokenType.PURPLE: {
                if (this.currentTimer < this.maxTimer) this.currentTimer += 1;
                else {
                    this.currentTimer = 0;
                    var ent: QuestEntity = this.getRandomEnemy(player, quest);
                    if (ent != null) this.castPurpleBall(player, quest, ent);
                }
            }
            case TokenType.NONE: {
                    break;
            }
        }
    }


    //public getters
    public getType(): TokenType {
        return this.tokenType;
    }
    public getPower(): number {
        return this.power;
    }
    public getTokenName(): string {
        return this.tokenName;
    }


    //public setters
    public setType(tokenType: TokenType): void {
        this.tokenType = tokenType;
    }

    public setPower(power: number): void{
        this.power = power;
    }

    public printType(): string {
        switch (this.tokenType) {
            case TokenType.NONE:{
                return "EMPTY";
            }
            case TokenType.STRENGTH: {
                return "STRENGTH";
            }
            case TokenType.SPEED: {
                return "SPEED";
            }
            case TokenType.REGEN: {
                return "REGENERATION";
            }
            case TokenType.FIRE: {
                return "FIREBALL"
            }
            case TokenType.PURPLE: {
                return "PURPLE MAGIC";
            }
        }
    }



    ///PRIVATE FUNCTIONS

    private setName(tokenName: string = null): void {
        var retVal = "";
        if (tokenName == null) {
            switch (this.tokenType) {
                case TokenType.NONE: {
                    retVal += "NA";
                    break;
                }
                case TokenType.STRENGTH: {
                    retVal += "STR";
                    break;
                }
                case TokenType.SPEED: {
                    retVal += "SPD";
                    break;
                }
                case TokenType.REGEN: {
                    retVal += "RGN";
                    break;
                }
                case TokenType.FIRE: {
                    retVal += "FIR";
                    break;
                }
                case TokenType.PURPLE: {
                    retVal += "PRP";
                    break;
                }
            }
            retVal += this.power.toString() + Math.floor((Math.random() * 100) + 1);//ensures unique hashkey name
            this.tokenName = retVal;
            }
        else 
            this.tokenName = tokenName;
    }




    //literally stolen from RedEnchantedGloves
    private castFireball(player: Player, quest: Quest): void {
        // Create the fireball
        var fireball: Fireball = new Fireball(quest,
            player.getSpellCastingPosition(),
            new Naming("A small fireball", "a small fireball"),
            new Color(ColorType.RED_ENCHANTED_GLOVES_FIREBALL),
            new Pos(2, 1),
            this.power, // power directly correlletes for fireballs to make up for aimlessness
            player.getAndPossiblyCreateSpellCastingDamageReason(new Naming("A small fireball", "a small fireball"))
        );

        // Set the direction
        fireball.setTargetTypeNoTarget(Algo.getRandomNotImmobileDirectionUpToThisSpeed(1).multiply(new Pos(2, 2)));

        // Add the entity
        quest.addEntity(fireball);
    }
    // MORE STOLEN METHODS FROM MonkeyWizardStaffMotherClass
    private castPurpleBall(player: Player, quest: Quest, target: QuestEntity, speed: Pos = new Pos(2, 1)): void {
        var ball: Fireball = new Fireball(quest,
            player.getSpellCastingPosition(),
            new Naming("An magical purple ball", "a magical purple ball"),
            new Color(ColorType.MONKEY_WIZARD_BALL),
            new Pos(2, 1),
            this.power - (this.power / 3),//power is direct damage minus a few for balance 
            player.getAndPossiblyCreateSpellCastingDamageReason(new Naming("An magical purple ball", "a magical purple ball"))
        );

        // Set the target
        ball.setTargetTypeTargetEntity(target, null, speed);

        // Add it to the quest
        quest.addEntity(ball);
    }

    private getRandomEnemy(player: Player, quest: Quest): QuestEntity {
        // Array which will contain the indices (in the entities array) of all possible enemies
        var indices: number[] = [];

        // Fill the indices array
        for (var i = 0; i < quest.getEntities().length; i++) {
            // If this entity is destructible and is from a different team then the player
            if (quest.getEntities()[i].getDestructible() && quest.getEntities()[i].getTeam() != player.getTeam()) {
                // We add its index
                indices.push(i);
            }
        }

        // We return a random entity from the indices index
        if (indices.length > 0) return quest.getEntities()[indices[Random.between(0, indices.length - 1)]];
        else return null;
    }
}
