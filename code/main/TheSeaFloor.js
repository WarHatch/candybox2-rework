var TheSeaFloor = /** @class */ (function () {
    // Constructor
    function TheSeaFloor(type, height, previousFloor) {
        if (previousFloor === void 0) { previousFloor = null; }
        // Does this floor have a plant on it ?
        this.hasAPlant = false;
        this.type = type;
        this.height = height;
        // If the previous floor is null or has a different type
        if (previousFloor == null || previousFloor.getType() != this.type) {
            // There's no floor of the same type before
            this.howManyFloorsOfTheSameTypeBefore = 0;
        }
        else {
            // We take the howManyFloorsOfTheSameTypeBefore of the previous floor and we add one
            this.howManyFloorsOfTheSameTypeBefore = previousFloor.howManyFloorsOfTheSameTypeBefore + 1;
        }
        // Special character stuff
        if (Random.oneChanceOutOf(3) && (previousFloor == null || previousFloor.getHasSpecialCharacter() == false)) {
            // We will have a special character
            this.hasSpecialCharacter = true;
            // Set the height
            this.specialCharacterHeight = Random.between(0, this.height - 1);
            // Set the character
            if (Random.oneChanceOutOf(4)) {
                this.specialCharacter = "^";
            }
            else {
                this.specialCharacter = "-";
            }
        }
        else {
            // We won't have a special character
            this.hasSpecialCharacter = false;
        }
    }
    // Public methods
    TheSeaFloor.prototype.draw = function (renderArea, floorPosition, xPosition) {
        // We can draw different characters for the floor, depending on the type
        switch (this.type) {
            case TheSeaFloorType.NORMAL:
                renderArea.drawString("_", xPosition, floorPosition - this.height);
                break;
            case TheSeaFloorType.GOING_DOWN:
                renderArea.drawString("\\", xPosition, floorPosition - this.height);
                break;
            case TheSeaFloorType.GOING_UP:
                renderArea.drawString("/", xPosition, floorPosition - this.height);
                break;
        }
        // If we have a special character
        if (this.hasSpecialCharacter) {
            // We draw it
            renderArea.drawString(this.specialCharacter, xPosition, floorPosition - this.specialCharacterHeight);
        }
    };
    // Pubic getters
    TheSeaFloor.prototype.getHasAPlant = function () {
        return this.hasAPlant;
    };
    TheSeaFloor.prototype.getHasSpecialCharacter = function () {
        return this.hasSpecialCharacter;
    };
    TheSeaFloor.prototype.getHeight = function () {
        return this.height;
    };
    TheSeaFloor.prototype.getHowManyFloorsOfTheSameTypeBefore = function () {
        return this.howManyFloorsOfTheSameTypeBefore;
    };
    TheSeaFloor.prototype.getType = function () {
        return this.type;
    };
    // Public setters
    TheSeaFloor.prototype.setHasAPlant = function (hasAPlant) {
        this.hasAPlant = hasAPlant;
    };
    return TheSeaFloor;
}());
//# sourceMappingURL=TheSeaFloor.js.map