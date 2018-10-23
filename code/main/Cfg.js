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
var Cfg = /** @class */ (function (_super) {
    __extends(Cfg, _super);
    // Constructor
    function Cfg(game) {
        var _this = _super.call(this, game) || this;
        // The render area
        _this.renderArea = new RenderArea();
        // The map used for the language selection : match the select's options id with the actual usually two letters code used by the Saving module
        _this.languageSelectionMap = {
            "cfgLanguageEn": "en",
            "cfgLanguageBr": "br",
            "cfgLanguageCz": "cz",
            "cfgLanguageEs": "es",
            "cfgLanguageFr": "fr",
            "cfgLanguageNl": "nl",
            "cfgLanguageZh": "zh",
            "cfgLanguageDe": "de",
            "cfgLanguageSe": "se",
            "cfgLanguageHu": "hu",
            "cfgLanguageId": "id",
            "cfgLanguagePl": "pl",
            "cfgLanguageUk": "uk",
            "cfgLanguageRu": "ru",
            "cfgLanguageTr": "tr",
            "cfgLanguageEl": "el"
        };
        // Resize the area
        _this.renderArea.resize(100, 48);
        // Update for the first time
        _this.update();
        return _this;
    }
    // getRenderArea()
    Cfg.prototype.getRenderArea = function () {
        return this.renderArea;
    };
    // Private methods
    Cfg.prototype.drawAbout = function (x, y) {
        // The title
        this.renderArea.drawArray(Database.getAscii("text/About"), x + 34, y);
        // Who?
        this.renderArea.drawString("Who?", x + 2, y + 7);
        this.renderArea.addBold(x + 2, x + 6, y + 7);
        // Who...
        this.renderArea.drawString("Ideas, game design & code by aniwey.", x + 4, y + 9);
        this.renderArea.drawString("Ascii art by Tobias Nordqvist, GodsTurf, dixsept, Dani \"Deinol\" Gómez and aniwey.", x + 4, y + 10);
        // License?
        this.renderArea.drawString("License?", x + 2, y + 13);
        this.renderArea.addBold(x + 2, x + 10, y + 13);
        // License...
        this.renderArea.drawString("The game source code is published under the GPLv3 license. This means you are free to modify and", x + 4, y + 15);
        this.renderArea.drawString("redistribute the game, even for commercial purposes, under some conditions.", x, y + 16);
        this.renderArea.addHtmlLink(x + 76, y + 16, "source_code.html", "Learn more.");
        this.renderArea.drawString("The ascii art is published under the CC-BY-SA license, which means that you can reuse it if you", x + 4, y + 18);
        this.renderArea.drawString("credit the artist who made the art and share your modifications under the same license.", x, y + 19);
        this.renderArea.addHtmlLink(x + 88, y + 19, "ascii_art.html", "Learn more.");
        // Aything else?
        this.renderArea.drawString("Anything else?", x + 2, y + 22);
        this.renderArea.addBold(x + 2, x + 16, y + 22);
        // Contact
        this.renderArea.drawString("Feel free to contact me at aniwey@gmail.com if you have any comments or questions :)", x + 4, y + 24);
    };
    Cfg.prototype.drawCfgInvertColors = function (x, y) {
        // Text
        this.renderArea.drawString(Database.getText("cfgInvertColors"), x, y);
        this.renderArea.drawString(Database.getTranslatedText("cfgInvertColors"), x, y + 1, true);
        // The checkbox
        this.renderArea.addCheckbox(x + Algo.takeBiggest(Database.getText("cfgInvertColors").length, Database.getTranslatedText("cfgInvertColors").length) + 2, y, new CallbackCollection(this.invertColorsChecked.bind(this)), new CallbackCollection(this.invertColorsUnchecked.bind(this)), "cfgInvertColorsCheckbox", Saving.loadBool("gameInvertedColors"));
    };
    Cfg.prototype.drawCfgLanguage = function (x, y) {
        // Text
        this.renderArea.drawString(Database.getText("cfgChooseLanguage"), x, y);
        this.renderArea.drawString(Database.getTranslatedText("cfgChooseLanguage"), x, y + 1, true);
        // List
        this.renderArea.addList(x + Algo.takeBiggest(Database.getText("cfgChooseLanguage").length, Database.getTranslatedText("cfgChooseLanguage").length) + 2, x + Algo.takeBiggest(Database.getText("cfgChooseLanguage").length, Database.getTranslatedText("cfgChooseLanguage").length) + 20, y, "cfgLanguageList", new CallbackCollection(this.languageSelected.bind(this)), [
            "cfgLanguageEn", "English",
            "cfgLanguageBr", "Brazilian Portuguese (by TranslaCAT)",
            "cfgLanguageZh", "Chinese (by Fan Zhang)",
            "cfgLanguageCz", "Czech (by Keranis)",
            "cfgLanguageNl", "Dutch (by Noël Wierema and Vincent van Gennep, corrections by Wessel van den Putte)",
            "cfgLanguageFr", "French (by aniwey)",
            "cfgLanguageDe", "German (by Kai Kubasta)",
            "cfgLanguageEl", "Greek (by VagosLabrou)",
            "cfgLanguageHu", "Hungarian (by The_Reaper_CooL)",
            "cfgLanguageId", "Indonesian (by Richard Sudaryono)",
            "cfgLanguagePl", "Polish (by Patryk Połomski)",
            "cfgLanguageRu", "Russian (by Julia Richter (Zen Chelios Jr.))",
            "cfgLanguageEs", "Spanish (by Saúl Ruiz Calleja and Tania López Camino)",
            "cfgLanguageSe", "Swedish (by Jessica Tsiamis)",
            "cfgLanguageTr", "Turkish (by B. Güler)",
            "cfgLanguageUk", "Ukrainian (by Volodymyr Lataniuk)"
        ]);
        // Add the link which will call the selectRightLanguage method after the html dom is created
        this.renderArea.addLinkCallbackCollection(new CallbackCollection(this.selectRightLanguage.bind(this)));
        // Add the special message for the chinese translation
        if (Saving.loadString("gameLanguage") == "zh") {
            this.renderArea.drawString("中文版翻译会导致少量图像显示错误，我会尽量修复它们的！", x + 9, y + 2, true);
        }
        // Add the TranslaCAT ascii art
        else if (Saving.loadString("gameLanguage") == "br") {
            this.renderArea.drawArray(Database.getAscii("general/translaCAT"), x + 70, y - 1);
            this.renderArea.addHtmlLink(x + 76, y + 7, "http://www.translacat.com/", "TranslaCAT");
        }
    };
    Cfg.prototype.drawConfigurationText = function (x, y) {
        this.renderArea.drawArray(Database.getAscii("text/Configuration"), x + 17, y);
    };
    Cfg.prototype.invertColorsChecked = function () {
        this.setInvertedColors(true);
    };
    Cfg.prototype.invertColorsUnchecked = function () {
        this.setInvertedColors(false);
    };
    Cfg.prototype.languageSelected = function () {
        // Get the selected language id
        var id = $("#cfgLanguageList").find(":selected").attr("id");
        // Set the new language
        if (this.languageSelectionMap[id] != null) {
            Saving.saveString("gameLanguage", this.languageSelectionMap[id]);
        }
        // Update Cfg
        this.update();
        this.getGame().updatePlace();
    };
    Cfg.prototype.selectRightLanguage = function () {
        // We iterate over all languages
        for (var language in this.languageSelectionMap) {
            // If this is the right one, we select it
            if (Saving.loadString("gameLanguage") == this.languageSelectionMap[language]) {
                $("#" + language).prop('selected', true);
            }
        }
    };
    Cfg.prototype.setInvertedColors = function (invertedColors) {
        Saving.saveBool("gameInvertedColors", invertedColors);
        this.getGame().applyInvertedColorsToCss();
        this.update();
        this.getGame().updateStatusBar(); // We also update the status bar to fix the selected tab's color
        this.getGame().updatePlace();
    };
    Cfg.prototype.update = function () {
        // Erase everything
        this.renderArea.resetAllButSize();
        // The "Configuration" text
        this.drawConfigurationText(0, 0);
        // Language selection
        this.drawCfgLanguage(0, 8);
        // Invert colors checkbox
        this.drawCfgInvertColors(0, 12);
        // "About" section
        this.drawAbout(0, 18);
    };
    return Cfg;
}(Place));
//# sourceMappingURL=Cfg.js.map