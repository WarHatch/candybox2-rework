///<reference path="TheSeaPattern.ts"/>
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
var TheSeaPattern_Boss0_Shapes = /** @class */ (function (_super) {
    __extends(TheSeaPattern_Boss0_Shapes, _super);
    // Constructor
    function TheSeaPattern_Boss0_Shapes(theSea, initialDistance) {
        var _this = _super.call(this, theSea, initialDistance) || this;
        // Fishes of the squares
        _this.fishes = [];
        // Did we add the fishes already ?
        _this.fishesAdded = false;
        // Are fishes moving right now ?
        _this.fishesAreMoving = true;
        // Set the shape type
        _this.shapeType = Random.upTo(2);
        return _this;
    }
    // Public methods    
    TheSeaPattern_Boss0_Shapes.prototype.isPatternDone = function () {
        if (this.getTheSea().getDistance() > this.getInitialDistance() + 50)
            return true;
        return false;
    };
    TheSeaPattern_Boss0_Shapes.prototype.run = function (x1, x2) {
        // If it's time to add the fishes
        if (this.fishesAdded == false && this.getTheSea().getDistance() > this.getInitialDistance() + 30) {
            this.fishesAdded = true;
            this.addShape(x1, 1);
            this.addShape(x1, 8);
            this.addShape(x1, 15);
            this.addShape(x1 + 15, 0);
            this.addShape(x1 + 15, 7);
            this.addShape(x1 + 15, 14);
            this.addShape(x1 + 30, 1);
            this.addShape(x1 + 30, 8);
            this.addShape(x1 + 30, 15);
        }
        // Handle fishes movement (to make them stop if the player stop moving)
        this.handleFishesMovement();
    };
    // Private methods
    TheSeaPattern_Boss0_Shapes.prototype.addFish = function (smallestFish) {
        if (smallestFish != null)
            this.fishes.push(smallestFish);
    };
    TheSeaPattern_Boss0_Shapes.prototype.addCross = function (x, y) {
        this.addFish(this.getTheSea().addSmallestFish(new Pos(x, y + 1)));
        this.addFish(this.getTheSea().addSmallestFish(new Pos(x + 3, y + 2)));
        this.addFish(this.getTheSea().addSmallestFish(new Pos(x + 6, y + 3)));
        this.addFish(this.getTheSea().addSmallestFish(new Pos(x + 9, y + 4)));
        this.addFish(this.getTheSea().addSmallestFish(new Pos(x, y + 4)));
        this.addFish(this.getTheSea().addSmallestFish(new Pos(x + 3, y + 3)));
        this.addFish(this.getTheSea().addSmallestFish(new Pos(x + 6, y + 2)));
        this.addFish(this.getTheSea().addSmallestFish(new Pos(x + 9, y + 1)));
    };
    TheSeaPattern_Boss0_Shapes.prototype.addLines = function (x, y) {
        for (var i = x; i <= x + 9; i += 3) {
            for (var j = y; j <= y + 4; j += 2) {
                this.addFish(this.getTheSea().addSmallestFish(new Pos(i, j)));
            }
        }
    };
    TheSeaPattern_Boss0_Shapes.prototype.addShape = function (x, y) {
        // Call a random shape method
        switch (this.shapeType) {
            case 0:
                this.addSquare(x, y);
                break;
            case 1:
                this.addLines(x, y);
                break;
            case 2:
                this.addCross(x, y);
                break;
        }
    };
    TheSeaPattern_Boss0_Shapes.prototype.addSquare = function (x, y) {
        // Top & bottom
        for (var i = x; i <= x + 9; i += 3) {
            // Top of the square
            this.addFish(this.getTheSea().addSmallestFish(new Pos(i, y)));
            // Bottom of the square
            this.addFish(this.getTheSea().addSmallestFish(new Pos(i, y + 5)));
        }
        // Left & right
        for (var j = y; j <= y + 4; j++) {
            // Left of the square
            this.addFish(this.getTheSea().addSmallestFish(new Pos(x, j)));
            // Right of the square
            this.addFish(this.getTheSea().addSmallestFish(new Pos(x + 9, j)));
        }
    };
    TheSeaPattern_Boss0_Shapes.prototype.handleFishesMovement = function () {
        // If fishes are moving but shouldn't be
        if (this.fishesAreMoving == true && this.getTheSea().getLastPlayerMovement().x == 0 && this.getTheSea().getGame().getPlayer().getGlobalPosition().y >= 20) {
            // Fishes are not moving any more
            this.fishesAreMoving = false;
            for (var i = 0; i < this.fishes.length; i++) {
                this.fishes[i].setQuestEntityMovement(new QuestEntityMovement(new Pos(0, 0)));
            }
        }
        // Else, if fishes aren't moving but should be
        else if (this.fishesAreMoving == false && (this.getTheSea().getLastPlayerMovement().x > 0 || this.getTheSea().getGame().getPlayer().getGlobalPosition().y < 20)) {
            // Fishes are now moving
            this.fishesAreMoving = true;
            for (var i = 0; i < this.fishes.length; i++) {
                this.fishes[i].setQuestEntityMovement(new QuestEntityMovement(new Pos(-1, 0)));
            }
        }
    };
    return TheSeaPattern_Boss0_Shapes;
}(TheSeaPattern));
//# sourceMappingURL=TheSeaPattern_Boss0_Shapes.js.map