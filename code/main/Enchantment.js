var Enchantment = /** @class */ (function () {
    // Constructor
    function Enchantment(beforeItem, afterItem) {
        this.beforeItem = beforeItem;
        this.afterItem = afterItem;
    }
    // Public methods
    Enchantment.prototype.enchant = function () {
        // We check if we're currently wearing the before item. If so, we must stop wearing it !
        this.beforeItem.unequipIfEquipped();
        // We lose the before item and gain the after item
        Saving.saveBool(this.beforeItem.getSavingName(), false);
        Saving.saveBool(this.afterItem.getSavingName(), true);
    };
    Enchantment.prototype.isPossible = function () {
        // If we have the before item but not the after item, we return true
        if (this.beforeItem.isPossessed() == true && this.afterItem.isPossessed() == false)
            return true;
        // Else we return false
        return false;
    };
    // Public getters
    Enchantment.prototype.getAfterItem = function () {
        return this.afterItem;
    };
    Enchantment.prototype.getBeforeItem = function () {
        return this.beforeItem;
    };
    return Enchantment;
}());
//# sourceMappingURL=Enchantment.js.map