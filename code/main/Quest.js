///<reference path="Place.ts"/>
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
var Quest = /** @class */ (function (_super) {
    __extends(Quest, _super);
    // Constructor
    function Quest(game, specialInstruction) {
        if (specialInstruction === void 0) { specialInstruction = null; }
        var _this = _super.call(this, game) || this;
        // Array of quest entities
        _this.entities = [];
        // Render area
        _this.renderArea = new RenderArea();
        _this.globalDrawingOffset = new Pos(0, 0); // Global offset applied to all entities (very useful when dealing with a scrolling quest like the hole for example)
        // Drops
        _this.candiesFound = new Resource();
        _this.chocolateBarsFound = new Resource();
        _this.itemsFound = [];
        // Is the quest ended? (and did we win?)
        _this.questEnded = false;
        _this.questEndedAndWeWon = false;
        // Player spells
        _this.playerSpells = [];
        _this.playerSpellsHotkeys = [];
        // Countdowns
        _this.playerSpellsCountdown = 0;
        _this.playerPotionsCountdown = 0;
        // Is gravity / worms like disabled?
        _this.gravityDisabled = false;
        _this.wormsLikeDisabled = false;
        // How many P potions did we use since the beginning of the quest?
        _this.howManyPPotions = 0;
        // Set the special instruction
        _this.specialInstruction = specialInstruction;
        // Reset the player
        _this.getGame().resetPlayer();
        // Create player spells
        _this.createPlayerSpells();
        // Set the real quest position
        _this.realQuestPosition = new Pos(0, 2);
        // And the size to add to the real quest size
        _this.sizeToAddToTheRealQuestSize = new Pos(0, 12);
        // If there is a special instruction, change the real quest position
        if (_this.specialInstruction != null) {
            _this.realQuestPosition.add(new Pos(0, 1));
        }
        // If there is at least a spell, change the real quest position
        if (_this.playerSpells.length != 0) {
            _this.realQuestPosition.add(new Pos(0, _this.playerSpellsHeight));
        }
        // Add two delimiters in the quest log
        _this.getGame().getQuestLog().addDelimiter();
        // Create the player collision boxes entity
        _this.playerCollisionBoxes = new Wall(_this, new Pos(0, 0));
        // Set the quest slowed down variable at the game level (and the quest speed up too)
        _this.getGame().setQuestSlowedDown(false);
        _this.getGame().setQuestSpeedUp(0);
        return _this;
    }
    // Public methods
    Quest.prototype.addPlayerCollisionBoxes = function (top, right, bottom, left) {
        // We remove boxes
        this.playerCollisionBoxes.removeBoxes();
        // And we re-add them
        if (top)
            this.playerCollisionBoxes.addBox(new Pos(-1, -1), new Pos(this.getRealQuestSize().x + 2, 1));
        if (right)
            this.playerCollisionBoxes.addBox(new Pos(this.getRealQuestSize().x, -1), new Pos(1, this.getRealQuestSize().y + 2));
        if (bottom)
            this.playerCollisionBoxes.addBox(new Pos(-1, this.getRealQuestSize().y), new Pos(this.getRealQuestSize().x + 2, 1));
        if (left)
            this.playerCollisionBoxes.addBox(new Pos(-1, -1), new Pos(1, this.getRealQuestSize().y + 2));
    };
    Quest.prototype.addEntity = function (entity) {
        // Add the entity
        this.entities.push(entity);
        // If it collides, remove it and return false (+ BUGS)
        if (this.entities[this.entities.length - 1].checkCollision() && Bugs.getQuestBugLevel() < 4) {
            this.entities.splice(this.entities.length - 1, 1);
            return false;
        }
        // Else, successfully added, we return true
        return true;
    };
    Quest.prototype.addExitQuestButton = function (callbackCollection, buttonText) {
        this.addBackToButton(this.renderArea, callbackCollection, Database.getText(buttonText), Database.getTranslatedText(buttonText), buttonText, 0, ((this.renderArea.getWidth() - 100) - this.getGap()) / 2 + (50 - Database.getText(buttonText).length / 2));
    };
    Quest.prototype.castPlayerAcidRain = function (areaPosition, areaSize, maxLeftDistanceFromPlayer, maxRightDistanceFromPlayer) {
        if (areaPosition === void 0) { areaPosition = null; }
        if (areaSize === void 0) { areaSize = null; }
        if (maxLeftDistanceFromPlayer === void 0) { maxLeftDistanceFromPlayer = 50; }
        if (maxRightDistanceFromPlayer === void 0) { maxRightDistanceFromPlayer = 50; }
        // We set the position & size of the area of the acid rain
        if (areaPosition == null)
            areaPosition = new Pos(0, 0);
        if (areaSize == null)
            areaSize = new Pos(this.getRealQuestSize().x, this.getRealQuestSize().y);
        // Correct the position to fit with the max left and right distance from player
        if (areaPosition.x < this.getGame().getPlayer().getGlobalPosition().x - maxLeftDistanceFromPlayer)
            areaPosition.x = this.getGame().getPlayer().getGlobalPosition().x - maxLeftDistanceFromPlayer;
        if (areaPosition.x + areaSize.x > this.getGame().getPlayer().getGlobalPosition().x + maxRightDistanceFromPlayer)
            areaSize.x = this.getGame().getPlayer().getGlobalPosition().x + maxRightDistanceFromPlayer - areaPosition.x;
        // Add the acid drops in the area
        for (var i = areaPosition.x; i < areaPosition.x + areaSize.x; i++) {
            if (Random.oneChanceOutOf((this.getGame().isEquipped("hat", "eqItemHatSorceressHat") ? 3 : 5))) {
                this.addEntity(this.createPlayerAcidDrop(new Pos(i, areaPosition.y - Random.upTo(5))));
            }
        }
        // Add a message to the log
        this.getGame().getQuestLog().addMessage(new QuestLogMessage("You cast an acid rain!"));
    };
    Quest.prototype.castPlayerAntiGravityPotion = function () {
        this.getGame().getPlayer().beginAntiGravity((this.getGame().isEquipped("hat", "eqItemHatSorceressHat") ? 50 : 30));
        this.getGame().getQuestLog().addMessage(new QuestLogMessage("You drink an anti gravity potion!"));
    };
    Quest.prototype.castPlayerBlackDemons = function () {
        // X position where the demons will start
        var xPosition = 0;
        // Y position of the beginning of the demon column
        var yBeginningPosition = 0;
        // Y position of the end of the demon column
        var yEndingPosition = this.getRealQuestSize().y;
        // We try to add demons from the beginning to the end, every five characters
        for (var i = yBeginningPosition; i < yEndingPosition; i++) {
            if (i % 5 == 0)
                this.addEntity(new PlayerSummonedDemon(this, new Pos(xPosition, i), (this.getGame().isEquipped("hat", "eqItemHatSorceressHat") ? 80 : 50)));
        }
        // Add a message to the log
        this.getGame().getQuestLog().addMessage(new QuestLogMessage("You summoned black demons!"));
    };
    Quest.prototype.castPlayerBlackhole = function () {
        // Array which will contain the indices (in the entities array) of all possible enemies
        var indices = [];
        // The blackhole position
        var position;
        // Fill the indices array
        for (var i = 0; i < this.getEntities().length; i++) {
            // If this entity is destructible and is from a different team then the player
            if (this.getEntities()[i].getDestructible() && this.getEntities()[i].getTeam() != this.getGame().getPlayer().getTeam()) {
                // We add its index
                indices.push(i);
            }
        }
        // We get the position of the blackhole from the position of a random destructible and not in the player's team entity, or if there's isn't any, from the player's position
        if (indices.length > 0) {
            position = this.getEntities()[indices[Random.between(0, indices.length - 1)]].getRenderAreaCenter();
        }
        else {
            position = this.getGame().getPlayer().getRenderAreaCenter();
        }
        // We cast the blackhole on the position we just set
        this.addEntity(new Blackhole(this, position, 100, this.getGame().getPlayer().getAndPossiblyCreateSpellCastingDamageReason(new Naming("A blackhole", "a blackhole"))));
        // We add the message
        this.getGame().getQuestLog().addMessage(new QuestLogMessage("You cast the black hole spell!"));
    };
    Quest.prototype.castPlayerBerserkPotion = function () {
        this.getGame().getPlayer().beginBerserk((this.getGame().isEquipped("hat", "eqItemHatSorceressHat") ? 120 : 80));
        this.getGame().getQuestLog().addMessage(new QuestLogMessage("You drink a berserk potion!"));
    };
    Quest.prototype.castPlayerCloningPotion = function () {
        // The clone to be added
        var clone = null;
        // Create a different clone depnding on the character type
        switch (this.getGame().getPlayer().getCharacterType()) {
            case PlayerCharacterType.CANDYBOX:
            case PlayerCharacterType.CANDYBOX_SQUEEZED:
                clone = new PlayerCloneCandyBox(this, this.getGame().getPlayer().getGlobalPosition().plus(new Pos(0, -1)));
                break;
            case PlayerCharacterType.MEDIUM:
            case PlayerCharacterType.MEDIUM_SQUEEZED:
                clone = new PlayerCloneMedium(this, this.getGame().getPlayer().getGlobalPosition().plus(new Pos(0, -4)));
                break;
        }
        // If we didn't manage to add this clone (this could fail because it may not have enough space to be added)
        if (this.addEntity(clone) == false) {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You drink a cloning potion but there's not enough space for a clone to appear."));
            return; // We return
        }
        // Else, config the clone as a player (this config method is made to be overriden by the daughter classes)
        this.configPlayerOrClone(clone);
        // Add the message
        this.getGame().getQuestLog().addMessage(new QuestLogMessage("You drink a cloning potion!"));
    };
    Quest.prototype.castPlayerEraseMagic = function () {
        // Will be true if at least one spell was erased
        var magicErased = false;
        // Set dead to all the spells
        for (var i = 0; i < this.getEntities().length; i++) {
            if (this.getEntities()[i].getIsASpell()) {
                this.getEntities()[i].setDead(true);
                magicErased = true;
            }
        }
        // If some spell was erase, we successfully casted the spell
        if (magicErased)
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You cast an erase magic spell!"));
        // Else, it didn't work
        else
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You failed to cast an erase magic spell : there's no magic to erase."));
    };
    Quest.prototype.castPlayerFireball = function (movement) {
        if (movement === void 0) { movement = new Pos(2, 0); }
        // Create the fireball
        var fireball = new Fireball(this, this.getGame().getPlayer().getSpellCastingPosition(), new Naming("A fireball", "a fireball"), new Color(ColorType.PLAYER_FIREBALL), new Pos((this.getGame().isEquipped("hat", "eqItemHatSorceressHat") ? 6 : 4), (this.getGame().isEquipped("hat", "eqItemHatSorceressHat") ? 3 : 2)), 45 * (Saving.loadBool("gridItemPossessedRedSharkFin") ? 3 : 1), this.getGame().getPlayer().getAndPossiblyCreateSpellCastingDamageReason(new Naming("A fireball", "a fireball")));
        // No target
        fireball.setTargetTypeNoTarget(movement);
        // Add the entity
        this.addEntity(fireball);
        // Add a message to the log
        this.getGame().getQuestLog().addMessage(new QuestLogMessage("You cast a fireball!"));
    };
    Quest.prototype.castPlayerHealthPotion = function () {
        this.getGame().getPlayer().heal((this.getGame().isEquipped("hat", "eqItemHatSorceressHat") ? 200 : 100));
        this.getGame().getQuestLog().addMessage(new QuestLogMessage("You drink a health potion!"));
    };
    Quest.prototype.castPlayerJump = function () {
        // If we don't have the feather
        if (Saving.loadBool("gridItemPossessedFeather") == false)
            this.getGame().getPlayer().jump(3);
        // Else, we have the feather
        else
            this.getGame().getPlayer().jump(6);
    };
    Quest.prototype.castPlayerObsidianWall = function () {
        // X position of the wall
        var xPosition = this.getGame().getPlayer().getSpellCastingPosition().x;
        // Beginning of the wall
        var yBeginningPosition = 0;
        // End of the wall
        var yEndingPosition = this.getRealQuestSize().y;
        // We try to add bricks from the beginning to the end
        for (var i = yBeginningPosition; i < yEndingPosition; i++) {
            this.addEntity(new ObsidianBrick(this, new Pos(xPosition, i), (this.getGame().isEquipped("hat", "eqItemHatSorceressHat") ? 300 : 200)));
        }
        // Add a message to the log
        this.getGame().getQuestLog().addMessage(new QuestLogMessage("You cast an obsidian wall!"));
    };
    Quest.prototype.castPlayerPPotion = function () {
        // Variables which will be used for calculations
        var hp;
        // Additional message, depends on the effect
        var additionalMessage = null;
        // If the player is a turtle
        if (this.getGame().getPlayer().getTurtle()) {
            // We're not a turtle anymore
            this.getGame().getPlayer().stopTurtle();
            // We lose half of our health points
            hp = Math.ceil(this.getGame().getPlayer().getHp() / 2);
            this.getGame().getPlayer().heal(-hp);
            // Set the message
            additionalMessage = "You lose " + hp + " health points.";
        }
        // Else, if we have less than 8% of our health
        else if (this.getGame().getPlayer().getHp() < (this.getGame().getPlayer().getMaxHp() * 8 / 100)) {
            // Choose between the following
            switch (Random.between(0, 8)) {
                case 0:
                    this.getGame().getPlayer().heal(200);
                    additionalMessage = "You gain 200 health points.";
                    break; // Heal 200 hp
                case 1:
                    this.getGame().getPlayer().heal(400);
                    additionalMessage = "You gain 400 health points.";
                    break; // Heal 400 hp
                case 2:
                    this.getGame().getPlayer().heal(600);
                    additionalMessage = "You gain 600 health points.";
                    break; // Heal 600 hp
                case 3:
                    hp = this.getGame().getPlayer().getMaxHp() * 50 / 100;
                    this.getGame().getPlayer().heal(hp);
                    additionalMessage = "You gain " + hp + " health points.";
                    break; // Heal 50%
                case 4:
                    hp = this.getGame().getPlayer().getMaxHp() * 65 / 100;
                    this.getGame().getPlayer().heal(hp);
                    additionalMessage = "You gain " + hp + " health points.";
                    break; // Heal 65%
                case 5:
                    hp = this.getGame().getPlayer().getMaxHp() * 80 / 100;
                    this.getGame().getPlayer().heal(hp);
                    additionalMessage = "You gain " + hp + " health points.";
                    break; // Heal 80%
                case 6:
                    this.getGame().getPlayer().heal(10);
                    additionalMessage = "You gain 10 health points.";
                    break; // Wow, not very effective : heal 10hp
                case 7:
                    this.getGame().getPlayer().heal(10);
                    additionalMessage = "You gain 7 health points.";
                    break; // Wow, not very effective : heal 7hp
                case 8:
                    this.getGame().getPlayer().heal(10);
                    additionalMessage = "You gain 3 health points.";
                    break; // Wow, not very effective : heal 30hp
            }
        }
        // Else : we're not a turtle and we have more than 8% of our health
        else {
            // Normal effect
            if (Random.oneChanceOutOf(Math.ceil((this.howManyPPotions + 1) / 2))) {
                // 20%/30% of our health points
                hp = this.getGame().getPlayer().getMaxHp() * (Random.flipACoin() ? 20 : 30) / 100;
                // We lose those health points
                if (Random.oneChanceOutOf(3)) {
                    this.getGame().getPlayer().heal(-hp);
                    additionalMessage = "You lose " + hp + " health points.";
                }
                // We gain those health points
                else {
                    this.getGame().getPlayer().heal(hp);
                    additionalMessage = "You gain " + hp + " health points.";
                }
            }
            // Strange effect
            else if (Random.oneChanceOutOf(Math.ceil((this.howManyPPotions + 1) / 6))) {
                switch (Random.between(0, 3)) {
                    case 0:
                        this.getGame().getPlayer().stop(Random.between(30, 100));
                        additionalMessage = "You can't move anymore.";
                        break;
                    case 1:
                        this.getGame().getPlayer().beginTurtle(Random.between(30, 100));
                        additionalMessage = "Now you're a turtle!";
                        break;
                    case 2:
                        this.getGame().getPlayer().setHp(this.getGame().getPlayer().getMaxHp());
                        additionalMessage = "You recover all your health.";
                        break;
                    case 3:
                        this.getGame().getPlayer().setHp(10);
                        additionalMessage = "You only have 10 health points now. Great.";
                        break;
                }
            }
            // Very strange effect
            else {
                this.getGame().getQuestLog().addMessage(new QuestLogMessage("You drink a P potion! Something strange is happening."));
                switch (Random.between(0, 2)) {
                    case 0:
                        this.castPlayerAcidRain();
                        this.castPlayerFireball();
                        this.castPlayerTeleport();
                        break;
                    case 1:
                        this.castPlayerAcidRain();
                        this.castPlayerAcidRain();
                        this.castPlayerAcidRain();
                        this.castPlayerTeleport();
                        break;
                    case 2:
                        this.castPlayerFireball();
                        this.castPlayerTeleport();
                        this.castPlayerFireball();
                        this.castPlayerTeleport();
                        this.castPlayerFireball();
                        this.castPlayerTeleport();
                        this.castPlayerFireball();
                        break;
                }
                this.getGame().getQuestLog().addMessage(new QuestLogMessage("Wait. What did you just do?"));
            }
        }
        // Increase the number of used P potions
        this.howManyPPotions += 1;
        // Add a message to the log
        if (additionalMessage != null)
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You drink a P potion! " + additionalMessage));
    };
    Quest.prototype.castPlayerThornsShield = function () {
        // Create the thorns positions array, which will contain all the positions where we want to add thorns
        var positions = this.getGame().getPlayer().getThornsPositionsArray();
        // Add the thorns
        for (var i = 0; i < positions.length; i++) {
            // Create the thorn
            var thorn = new Fireball(this, this.getGame().getPlayer().getGlobalPosition().plus(positions[i]), new Naming("A magical thorn", "a magical thorn"), new Color(ColorType.PLAYER_THORN), new Pos(2, 1), (this.getGame().isEquipped("hat", "eqItemHatSorceressHat") ? 40 : 20), this.getGame().getPlayer().getAndPossiblyCreateSpellCastingDamageReason(new Naming("A magical thorn", "a magical thorn")));
            // Add the entity
            this.addEntity(thorn);
        }
        // Add a message to the log
        this.getGame().getQuestLog().addMessage(new QuestLogMessage("You cast a thorns shield!"));
    };
    Quest.prototype.castPlayerTurtlePotion = function () {
        this.getGame().getPlayer().beginTurtle((this.getGame().isEquipped("hat", "eqItemHatSorceressHat") ? 120 : 80));
        this.getGame().getQuestLog().addMessage(new QuestLogMessage("You drink a turtle potion!"));
    };
    Quest.prototype.castPlayerSqueeze = function () {
        if (this.getGame().getPlayer().getQuestEntityMovement() != null)
            this.getGame().getPlayer().squeeze();
    };
    Quest.prototype.castPlayerTeleport = function (where, teleportArea) {
        if (where === void 0) { where = null; }
        if (teleportArea === void 0) { teleportArea = null; }
        var teleportSucceeded = false;
        var teleportPosition;
        // If there's a special position to teleport the player, but no teleport area (which means we want to teleport it to this precise point only)
        if (where != null && teleportArea == null) {
            // If we manage to teleport here
            if (this.getGame().getPlayer().teleport(where))
                teleportSucceeded = true;
        }
        // Else, no special position at all or a teleport area
        else {
            // Find where the teleport area will begin
            if (where == null)
                where = new Pos(0, 0);
            // Find the size of the teleport area
            if (teleportArea == null)
                teleportArea = new Pos(this.getRealQuestSize().x - 1, this.getRealQuestSize().y - 1);
            // We try to teleport 10 times in the teleport area, if one time succeed then it's okay, else the teleport fails
            for (var i = 0; i < 10; i++) {
                teleportPosition = where.plus(Random.fromPosition(teleportArea));
                // If we're not trying to teleport where we already are and the teleport succeed
                if (teleportPosition != this.getGame().getPlayer().getGlobalPosition() && this.getGame().getPlayer().teleport(teleportPosition)) {
                    teleportSucceeded = true;
                    break;
                }
            }
        }
        // Show a message depending on teleportSucceeded
        if (teleportSucceeded) {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You cast a teleport spell!"));
        }
        else {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You failed to cast the teleport spell. Magic works in mysterious ways..."));
        }
    };
    Quest.prototype.castPlayerTimeSlowing = function () {
        // We invert questSlowedDown
        this.getGame().setQuestSlowedDown(!this.getGame().getQuestSlowedDown());
    };
    Quest.prototype.castPlayerXPotion = function () {
        this.getGame().goToYourself();
    };
    Quest.prototype.configPlayerOrClone = function (entity) {
    };
    Quest.prototype.drawAroundQuest = function () {
        // Draw the player spells
        this.drawPlayerSpells();
        // Draw the special instruction
        this.drawSpecialInstruction();
        // Draw the quest log
        this.drawQuestLog();
    };
    Quest.prototype.drawEntities = function () {
        for (var i = 0; i < this.entities.length; i++) {
            // Let the entity draw itself
            this.entities[i].draw(this.renderArea);
            // Should we draw a health bar ?
            if (this.entities[i].getHealthBar() != null)
                this.entities[i].getHealthBar().draw(this.renderArea);
        }
    };
    Quest.prototype.endQuest = function (win) {
        // If the player won the quest
        if (win) {
            // Handle candies drops
            // We add a message to the log to tell about the candies we found
            this.getGame().getQuestLog().addMessage(new QuestLogMessage(this.getCandiesDropMessage()));
            // We give him/her the candies found during the quest
            this.candiesFound.transferTo(this.getGame().getCandies());
            // Handle chocolate bars drops
            if (this.chocolateBarsFound.getCurrent() > 0) {
                // We add a message to the log to tell about the chocolate bars we found
                this.getGame().getQuestLog().addMessage(new QuestLogMessage(this.getChocolateBarsDropMessage(), null, true));
                // We give him/her the chocolate bars found during the quest
                this.chocolateBarsFound.transferTo(this.getGame().getChocolateBars());
            }
            // Handle items drops
            for (var i = 0; i < this.itemsFound.length; i++) {
                // We show the drop message
                this.itemsFound[i].get();
                // We give him/her the item
                this.getGame().gainItem(this.itemsFound[i].getSavingName());
            }
            // We won
            this.questEndedAndWeWon = true;
        }
        // The quest ended !
        this.questEnded = true;
    };
    Quest.prototype.foundCandies = function (howMany) {
        // We check all eqItems in case they want to change how many candies were found
        for (var savingName in this.getGame().getSelectedEqItems()) {
            howMany = this.getGame().getSelectedEqItems()[savingName].foundCandies(this.getGame().getPlayer(), this, howMany);
        }
        // We add the candies found
        this.candiesFound.add(howMany);
        // We return the number of candies found
        return howMany;
    };
    Quest.prototype.foundChocolateBars = function (howMany) {
        // We add the chocolate bars found
        this.chocolateBarsFound.add(howMany);
        // We return the number of chocolate bars found
        return howMany;
    };
    Quest.prototype.foundGridOrEqItem = function (itemFound) {
        // If we already have this item, we return false
        if (Saving.loadBool(itemFound.getSavingName()) == true)
            return false;
        // If we already found this item during this quest, we return false
        for (var i = 0; i < this.itemsFound.length; i++) {
            if (itemFound.getSavingName() == this.itemsFound[i].getSavingName())
                return false;
        }
        // We add the item to our found array, tell it that we found it, and return true
        this.itemsFound.push(itemFound);
        this.itemsFound[this.itemsFound.length - 1].found();
        return true;
    };
    Quest.prototype.forceMovingAllEntities = function (movement) {
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].forceMoving(movement);
        }
    };
    Quest.prototype.getCandiesDropMessage = function () {
        return "You gain " + Algo.pluralFormat(this.candiesFound.getCurrent(), " candy", " candies") + ".";
    };
    Quest.prototype.getCandiesFoundMessage = function () {
        return "(" + this.candiesFound.getCurrentAsString() + " found so far)";
    };
    Quest.prototype.getChocolateBarsDropMessage = function () {
        return "You gain " + Algo.pluralFormat(this.chocolateBarsFound.getCurrent(), " chocolate bar", " chocolate bars") + ".";
    };
    Quest.prototype.increasePlayerPotionsCountdown = function (howMuch) {
        this.playerPotionsCountdown += howMuch;
    };
    Quest.prototype.increasePlayerSpellsCountdown = function (howMuch) {
        this.playerSpellsCountdown += howMuch;
    };
    Quest.prototype.lowerCountdowns = function () {
        // Lower spells countdown
        if (this.playerSpellsCountdown > 0)
            this.playerSpellsCountdown -= 1;
        // Lower potions countdown
        if (this.playerPotionsCountdown > 0)
            this.playerPotionsCountdown -= 1;
    };
    Quest.prototype.postDraw = function () {
        this.getGame().updatePlace();
    };
    Quest.prototype.preDraw = function () {
        // Reset the area
        this.renderArea.resetAllButSize();
    };
    Quest.prototype.resizeQuest = function (width, height, forcedRealQuestSize) {
        if (forcedRealQuestSize === void 0) { forcedRealQuestSize = null; }
        // Set the real quest drawing size
        this.realQuestDrawingSize = new Pos(width, height);
        // Set the real quest size
        if (forcedRealQuestSize == null)
            this.realQuestSize = new Pos(width, height);
        else
            this.realQuestSize = forcedRealQuestSize;
        // Resize the area
        this.renderArea.resize(this.realQuestPosition.x + width + this.sizeToAddToTheRealQuestSize.x, this.realQuestPosition.y + height + this.sizeToAddToTheRealQuestSize.y); // We add ten for the quest log !
    };
    Quest.prototype.update = function () { };
    Quest.prototype.updateEntities = function () {
        // We store the current length before calling update stuff
        var length = this.entities.length;
        // Call the update function on each entity
        for (var i = 0; i < length; i++) {
            this.entities[i].update();
        }
        // Iterate over entities for removal (the only thing they can't do by themselves..)
        for (var i = 0; i < this.entities.length; i++) {
            // If the entity should die, we remove it and we make the appropriate callback
            if (this.entities[i].shouldDie()) {
                this.entities[i].willDie();
                this.entities[i].setDead(true);
                this.entities.splice(i, 1);
                i--;
            }
            // Else, if the entity should be removed from the quest because it's out of the view, we remove it
            else if (this.entities[i].isOutOfArea()) {
                this.entities[i].setOutOfArea(true);
                this.entities.splice(i, 1);
                i--;
            }
        }
        // Lower countdowns
        this.lowerCountdowns();
    };
    Quest.prototype.willBeDisplayed = function () {
        // Some some stuff needed because we start questing
        this.getGame().setWeAreQuesting(true);
        this.getGame().getQuestCallbackCollection().addCallback(this.update.bind(this));
        // Add some hotkeys
        for (var i = 0; i < this.playerSpellsHotkeys.length; i++) {
            this.getGame().addHotkey(this.playerSpellsHotkeys[i]);
        }
    };
    Quest.prototype.willBeClosed = function () {
        this.getGame().setWeAreQuesting(false);
    };
    // Public getters
    Quest.prototype.getBottomLimit = function () {
        return 20;
    };
    Quest.prototype.getCandiesFound = function () {
        return this.candiesFound;
    };
    Quest.prototype.getChocolateBarsFound = function () {
        return this.chocolateBarsFound;
    };
    Quest.prototype.getEntities = function () {
        return this.entities;
    };
    Quest.prototype.getGap = function () {
        // We find the perfect gap so that the player would be in the center
        var gap = (this.renderArea.getWidth() - 100) - (this.getGame().getPlayer().getGlobalPosition().x - 50) * 2;
        // We possibly correct this gap to keep the quest in the center if the player is in the left or right of the quest
        if (gap > (this.renderArea.getWidth() - 100))
            gap = (this.renderArea.getWidth() - 100);
        if (gap < -(this.renderArea.getWidth() - 100))
            gap = -(this.renderArea.getWidth() - 100);
        // We return the possibly corrected gap
        return gap;
    };
    Quest.prototype.getGlobalDrawingOffset = function () {
        return this.globalDrawingOffset;
    };
    Quest.prototype.getGravityDisabled = function () {
        return this.gravityDisabled;
    };
    Quest.prototype.getLastEntity = function () {
        return this.entities[this.entities.length - 1];
    };
    Quest.prototype.getLeftLimit = function () {
        return 20;
    };
    Quest.prototype.getPlayerCollisionBoxes = function () {
        return this.playerCollisionBoxes;
    };
    Quest.prototype.getPlayerPotionsCountdown = function () {
        return this.playerPotionsCountdown;
    };
    Quest.prototype.getPlayerSpellsCountdown = function () {
        return this.playerSpellsCountdown;
    };
    Quest.prototype.getQuestEnded = function () {
        return this.questEnded;
    };
    Quest.prototype.getQuestEndedAndWeWon = function () {
        return this.questEndedAndWeWon;
    };
    Quest.prototype.getRealQuestDrawingSize = function () {
        return this.realQuestDrawingSize;
    };
    Quest.prototype.getRealQuestPosition = function () {
        return this.realQuestPosition;
    };
    Quest.prototype.getRealQuestSize = function () {
        return this.realQuestSize;
    };
    Quest.prototype.getRenderArea = function () {
        return this.renderArea;
    };
    Quest.prototype.getRightLimit = function () {
        return 20;
    };
    Quest.prototype.getTopLimit = function () {
        return 20;
    };
    Quest.prototype.getWormsLikeDisabled = function () {
        return this.wormsLikeDisabled;
    };
    // Public setters
    Quest.prototype.setGlobalDrawingOffset = function (globalDrawingOffset) {
        this.globalDrawingOffset = globalDrawingOffset;
    };
    Quest.prototype.setGravityDisabled = function (gravityDisabled) {
        this.gravityDisabled = gravityDisabled;
    };
    Quest.prototype.setWormsLikeDisabled = function (wormsLikeDisabled) {
        this.wormsLikeDisabled = wormsLikeDisabled;
    };
    // Private methods
    Quest.prototype.addPlayerSpell = function (playerSpell) {
        this.playerSpells.push(playerSpell);
        this.playerSpellsHotkeys.push(playerSpell.getHotkey());
    };
    Quest.prototype.createPlayerAcidDrop = function (position) {
        var acidDrop = new Fireball(this, position, new Naming("An acid drop", "an acid drop"), new Color(ColorType.PLAYER_ACID_DROP), new Pos(1, 1), 8, this.getGame().getPlayer().getAndPossiblyCreateSpellCastingDamageReason(new Naming("An acid drop", "an acid drop")));
        // No target
        acidDrop.setTargetTypeNoTarget(new Pos(0, 1));
        // Return the acid drop
        return acidDrop;
    };
    Quest.prototype.createPlayerSpells = function () {
        // Add the spells
        if (Saving.loadBool("gridItemPossessedBeginnersGrimoire")) {
            this.addPlayerSpell(new QuestPlayerSpell(this, "questPlayerSpellAcidRainButton", new Pos(0, 0), "Acid rain", new Color(ColorType.QUEST_BUTTON_ACID_RAIN), new CallbackCollection(this.castPlayerAcidRain.bind(this)), QuestPlayerSpellCountdownType.SPELLS, this.getMagicCountdownTime(), 0, "a"));
            this.addPlayerSpell(new QuestPlayerSpell(this, "questPlayerSpellFireballButton", new Pos(11, 0), "Fireball", new Color(ColorType.QUEST_BUTTON_FIREBALL), new CallbackCollection(this.castPlayerFireball.bind(this)), QuestPlayerSpellCountdownType.SPELLS, this.getMagicCountdownTime(), 0, "f"));
            this.addPlayerSpell(new QuestPlayerSpell(this, "questPlayerSpellTeleportButton", new Pos(21, 0), "Teleport", new Color(ColorType.QUEST_BUTTON_TELEPORT), new CallbackCollection(this.castPlayerTeleport.bind(this)), QuestPlayerSpellCountdownType.SPELLS, this.getMagicCountdownTime(), 0, "t"));
        }
        if (Saving.loadBool("gridItemPossessedAdvancedGrimoire")) {
            this.addPlayerSpell(new QuestPlayerSpell(this, "questPlayerSpellEraseMagicButton", new Pos(33, 0), "Erase magic", new Color(ColorType.QUEST_BUTTON_ERASE_MAGIC), new CallbackCollection(this.castPlayerEraseMagic.bind(this)), QuestPlayerSpellCountdownType.SPELLS, this.getMagicCountdownTime(), 0, "e"));
            this.addPlayerSpell(new QuestPlayerSpell(this, "questPlayerSpellThornsShieldButton", new Pos(46, 0), "Thorns shield", new Color(ColorType.QUEST_BUTTON_THORNS_SHIELD), new CallbackCollection(this.castPlayerThornsShield.bind(this)), QuestPlayerSpellCountdownType.SPELLS, this.getMagicCountdownTime(), 6, " "));
        }
        if (Saving.loadBool("gridItemPossessedBlackMagicGrimoire")) {
            this.addPlayerSpell(new QuestPlayerSpell(this, "questPlayerSpellObsidianWallButton", new Pos(63, 0), "Obsidian wall", new Color(ColorType.QUEST_BUTTON_OBSIDIAN_WALL), new CallbackCollection(this.castPlayerObsidianWall.bind(this)), QuestPlayerSpellCountdownType.SPELLS, this.getMagicCountdownTime(), 0, "o"));
            this.addPlayerSpell(new QuestPlayerSpell(this, "questPlayerSpellBlackDemonsButton", new Pos(78, 0), "Black demons", new Color(ColorType.QUEST_BUTTON_BLACK_DEMONS), new CallbackCollection(this.castPlayerBlackDemons.bind(this)), QuestPlayerSpellCountdownType.SPELLS, this.getMagicCountdownTime(), 6, "d"));
        }
        // Add the potions
        if (Saving.loadBool("questPlayerSpellHealthPotionHasSpell"))
            this.addPlayerSpell(new QuestPlayerSpell(this, "questPlayerSpellHealthPotionButton", new Pos(0, 2), "Health", new Color(ColorType.QUEST_BUTTON_HEALTH_POTION), new CallbackCollection(this.castPlayerHealthPotion.bind(this)), QuestPlayerSpellCountdownType.POTIONS, this.getMagicCountdownTime(), 0, "h", "questPlayerSpellHealthPotionQuantity"));
        if (Saving.loadBool("questPlayerSpellTurtlePotionHasSpell"))
            this.addPlayerSpell(new QuestPlayerSpell(this, "questPlayerSpellTurtlePotionButton", new Pos(13, 2), "Turtle", new Color(ColorType.QUEST_BUTTON_TURTLE_POTION), new CallbackCollection(this.castPlayerTurtlePotion.bind(this)), QuestPlayerSpellCountdownType.POTIONS, this.getMagicCountdownTime(), 2, "r", "questPlayerSpellTurtlePotionQuantity"));
        if (Saving.loadBool("questPlayerSpellAntiGravityPotionHasSpell"))
            this.addPlayerSpell(new QuestPlayerSpell(this, "questPlayerSpellAntiGravityPotionButton", new Pos(26, 2), "Anti gravity", new Color(ColorType.QUEST_BUTTON_ANTI_GRAVITY_POTION), new CallbackCollection(this.castPlayerAntiGravityPotion.bind(this)), QuestPlayerSpellCountdownType.POTIONS, this.getMagicCountdownTime(), 5, "g", "questPlayerSpellAntiGravityPotionQuantity"));
        if (Saving.loadBool("questPlayerSpellBerserkPotionHasSpell"))
            this.addPlayerSpell(new QuestPlayerSpell(this, "questPlayerSpellBerserkPotionButton", new Pos(45, 2), "Berserk", new Color(ColorType.QUEST_BUTTON_BERSERK_POTION), new CallbackCollection(this.castPlayerBerserkPotion.bind(this)), QuestPlayerSpellCountdownType.POTIONS, this.getMagicCountdownTime(), 0, "b", "questPlayerSpellBerserkPotionQuantity"));
        if (Saving.loadBool("questPlayerSpellCloningPotionHasSpell"))
            this.addPlayerSpell(new QuestPlayerSpell(this, "questPlayerSpellCloningPotionButton", new Pos(59, 2), "Cloning", new Color(ColorType.QUEST_BUTTON_CLONING_POTION), new CallbackCollection(this.castPlayerCloningPotion.bind(this)), QuestPlayerSpellCountdownType.POTIONS, this.getMagicCountdownTime(), 0, "c", "questPlayerSpellCloningPotionQuantity"));
        if (Saving.loadBool("questPlayerSpellPPotionHasSpell"))
            this.addPlayerSpell(new QuestPlayerSpell(this, "questPlayerSpellPPotionButton", new Pos(73, 2), "P", new Color(ColorType.QUEST_BUTTON_P_POTION), new CallbackCollection(this.castPlayerPPotion.bind(this)), QuestPlayerSpellCountdownType.POTIONS, this.getMagicCountdownTime(), 0, "p", "questPlayerSpellPPotionQuantity"));
        if (Saving.loadBool("questPlayerSpellXPotionHasSpell"))
            this.addPlayerSpell(new QuestPlayerSpell(this, "questPlayerSpellXPotionButton", new Pos(81, 2), "X", new Color(ColorType.QUEST_BUTTON_X_POTION), new CallbackCollection(this.castPlayerXPotion.bind(this)), QuestPlayerSpellCountdownType.POTIONS, this.getMagicCountdownTime(), 0, "x", "questPlayerSpellXPotionQuantity"));
        // Add the capacities granted by objects
        if (Saving.loadBool("gridItemPossessedTimeRing"))
            this.addPlayerSpell(new QuestPlayerSpell(this, "questPlayerSpellTimeSlowingButton", new Pos(0, 4), "Time slowing", new Color(ColorType.QUEST_BUTTON_SOME_OBJECT), new CallbackCollection(this.castPlayerTimeSlowing.bind(this)), QuestPlayerSpellCountdownType.ITEM_CAPACITIES, 0, 8, "w"));
        if (Saving.loadBool("gridItemPossessedPogoStick"))
            this.addPlayerSpell(new QuestPlayerSpell(this, "questPlayerSpellJumpButton", new Pos(14, 4), "Jump", new Color(ColorType.QUEST_BUTTON_SOME_OBJECT), new CallbackCollection(this.castPlayerJump.bind(this)), QuestPlayerSpellCountdownType.ITEM_CAPACITIES, 0, 0, "j"));
        if (Saving.loadBool("gridItemPossessedSponge"))
            this.addPlayerSpell(new QuestPlayerSpell(this, "questPlayerSpellSqueezeButton", new Pos(20, 4), "Squeeze", new Color(ColorType.QUEST_BUTTON_SOME_OBJECT), new CallbackCollection(this.castPlayerSqueeze.bind(this)), QuestPlayerSpellCountdownType.ITEM_CAPACITIES, 0, 0, "s"));
        // Add the special spell granted by the purple shark fin
        if (Saving.loadBool("gridItemPossessedPurpleSharkFin"))
            this.addPlayerSpell(new QuestPlayerSpell(this, "questPlayerSpell", new Pos(38, 4), "Black hole spell (purple shark fin) (once per quest)", new Color(ColorType.QUEST_BLACKHOLE_SPELL), new CallbackCollection(this.castPlayerBlackhole.bind(this)), QuestPlayerSpellCountdownType.BLACKHOLE, 1, 4, "k"));
        // Set the player spells height from the max height found in all the spells added
        this.playerSpellsHeight = 0;
        for (var i = 0; i < this.playerSpells.length; i++) {
            if (this.playerSpells[i].getButtonPosition().y > this.playerSpellsHeight)
                this.playerSpellsHeight = this.playerSpells[i].getButtonPosition().y;
        }
        this.playerSpellsHeight += 1; // Add one because for example if the highest spell is at 0 we need a 1 height
        this.playerSpellsHeight += 1; // Add one to make a clear separation with the real quest
    };
    Quest.prototype.drawPlayerSpells = function () {
        // If there's at least one player spell
        if (this.playerSpells.length > 0) {
            var baseXPosition = ((this.renderArea.getWidth() - 100) - this.getGap()) / 2;
            // Draw the spells
            for (var i = 0; i < this.playerSpells.length; i++) {
                this.playerSpells[i].draw(this.renderArea, new Pos(baseXPosition, 2));
            }
            // Draw the spell countdown
            if (this.playerSpellsCountdown > 0) {
                this.renderArea.drawString("(" + Math.ceil(this.playerSpellsCountdown / 10).toString() + " sec)", baseXPosition + 92, 2);
                this.renderArea.addColor(baseXPosition + 92, baseXPosition + 100, 2, new Color(ColorType.QUEST_COUNTDOWN));
            }
            // Draw the potion countdown
            if (this.playerPotionsCountdown > 0) {
                this.renderArea.drawString("(" + Math.ceil(this.playerPotionsCountdown / 10).toString() + " sec)", baseXPosition + 92, 4);
                this.renderArea.addColor(baseXPosition + 92, baseXPosition + 100, 4, new Color(ColorType.QUEST_COUNTDOWN));
            }
        }
    };
    Quest.prototype.drawQuestLog = function () {
        this.getGame().getQuestLog().draw(this.renderArea, new Pos(((this.renderArea.getWidth() - 100) - this.getGap()) / 2, this.renderArea.getHeight() - 12));
    };
    Quest.prototype.drawSpecialInstruction = function () {
        if (this.specialInstruction != null) {
            this.renderArea.drawString(this.specialInstruction, this.realQuestPosition.x, this.realQuestPosition.y - 1);
            this.renderArea.addBold(this.realQuestPosition.x, this.realQuestPosition.x + this.specialInstruction.length, this.realQuestPosition.y - 1);
        }
    };
    Quest.prototype.getMagicCountdownTime = function () {
        var time = 0;
        // If we have the sorceress hat, the base time is 50
        if (this.getGame().isEquipped("hat", "eqItemHatSorceressHat"))
            time = 50;
        // Else, it's 80
        else
            time = 80;
        // Reduce the time thanks to the magic gift
        time -= time * (Saving.loadNumber("gameGiftMagic") * 15 / 100);
        // Set the time to 0 if it is < 0 (which shouldn't happen anyway, but you know, since some people will probably modify the game variables by themselves it's better if we try to avoid bugs)
        if (time < 0)
            time = 0;
        // Return the time
        return time;
    };
    return Quest;
}(Place));
//# sourceMappingURL=Quest.js.map