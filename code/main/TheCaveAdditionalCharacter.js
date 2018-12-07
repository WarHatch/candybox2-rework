var TheCaveAdditionalCharacter = /** @class */ (function () {
    // Constructor
    function TheCaveAdditionalCharacter(theCave, characterString, characterPosition) {
        if (characterString === void 0) { characterString = null; }
        if (characterPosition === void 0) { characterPosition = null; }
        // We set the cave
        this.theCave = theCave;
        // If the string given in parameter isn't null
        if (characterString != null) {
            // We set our string from this one
            this.characterString = characterString;
        }
        // Else, if it's null
        else {
            // We choose a string randomly from the possible strings
            this.characterString = this.theCave.getAdditionalCharactersPossible()[Random.upTo(this.theCave.getAdditionalCharactersPossible().length - 1)];
        }
        // If the position given in parameters isn't null
        if (characterPosition != null) {
            // We set our position from this one
            this.characterPosition = characterPosition;
        }
        // Else, if it's null
        else {
            // We choose a position randomly from the possible positions
            this.characterPosition = this.theCave.getAdditionalCharactersPositionsPossible()[Random.upTo(this.theCave.getAdditionalCharactersPositionsPossible().length - 1)];
        }
    }
    // Public getters
    TheCaveAdditionalCharacter.prototype.getPosition = function () {
        return this.characterPosition;
    };
    TheCaveAdditionalCharacter.prototype.getString = function () {
        return this.characterString;
    };
    return TheCaveAdditionalCharacter;
}());
//# sourceMappingURL=TheCaveAdditionalCharacter.js.map