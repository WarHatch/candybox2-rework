///<reference path="QuestEntity.ts"/>
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
var TreeSpirit = /** @class */ (function (_super) {
    __extends(TreeSpirit, _super);
    // Constructor
    function TreeSpirit(quest, pos, groundYPosition) {
        var _this = _super.call(this, quest, pos, new Naming("A tree spirit", "a tree spirit"), new RenderArea(5, 5), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement()) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, 1), new Pos(5, 2)), new CollisionBox(_this, new Pos(1, 3), new Pos(3, 2))));
        // Set the ground y position from the value given in parameter
        _this.groundYPosition = groundYPosition;
        // Set the default values for ammunition related variables
        _this.maxAmmunition = 5;
        _this.ammunition = 5;
        _this.ammunitionTimer = 0;
        // Set the default values for magic spines related variables
        _this.magicSpineTimer = 0;
        // Set the ascii art and the transparent character
        _this.getRenderArea().drawArray(Database.getAscii("places/quests/forest/treeSpirit"));
        _this.setTransparency(new RenderTransparency(" "));
        // Set gravity
        _this.getQuestEntityMovement().setGravity(true);
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(100);
        _this.setHp(100);
        // Set the weapon and its delay
        _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("Spines", "spines"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, 0), new Pos(7, 6))), 2));
        _this.getLastQuestEntityWeapon().getCloseCombatDelay().setFixedDelay(1);
        return _this;
    }
    // update()
    TreeSpirit.prototype.update = function () {
        // Calculate the distance from the player
        var distanceFromPlayer = this.getGlobalPosition().plus(new Pos(2, 0)).getDistance(this.getQuest().getGame().getPlayer().getGlobalPosition());
        // Handle ammunition timer
        if (this.ammunitionTimer <= 0) {
            if (this.ammunition < this.maxAmmunition)
                this.ammunition += 1;
            this.ammunitionTimer = 20;
        }
        else
            this.ammunitionTimer -= 1;
        // Handle magic spine timer
        if (this.magicSpineTimer > 0)
            this.magicSpineTimer -= 1;
        // Set the movement depending on the distance from the player
        this.getQuestEntityMovement().setOffset(new Pos((distanceFromPlayer.x > 0 ? -1 : 1), 0));
        // If the player is above the ground position
        if (this.getQuest().getGame().getPlayer().getGlobalPosition().y < this.groundYPosition) {
            // If the timer is okay
            if (this.magicSpineTimer <= 0) {
                // We shoot a magic spine on the left or on the right
                if (this.shootMagicSpine((distanceFromPlayer.x > 0 ? true : false))) { // If it worked
                    this.ammunition -= 1; // We lower the ammunition
                    this.magicSpineTimer = 12; // We set the countdown
                }
            }
        }
        // Call the mother class update
        _super.prototype.update.call(this);
    };
    // willDie()
    TreeSpirit.prototype.willDie = function () {
        this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage(this.getDeathMessage() + " (and found " + Algo.pluralFormat(this.getQuest().foundCandies(100 + 50 * Random.upTo(10)), " candy", " candies") + ")", this.getQuest().getCandiesFoundMessage()));
    };
    // Private methods
    TreeSpirit.prototype.shootMagicSpine = function (onTheLeft) {
        // Create the magic spine
        var magicSpine = new Fireball(this.getQuest(), this.getGlobalPosition().plus(new Pos((onTheLeft ? -3 : 5), 2)), new Naming("A magical spine", "a magical spine"), new Color(ColorType.TREE_SPIRIT_MAGIC_SPINE), new Pos(3, 1), 150, this.getAndPossiblyCreateSpellCastingDamageReason(new Naming("A magical spine", "a magical spine")));
        // No target
        magicSpine.setTargetTypeNoTarget(new Pos((onTheLeft ? -2 : 2), 0));
        // Add the entity
        return this.getQuest().addEntity(magicSpine);
    };
    return TreeSpirit;
}(QuestEntity));
//# sourceMappingURL=TreeSpirit.js.map