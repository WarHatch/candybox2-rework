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
var Devil = /** @class */ (function (_super) {
    __extends(Devil, _super);
    // Constructor
    function Devil(quest, pos, minY, maxY) {
        var _this = _super.call(this, quest, pos, new Naming("The devil", "the devil"), new RenderArea(16, 16), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement()) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(4, 0), new Pos(8, 5))));
        // Set from parameters
        _this.minY = minY;
        _this.maxY = maxY;
        // At first we're going down
        _this.setGoingDown(true);
        // Init the flames array
        _this.flames = [];
        // Set gravity
        _this.getQuestEntityMovement().setGravity(false);
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(666);
        _this.setHp(666);
        // Set the transparent character and draw
        _this.setTransparency(new RenderTransparency(" ", "%"));
        _this.reDraw();
        // Set the weapon and its delay
        _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("Evilness", "evilness"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, -1), new Pos(18, 18))), 500));
        _this.getLastQuestEntityWeapon().getCloseCombatDelay().setBetweenDelay(0, 5);
        return _this;
    }
    // inflictDamage()
    Devil.prototype.inflictDamage = function (damage, reason) {
        _super.prototype.inflictDamage.call(this, Math.ceil(damage / 4), reason);
    };
    // update()
    Devil.prototype.update = function () {
        // Handle movement
        this.handleUpDownMovement();
        // Handle fireballs
        this.handleFireballs();
        // Handle the flames
        this.handleFlames();
        // Re draw the devil (ascii art + flames)
        this.reDraw();
        // Call the mother class update method
        _super.prototype.update.call(this);
    };
    // willDie()
    Devil.prototype.willDie = function () {
        this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage(this.getDeathMessage() + " (and found " + Algo.pluralFormat(this.getQuest().foundCandies(1000000), " candy", " candies") + ")", this.getQuest().getCandiesFoundMessage()));
        this.getQuest().foundGridOrEqItem(new QuestItemFound(this.getQuest(), "gridItemPossessedA", "You found a strange stone.", "You gain a strange stone."));
    };
    // Private methods
    Devil.prototype.castFireball = function () {
        // Create the fireball
        var fireBall = new Fireball(this.getQuest(), this.getGlobalPosition().plus(new Pos(3, 4)), new Naming("The devil's fireball", "the devil's fireball"), new Color(ColorType.DEVIL_FIREBALL), new Pos(2, 1), 800, this.getAndPossiblyCreateSpellCastingDamageReason(new Naming("The devil's fireball", "the devil's fireball")));
        // If the player is on our left
        if (this.getQuest().getGame().getPlayer().getGlobalPosition().x < this.getGlobalPosition().x) {
            // No target
            fireBall.setTargetTypeNoTarget(new Pos(-Random.between(3, 7), 0));
        }
        // Else
        else {
            // We target the player
            fireBall.setTargetTypeTargetEntity(this.getQuest().getGame().getPlayer(), null, new Pos(1, 1));
        }
        // Add the entity
        this.getQuest().addEntity(fireBall);
    };
    Devil.prototype.handleFireballs = function () {
        if (Random.oneChanceOutOf(2))
            this.castFireball();
    };
    Devil.prototype.handleFlames = function () {
        // Create the variables
        var minX = 0;
        var maxX = 15;
        var minY = 6;
        var maxY = 15;
        var howManyFlames = 150;
        var x;
        var y;
        // Add flames depending on the current timer time
        for (var i = 0; i < howManyFlames; i++) {
            // If there is no flame for this index OR one chance out of 7
            if (i >= this.flames.length || Random.oneChanceOutOf(7)) {
                // Set y
                y = null;
                for (var j = minY; j < maxY; j++) {
                    if (Random.oneChanceOutOf(3)) {
                        y = j;
                        break;
                    }
                }
                if (y == null)
                    y = maxY;
                // Set x
                x = Random.between(minX + Math.floor((15 - y) / 3), maxX - Math.floor((15 - y) / 3));
                // Add or replace the flame
                var flame = new CauldronFlame(new Pos(x, y), Random.fromArray([")", "(", "`", "'", ".", ";", ":", ",", "-", "/", "\\", "|", "\"", "d", "e", "v", "i", "l"]));
                if (i >= this.flames.length)
                    this.flames.push(flame);
                else
                    this.flames[i] = flame;
            }
        }
    };
    Devil.prototype.handleUpDownMovement = function () {
        // If we're going down but we're too low or it will be impossible, we now go up
        if (this.goingDown && (this.getGlobalPosition().y >= this.maxY || this.checkCollision(new Pos(0, 1)))) {
            this.setGoingDown(false);
        }
        // Else, if we're going up but we're too high, we now go down
        else if (this.goingDown == false && (this.getGlobalPosition().y <= this.minY || this.checkCollision(new Pos(0, -1)))) {
            this.setGoingDown(true);
        }
    };
    Devil.prototype.reDraw = function () {
        // Reset everything
        this.getRenderArea().resetAllButSize();
        // Draw the ascii art
        this.getRenderArea().drawArray(Database.getAscii("places/quests/hell/devil"), 4, 0);
        // Draw the flames
        for (var i = 0; i < this.flames.length; i++) {
            this.flames[i].draw(this.getRenderArea(), 0, 0);
        }
    };
    Devil.prototype.setGoingDown = function (goingDown) {
        this.goingDown = goingDown;
        if (this.goingDown) {
            this.getQuestEntityMovement().setOffset(new Pos(0, 1));
        }
        else {
            this.getQuestEntityMovement().setOffset(new Pos(0, -1));
        }
    };
    return Devil;
}(QuestEntity));
//# sourceMappingURL=Devil.js.map