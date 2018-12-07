///<reference path = "Item.ts"/>
class Token extends Item
{
    //Typical variables
    private sweetTooth: SweetTooth;
    private tokenType: TokenType = null;
    private power = 2;

    //Unique variables
    private currentTimer: number = 0;
    private maxTimer: number = 10;
    private applied: boolean = false;

    constructor(type: TokenType, power: number, sweetTooth: SweetTooth) {
        super(
            "token",//savingName
            "tokenName",//databaseName
            "tokenDescription",//databaseDescriptionName 
            "gridItems/token"//ascii 
        );
        this.tokenType = type;
        this.power = power;
        this.sweetTooth = sweetTooth;
        /*switch (this.tokenType) {
            case TokenType.SPEED: {
                //this.sweetTooth.getQuestEntityWeapon(null, this.sweetTooth.getPlayer()).setDamage(this.power);
                break;
            }
            case TokenType.STRENGTH: {
                this.sweetTooth.getQuestEntityWeapon(null).setDamage(this.power,true);
                break;
            }
            default: {
                break;
            }
        }*/
    }

    public update(player: Player, quest: Quest): void {
        switch (this.tokenType) {
            case TokenType.REGEN: {
                player.heal(1);
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








    //literally stolen from RedEnchantedGloves
    private castFireball(player: Player, quest: Quest): void {
        // Create the fireball
        var fireball: Fireball = new Fireball(quest,
            player.getSpellCastingPosition(),
            new Naming("A small fireball", "a small fireball"),
            new Color(ColorType.RED_ENCHANTED_GLOVES_FIREBALL),
            new Pos(2, 1),
            15,
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
            15,
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
