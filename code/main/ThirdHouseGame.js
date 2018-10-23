var ThirdHouseGame = /** @class */ (function () {
    // Constructor
    function ThirdHouseGame(thirdHouse) {
        // Set the third house from parameter
        this.thirdHouse = thirdHouse;
        // Create the area
        this.renderArea = new RenderArea(53, 12);
        // Set the quest slowed down variable at the game level (and the quest speed up too)
        this.thirdHouse.getGame().setQuestSlowedDown(false);
        this.thirdHouse.getGame().setQuestSpeedUp(0);
    }
    // Public methods
    ThirdHouseGame.prototype.pressedDownButton = function () {
    };
    ThirdHouseGame.prototype.pressedSpaceButton = function () {
    };
    ThirdHouseGame.prototype.pressedUpButton = function () {
    };
    ThirdHouseGame.prototype.run = function () {
        return true;
    };
    // Public getters
    ThirdHouseGame.prototype.getRenderArea = function () {
        return this.renderArea;
    };
    ThirdHouseGame.prototype.getThirdHouse = function () {
        return this.thirdHouse;
    };
    return ThirdHouseGame;
}());
//# sourceMappingURL=ThirdHouseGame.js.map