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
var Plant = /** @class */ (function (_super) {
    __extends(Plant, _super);
    // Constructor
    function Plant(quest, leftDownCornerPosition, minPlantNumber, maxPlantNumber) {
        var _this = this;
        // Set the ascii art name
        var asciiArtName = "places/quests/theSea/plant" + Random.between(minPlantNumber, maxPlantNumber).toString();
        // Create the real global position
        var globalPosition = leftDownCornerPosition;
        globalPosition.add(new Pos(0, -Database.getAsciiHeight(asciiArtName) + 1));
        // Call the mother constructor
        _this = _super.call(this, quest, globalPosition, new Naming("A plant", "a plant"), new RenderArea()) || this;
        // Draw the ascii art
        _this.getRenderArea().resizeFromArray(Database.getAscii(asciiArtName));
        _this.getRenderArea().drawArray(Database.getAscii(asciiArtName));
        // Set different transparency settings depending on the ascii art
        if (asciiArtName == "places/quests/theSea/plant0" || asciiArtName == "places/quests/theSea/plant8" || asciiArtName == "places/quests/theSea/plant9" || asciiArtName == "places/quests/theSea/plant10") {
            _this.setTransparency(new RenderTransparency(" ", "%"));
        }
        else {
            _this.setTransparency(new RenderTransparency(" "));
        }
        return _this;
    }
    return Plant;
}(QuestEntity));
//# sourceMappingURL=Plant.js.map