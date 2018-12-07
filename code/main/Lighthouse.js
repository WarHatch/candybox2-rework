///<reference path="Place.ts"/>
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
Saving.registerBool("lighthousePuzzleDone", false);
var Lighthouse = /** @class */ (function (_super) {
    __extends(Lighthouse, _super);
    // Constructor
    function Lighthouse(game) {
        var _this = _super.call(this, game) || this;
        // The render area
        _this.renderArea = new RenderArea();
        // Selected question id
        _this.selectedQuestionId = "lighthouseQuestionWho";
        // Speech id
        _this.speechId = null;
        // Show the puzzle?
        _this.showPuzzle = false;
        // The puzzle
        _this.puzzle = null;
        // We create the questions array
        _this.createQuestionsArray();
        // We resize and update
        _this.renderArea.resizeFromArray(Database.getAscii("places/lighthouse/lighthouse"), 0, 4); // 4 in order to add a space below the lighthouse, so that it looks nicer
        _this.update();
        return _this;
    }
    // getRenderArea()
    Lighthouse.prototype.getRenderArea = function () {
        return this.renderArea;
    };
    // Public methods
    Lighthouse.prototype.update = function () {
        // Erase everything
        this.renderArea.resetAllButSize();
        // Back to the map button
        this.addBackToMainMapButton(this.renderArea, "lighthouseBackToTheMapButton");
        // Draw the lighthouse
        this.renderArea.drawArray(Database.getAscii("places/lighthouse/lighthouse"), 0, 3);
        // Add the questions list
        this.renderArea.addList(1, 55, 7, "lighthouseQuestionsList", new CallbackCollection(this.questionSelected.bind(this)), this.questionsArray);
        // Add the ask button and the link
        this.renderArea.addAsciiRealButton(Database.getText("lighthouseAskButton"), 5, 10, "lighthouseAskButton", Database.getTranslatedText("lighthouseAskButton"));
        this.renderArea.addLinkCall(".lighthouseAskButton", new CallbackCollection(this.ask.bind(this)));
        // Draw the speech if there's a speech id
        if (this.speechId != null) {
            this.renderArea.drawSpeech(Database.getText(this.speechId), 17, 75, 99, "lighthouseSpeech", Database.getTranslatedText(this.speechId));
        }
        // If we should show the puzzle
        if (this.showPuzzle) {
            // Create the puzzle if it's not done yet
            if (this.puzzle == null)
                this.puzzle = new LighthousePuzzle(this);
            // Draw it
            this.puzzle.draw(this.renderArea, new Pos(2, 12));
            // Add the reset button
            this.renderArea.addAsciiRealButton(Database.getText("lighthousePuzzleResetButton"), 2, 34, "lighthousePuzzleResetButton", Database.getTranslatedText("lighthousePuzzleResetButton"));
            this.renderArea.addLinkCall(".lighthousePuzzleResetButton", new CallbackCollection(this.resetPuzzle.bind(this)));
        }
        // Add the link which will call the selectRightQuestion method after the html dom is created
        this.renderArea.addLinkCallbackCollection(new CallbackCollection(this.selectRightQuestion.bind(this)));
    };
    // Public getters
    Lighthouse.prototype.getPuzzle = function () {
        return this.puzzle;
    };
    // Public setters
    Lighthouse.prototype.setSpeechId = function (speechId) {
        this.speechId = speechId;
    };
    // Private methods
    Lighthouse.prototype.addQuestion = function (id, text, translatedText) {
        if (translatedText === void 0) { translatedText = null; }
        this.questionsArray.push(id);
        if (translatedText == null)
            this.questionsArray.push(text);
        else
            this.questionsArray.push(text + (translatedText != "" ? " (" + translatedText + ")" : ""));
    };
    Lighthouse.prototype.ask = function () {
        this.speechId = this.selectedQuestionId + "Speech";
        if (this.selectedQuestionId == "lighthouseQuestionDragon")
            this.showPuzzle = true;
        else
            this.showPuzzle = false;
        this.update();
        this.getGame().updatePlace();
    };
    Lighthouse.prototype.createQuestionsArray = function () {
        // We empty the array
        this.questionsArray = [];
        // Add the first basic questions
        this.addQuestion("lighthouseQuestionWho", Database.getText("lighthouseQuestionWho"), Database.getTranslatedText("lighthouseQuestionWho"));
        this.addQuestion("lighthouseQuestionWhat", Database.getText("lighthouseQuestionWhat"), Database.getTranslatedText("lighthouseQuestionWhat"));
        this.addQuestion("lighthouseQuestionWhyEatCandies", Database.getText("lighthouseQuestionWhyEatCandies"), Database.getTranslatedText("lighthouseQuestionWhyEatCandies"));
        this.addQuestion("lighthouseQuestionCandyBox", Database.getText("lighthouseQuestionCandyBox"), Database.getTranslatedText("lighthouseQuestionCandyBox"));
        // Add the question about the dragon is we unlocked it
        if (Saving.loadBool("dragonUnlockedCyclops")) {
            this.addQuestion("lighthouseQuestionDragon", Database.getText("lighthouseQuestionDragon"), Database.getTranslatedText("lighthouseQuestionDragon"));
        }
    };
    Lighthouse.prototype.questionSelected = function () {
        // Get the selected language id
        this.selectedQuestionId = $("#lighthouseQuestionsList").find(":selected").attr("id");
        // Update the ligthouse
        this.update();
        this.getGame().updatePlace();
    };
    Lighthouse.prototype.resetPuzzle = function () {
        // Re create the puzzle
        this.puzzle = new LighthousePuzzle(this);
        // Update
        this.update();
        this.getGame().updatePlace();
    };
    Lighthouse.prototype.selectRightQuestion = function () {
        // We select the right question
        $("#" + this.selectedQuestionId).prop('selected', true);
    };
    return Lighthouse;
}(Place));
//# sourceMappingURL=Lighthouse.js.map