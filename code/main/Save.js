///<reference path="Place.ts"/>
///<reference path="main.ts"/>
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
var Save = /** @class */ (function (_super) {
    __extends(Save, _super);
    // Constructor
    function Save(game) {
        var _this = _super.call(this, game) || this;
        // The render area
        _this.renderArea = new RenderArea();
        // The currently selected slot (slot1 by default)
        _this.selectedSlot = "slot1";
        // The last local autosave minute we drew (used to refresh the page at the right time)
        _this.lastLocalAutosaveMinute = null;
        // Should we show the file save warning?
        _this.showFileSaveWarning = false;
        // The textarea content
        _this.fileSaveTextareaContent = null;
        // Resize
        _this.resize();
        // Create the slots array
        _this.createSlotsArray();
        // Update
        _this.update();
        return _this;
    }
    // getRenderArea()
    Save.prototype.getRenderArea = function () {
        return this.renderArea;
    };
    // willBeDisplayed()
    Save.prototype.willBeDisplayed = function () {
        // We resize (we must do this there and not in the constructor because the size depends on the translation)
        this.resize();
        // We add a callback : we will be updated every second (in order to show the correct time for the local autosave countdown)
        this.getGame().getOneSecondCallbackCollection().addCallback(this.oneSecondCallback.bind(this));
    };
    // Private methods
    Save.prototype.clickedAutosave = function () {
        // Save on the selected slot
        Saving.save(this.getGame(), MainLoadingType.LOCAL, this.selectedSlot);
        // Enable autosaving
        this.getGame().enableLocalAutosave(this.selectedSlot);
        // Re-create the slots array
        this.createSlotsArray();
        // Update
        this.update();
        this.getGame().updatePlace();
    };
    Save.prototype.clickedDisableAutosave = function () {
        // We disable auto saving
        this.getGame().disableLocalAutosave();
        // We update
        this.update();
        this.getGame().updatePlace();
    };
    Save.prototype.clickedFileLoad = function () {
        Main.reloadEverythingFromFile($(".saveFileLoadTextarea").val());
    };
    Save.prototype.clickedFileSave = function () {
        // Save some special variables by calling the save() methods of various objects
        this.getGame().save(); // Various variables owned by the game object
        this.getGame().getPlayer().save(); // The player
        // We now show the warning
        this.showFileSaveWarning = true;
        // Reset the textarea content
        this.fileSaveTextareaContent = "";
        // Write bools
        for (var str in Saving.getAllBools()) {
            if (this.fileSaveTextareaContent != "")
                this.fileSaveTextareaContent += ", "; // We add a comma if we're not adding the very first variable
            this.fileSaveTextareaContent += "bool " + str + "=" + Saving.boolToString(Saving.getAllBools()[str]);
        }
        // Write numbers
        for (var str in Saving.getAllNumbers()) {
            if (this.fileSaveTextareaContent != "")
                this.fileSaveTextareaContent += ", "; // We add a comma if we're not adding the very first variable
            this.fileSaveTextareaContent += "number " + str + "=" + Saving.numberToString(Saving.getAllNumbers()[str]);
        }
        // Write strings
        for (var str in Saving.getAllStrings()) {
            if (this.fileSaveTextareaContent != "")
                this.fileSaveTextareaContent += ", "; // We add a comma if we're not adding the very first variable
            this.fileSaveTextareaContent += "string " + str + "=" + Saving.getAllStrings()[str];
        }
        // Update
        this.update();
        this.getGame().updatePlace();
    };
    Save.prototype.clickedSave = function () {
        // Save on the selected slot
        Saving.save(this.getGame(), MainLoadingType.LOCAL, this.selectedSlot);
        // Re-create the slots array
        this.createSlotsArray();
        // Update
        this.update();
        this.getGame().updatePlace();
    };
    Save.prototype.createSlotsArray = function () {
        // Reset the array
        this.slotsArray = [];
        // Fill it
        for (var i = 1; i <= 5; i++) {
            this.slotsArray.push("slot" + i.toString());
            this.slotsArray.push("Slot " + i.toString() + " (" + LocalSaving.getSlotSummaryAsString("slot" + i.toString()) + ")");
        }
    };
    Save.prototype.drawGreen = function (text, x, y, translated) {
        if (translated === void 0) { translated = false; }
        this.renderArea.drawString(text, x, y, translated);
        this.renderArea.addColor(x, x + text.length, y, new Color(ColorType.SAVE_GREEN));
    };
    Save.prototype.drawLocalLoad = function (x, y) {
        // The y we will return (will remain 0 if there's no translation to show)
        var yAdd = 0;
        // Var we will use for link generation
        var link;
        // Title
        this.drawTitle("saveLocalLoadTitle", y + yAdd);
        // If we support local saving
        if (LocalSaving.supportsLocalSaving()) {
            // "You can load.."
            this.drawPoint("saveLocalLoadYouCan", x, y + yAdd + 2);
            if (Database.isTranslated())
                yAdd += 1;
            // The links
            for (var i = 1; i <= 5; i++) {
                link = "http://candybox2.github.io/?slot=" + i.toString();
                this.renderArea.addHtmlLink(x + 2, y + yAdd + 3 + i, link, link);
                this.renderArea.drawString("(slot " + i.toString() + ")", x + link.length + 4, y + yAdd + 3 + i);
            }
            // "Thanks to.."
            this.drawPoint("saveLocalLoadThanksTo", x, y + yAdd + 10);
            if (Database.isTranslated())
                yAdd += 1;
        }
        else {
            // Warning messages
            this.drawWarning(Database.getText("saveLocalSaveWarning0") + " (local storage and application cache)", x, y + yAdd + 2);
            this.drawWarning(Database.getText("saveLocalSaveWarning1"), x, y + yAdd + 3);
            this.drawWarning(Database.getTranslatedText("saveLocalSaveWarning0"), x, y + yAdd + 5, true);
            this.drawWarning(Database.getTranslatedText("saveLocalSaveWarning1"), x, y + yAdd + 6, true);
        }
        // Return yAdd
        return yAdd;
    };
    Save.prototype.drawLocalSave = function (x, y) {
        // The y we will return (will remain 0 if there's no translation to show)
        var yAdd = 0;
        // Title & why
        this.drawTitle("saveLocalSaveTitle", y + yAdd);
        this.drawPoint("saveLocalSaveWhy", x, y + yAdd + 2);
        if (Database.isTranslated())
            yAdd += 1;
        // If we support local saving
        if (LocalSaving.supportsLocalSaving()) {
            // Choose a slot text
            this.drawPoint("saveLocalSaveChooseSlot", x, y + yAdd + 4);
            // Slots list
            this.renderArea.addList(x + 5, x + 45, y + yAdd + 7, "saveLocalSaveSlotsList", new CallbackCollection(this.slotSelected.bind(this)), this.slotsArray);
            // Autosave enabled ?
            if (this.getGame().getLocalAutosaveEnabled()) {
                this.drawGreen(Database.getText("saveLocalSaveAutosaveEnabled"), x, y + yAdd + 9);
                if (Database.getTranslatedText("saveLocalSaveAutosaveEnabled") != "")
                    this.drawGreen("(" + Database.getTranslatedText("saveLocalSaveAutosaveEnabled") + ")", x, y + yAdd + 10, true);
                this.drawGreen("Next save in " + Algo.pluralFormat(Math.ceil(this.getGame().getLocalAutosaveTime() / 60), " minute", " minutes") + " on slot " + this.getGame().getLocalAutosaveSlot().substr(4, 1) + ".", x, y + yAdd + 11);
            }
            // Separation lines
            this.renderArea.drawVerticalLine("|", x + 50, y + yAdd + 5, y + yAdd + 11);
            this.renderArea.drawHorizontalLine("-", x, x + 100, y + yAdd + 3);
            this.renderArea.drawHorizontalLine("-", x, x + 100, y + yAdd + 12);
            // Choose what to do text
            this.drawPoint("saveLocalSaveChooseWhatToDo", x + 51, y + yAdd + 4);
            // Add save button
            this.renderArea.addAsciiRealButton(Database.getText("saveLocalSaveSaveButton") + " on slot " + this.selectedSlot.substr(4, 1), x + 51, y + yAdd + 7, "saveLocalSaveSaveButton", Database.getTranslatedText("saveLocalSaveSaveButton"), true, -1, null, false);
            this.renderArea.addLinkCall(".saveLocalSaveSaveButton", new CallbackCollection(this.clickedSave.bind(this)));
            // If autosave is disabled or it's not enabled on the currently selected slot
            if (this.getGame().getLocalAutosaveEnabled() == false) {
                // Add autosave button
                this.renderArea.addAsciiRealButton(Database.getText("saveLocalSaveAutosaveButton") + " on slot " + this.selectedSlot.substr(4, 1), x + 51, y + yAdd + 10, "saveLocalSaveAutosaveButton", Database.getTranslatedText("saveLocalSaveAutosaveButton"), true, -1, null, false);
                this.renderArea.addLinkCall(".saveLocalSaveAutosaveButton", new CallbackCollection(this.clickedAutosave.bind(this)));
            }
            // Else
            else {
                // Add disable autosave button
                this.renderArea.addAsciiRealButton(Database.getText("saveLocalSaveDisableAutosaveButton"), x + 51, y + yAdd + 10, "saveLocalSaveDisableAutosaveButton", Database.getTranslatedText("saveLocalSaveDisableAutosaveButton"), true, -1, null, false);
                this.renderArea.addLinkCall(".saveLocalSaveDisableAutosaveButton", new CallbackCollection(this.clickedDisableAutosave.bind(this)));
            }
        }
        // If we don't
        else {
            // Warning messages
            this.drawWarning(Database.getText("saveLocalSaveWarning0") + " (local storage and application cache)", x, y + yAdd + 4);
            this.drawWarning(Database.getText("saveLocalSaveWarning1"), x, y + yAdd + 5);
            this.drawWarning(Database.getTranslatedText("saveLocalSaveWarning0"), x, y + yAdd + 7, true);
            this.drawWarning(Database.getTranslatedText("saveLocalSaveWarning1"), x, y + yAdd + 8, true);
        }
        // Return yAdd
        return yAdd;
    };
    Save.prototype.drawFileLoad = function (x, y) {
        // The y we will return (will remain 0 if there's no translation to show)
        var yAdd = 0;
        // Title
        this.drawTitle("saveFileLoadTitle", y + yAdd);
        // Instructions
        this.renderArea.drawString(Database.getText("saveFileLoadPaste"), x, y + yAdd + 2);
        this.renderArea.drawString(Database.getTranslatedText("saveFileLoadPaste"), x, y + yAdd + 3, true);
        // Add the text area
        this.renderArea.addTextarea(x + 2, y + yAdd + 5, 96, 6, "saveFileLoadTextarea");
        // Add the load button
        this.renderArea.addAsciiRealButton(Database.getText("saveFileLoadButton"), 48, y + yAdd + 13, "saveFileLoadButton", Database.getTranslatedText("saveFileLoadButton"), true);
        this.renderArea.addLinkCall(".saveFileLoadButton", new CallbackCollection(this.clickedFileLoad.bind(this)));
        // Return yAdd
        return yAdd;
    };
    Save.prototype.drawFileSave = function (x, y) {
        // The y we will return (will remain 0 if there's no translation to show)
        var yAdd = 0;
        // The title
        this.drawTitle("saveFileSaveTitle", y + yAdd);
        // The "why"
        this.renderArea.drawString(Database.getText("saveFileSaveWhy0"), x, y + yAdd + 2);
        this.renderArea.drawString(" - " + Database.getText("saveFileSaveWhy1"), x, y + yAdd + 3);
        this.renderArea.drawString(" - " + Database.getText("saveFileSaveWhy2"), x, y + yAdd + 4);
        this.renderArea.drawString(" - " + Database.getText("saveFileSaveWhy3"), x, y + yAdd + 5);
        this.renderArea.drawString("   " + Database.getText("saveFileSaveWhy4"), x, y + yAdd + 6);
        // The translated "why" (only if there's a translation)
        if (Database.isTranslated()) {
            this.renderArea.drawString(Database.getTranslatedText("saveFileSaveWhy0"), x, y + yAdd + 8, true);
            this.renderArea.drawString(" - " + Database.getTranslatedText("saveFileSaveWhy1"), x, y + yAdd + 9, true);
            this.renderArea.drawString(" - " + Database.getTranslatedText("saveFileSaveWhy2"), x, y + yAdd + 10, true);
            this.renderArea.drawString(" - " + Database.getTranslatedText("saveFileSaveWhy3"), x, y + yAdd + 11, true);
            this.renderArea.drawString("   " + Database.getTranslatedText("saveFileSaveWhy4"), x, y + yAdd + 12, true);
            yAdd += 6; // We increase yAdd by 6 because the translations took 6 lines
        }
        // Add the button
        this.renderArea.addAsciiRealButton(Database.getText("saveFileSaveButton"), 35, y + yAdd + 8, "saveFileSaveButton", Database.getTranslatedText("saveFileSaveButton"), true);
        this.renderArea.addLinkCall(".saveFileSaveButton", new CallbackCollection(this.clickedFileSave.bind(this)));
        // Add the text area
        this.renderArea.addTextarea(x + 2, y + yAdd + 11, 96, 6, "saveFileSaveTextarea", (this.fileSaveTextareaContent != null ? this.fileSaveTextareaContent : ""));
        // Should we show the warning?
        if (this.showFileSaveWarning) {
            this.drawWarning(Database.getText("saveFileSaveWarning"), x + 2, y + yAdd + 12);
            this.drawWarning(Database.getTranslatedText("saveFileSaveWarning"), x + 2, y + yAdd + 13, true);
        }
        // We return yAdd
        return yAdd;
    };
    Save.prototype.drawPoint = function (textName, x, y) {
        this.renderArea.drawString(Database.getText(textName), x, y);
        this.renderArea.drawString(Database.getTranslatedText(textName), x, y + 1, true);
    };
    Save.prototype.drawTitle = function (textName, y) {
        var x = 50 - Math.floor((Database.getText(textName).length / 2 + 1 + Database.getTranslatedText(textName).length / 2));
        this.renderArea.drawString(Database.getText(textName), x, y);
        this.renderArea.addBold(x, x + Database.getText(textName).length, y);
        this.renderArea.drawString(Database.getTranslatedText(textName), x + Database.getText(textName).length + 1, y, true);
    };
    Save.prototype.drawWarning = function (text, x, y, translated) {
        if (translated === void 0) { translated = false; }
        if (text != "") {
            this.renderArea.drawString(text, x, y, translated);
            this.renderArea.addColor(x, x + text.length, y, new Color(ColorType.SAVE_RED));
        }
    };
    Save.prototype.oneSecondCallback = function () {
        // If there's no last minute or it's different from the current minute
        if (this.lastLocalAutosaveMinute == null || this.lastLocalAutosaveMinute != Math.ceil(this.getGame().getLocalAutosaveTime() / 60)) {
            // We set the minute
            this.lastLocalAutosaveMinute = Math.ceil(this.getGame().getLocalAutosaveTime() / 60);
            // We update
            this.createSlotsArray();
            this.update();
            this.getGame().updatePlace();
        }
    };
    Save.prototype.resize = function () {
        // The size depends on if there's a translation or not
        if (Database.isTranslated())
            this.renderArea.resize(100, 84);
        else
            this.renderArea.resize(100, 74);
    };
    Save.prototype.selectRightSlot = function () {
        // We select the right slot
        $("#" + this.selectedSlot).prop('selected', true);
    };
    Save.prototype.slotSelected = function () {
        // Get the selected language id
        this.selectedSlot = $("#saveLocalSaveSlotsList").find(":selected").attr("id");
        // Update the ligthouse
        this.update();
        this.getGame().updatePlace();
    };
    Save.prototype.update = function () {
        var yPosition = 0; // The y position where we will add things. Can be incremented sometimes, depending on the user's language..
        // Erase everything
        this.renderArea.resetAllButSize();
        // Saving
        this.renderArea.drawArray(Database.getAscii("text/Saving"), 50 - Math.floor((Database.getAsciiWidth("text/Saving") / 2)), yPosition);
        yPosition += this.drawLocalSave(0, yPosition + 7);
        yPosition += this.drawFileSave(0, yPosition + 21);
        // Loading
        this.renderArea.drawArray(Database.getAscii("text/Loading"), 50 - Math.floor((Database.getAsciiWidth("text/Loading") / 2)), yPosition + 40);
        yPosition += this.drawLocalLoad(0, yPosition + 47);
        yPosition += this.drawFileLoad(0, yPosition + 59);
        // Add the link which will call the selectRightSlot method after the html dom is created
        this.renderArea.addLinkCallbackCollection(new CallbackCollection(this.selectRightSlot.bind(this)));
    };
    return Save;
}(Place));
//# sourceMappingURL=Save.js.map