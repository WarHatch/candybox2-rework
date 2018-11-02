var QuestEntityWeapon = /** @class */ (function () {
    // Constructor
    function QuestEntityWeapon(quest, questEntity, naming, cbc, damage) {
        if (cbc === void 0) { cbc = new CollisionBoxCollection(); }
        if (damage === void 0) { damage = 0; }
        this.closeCombatDelay = new QuestEntityWeaponDelay();
        this.quest = quest;
        this.questEntity = questEntity;
        this.naming = naming;
        if (this.naming.getAnywhere() === 'the Sweet Tooth') {
            this.setDamage();
        }
        else
            this.damage = damage;
        this.cbc = cbc;
    }
    // Public methods
    QuestEntityWeapon.prototype.getRealDamage = function () {
        return this.damage;
    };
    QuestEntityWeapon.prototype.getRealDamageText = function () {
        return this.damage.toString();
    };
    QuestEntityWeapon.prototype.getSpeedText = function () {
        return this.closeCombatDelay.getText();
    };
    QuestEntityWeapon.prototype.handleCombat = function () {
        // If we can attack with close combat at this frame
        if (this.getRealDamage() > 0 && this.closeCombatDelay.tryToAttack()) {
            // We iterate over all entities
            for (var i = 0; i < this.quest.getEntities().length; i++) {
                // If we're not iterating over the entity we are used by
                if (this.quest.getEntities()[i] != this.questEntity) {
                    // If the entities are from different teams
                    if (this.quest.getEntities()[i].getTeam() != this.questEntity.getTeam()) {
                        // If we collide with this entity
                        if (this.collidesWith(this.quest.getEntities()[i])) {
                            // We hit it
                            this.hit(this.quest.getEntities()[i]);
                            // We warn the delay
                            this.closeCombatDelay.theWeaponAttacked();
                        }
                    }
                }
            }
        }
    };
    // Public getters
    QuestEntityWeapon.prototype.getCloseCombatDelay = function () {
        return this.closeCombatDelay;
    };
    QuestEntityWeapon.prototype.getNaming = function () {
        return this.naming;
    };
    // Private methods
    QuestEntityWeapon.prototype.collidesWith = function (questEntity) {
        // If we both have a collision box collection, we return the result of the collision test
        if (this.cbc != null && questEntity.getCbc() != null)
            return this.cbc.collidesWith(questEntity.getCbc());
        // Else, we return false, there can't be any collision
        return false;
    };
    QuestEntityWeapon.prototype.hit = function (questEntity) {
        this.questEntity.hit(questEntity, this.getRealDamage(), new QuestEntityDamageReason(QuestEntityDamageReasonWhoType.ENTITY, QuestEntityDamageReasonWhatType.WEAPON)
            .setQuestEntity(this.questEntity)
            .setQuestEntityWeapon(this));
    };
    //This is exclusively for sweet tooths dynamic damage 
    QuestEntityWeapon.prototype.setDamage = function (power, fromToken) {
        if (power === void 0) { power = 0; }
        if (fromToken === void 0) { fromToken = false; }
        if (this.naming.getAnywhere() === 'the Sweet Tooth') {
            this.damage = (this.questEntity.getHp() / 200);
            if (fromToken) {
                this.damage = (this.damage + (this.damage * (power / 10)));
            }
        }
    };
    return QuestEntityWeapon;
}());
//# sourceMappingURL=QuestEntityWeapon.js.map