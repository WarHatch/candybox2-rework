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
var Chest = /** @class */ (function (_super) {
    __extends(Chest, _super);
    // Constructor
    function Chest(quest, globalPosition, isFacingRight, callbackCollection, isOpened) {
        if (isFacingRight === void 0) { isFacingRight = true; }
        if (callbackCollection === void 0) { callbackCollection = new CallbackCollection(); }
        if (isOpened === void 0) { isOpened = false; }
        var _this = 
        // Call the mother constructor
        _super.call(this, quest, globalPosition, new Naming("A chest", "a chest"), new RenderArea(), new Pos(0, -1), new CollisionBoxCollection()) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, -1), new Pos(3, 2))));
        // Set the parameters
        _this.isFacingRight = isFacingRight;
        _this.callbackCollection = callbackCollection;
        // At first, we're not opened
        _this.isOpened = isOpened;
        // Create the opening collision box collection
        _this.openingCollisionBoxCollection = new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, -1), new Pos(5, 3)));
        // Set the team (nature)
        _this.setTeam(QuestEntityTeam.NATURE);
        // Resize the render area
        _this.getRenderArea().resizeFromArray(Database.getAscii("places/quests/common/chestClosed"));
        _this.setTransparency(new RenderTransparency(" "));
        // Draw for the first time
        _this.drawChestAscii();
        return _this;
    }
    // update()
    Chest.prototype.update = function () {
        _super.prototype.update.call(this);
        // If the chest isn't opened yet
        if (this.isOpened == false) {
            // If the player has a collision box collection
            if (this.getQuest().getGame().getPlayer().getCbc() != null) {
                // If it collides with our opening collision box collection
                if (this.getQuest().getGame().getPlayer().getCbc().collidesWith(this.openingCollisionBoxCollection)) {
                    // We are now opened
                    this.isOpened = true;
                    // We fire the callback collection
                    this.callbackCollection.fire();
                    // We re-draw
                    this.drawChestAscii();
                }
            }
        }
    };
    // Private methods
    Chest.prototype.drawChestAscii = function () {
        // We erase
        this.getRenderArea().resetAllButSize();
        // If we're not opened
        if (this.isOpened == false) {
            this.getRenderArea().drawArray(Database.getAscii("places/quests/common/chestClosed"));
        }
        // Else, we're opened
        else {
            // If we're facing right
            if (this.isFacingRight)
                this.getRenderArea().drawArray(Database.getAscii("places/quests/common/chestOpenedRight"));
            // Else we're facing left
            else
                this.getRenderArea().drawArray(Database.getAscii("places/quests/common/chestOpenedLeft"));
        }
    };
    return Chest;
}(QuestEntity));
//# sourceMappingURL=Chest.js.map