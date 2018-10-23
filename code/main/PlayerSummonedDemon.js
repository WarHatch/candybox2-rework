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
var PlayerSummonedDemon = /** @class */ (function (_super) {
    __extends(PlayerSummonedDemon, _super);
    // Constructor
    function PlayerSummonedDemon(quest, globalPosition, damage) {
        var _this = _super.call(this, quest, globalPosition, new Naming("A demon", "a demon")) || this;
        // Set the damage
        _this.damage = damage;
        // Create the damage reason
        _this.damageReason = new QuestEntityDamageReason(QuestEntityDamageReasonWhoType.ENTITY, QuestEntityDamageReasonWhatType.SPELL);
        _this.damageReason.setQuestEntity(_this.getQuest().getGame().getPlayer(), QuestEntityTeam.NATURE);
        _this.damageReason.setSpellNaming(_this.getRandomNaming());
        // Create the collision box collection
        _this.damageCollisionBoxCollection = new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, 0), new Pos(8, 4)));
        // Add the demon colors randomly
        _this.addRandomQuestEntitySpellColors();
        // Add the quest entity movement
        _this.setQuestEntityMovement(new QuestEntityMovement(new Pos(3, 0)));
        return _this;
    }
    // Public methods
    PlayerSummonedDemon.prototype.update = function () {
        // Handle damage
        this.handleDamage();
        // Update
        _super.prototype.update.call(this);
    };
    // Private generation methods
    PlayerSummonedDemon.prototype.addRandomQuestEntitySpellColors = function () {
        // Array of 4*4 used to decide of the colors to add
        var arr = [];
        // Fill the array with false values
        for (var i = 0; i < 4; i++) {
            arr.push([]);
            for (var j = 0; j < 4; j++) {
                arr[i].push(false);
            }
        }
        // Fill the array with some true values
        switch (Random.upTo(1)) {
            // Symmetrical demon (vertical symmetry)
            case 0:
                for (var i = 0; i < 2; i++) {
                    for (var j = 0; j < 4; j++) {
                        if (Random.flipACoin()) {
                            arr[i][j] = true;
                            arr[3 - i][j] = true;
                        }
                    }
                }
                break;
            // Symmetrical demon (horizontal symmetry)
            case 1:
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 2; j++) {
                        if (Random.flipACoin()) {
                            arr[i][j] = true;
                            arr[i][3 - j] = true;
                        }
                    }
                }
                break;
        }
        // Add the colors depending on the array's content
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                // If we should add a color here, we do so
                if (arr[i][j])
                    this.addColor(new QuestEntitySpellColor(this.getQuest(), new Pos(i * 2, j), new Pos(2, 1), new Color(ColorType.PLAYER_SUMMONED_DEMON, true)));
            }
        }
    };
    PlayerSummonedDemon.prototype.getRandomNaming = function () {
        // The final name in a string
        var finalName = "";
        // How many syllables?
        var howManySyllables;
        if (Random.flipACoin())
            howManySyllables = 3; // a lot of chance
        else if (Random.oneChanceOutOf(10))
            howManySyllables = 4; // small chance
        else if (Random.oneChanceOutOf(10))
            howManySyllables = 1; // small chance
        else
            howManySyllables = 2; // a lot of chance, a but still a little bit less chance then 3 syllables
        // The syllables array
        var syllablesArray = [];
        // Add the syllables to the array
        for (var i = 0; i < howManySyllables; i++) {
            syllablesArray.push(Random.fromArray(["lael", "ezek", "bal", "sen", "zen", "aps", "hir", "ta", "ozn", "eres", "non", "enon", "cesti", "mal", "aser", "oex", "nax", "arir", "nikon", "taor", "rael", "mael", "sael", "epit", "uer", "pod", "ehon", "edeo", "xa"]));
        }
        // Turn the first letter of the firsy syllable into upper case
        syllablesArray[0] = syllablesArray[0].charAt(0).toUpperCase() + syllablesArray[0].slice(1);
        // Create the final name from the syllables
        for (var i = 0; i < syllablesArray.length; i++) {
            finalName += syllablesArray[i];
        }
        // Finally return the naming
        return new Naming("the demon " + finalName);
    };
    // Other private methods
    PlayerSummonedDemon.prototype.handleDamage = function () {
        // We iterate over entities
        for (var i = 0; i < this.getQuest().getEntities().length; i++) {
            // If it is destructible
            if (this.getQuest().getEntities()[i].getDestructible()) {
                // If it has a collision box collection
                if (this.getQuest().getEntities()[i].getCbc() != null) {
                    // If this collision box collection collides with ours
                    if (this.getQuest().getEntities()[i].getCbc().collidesWith(this.damageCollisionBoxCollection)) {
                        // We inflict the damage
                        this.getQuest().getEntities()[i].inflictDamage(this.damage, this.damageReason);
                    }
                }
            }
        }
    };
    return PlayerSummonedDemon;
}(QuestEntitySpell));
//# sourceMappingURL=PlayerSummonedDemon.js.map