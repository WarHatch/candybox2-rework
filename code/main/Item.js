var Item = /** @class */ (function () {
    // Constructor
    function Item(savingName, databaseName, databaseDescriptionName, ascii) {
        // We set the variables
        this.savingName = savingName;
        this.databaseName = databaseName;
        this.databaseDescriptionName = databaseDescriptionName;
        this.ascii = ascii;
        // We register the savingName
        Saving.registerBool(this.savingName, false);
    }
    // Public methods
    Item.prototype.foundCandies = function (player, quest, howMany) {
        return howMany;
    };
    Item.prototype.hit = function (player, quest, questEntity, damage, reason) {
        return damage;
    };
    Item.prototype.inflictDamage = function (player, quest, damage, reason) {
        return damage;
    };
    Item.prototype.isPossessed = function () {
        return Saving.loadBool(this.savingName);
    };
    // Public getters
    Item.prototype.getAscii = function () {
        return this.ascii;
    };
    Item.prototype.getDatabaseDescriptionName = function () {
        return this.databaseDescriptionName;
    };
    Item.prototype.getDatabaseName = function () {
        return this.databaseName;
    };
    Item.prototype.getSavingName = function () {
        return this.savingName;
    };
    Item.prototype.getSpecialAbility = function () {
        return null;
    };
    return Item;
}());
//# sourceMappingURL=Item.js.map