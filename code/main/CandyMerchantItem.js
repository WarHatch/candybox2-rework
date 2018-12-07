var CandyMerchantItem = /** @class */ (function () {
    // Constructor
    function CandyMerchantItem(game, savingBool, asciiName, asciiPosition, merchantSpeech, price, buttonText, buttonName) {
        this.game = game;
        this.savingBool = savingBool;
        this.asciiName = asciiName;
        this.asciiPosition = asciiPosition;
        this.merchantSpeech = merchantSpeech;
        this.price = price;
        this.buttonText = buttonText;
        this.buttonName = buttonName;
    }
    // Public methods
    CandyMerchantItem.prototype.buy = function () {
        // We tell the saving system that this item is bought
        Saving.saveBool(this.savingBool, true);
    };
    CandyMerchantItem.prototype.canBeBought = function () {
        // If it's already bought, we return false
        if (this.isBought())
            return false;
        return true;
    };
    CandyMerchantItem.prototype.canBeClicked = function () {
        // If it's already bought, we return false
        if (this.isBought())
            return false;
        return true;
    };
    CandyMerchantItem.prototype.canBeShown = function () {
        // If it's already bought, we return false
        if (this.isBought())
            return false;
        return true;
    };
    CandyMerchantItem.prototype.isBought = function () {
        return Saving.loadBool(this.savingBool);
    };
    // Public getters
    CandyMerchantItem.prototype.getAsciiName = function () {
        return this.asciiName;
    };
    CandyMerchantItem.prototype.getAsciiPosition = function () {
        return this.asciiPosition;
    };
    CandyMerchantItem.prototype.getButtonName = function () {
        return this.buttonName;
    };
    CandyMerchantItem.prototype.getButtonText = function () {
        return this.buttonText;
    };
    CandyMerchantItem.prototype.getGame = function () {
        return this.game;
    };
    CandyMerchantItem.prototype.getMerchantSpeech = function () {
        return this.merchantSpeech;
    };
    CandyMerchantItem.prototype.getPrice = function () {
        return this.price;
    };
    return CandyMerchantItem;
}());
//# sourceMappingURL=CandyMerchantItem.js.map