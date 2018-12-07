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
///<reference path = "Item.ts"/>
var Token = /** @class */ (function (_super) {
    __extends(Token, _super);
    function Token(type, power, sweetTooth) {
        var _this = _super.call(this, "token", //savingName
        "tokenName", //databaseName
        "tokenDescription", //databaseDescriptionName 
        "gridItems/token" //ascii 
        ) || this;
        _this.tokenType = null;
        _this.power = 2;
        //Unique variables
        _this.currentTimer = 0;
        _this.maxTimer = 10;
        _this.applied = false;
        _this.tokenType = type;
        _this.power = power;
        _this.sweetTooth = sweetTooth;
        return _this;
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
    Token.prototype.update = function (player, quest) {
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
                if (this.currentTimer < this.maxTimer)
                    this.currentTimer += 1;
                else {
                    this.currentTimer = 0;
                    var ent = this.getRandomEnemy(player, quest);
                    if (ent != null)
                        this.castPurpleBall(player, quest, ent);
                }
            }
            case TokenType.NONE: {
                break;
            }
        }
    };
    //public getters
    Token.prototype.getType = function () {
        return this.tokenType;
    };
    Token.prototype.getPower = function () {
        return this.power;
    };
    //literally stolen from RedEnchantedGloves
    Token.prototype.castFireball = function (player, quest) {
        // Create the fireball
        var fireball = new Fireball(quest, player.getSpellCastingPosition(), new Naming("A small fireball", "a small fireball"), new Color(ColorType.RED_ENCHANTED_GLOVES_FIREBALL), new Pos(2, 1), 15, player.getAndPossiblyCreateSpellCastingDamageReason(new Naming("A small fireball", "a small fireball")));
        // Set the direction
        fireball.setTargetTypeNoTarget(Algo.getRandomNotImmobileDirectionUpToThisSpeed(1).multiply(new Pos(2, 2)));
        // Add the entity
        quest.addEntity(fireball);
    };
    // MORE STOLEN METHODS FROM MonkeyWizardStaffMotherClass
    Token.prototype.castPurpleBall = function (player, quest, target, speed) {
        if (speed === void 0) { speed = new Pos(2, 1); }
        var ball = new Fireball(quest, player.getSpellCastingPosition(), new Naming("An magical purple ball", "a magical purple ball"), new Color(ColorType.MONKEY_WIZARD_BALL), new Pos(2, 1), 15, player.getAndPossiblyCreateSpellCastingDamageReason(new Naming("An magical purple ball", "a magical purple ball")));
        // Set the target
        ball.setTargetTypeTargetEntity(target, null, speed);
        // Add it to the quest
        quest.addEntity(ball);
    };
    Token.prototype.getRandomEnemy = function (player, quest) {
        // Array which will contain the indices (in the entities array) of all possible enemies
        var indices = [];
        // Fill the indices array
        for (var i = 0; i < quest.getEntities().length; i++) {
            // If this entity is destructible and is from a different team then the player
            if (quest.getEntities()[i].getDestructible() && quest.getEntities()[i].getTeam() != player.getTeam()) {
                // We add its index
                indices.push(i);
            }
        }
        // We return a random entity from the indices index
        if (indices.length > 0)
            return quest.getEntities()[indices[Random.between(0, indices.length - 1)]];
        else
            return null;
    };
    return Token;
}(Item));
//# sourceMappingURL=Token.js.map