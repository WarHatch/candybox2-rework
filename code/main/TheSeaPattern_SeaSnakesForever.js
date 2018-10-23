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
var TheSeaPattern_SeaSnakesForever = /** @class */ (function (_super) {
    __extends(TheSeaPattern_SeaSnakesForever, _super);
    // Constructor
    function TheSeaPattern_SeaSnakesForever(theSea, initialDistance) {
        var _this = _super.call(this, theSea, initialDistance) || this;
        // Variables
        _this.addedRedSharkFin = false;
        _this.addedGreenSharkFin = false;
        _this.addedPurpleSharkFin = false;
        _this.nextSnakeIn = 0;
        _this.nextSharkIn = Random.between(0, 50);
        return _this;
    }
    // Public methods
    TheSeaPattern_SeaSnakesForever.prototype.isPatternDone = function () {
        return false;
    };
    TheSeaPattern_SeaSnakesForever.prototype.run = function (x1, x2) {
        // Possibly add a snake
        this.nextSnakeIn -= 1;
        if (this.nextSnakeIn <= 0) {
            this.getTheSea().addSeaSnake(new Pos(x2, Random.between(0, this.getTheSea().getRealQuestSize().y - this.getTheSea().getFloorMaxHeight() - 12)));
            this.nextSnakeIn = 85 - Math.ceil((1 - Math.exp(-(this.getTheSea().getDistance() - this.getInitialDistance()) / 1500)) * 83);
        }
        // Possibly add a shark
        this.nextSharkIn -= 1;
        if (this.nextSharkIn <= 0) {
            // Store the shark
            var shark = this.getTheSea().addBigShark(new Pos(x2, Random.between(0, this.getTheSea().getRealQuestSize().y - this.getTheSea().getFloorMaxHeight() - 10)));
            // If a shark was added
            if (shark != null) {
                if (Saving.loadBool("gridItemPossessedRedSharkFin") == false && this.addedRedSharkFin == false && this.getTheSea().getDistance() - this.getInitialDistance() > 150) {
                    shark.hasFin(BigSharkFinType.RED);
                    this.addedRedSharkFin = true;
                }
                else if (Saving.loadBool("gridItemPossessedGreenSharkFin") == false && this.addedGreenSharkFin == false && this.getTheSea().getDistance() - this.getInitialDistance() > 700) {
                    shark.hasFin(BigSharkFinType.GREEN);
                    this.addedGreenSharkFin = true;
                }
                else if (Saving.loadBool("gridItemPossessedPurpleSharkFin") == false && this.addedPurpleSharkFin == false && this.getTheSea().getDistance() - this.getInitialDistance() > 2500) {
                    shark.hasFin(BigSharkFinType.PURPLE);
                    this.addedPurpleSharkFin = true;
                }
            }
            // Set the next shark in
            this.nextSharkIn = 60 - Math.ceil((1 - Math.exp(-(this.getTheSea().getDistance() - this.getInitialDistance()) / 1500)) * 55);
        }
    };
    return TheSeaPattern_SeaSnakesForever;
}(TheSeaPattern));
//# sourceMappingURL=TheSeaPattern_SeaSnakesForever.js.map