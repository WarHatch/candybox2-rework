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
var TheArena = /** @class */ (function (_super) {
    __extends(TheArena, _super);
    // Constructor
    function TheArena(game) {
        var _this = _super.call(this, game) || this;
        // The render area
        _this.renderArea = new RenderArea();
        _this.renderArea.resize(100, 20);
        _this.update();
        return _this;
    }
    // getRenderArea()
    TheArena.prototype.getRenderArea = function () {
        return this.renderArea;
    };
    // Private methods
    TheArena.prototype.drawQuestLogo = function (questFolderName, x, y) {
        // If the quest folder name given isn't null
        if (questFolderName != null) {
            // If this quest doesn't exist
            if (TheArenaModule.getQuest(questFolderName) == null)
                console.log("Trying to draw the arena quest " + questFolderName + " which wasn't added to the arena module.");
            // Else, this quest exists
            else {
                // Draw the logo
                TheArenaModule.getQuest(questFolderName).drawLogo(this.renderArea, x, y, this.getGame());
            }
        }
        // Draw the borders
        this.renderArea.drawHorizontalLine("-", x, x + 19, y);
        this.renderArea.drawHorizontalLine("-", x, x + 19, y + 5);
        this.renderArea.drawVerticalLine("|", x, y, y + 5);
        this.renderArea.drawVerticalLine("|", x + 19, y, y + 5);
    };
    TheArena.prototype.update = function () {
        // Erase everything
        this.renderArea.resetAllButSize();
        // Quick explanation
        this.renderArea.drawString("The Arena is a special area featuring additional quests written by players.", 12, 1);
        // List of quests
        this.drawQuestLogo("peacefulForest", 2, 3);
        this.drawQuestLogo("hardcorePlatformer", 21, 3);
        this.drawQuestLogo(null, 40, 3);
        this.drawQuestLogo(null, 59, 3);
        this.drawQuestLogo(null, 78, 3);
        this.drawQuestLogo(null, 2, 8);
        this.drawQuestLogo(null, 21, 8);
        this.drawQuestLogo(null, 40, 8);
        this.drawQuestLogo(null, 59, 8);
        this.drawQuestLogo(null, 78, 8);
        // Hardmode
        this.renderArea.drawString("If you want more challenge, you can also play hardmode here : ", 1, 17);
        this.renderArea.addHtmlLink(63, 17, "http://candybox2.github.io/?gamemode=hard", "http://candybox2.github.io/?gamemode=hard");
        // Create your quest!
        this.renderArea.drawString("If you're a programmer and you want to create a quest,                     and                 !", 1, 15);
        this.renderArea.addHtmlLink(56, 15, "source_code.html", "get the source code");
        this.renderArea.addHtmlLink(80, 15, "create_quest.html", "follow the guide");
    };
    return TheArena;
}(Place));
//# sourceMappingURL=TheArena.js.map