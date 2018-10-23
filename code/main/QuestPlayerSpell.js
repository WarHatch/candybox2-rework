// Potions
Saving.registerBool("questPlayerSpellHealthPotionHasSpell", false);
Saving.registerBool("questPlayerSpellTurtlePotionHasSpell", false);
Saving.registerBool("questPlayerSpellAntiGravityPotionHasSpell", false);
Saving.registerBool("questPlayerSpellBerserkPotionHasSpell", false);
Saving.registerBool("questPlayerSpellCloningPotionHasSpell", false);
Saving.registerBool("questPlayerSpellPPotionHasSpell", false);
Saving.registerBool("questPlayerSpellXPotionHasSpell", false);
Saving.registerNumber("questPlayerSpellHealthPotionQuantity", 0);
Saving.registerNumber("questPlayerSpellAntiGravityPotionQuantity", 0);
Saving.registerNumber("questPlayerSpellTurtlePotionQuantity", 0);
Saving.registerNumber("questPlayerSpellBerserkPotionQuantity", 0);
Saving.registerNumber("questPlayerSpellCloningPotionQuantity", 0);
Saving.registerNumber("questPlayerSpellPPotionQuantity", 0);
Saving.registerNumber("questPlayerSpellXPotionQuantity", 0);
var QuestPlayerSpell = /** @class */ (function () {
    // Constructor
    function QuestPlayerSpell(quest, buttonClassName, buttonPosition, buttonText, buttonColor, callbackCollection, countdownType, countdownTime, underlinedLetter, hotkeyLetter, numberIdWichLimitsQuantity) {
        if (underlinedLetter === void 0) { underlinedLetter = null; }
        if (hotkeyLetter === void 0) { hotkeyLetter = null; }
        if (numberIdWichLimitsQuantity === void 0) { numberIdWichLimitsQuantity = null; }
        this.quest = quest;
        this.buttonClassName = buttonClassName;
        this.buttonPosition = buttonPosition;
        this.buttonText = buttonText;
        this.buttonColor = buttonColor;
        this.callbackCollection = callbackCollection;
        this.countdownType = countdownType;
        this.countdownTime = countdownTime;
        this.underlinedLetter = underlinedLetter;
        this.hotkeyLetter = hotkeyLetter;
        this.numberIdWichLimitsQuantity = numberIdWichLimitsQuantity;
    }
    // Public methods
    QuestPlayerSpell.prototype.draw = function (renderArea, position) {
        // Set the text
        var text = this.buttonText;
        // Possibly modify the text depending on numberIdWichLimitsQuantity
        if (this.numberIdWichLimitsQuantity != null) {
            if (Saving.loadNumber(this.numberIdWichLimitsQuantity) <= 999)
                text += " " + Saving.loadNumber(this.numberIdWichLimitsQuantity);
            else
                text += " 999+";
        }
        // Add the button
        renderArea.addAsciiRealButton(text, position.x + this.buttonPosition.x, position.y + this.buttonPosition.y, this.buttonClassName + " keepBlackTextWhenInverted", "", false, this.underlinedLetter, this.buttonColor);
        // Add the link
        renderArea.addLinkCall("." + this.buttonClassName, new CallbackCollection(this.cast.bind(this)));
    };
    QuestPlayerSpell.prototype.getHotkey = function () {
        return new Hotkey(this.hotkeyLetter, new CallbackCollection(this.cast.bind(this)));
    };
    // Public getters
    QuestPlayerSpell.prototype.getButtonPosition = function () {
        return this.buttonPosition;
    };
    // Private methods
    QuestPlayerSpell.prototype.cast = function () {
        var canWeCast = true;
        // Ceck if the quest is ended to possibly set canWeCast to false
        if (this.quest.getQuestEnded())
            canWeCast = false;
        // Check the countdown to possibly set canWeCast to false
        if (canWeCast == true) {
            switch (this.countdownType) {
                case QuestPlayerSpellCountdownType.SPELLS:
                    if (this.quest.getPlayerSpellsCountdown() > 0)
                        canWeCast = false;
                    break;
                case QuestPlayerSpellCountdownType.POTIONS:
                    if (this.quest.getPlayerPotionsCountdown() > 0)
                        canWeCast = false;
                    break;
                case QuestPlayerSpellCountdownType.BLACKHOLE:
                    if (this.countdownTime <= 0)
                        canWeCast = false;
                    break;
                default: break;
            }
        }
        // Check the numberIdWichLimitsQuantity to possibly set canWeCast to false
        if (this.numberIdWichLimitsQuantity != null) {
            if (Saving.loadNumber(this.numberIdWichLimitsQuantity) <= 0) {
                canWeCast = false;
            }
        }
        // If we can cast
        if (canWeCast == true) {
            // Handle the countdown
            switch (this.countdownType) {
                case QuestPlayerSpellCountdownType.SPELLS:
                    this.quest.increasePlayerSpellsCountdown(this.countdownTime);
                    break;
                case QuestPlayerSpellCountdownType.POTIONS:
                    this.quest.increasePlayerPotionsCountdown(this.countdownTime);
                    break;
                case QuestPlayerSpellCountdownType.BLACKHOLE:
                    this.countdownTime -= 1;
                    break;
                default: break;
            }
            // Handle numberIdWichLimitsQuantity
            if (this.numberIdWichLimitsQuantity != null) {
                Saving.saveNumber(this.numberIdWichLimitsQuantity, Saving.loadNumber(this.numberIdWichLimitsQuantity) - 1);
            }
            // Fire the callback collection which was given to us
            this.callbackCollection.fire();
        }
    };
    return QuestPlayerSpell;
}());
//# sourceMappingURL=QuestPlayerSpell.js.map