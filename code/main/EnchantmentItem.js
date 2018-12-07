var EnchantmentItem = /** @class */ (function () {
    // Constructor
    function EnchantmentItem(game, savingName, type) {
        this.game = game;
        this.savingName = savingName;
        this.type = type;
    }
    // Public methods
    EnchantmentItem.prototype.getText = function () {
        var text = Database.getText(this.game.getEqItemFromEqItemType(this.savingName, this.type).getDatabaseName());
        if (Database.isTranslated())
            text += " (" + Database.getTranslatedText(this.game.getEqItemFromEqItemType(this.savingName, this.type).getDatabaseName()) + ")";
        return text;
    };
    EnchantmentItem.prototype.isPossessed = function () {
        return Saving.loadBool(this.savingName);
    };
    EnchantmentItem.prototype.unequipIfEquipped = function () {
        this.game.unequipIfEquipped(this.savingName, this.type);
    };
    // Public getters
    EnchantmentItem.prototype.getSavingName = function () {
        return this.savingName;
    };
    return EnchantmentItem;
}());
//# sourceMappingURL=EnchantmentItem.js.map