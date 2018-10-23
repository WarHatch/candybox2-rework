var QuestEntity = /** @class */ (function () {
    // Constructor
    function QuestEntity(quest, globalPosition, naming, renderArea, renderAreaPosition, cbc, questEntityMovement, questEntityAnimation) {
        if (naming === void 0) { naming = new Naming("???", "???"); }
        if (renderArea === void 0) { renderArea = null; }
        if (renderAreaPosition === void 0) { renderAreaPosition = new Pos(0, 0); }
        if (cbc === void 0) { cbc = null; }
        if (questEntityMovement === void 0) { questEntityMovement = null; }
        if (questEntityAnimation === void 0) { questEntityAnimation = null; }
        // Is dead ?
        this.dead = false;
        // Is out of area ?
        this.outOfArea = false;
        // Is destructible ?
        this.destructible = false;
        // Should the health bar be shown ?
        this.healthBar = null;
        this.transparency = null;
        this.noMovementLastUpdate = true;
        // Weapon
        this.questEntityWeapons = [];
        // Spell casters
        this.questEntitySpellCasters = [];
        // Last damage reason
        this.lastDamageReason = null;
        // Naming
        this.naming = null;
        // Team
        this.team = QuestEntityTeam.MOBS; // The default team of an entity is MOBS because most entities want to use this one
        // Can it be forced to move?
        this.canBeForcedToMove = true;
        // The special spell casting damage reason, null until we create it
        this.spellCastingDamageReason = null;
        // Is a spell?
        this.isASpell = false;
        // Is jumping?
        this.jumping = false;
        this.jumpSpeed = null;
        this.jumpDuration = null;
        // Is controlled falling? (controlled falling is when we fall after a jump for example, it means that we can move while falling)
        this.controlledFalling = false;
        // Is stopped?
        this.stopped = false;
        this.stoppedDuration = null;
        // Is affected by anti gravity?
        this.antiGravity = false;
        this.antiGravityDuration = null;
        // Is a turtle?
        this.turtle = false;
        this.turtleDuration = null;
        this.turtleLastMovement = null;
        // Is in berserk mode?
        this.berserk = false;
        this.berserkDuration = null;
        // Apply parameters
        this.quest = quest;
        this.globalPosition = globalPosition;
        this.naming = naming;
        this.setRenderArea(renderArea);
        this.renderAreaPosition = renderAreaPosition;
        this.setCbc(cbc);
        this.setQuestEntityMovement(questEntityMovement);
        this.setQuestEntityAnimation(questEntityAnimation);
    }
    // Public methods
    QuestEntity.prototype.addQuestEntitySpellCaster = function (questEntitySpellCaster) {
        this.questEntitySpellCasters.push(questEntitySpellCaster);
    };
    QuestEntity.prototype.addQuestEntityWeapon = function (questEntityWeapon) {
        this.questEntityWeapons.push(questEntityWeapon);
    };
    QuestEntity.prototype.beginAntiGravity = function (antiGravityDuration) {
        if (this.antiGravity == false) {
            this.antiGravity = true;
            this.antiGravityDuration = antiGravityDuration;
            return true;
        }
        return false;
    };
    QuestEntity.prototype.beginBerserk = function (berserkDuration) {
        if (this.berserk == false) {
            this.berserk = true;
            this.berserkDuration = berserkDuration;
            this.setHp(Math.ceil(this.getHp() / 2));
            return true;
        }
        return false;
    };
    QuestEntity.prototype.beginTurtle = function (turtleDuration) {
        if (this.turtle == false) {
            this.turtle = true;
            this.turtleDuration = turtleDuration;
            this.turtleLastMovement = 0;
            return true;
        }
        return false;
    };
    QuestEntity.prototype.canJumpInMidAir = function () {
        return false;
    };
    QuestEntity.prototype.checkCollision = function (pos) {
        if (pos === void 0) { pos = new Pos(0, 0); }
        // BUGS : if the level is >= 4, we just return a random value
        if (Bugs.getQuestBugLevel() >= 4)
            return Random.flipACoin();
        for (var i = 0; i < this.quest.getEntities().length; i++) {
            // If it's not the same object as us
            if (this.quest.getEntities()[i] != this) {
                // If we collide with it, we return true
                if (this.collidesWith(this.quest.getEntities()[i], pos))
                    return true;
            }
        }
        // No collision
        return false;
    };
    QuestEntity.prototype.collidesWith = function (questEntity, pos) {
        if (pos === void 0) { pos = new Pos(0, 0); }
        // If we both have a collision box collection, we return the result of the collision test
        if (this.cbc != null && questEntity.getCbc() != null)
            return this.cbc.collidesWith(questEntity.getCbc(), pos);
        // Else, we return false, there can't be any collision
        return false;
    };
    QuestEntity.prototype.draw = function (renderArea) {
        if (this.renderArea != null) {
            // On some conditions, we exit now and don't draw anything (it allows no drawing outside of the quest panel when realQuestSize and realQuestDrawingSize are different (in the hole for example)
            if (this.globalPosition.x + this.renderAreaPosition.x + this.quest.getGlobalDrawingOffset().x > this.quest.getRealQuestDrawingSize().x)
                return;
            if (this.globalPosition.y + this.renderAreaPosition.y + this.quest.getGlobalDrawingOffset().y > this.quest.getRealQuestDrawingSize().y)
                return;
            if (this.globalPosition.x + this.renderAreaPosition.x + this.renderArea.getWidth() + this.quest.getGlobalDrawingOffset().x < 0)
                return;
            if (this.globalPosition.y + this.renderAreaPosition.y + this.renderArea.getHeight() + this.quest.getGlobalDrawingOffset().y < 0)
                return;
            renderArea.drawArea(this.renderArea, this.quest.getRealQuestPosition().x + this.quest.getGlobalDrawingOffset().x + this.globalPosition.x + this.renderAreaPosition.x, this.quest.getRealQuestPosition().y + this.quest.getGlobalDrawingOffset().y + this.globalPosition.y + this.renderAreaPosition.y, this.transparency);
        }
        // If the debug mode is on
        if (Saving.loadBool("gameDebug")) {
            if (this.cbc != null) {
                for (var i = 0; i < this.cbc.getBoxes().length; i++) {
                    for (var k = 0; k < this.cbc.getBoxes()[i].getSize().x; k++) {
                        for (var j = 0; j < this.cbc.getBoxes()[i].getSize().y; j++) {
                            renderArea.drawString("D", this.quest.getRealQuestPosition().x + this.quest.getGlobalDrawingOffset().x + this.globalPosition.x + this.cbc.getBoxes()[i].getPosition().x + k, this.quest.getRealQuestPosition().y + this.quest.getGlobalDrawingOffset().y + this.globalPosition.y + this.cbc.getBoxes()[i].getPosition().y + j);
                        }
                    }
                }
            }
        }
    };
    QuestEntity.prototype.forceMoving = function (movement) {
        if (this.canBeForcedToMove)
            this.move(movement, true);
    };
    QuestEntity.prototype.getAndPossiblyCreateSpellCastingDamageReason = function (naming) {
        // If our spell casting damage reason is null, we create it
        if (this.spellCastingDamageReason == null) {
            this.spellCastingDamageReason = new QuestEntityDamageReason(QuestEntityDamageReasonWhoType.ENTITY, QuestEntityDamageReasonWhatType.SPELL);
            this.spellCastingDamageReason.setQuestEntity(this);
        }
        // We set the naming given
        this.spellCastingDamageReason.setSpellNaming(naming);
        // We return it
        return this.spellCastingDamageReason;
    };
    QuestEntity.prototype.getDeathMessage = function () {
        // If there's a last damage reason
        if (this.getLastDamageReason() != null) {
            return this.getLastDamageReason().getWhoNaming().getBeginning() + " killed " + this.naming.getAnywhere() + " with " + this.getLastDamageReason().getWhatNaming().getAnywhere() + ".";
        }
        // Else
        return this.naming.getBeginning() + " was erased from reality.";
    };
    QuestEntity.prototype.getRenderAreaCenter = function () {
        if (this.renderArea != null)
            return this.globalPosition.plus(new Pos(Math.floor(this.renderArea.getWidth() / 2), Math.floor(this.renderArea.getHeight() / 2)));
        return this.globalPosition;
    };
    QuestEntity.prototype.goTowards = function (ourPosition, goalPosition, minDistance, speed, dontTakeYInAccount) {
        if (minDistance === void 0) { minDistance = 0; }
        if (speed === void 0) { speed = new Pos(1, 1); }
        if (dontTakeYInAccount === void 0) { dontTakeYInAccount = false; }
        // We create the movement
        var movement = new Pos(0, 0);
        // We find the distance between our position and the position where we want to go
        var distance = ourPosition.getDistance(goalPosition);
        // If the x distance is the biggest (we do /2 because characters are thin in the ascii art world!) and big enough (or if we don't take in account y)
        if ((Math.abs(distance.x) / 2 > Math.abs(distance.y) && Math.abs(distance.x) > minDistance * 2) || dontTakeYInAccount) {
            if (distance.x > 0)
                movement.x = -speed.x;
            else if (distance.x < 0)
                movement.x = speed.x;
        }
        // Else, the y distance is the biggest and big enough
        else if (Math.abs(distance.y) > minDistance) {
            if (distance.y > 0)
                movement.y = -speed.y;
            else if (distance.y < 0)
                movement.y = speed.y;
        }
        // We use this movement to set our quest entity movement's offset
        this.getQuestEntityMovement().setOffset(movement);
    };
    QuestEntity.prototype.heal = function (hp) {
        this.setHp(this.getHp() + hp);
    };
    QuestEntity.prototype.hit = function (questEntity, damage, reason) {
        // BUGS
        if (Bugs.getQuestBugLevel() >= 1)
            damage *= Random.between(1, 3);
        if (this.berserk == false)
            questEntity.inflictDamage(damage, reason);
        else
            questEntity.inflictDamage(damage * 2, reason);
    };
    QuestEntity.prototype.inflictDamage = function (damage, reason) {
        // We save the damage reason
        this.lastDamageReason = reason;
        // If we're destructible, we get the damage
        if (this.destructible) {
            // If we're not a turtle
            if (this.turtle == false)
                this.setHp(this.getHp() - damage);
            // Else, we're a turtle
            else
                this.setHp(this.getHp() - Math.ceil(damage / 2));
        }
    };
    QuestEntity.prototype.isOutOfArea = function () {
        // If the entity if too much out of the area, we return true
        if (this.globalPosition.x < -this.getQuest().getLeftLimit())
            return true;
        if (this.globalPosition.y < -this.getQuest().getTopLimit())
            return true;
        if (this.globalPosition.x > this.quest.getRealQuestSize().x + this.getQuest().getRightLimit())
            return true;
        if (this.globalPosition.y > this.quest.getRealQuestSize().y + this.getQuest().getBottomLimit())
            return true;
        // Else we return false
        return false;
    };
    QuestEntity.prototype.jump = function (jumpDuration, jumpSpeed) {
        if (jumpSpeed === void 0) { jumpSpeed = 1; }
        // BUGS
        if (Bugs.getQuestBugLevel() >= 2)
            jumpSpeed = Random.between(1, 5);
        // If we're not already jumping or controlled falling and we would collide by going down (which means we're on the ground), we jump (we also jump without checking all that if we are able to jump in mid-air)
        if ((this.jumping == false && this.controlledFalling == false && this.checkCollision(new Pos(0, 1))) || this.canJumpInMidAir()) {
            this.jumping = true;
            this.jumpDuration = jumpDuration;
            this.jumpSpeed = jumpSpeed;
            return true;
        }
        return false;
    };
    QuestEntity.prototype.move = function (pos, force) {
        if (force === void 0) { force = false; }
        // BUGS
        if (Bugs.getQuestBugLevel() >= 3 || (Bugs.getQuestBugLevel() >= 2 && Random.oneChanceOutOf(3)) || (Bugs.getQuestBugLevel() >= 1 && Random.oneChanceOutOf(5))) {
            pos.x += Random.between(1, 3) - 2;
            pos.y += Random.between(1, 3) - 2;
        }
        // If we're not a turtle or this isn't a pure horizontal movement (turtles only care about horizontal movement)
        if (this.turtle == false || pos.y != 0)
            return this.setGlobalPosition(this.globalPosition.plus(pos), force);
        // Else, we're a turtle
        else {
            // We check the duration
            if (this.turtleDuration > 0) {
                this.turtleDuration -= 1;
            }
            else
                this.stopTurtle();
            // If the movement is >= 2
            if (this.turtleLastMovement >= 2) {
                this.turtleLastMovement = 0; // We reset the movement
                return this.setGlobalPosition(this.globalPosition.plus(pos), force); // We move
            }
            // Else, we increase the movement
            else {
                this.turtleLastMovement += 1;
                return false;
            }
        }
    };
    QuestEntity.prototype.moveWormsLike = function (pos) {
        // If we can move normally
        if (this.checkCollision(pos) == false) {
            // If we can't move two steps below but we can move on step below, then we move one step below (if we're not jumping or controlled falling)
            if (this.checkCollision(pos.plus(new Pos(0, 2))) == true && this.checkCollision(pos.plus(new Pos(0, 1))) == false && this.jumping == false && this.controlledFalling == false) {
                return this.move(pos.plus(new Pos(0, 1)));
            }
            // Else we just move normally
            else {
                return this.move(pos);
            }
        }
        // Else, if we can move just one step above (and we're not jumping or controlled falling)
        else if (this.checkCollision(pos.plus(new Pos(0, -1))) == false && this.jumping == false && this.controlledFalling == false) {
            // We move one step above
            return this.move(pos.plus(new Pos(0, -1)));
        }
        // Else we don't move
        return false;
    };
    QuestEntity.prototype.removeQuestEntityWeapons = function () {
        this.questEntityWeapons = [];
    };
    QuestEntity.prototype.setGlobalPosition = function (pos, force) {
        if (force === void 0) { force = false; }
        var oldPosition = this.globalPosition;
        this.globalPosition = pos;
        // Check for collisions : restore the old position and return false if the movement would cause a collision
        if (force == false && this.checkCollision()) {
            this.globalPosition = oldPosition;
            return false;
        }
        // Return true
        return true;
    };
    QuestEntity.prototype.shouldDie = function () {
        // Return true if we are destructible and have 0 hp or we're already dead
        if ((this.destructible == true && this.hp <= 0) || this.dead == true)
            return true;
        return false;
    };
    QuestEntity.prototype.stop = function (stoppedDuration) {
        // If we're not already stopped
        if (this.stopped == false) {
            this.stopped = true;
            this.stoppedDuration = stoppedDuration;
            return true;
        }
        return false;
    };
    QuestEntity.prototype.stopBerserk = function () {
        this.berserk = false;
    };
    QuestEntity.prototype.stopTurtle = function () {
        this.turtle = false;
    };
    QuestEntity.prototype.teleport = function (pos) {
        return this.setGlobalPosition(pos);
    };
    QuestEntity.prototype.testNewGlobalPosition = function (pos) {
        var oldPosition = this.globalPosition;
        this.globalPosition = pos;
        // If there's a collision, restore the old position and return false
        if (this.checkCollision()) {
            this.globalPosition = oldPosition;
            return false;
        }
        // Else, restore the old position and return true
        this.globalPosition = oldPosition;
        return true;
    };
    QuestEntity.prototype.update = function () {
        // We handle berserk mode
        if (this.berserk) {
            if (this.berserkDuration > 0) {
                this.berserkDuration -= 1;
            }
            else {
                this.stopBerserk();
            }
        }
        // We handle animation
        this.handleAnimation();
        // We handle gravity, and then movement if gravity had no effect
        this.noMovementLastUpdate = true;
        if (this.handleGravity() == false)
            this.handleMovement();
        // We handle combat
        this.handleCombat();
    };
    // Default behaviour of this function : displaying a simple death message in the quest log
    QuestEntity.prototype.willDie = function () {
        this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage(this.getDeathMessage()));
    };
    // Public getters
    QuestEntity.prototype.getBerserk = function () {
        return this.berserk;
    };
    QuestEntity.prototype.getCbc = function () {
        return this.cbc;
    };
    QuestEntity.prototype.getDead = function () {
        return this.dead;
    };
    QuestEntity.prototype.getDestructible = function () {
        return this.destructible;
    };
    QuestEntity.prototype.getGlobalPosition = function () {
        return this.globalPosition;
    };
    QuestEntity.prototype.getHealthBar = function () {
        return this.healthBar;
    };
    QuestEntity.prototype.getHp = function () {
        return this.hp;
    };
    QuestEntity.prototype.getIsASpell = function () {
        return this.isASpell;
    };
    QuestEntity.prototype.getJumping = function () {
        return this.jumping;
    };
    QuestEntity.prototype.getLastDamageReason = function () {
        return this.lastDamageReason;
    };
    QuestEntity.prototype.getLastQuestEntitySpellCaster = function () {
        return this.questEntitySpellCasters[this.questEntitySpellCasters.length - 1];
    };
    QuestEntity.prototype.getLastQuestEntityWeapon = function () {
        return this.questEntityWeapons[this.questEntityWeapons.length - 1];
    };
    QuestEntity.prototype.getMaxHp = function () {
        return this.maxHp;
    };
    QuestEntity.prototype.getNaming = function () {
        return this.naming;
    };
    QuestEntity.prototype.getNoMovementLastUpdate = function () {
        return this.noMovementLastUpdate;
    };
    QuestEntity.prototype.getOutOfArea = function () {
        return this.outOfArea;
    };
    QuestEntity.prototype.getQuest = function () {
        return this.quest;
    };
    QuestEntity.prototype.getQuestEntityAnimation = function () {
        return this.questEntityAnimation;
    };
    QuestEntity.prototype.getQuestEntityMovement = function () {
        return this.questEntityMovement;
    };
    QuestEntity.prototype.getQuestEntityWeapons = function () {
        return this.questEntityWeapons;
    };
    QuestEntity.prototype.getRenderArea = function () {
        return this.renderArea;
    };
    QuestEntity.prototype.getRenderAreaPosition = function () {
        return this.renderAreaPosition;
    };
    QuestEntity.prototype.getTeam = function () {
        return this.team;
    };
    QuestEntity.prototype.getTurtle = function () {
        return this.turtle;
    };
    // Public setters
    QuestEntity.prototype.setCanBeForcedToMove = function (canBeForcedToMove) {
        this.canBeForcedToMove = canBeForcedToMove;
    };
    QuestEntity.prototype.setCbc = function (cbc) {
        this.cbc = cbc;
    };
    QuestEntity.prototype.setDead = function (dead) {
        this.dead = dead;
    };
    QuestEntity.prototype.setDestructible = function (value) {
        this.destructible = value;
    };
    QuestEntity.prototype.setHealthBar = function (healthBar) {
        this.healthBar = healthBar;
    };
    QuestEntity.prototype.setHp = function (hp) {
        // BUGS
        if (Bugs.getQuestBugLevel() >= 2)
            hp *= Random.between(1, 5);
        this.hp = hp;
        if (this.hp > this.maxHp)
            this.hp = this.maxHp;
        if (this.hp < 0)
            this.hp = 0;
        this.tryToUpdateHealthBar();
    };
    QuestEntity.prototype.setIsASpell = function (isASpell) {
        this.isASpell = isASpell;
    };
    QuestEntity.prototype.setMaxHp = function (maxHp) {
        // BUGS
        if (Bugs.getQuestBugLevel() >= 4)
            maxHp *= Random.between(1, 5);
        this.maxHp = maxHp;
        this.tryToUpdateHealthBar();
    };
    QuestEntity.prototype.setOutOfArea = function (outOfArea) {
        this.outOfArea = outOfArea;
    };
    QuestEntity.prototype.setQuest = function (quest) {
        this.quest = quest;
    };
    QuestEntity.prototype.setQuestEntityAnimation = function (questEntityAnimation) {
        // We set the animation
        this.questEntityAnimation = questEntityAnimation;
        // We update for the first time if not null
        if (this.questEntityAnimation != null)
            this.questEntityAnimation.draw(this.renderArea);
    };
    QuestEntity.prototype.setQuestEntityMovement = function (questEntityMovement) {
        this.questEntityMovement = questEntityMovement;
    };
    QuestEntity.prototype.setRenderArea = function (renderArea) {
        this.renderArea = renderArea;
    };
    QuestEntity.prototype.setTeam = function (questEntityTeam) {
        this.team = questEntityTeam;
    };
    QuestEntity.prototype.setTransparency = function (transparency) {
        this.transparency = transparency;
    };
    // Private methods
    QuestEntity.prototype.handleAnimation = function () {
        if (this.questEntityAnimation != null) {
            this.questEntityAnimation.update();
            if (this.questEntityAnimation.shouldUpdateRenderAreaAtThisFrame()) {
                this.renderArea.resetAllButSize();
                this.questEntityAnimation.draw(this.renderArea);
            }
        }
    };
    QuestEntity.prototype.handleCombat = function () {
        // We iterate over weapons and use them
        for (var i = 0; i < this.questEntityWeapons.length; i++) {
            this.questEntityWeapons[i].handleCombat();
        }
        // We iterate over spellc asters and use them
        for (var i = 0; i < this.questEntitySpellCasters.length; i++) {
            this.questEntitySpellCasters[i].tryToCast();
        }
    };
    QuestEntity.prototype.handleGravity = function () {
        // If we're jumping, we handle jumping
        if (this.jumping == true) {
            // Decrease the jump duration
            this.jumpDuration -= 1;
            // If this is the last jumping frame, we stop jumping and don't jump at this frame
            if (this.jumpDuration <= 0) {
                this.jumping = false;
                this.controlledFalling = true;
            }
            // Else, we try to jump
            else {
                // If we don't manage to jump, stop jumping
                if (this.move(new Pos(0, -this.jumpSpeed)) == false) {
                    this.jumping = false;
                    this.controlledFalling = true;
                }
            }
            // Return false so that we can move while jumping
            return false;
        }
        // Else, we try to handle gravity
        else {
            // If we're not affected by anti-gravity and gravity isn't disabled in the whole quest
            if (this.antiGravity == false && this.getQuest().getGravityDisabled() == false) {
                if (this.questEntityMovement != null && this.questEntityMovement.getGravity()) {
                    if (this.move(new Pos(0, 1))) {
                        if (this.controlledFalling == false)
                            return true; // If we weren't controlling our falling, then we return true because we can't move
                    }
                    else
                        this.controlledFalling = false; // If we hit the ground above, no mroe controlled falling
                }
            }
            else {
                this.antiGravityDuration -= 1;
                if (this.antiGravityDuration <= 0)
                    this.antiGravity = false;
            }
        }
        // Gravity had no effect
        return false;
    };
    QuestEntity.prototype.handleMovement = function () {
        // If we're not stopped
        if (this.stopped == false) {
            if (this.questEntityMovement != null) {
                this.questEntityMovement.update();
                if (this.questEntityMovement.shouldMoveAtThisFrame()) {
                    // If worms like movement is activated and we're not under anti-gravity and worms like movement isn't disabled by the quest
                    if (this.questEntityMovement.getWormsLike() && this.antiGravity == false && this.getQuest().getWormsLikeDisabled() == false) {
                        if (this.moveWormsLike(this.questEntityMovement.getCurrentFrameMovement()))
                            this.noMovementLastUpdate = false;
                    }
                    // Else, we just try to move
                    else {
                        if (this.move(this.questEntityMovement.getCurrentFrameMovement()))
                            this.noMovementLastUpdate = false;
                    }
                }
            }
        }
        else {
            this.stoppedDuration -= 1;
            if (this.stoppedDuration <= 0)
                this.stopped = false;
        }
    };
    QuestEntity.prototype.tryToUpdateHealthBar = function () {
        // Update our health bar if we have one
        if (this.healthBar != null)
            this.healthBar.update();
    };
    return QuestEntity;
}());
//# sourceMappingURL=QuestEntity.js.map