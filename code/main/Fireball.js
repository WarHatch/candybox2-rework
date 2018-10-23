///<reference path="QuestEntitySpell.ts"/>
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
var Fireball = /** @class */ (function (_super) {
    __extends(Fireball, _super);
    // Constructor
    function Fireball(quest, pos, naming, color, size, damage, questEntityDamageReason) {
        var _this = 
        // Call the mother class constructor
        _super.call(this, quest, pos, naming) || this;
        // Target stuff
        _this.targetType = FireballTargetType.NO_TARGET;
        // Set the size
        _this.size = size;
        // Set the damage
        _this.damage = damage;
        // Set the quest entity damage reason
        _this.questEntityDamageReason = questEntityDamageReason;
        // Create the damage collision box collection
        _this.damageCollisionBoxCollection = new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, 0), _this.size));
        // Add the color
        _this.addColor(new QuestEntitySpellColor(_this.getQuest(), new Pos(0, 0), _this.size, color));
        // Create a quest entity movement
        _this.setQuestEntityMovement(new QuestEntityMovement(new Pos(0, 0)));
        // Set the default target type
        _this.setTargetTypeNoTarget(new Pos(0, 0));
        return _this;
    }
    // Public methods
    Fireball.prototype.setTargetTypeNoTarget = function (movement) {
        this.targetType = FireballTargetType.NO_TARGET;
        this.getQuestEntityMovement().setOffset(movement); // Set the movement (it will be kept later by itself)
    };
    Fireball.prototype.setTargetTypeTargetEntity = function (entity, specialTargetDamage, speed) {
        if (specialTargetDamage === void 0) { specialTargetDamage = null; }
        if (speed === void 0) { speed = new Pos(1, 1); }
        this.targetType = FireballTargetType.TARGET_ENTITY;
        this.fireballTargetEntity = entity;
        this.specialTargetDamage = specialTargetDamage;
        this.speed = speed;
    };
    Fireball.prototype.setTargetTypeTargetPosition = function (pos, speed) {
        if (speed === void 0) { speed = new Pos(1, 1); }
        this.targetType = FireballTargetType.TARGET_POSITION;
        this.targetPosition = pos;
        this.speed = speed;
    };
    Fireball.prototype.setTargetTypeTargetStickOnEntity = function (entity, specialTargetPosition) {
        if (specialTargetPosition === void 0) { specialTargetPosition = new Pos(0, 0); }
        this.targetType = FireballTargetType.TARGET_STICK_ON_ENTITY;
        this.fireballTargetEntity = entity;
        this.specialTargetPosition = specialTargetPosition;
    };
    Fireball.prototype.update = function () {
        // If we target an entity
        if (this.targetType == FireballTargetType.TARGET_ENTITY) {
            // If this entity is still alive
            if (this.fireballTargetEntity != null && this.fireballTargetEntity.getDead() == false) {
                // We go towards it
                this.goTowards(this.getGlobalPosition().plus(new Pos(Math.floor(this.size.x / 2), Math.floor(this.size.y / 2))), this.fireballTargetEntity.getRenderAreaCenter(), 0, this.speed);
            }
            // Else, we die
            else
                this.setDead(true);
        }
        // Else, if we target to stick on an entity
        else if (this.targetType == FireballTargetType.TARGET_STICK_ON_ENTITY) {
            // If this entity is still alive
            if (this.fireballTargetEntity != null && this.fireballTargetEntity.getDead() == false) {
                // We teleport on it
                this.teleport(this.fireballTargetEntity.getGlobalPosition().plus(this.specialTargetPosition));
            }
            // Else, we die
            else
                this.setDead(true);
        }
        // Else, if we target a position
        else if (this.targetType == FireballTargetType.TARGET_POSITION) {
            // We go towards this position
            this.goTowards(this.getGlobalPosition().plus(new Pos(Math.floor(this.size.x / 2), Math.floor(this.size.y / 2))), this.targetPosition, 0, this.speed);
        }
        // Handle our damage
        this.handleDamage();
        // Call the mother class update method
        _super.prototype.update.call(this);
    };
    // willDie()
    Fireball.prototype.willDie = function () { };
    // Private methods
    Fireball.prototype.handleDamage = function () {
        // We iterate over entities
        for (var i = 0; i < this.getQuest().getEntities().length; i++) {
            // If it is from a different team than the team of the entity which launched the fireball
            if (this.questEntityDamageReason.getQuestEntityTeam() != this.getQuest().getEntities()[i].getTeam()) {
                // If it is destructible
                if (this.getQuest().getEntities()[i].getDestructible()) {
                    // If it has a collision box collection
                    if (this.getQuest().getEntities()[i].getCbc() != null) {
                        // If this collision box collection collides with ours
                        if (this.getQuest().getEntities()[i].getCbc().collidesWith(this.damageCollisionBoxCollection)) {
                            // If...
                            if (this.getQuest().getEntities()[i] == this.fireballTargetEntity && // This is the entity we're targetting
                                this.targetType == FireballTargetType.TARGET_ENTITY && // We actually target an entity
                                this.fireballTargetEntity != null && // Which is not null
                                this.fireballTargetEntity.getDead() == false && // And not dead
                                this.specialTargetDamage != null // And we want to inflict it special damage
                            ) {
                                this.getQuest().getEntities()[i].inflictDamage(this.specialTargetDamage, this.questEntityDamageReason);
                            }
                            // Else, we just inflict normal damage
                            else {
                                this.getQuest().getEntities()[i].inflictDamage(this.damage, this.questEntityDamageReason);
                            }
                            // We die because we inflicted damage
                            this.setDead(true);
                        }
                    }
                }
            }
        }
    };
    return Fireball;
}(QuestEntitySpell));
//# sourceMappingURL=Fireball.js.map