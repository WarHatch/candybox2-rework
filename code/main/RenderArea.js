///<reference path="RenderLink.ts"/>
///<reference path="RenderTag.ts"/>
///<reference path="string_prototype.ts"/>
var RenderArea = /** @class */ (function () {
    // Constructor : by default, it creates en empty drawing area
    function RenderArea(width, height, character) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        if (character === void 0) { character = " "; }
        this.area = []; // Array of strings
        this.width = 0; // Width of the area = length of the strings
        this.height = 0; // Height of the area = number of strings
        this.tags = []; // Array of array of tags
        this.links = []; // Array of links
        this.resize(width, height, character);
    }
    // Public methods
    RenderArea.prototype.addAsciiButton = function (x1, x2, y, otherClass) {
        if (otherClass === void 0) { otherClass = ""; }
        return this.addTwoTags(x1, x2, y, "<span class=\"asciiButton " + otherClass + "\">", "</span>");
    };
    RenderArea.prototype.addAsciiNinjaButton = function (x1, x2, y, otherClass) {
        if (otherClass === void 0) { otherClass = ""; }
        return this.addTwoTags(x1, x2, y, "<span class=\"asciiNinjaButton " + otherClass + "\">", "</span>");
    };
    RenderArea.prototype.addAsciiRealButton = function (str, x, y, otherClass, comment, commentBelow, underlinedLetter, color, commentCentered, commentRightAligned) {
        if (otherClass === void 0) { otherClass = ""; }
        if (comment === void 0) { comment = ""; }
        if (commentBelow === void 0) { commentBelow = false; }
        if (underlinedLetter === void 0) { underlinedLetter = -1; }
        if (color === void 0) { color = null; }
        if (commentCentered === void 0) { commentCentered = true; }
        if (commentRightAligned === void 0) { commentRightAligned = false; }
        // Add the button
        if (this.addTag(new RenderTag(x, "<span class=\"aroundRealButton\"><span class=\"asciiRealButton " + otherClass + "\"" + (color == null ? "" : " style=\"background-color:" + color.getColorString() + ";\"") + ">" + Algo.makeUnderlinedLetter(str, underlinedLetter) + "</span></span>"), y) == false)
            return false;
        // Add the comment
        if (comment != "") {
            var commentX;
            var commentY;
            // If the comment should be on the right
            if (commentBelow == false) {
                commentX = x + str.length + 2;
                commentY = y;
            }
            else {
                if (commentCentered)
                    commentX = Algo.correctIfUnderZero(x + str.length / 2 - comment.length / 2);
                else if (commentRightAligned == false)
                    commentX = x;
                else
                    commentX = x + (str.length - comment.length);
                commentY = y + 1;
            }
            if (this.drawString(comment, commentX, commentY) == false)
                return false;
            if (this.addTwoTags(commentX, commentX + comment.length, commentY, "<span class=\"translated\">", "</span>") == false)
                return false;
        }
        return true;
    };
    RenderArea.prototype.addBackgroundColor = function (x1, x2, y, color) {
        return this.addTwoTags(x1, x2, y, "<span style=\"background-color:" + color.getColorString() + "\">", "</span>");
    };
    RenderArea.prototype.addBold = function (x1, x2, y) {
        return this.addTwoTags(x1, x2, y, "<b>", "</b>");
    };
    RenderArea.prototype.addCheckbox = function (x, y, callbackCollectionWhenChecked, callbackCollectionWhenUnchecked, otherClass, checkedByDefault) {
        if (checkedByDefault === void 0) { checkedByDefault = false; }
        this.addTag(new RenderTag(x, "<span class=\"aroundCheckbox\"><input type=\"checkbox\" class=\"asciiCheckbox " + otherClass + "\"" + (checkedByDefault ? "checked" : "") + "></span>"), y);
        this.addLinkCheckbox("." + otherClass, callbackCollectionWhenChecked, callbackCollectionWhenUnchecked);
    };
    RenderArea.prototype.addColor = function (x1, x2, y, color) {
        return this.addTwoTags(x1, x2, y, "<span style=\"color:" + color.getColorString() + "\">", "</span>");
    };
    RenderArea.prototype.addComment = function (x, y, text, otherClass) {
        return this.addTag(new RenderTag(x, "<span class=\"aroundComment " + otherClass + "\"><span class=\"comment englishComment\">" + text + "</span></span>"), y);
    };
    RenderArea.prototype.addEnigma = function (x1, x2, y, enigmaAnswer, callbackCollection, otherClass, wrongClass, wrongMessage) {
        if (wrongClass === void 0) { wrongClass = null; }
        if (wrongMessage === void 0) { wrongMessage = "Wrong"; }
        this.addTag(new RenderTag(x1, "<span class=\"aroundTextInput\"><input type=\"text\" class=\"asciiTextInput noHotkeys " + otherClass + "\" style=\"width:" + (x2 - x1).toString() + "ex\"></span>"), y);
        // If there should be a wrong message
        if (wrongClass != null) {
            // We add the wrong message
            this.drawString(wrongMessage, x1, y + 2);
            this.addTwoTags(x1, x1 + wrongMessage.length, y + 2, "<span class=\"enigmaWrongMessage " + wrongClass + "\">", "</span>");
            // We add the link input which will also display the wrong message if needed
            this.addLinkInput("." + otherClass, enigmaAnswer, callbackCollection, new CallbackCollection(function () {
                // We make the element visible
                $("." + wrongClass).css("visibility", "visible");
                // We add a timeout to hide it soon
                window.setTimeout(function () {
                    $("." + wrongClass).css("visibility", "hidden");
                }, 1000);
            }));
        }
        // Else, no wrong message
        else {
            // We add a simple link input
            this.addLinkInput("." + otherClass, enigmaAnswer, callbackCollection, new CallbackCollection());
        }
    };
    RenderArea.prototype.addFullComment = function (x, y, english, translated, otherClass) {
        if (this.addComment(Algo.correctIfUnderZero(x - (english.length / 2)), y, english, otherClass) == false)
            return false;
        else
            return this.addTranslatedComment(Algo.correctIfUnderZero(x - (translated.length / 2)), y + 1, translated, otherClass);
    };
    RenderArea.prototype.addHiddenClass = function (x1, x2, y, className) {
        return this.addTwoTags(x1, x2, y, "<span visibility=\"hidden\" class=\"" + className + "\">", "</span>");
    };
    RenderArea.prototype.addHtmlLink = function (x, y, url, text) {
        this.drawString(text, x, y);
        this.addTwoTags(x, x + text.length, y, "<a target=\"_blank\" href=\"" + url + "\">", "</a>");
    };
    RenderArea.prototype.addLinkCall = function (e, callbackCollection) {
        this.links.push(new RenderLinkClick(e, callbackCollection));
    };
    RenderArea.prototype.addLinkCallbackCollection = function (callbackCollection) {
        this.links.push(new RenderLinkCallbackCollection(callbackCollection));
    };
    RenderArea.prototype.addLinkChange = function (e, callbackCollection) {
        this.links.push(new RenderLinkChange(e, callbackCollection));
    };
    RenderArea.prototype.addLinkCheckbox = function (e, callbackCollectionWhenChecked, callbackCollectionWhenUnchecked) {
        this.links.push(new RenderLinkCheckbox(e, callbackCollectionWhenChecked, callbackCollectionWhenUnchecked));
    };
    RenderArea.prototype.addLinkInput = function (e, enigmaAnswer, callbackCollection, callbackCollectionWrong) {
        this.links.push(new RenderLinkInput(e, enigmaAnswer, callbackCollection, callbackCollectionWrong));
    };
    RenderArea.prototype.addLinkOnHoverShowTooltip = function (classHover, classTooltip) {
        this.links.push(new RenderLinkOnHoverShowTooltip(classHover, classTooltip));
    };
    RenderArea.prototype.addLinkOver = function (e1, e2) {
        this.links.push(new RenderLinkOver(e1, e2));
    };
    RenderArea.prototype.addLinkSimpleInput = function (e, callbackCollection, defaultValue, hasFocus) {
        this.links.push(new RenderLinkSimpleInput(e, callbackCollection, defaultValue, hasFocus));
    };
    RenderArea.prototype.addList = function (x1, x2, y, id, callbackCollection, optionsArray) {
        if (optionsArray === void 0) { optionsArray = []; }
        var options = "";
        // Add all the options tag & text to the options string
        for (var i = 0; i < optionsArray.length / 2; i++) {
            options += "<option id=\"" + optionsArray[i * 2] + "\" class=\"asciiSelectOption\">" + optionsArray[i * 2 + 1] + "</option>";
        }
        // Add the list itself as a tag
        this.addTag(new RenderTag(x1, "<span class=\"aroundSelect\"><select id=\"" + id + "\" class=\"asciiSelect\" style=\"width:" + (x2 - x1).toString() + "ex\">" + options + "</select></span>"), y);
        // Add the render link used to control the list
        this.addLinkChange("#" + id, callbackCollection);
    };
    RenderArea.prototype.addMultipleAsciiButtons = function (otherClass) {
        var coordinates = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            coordinates[_i - 1] = arguments[_i];
        }
        // If the length of the coordinates array isn't multiple of 3, we return false
        if (coordinates.length % 3 != 0)
            return false;
        // We add all the buttons
        for (var i = 0; i < coordinates.length / 3; i++) {
            if (this.addAsciiButton(coordinates[3 * i], coordinates[3 * i + 1], coordinates[3 * i + 2], otherClass) == false)
                return false;
        }
        // We return true
        return true;
    };
    RenderArea.prototype.addMultipleAsciiNinjaButtons = function (otherClass) {
        var coordinates = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            coordinates[_i - 1] = arguments[_i];
        }
        // If the length of the coordinates array isn't multiple of 3, we return false
        if (coordinates.length % 3 != 0)
            return false;
        // We add all the buttons
        for (var i = 0; i < coordinates.length / 3; i++) {
            if (this.addAsciiNinjaButton(coordinates[3 * i], coordinates[3 * i + 1], coordinates[3 * i + 2], otherClass) == false)
                return false;
        }
        // We return true
        return true;
    };
    RenderArea.prototype.addSimpleInput = function (x1, x2, y, callbackCollection, otherClass, defaultValue, hasFocus) {
        if (defaultValue === void 0) { defaultValue = null; }
        if (hasFocus === void 0) { hasFocus = false; }
        this.addTag(new RenderTag(x1, "<span class=\"aroundTextInput\"><input type=\"text\" class=\"asciiTextInput noHotkeys " + otherClass + "\" style=\"width:" + (x2 - x1).toString() + "ex\"></span>"), y);
        this.addLinkSimpleInput("." + otherClass, callbackCollection, defaultValue, hasFocus);
    };
    RenderArea.prototype.addTag = function (tag, y) {
        // BUGS
        if (Bugs.getGraphicalBugLevel() >= 3)
            y += Random.between(0, 10) - 5;
        // Return false if y is out of bounds
        if (y < 0 || y >= this.height)
            return false;
        // Return false if x is out of bounds
        if (tag.getX() < 0 || tag.getX() > this.getWidth())
            return false;
        // If it's the first tag we add, we just add it
        if (this.tags[y].length == 0) {
            this.tags[y].push(tag);
            return true;
        }
        else { // Else add the tag at the correct place in the array (tags must be sorted !!)
            for (var i = 0; i < this.tags[y].length; i++) {
                // If this is the right place to add the tag, we add it and we break the loop
                if (tag.getX() > this.tags[y][i].getX()) {
                    this.tags[y].splice(i, 0, tag); // We add the tag just before the one we're iterating
                    return true;
                }
            }
        }
        // If we didn't add it yet, it means we have to add it at the end of the array : we do so
        this.tags[y].push(tag);
        // Return true
        return true;
    };
    RenderArea.prototype.addTextarea = function (x, y, width, height, otherClass, text) {
        if (text === void 0) { text = ""; }
        return this.addTag(new RenderTag(x, "<textarea class=\"textarea " + otherClass + "\" rows=\"" + height.toString() + "\" cols=\"" + width.toString() + "\">" + text + "</textarea>"), y);
    };
    RenderArea.prototype.addTooltip = function (tooltipClass, tooltipText) {
        return this.addTag(new RenderTag(0, "<span class=\"tooltip " + tooltipClass + "\">" + tooltipText + "</span>"), 0);
    };
    RenderArea.prototype.addTranslatedComment = function (x, y, text, otherClass) {
        return this.addTag(new RenderTag(x, "<span class=\"aroundComment " + otherClass + "\"><span class=\"comment translated\">" + text + "</span></span>"), y);
    };
    RenderArea.prototype.addTwoTags = function (x1, x2, y, tag1, tag2) {
        // If it fails, we return false
        if (this.addTag(new RenderTag(x1, tag1), y) == false || this.addTag(new RenderTag(x2, tag2), y) == false)
            return false;
        // Else, we return true
        return true;
    };
    RenderArea.prototype.drawArea = function (renderArea, x, y, transparency) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (transparency === void 0) { transparency = null; }
        // Iterate over lines of the area to draw
        for (var i = 0; i < renderArea.getHeight(); i++) {
            // Draw the text
            this.drawString(renderArea.getLine(i), x, y + i, false, transparency);
            // Add the tags
            for (var j = 0; j < renderArea.getTags()[i].length; j++) {
                this.addTag(renderArea.getTags()[i][j].clone().setX(renderArea.getTags()[i][j].getX() + x), y + i);
            }
        }
    };
    RenderArea.prototype.drawArray = function (array, x, y, transparency, spanClass) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (transparency === void 0) { transparency = null; }
        if (spanClass === void 0) { spanClass = null; }
        for (var i = 0; i < array.length; i++) {
            // Draw the string
            this.drawString(array[i], x, y + i, false, transparency);
            // Add the tags
            if (spanClass != null) {
                this.addTwoTags(x, x + array[i].length, y + i, "<span class=\"" + spanClass + "\">", "</span>");
            }
        }
    };
    RenderArea.prototype.drawHorizontalLine = function (str, x1, x2, y) {
        var strBuffer = "";
        // We put the string to draw in a buffer (for optimizations reasons)
        strBuffer = strBuffer.fillWith(str, x2 - x1);
        // We draw the string
        return this.drawString(strBuffer, x1, y);
    };
    RenderArea.prototype.drawSpeech = function (str, y, x1, x2, speechClass, translatedText) {
        if (speechClass === void 0) { speechClass = null; }
        if (translatedText === void 0) { translatedText = null; }
        var currentLine = ""; // Current line
        var lastWordIndex = 0; // Index of the last word drawn
        var width = x2 - x1 - 1; // We calculate the speech's width (-1 because we need space for the " characters)
        var words = str.split(" "); // We split the strings into an array of words
        var xPos; // Used to store some position at some time
        // Draw the first " character
        this.drawString("\"", x1, y);
        for (var i = 0; i < words.length; i++) {
            // If adding the current word to the line would exceed the width or we're working on the last word
            if (currentLine.length + words[i].length >= width) {
                // We draw the current line
                xPos = x1 + 1 + width / 2 - (currentLine.length / 2);
                this.drawString(currentLine, xPos, y);
                // If a speechClass is specified, we add tags
                if (speechClass != null)
                    this.addTwoTags(xPos, xPos + currentLine.length, y, "<span class=\"" + speechClass + "\">", "</span>");
                // We go to the line below
                currentLine = "";
                y++;
            }
            // We add a space before the word if there's at least one word before
            if (currentLine != "")
                currentLine += " ";
            // We add the word to the current line
            currentLine += words[i];
            // If we're working on the last word, we draw the line anyway
            if (i == words.length - 1) {
                xPos = x1 + 1 + width / 2 - (currentLine.length / 2);
                this.drawString(currentLine, xPos, y);
                // If a speechClass is specified, we add tags
                if (speechClass != null)
                    this.addTwoTags(xPos, xPos + currentLine.length, y, "<span class=\"" + speechClass + "\">", "</span>");
            }
        }
        // Draw the second " character
        this.drawString("\"", x2, y);
        // If we should add a translation, then we add it and the translated text isn't empty
        if (translatedText != null && translatedText != "") {
            this.addTooltip(speechClass + "Tooltip", translatedText);
            this.addLinkOnHoverShowTooltip("." + speechClass, "." + speechClass + "Tooltip");
        }
        // We return y, which is the y position of the last speech line
        return y;
    };
    RenderArea.prototype.drawString = function (str, x, y, translated, transparency) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (translated === void 0) { translated = false; }
        if (transparency === void 0) { transparency = null; }
        var indexFirst;
        var indexLast;
        // BUGS (change position)
        if (Bugs.getGraphicalBugLevel() >= 4) {
            x += Random.between(0, 20) - 10;
            y += Random.between(0, 4) - 2;
        }
        // Return false if y is out of bounds
        if (y < 0 || y >= this.height)
            return false;
        // BUGS (random character)
        if (Bugs.getGraphicalBugLevel() >= 3)
            str = Bugs.changeRandomCharacter(str);
        else if (Bugs.getGraphicalBugLevel() >= 2 && Random.oneChanceOutOf(2))
            str = Bugs.changeRandomCharacter(str);
        else if (Bugs.getGraphicalBugLevel() >= 1 && Random.oneChanceOutOf(3))
            str = Bugs.changeRandomCharacter(str);
        // The indices of the first and last character we're going to draw
        indexFirst = 0;
        indexLast = str.length;
        // Restrict the indices if out of bounds
        if (x + indexLast >= this.width)
            indexLast -= (x + indexLast - this.width);
        if (x < 0)
            indexFirst = -x;
        // If there isn't even one character to draw, we return false
        if (indexLast < 0 || indexFirst >= str.length)
            return false;
        // If there's no transparent character, we just draw the whole string
        if (transparency == null) {
            this.area[y] = this.area[y].replaceAt(x + indexFirst, str.substring(indexFirst, indexLast));
        }
        // Else we draw characters one by one to avoid drawing transparent ones !
        else {
            for (var i = indexFirst; i < indexLast; i++) { // We iterate over characters
                // If the character isn't alpha
                if (str[i] != transparency.getAlphaCharacter()) {
                    // If the meta alpha character isn't null and our character is this meta alpha character, we draw the alpha character
                    if (transparency.getMetaAlphaCharacter() != null && str[i] == transparency.getMetaAlphaCharacter())
                        this.area[y] = this.area[y].replaceAt(x + i, transparency.getAlphaCharacter());
                    // Else, we draw the character
                    else
                        this.area[y] = this.area[y].replaceAt(x + i, str[i]);
                }
            }
        }
        // If translated is true, add the tags
        if (translated) {
            this.addTwoTags(x, x + str.length, y, "<span class=\"translated\">", "</span>");
        }
        // And we return true
        return true;
    };
    RenderArea.prototype.drawVerticalLine = function (str, x, y1, y2) {
        for (var i = y1; i <= y2; i++) {
            if (this.drawString(str, x, i) == false)
                return false;
        }
        return true;
    };
    RenderArea.prototype.eraseEverything = function (character) {
        if (character === void 0) { character = " "; }
        var str;
        // We check if the character is correct, return false if it isn't
        if (character.length != 1)
            return false;
        // We prepare the string
        str = "";
        str = str.fillWith(character, this.width);
        // We fill all the lines with the character given in parameter
        for (var i = 0; i < this.height; i++) {
            this.drawString(str, 0, i);
        }
        // We return true
        return true;
    };
    RenderArea.prototype.removeAllLinks = function () {
        this.links = [];
    };
    RenderArea.prototype.removeAllTags = function () {
        for (var i = 0; i < this.tags.length; i++) {
            this.tags[i] = [];
        }
    };
    RenderArea.prototype.resetAllButSize = function (character) {
        if (character === void 0) { character = " "; }
        this.eraseEverything(character);
        this.removeAllTags();
        this.removeAllLinks();
    };
    RenderArea.prototype.resize = function (newWidth, newHeight, character) {
        if (character === void 0) { character = " "; }
        // We store the old size
        var oldWidth = this.width;
        var oldHeight = this.height;
        // We check if the character is correct, return false if it isn't
        if (character.length != 1)
            return false;
        // We try to change the size, return false if failure
        if (this.setSize(newWidth, newHeight) == false)
            return false;
        // We resize the height
        if (newHeight > oldHeight) { // If the new height is higher
            for (var i = oldHeight; i < newHeight; i++) { // We add the lines corresponding to the new height
                // We resize the tags
                this.tags.push([]);
                // We resize the area
                this.area.push("");
                // If the new width is higher
                if (newWidth > oldWidth) {
                    for (var j = 0; j < oldWidth; j++) { // We fill the new lines from 0 to the old width
                        this.area[i] += character;
                    }
                }
                // Else, if the old width is higher
                else if (oldWidth > newWidth) {
                    for (var j = 0; j < newWidth; j++) { // We fill the new lines from 0 to the new width
                        this.area[i] += character;
                    }
                }
            }
        }
        else if (oldHeight > newHeight) { // Else, if the old height was higher
            // We resize the tags
            this.tags.splice(this.tags.length - (oldHeight - newHeight), oldHeight - newHeight); // We remove some lines to reduce the height
            // We resize the area
            this.area.splice(this.area.length - (oldHeight - newHeight), oldHeight - newHeight); // We remove some lines to reduce the height
        }
        // We resize the width
        if (newWidth > oldWidth) { // If the new width is higher
            // We add characters at the end of the lines (lines 0 to new height)
            for (var i = 0; i < newHeight; i++) {
                for (var j = oldWidth; j < newWidth; j++) {
                    this.area[i] += character;
                }
            }
        }
        else if (oldWidth > newWidth) { // Else, if the old width was higher
            // We each line (0 to new height), we only keep the beginning of the string
            for (var i = 0; i < newHeight; i++) {
                this.area[i] = this.area[i].substr(0, newWidth);
            }
        }
        // And we return true
        return true;
    };
    RenderArea.prototype.resizeFromArea = function (renderArea) {
        this.resize(renderArea.getWidth(), renderArea.getHeight());
    };
    RenderArea.prototype.resizeFromArray = function (array, xAdd, yAdd) {
        if (xAdd === void 0) { xAdd = 0; }
        if (yAdd === void 0) { yAdd = 0; }
        var width = 0;
        var height = array.length;
        for (var i = 0; i < array.length; i++) {
            if (width < array[i].length)
                width = array[i].length;
        }
        this.resize(width + xAdd, height + yAdd);
    };
    RenderArea.prototype.runLinks = function () {
        for (var i = 0; i < this.links.length; i++) {
            this.links[i].run();
        }
    };
    // Public getters
    RenderArea.prototype.getForRendering = function () {
        var areaClone = [];
        // If we have no tags at all
        if (this.tags.length == 0) {
            // We simply return the area as a string
            return this.area.join("\n");
        }
        // Else, we have at least one tag
        else {
            // We clone the area
            areaClone = this.area.slice(0);
            // We add tags to it
            for (var i = 0; i < this.height; i++) {
                for (var j = 0; j < this.tags[i].length; j++) {
                    // If the tag should be added, we add it
                    areaClone[i] = this.tags[i][j].draw(areaClone[i]);
                }
            }
            // We return the cloned area as a string
            return areaClone.join("\n");
        }
    };
    RenderArea.prototype.getLine = function (n) {
        if (n < 0 || n >= this.height)
            console.log("Error : trying to get a line out of the bounds of a drawing area.");
        else
            return this.area[n];
    };
    RenderArea.prototype.getTags = function () {
        return this.tags;
    };
    RenderArea.prototype.getWidth = function () {
        return this.width;
    };
    RenderArea.prototype.getHeight = function () {
        return this.height;
    };
    // Private methods
    RenderArea.prototype.setSize = function (width, height) {
        // Return false if the size given is incorrect
        if (width < 0 || height < 0)
            return false;
        this.width = width;
        this.height = height;
        return true;
    };
    return RenderArea;
}());
//# sourceMappingURL=RenderArea.js.map