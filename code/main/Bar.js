///<reference path="BarType.ts"/>
///<reference path="RenderArea.ts"/>
///<reference path="Resource.ts"/>
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
var Bar = /** @class */ (function (_super) {
    __extends(Bar, _super);
    // Constructor
    function Bar(type) {
        var _this = 
        // Super constructor
        _super.call(this) || this;
        // We set the type
        _this.type = type;
        // We set some parameters depending on the bar type
        switch (_this.type) {
            case BarType.SIMPLE:
                _this.contentCharacter = "*";
                _this.bordersCharacter = "-";
                break;
            case BarType.HEALTH:
            case BarType.UNICOLOR_HEALTH:
                _this.contentCharacter = " ";
                _this.bordersCharacter = "-";
                break;
            default:
                console.log("Error : trying to load an incorrect bar type");
                break;
        }
        return _this;
    }
    // Public methods
    Bar.prototype.update = function (ratio, text) {
        if (text === void 0) { text = ""; }
        var bordersBool;
        var lateralBordersBool;
        var textBool;
        var contentY1;
        var contentY2;
        var contentSize;
        var colorType;
        // If we have no height, we return
        if (this.getHeight() <= 0)
            return false;
        // If the width is really to low, we return
        if (this.getWidth() <= 1)
            return false;
        // We remove all the tags and all the text
        this.removeAllTags();
        this.eraseEverything();
        // We decide if there will be text or not..
        if (text.length != 0) // If there is at least one character in the text to draw
            textBool = true;
        else
            textBool = false;
        // We decide if there will be borders or not..
        if (this.getHeight() < (textBool ? 4 : 3)) // If the height is 1 or 2 without text, no borders / if the height is 1 or 2 or 3 with text, no borders
            bordersBool = false;
        else // Else, borders
            bordersBool = true;
        // ..and where the real content of the bar will take place
        if (bordersBool) {
            contentY1 = 1;
            if (textBool)
                contentY2 = this.getHeight() - 3;
            else
                contentY2 = this.getHeight() - 2;
        }
        else {
            contentY1 = 0;
            if (textBool && this.getHeight() > 1)
                contentY2 = this.getHeight() - 2;
            else
                contentY2 = this.getHeight() - 1;
        }
        // We decide if there will be lateral borders
        if (this.getWidth() >= 20)
            lateralBordersBool = true;
        else
            lateralBordersBool = false;
        // We possibly draw the lateral borders
        if (lateralBordersBool) {
            for (var i = contentY1; i <= contentY2; i++) {
                this.drawString("|", 0, i);
                this.drawString("|", this.getWidth() - 1, i);
            }
        }
        // We draw the borders if there are borders
        if (bordersBool) {
            this.drawHorizontalLine(this.bordersCharacter, 0, this.getWidth() - 1, 0);
            if (textBool)
                this.drawHorizontalLine(this.bordersCharacter, 0, this.getWidth() - 1, this.getHeight() - 2);
            else
                this.drawHorizontalLine(this.bordersCharacter, 0, this.getWidth() - 1, this.getHeight() - 1);
        }
        // We calculate the content size
        contentSize = Math.floor((this.getWidth() - (lateralBordersBool ? 2 : 0)) * ratio);
        if (contentSize == 0 && ratio > 0)
            contentSize = 1; // If the ratio is > 0, then the content size can't be == 0
        // We draw the content if the content size is > 0
        if (contentSize > 0) {
            for (var i = contentY1; i <= contentY2; i++) {
                this.drawHorizontalLine(this.contentCharacter, (lateralBordersBool ? 1 : 0), contentSize, i);
            }
        }
        // We draw the text if there is text
        if (textBool) {
            this.drawString(text, (text.length > this.getWidth() ? 0 : Math.floor(this.getWidth() / 2 - text.length / 2)), this.getHeight() - 1);
        }
        // We add special tags, depending on the type of bar
        switch (this.type) {
            case BarType.HEALTH:
            case BarType.UNICOLOR_HEALTH:
                // We choose the color
                if (this.type == BarType.HEALTH) {
                    if (ratio < 0.2)
                        colorType = ColorType.HEALTH_RED;
                    else if (ratio < 0.5)
                        colorType = ColorType.HEALTH_ORANGE;
                    else
                        colorType = ColorType.HEALTH_GREEN;
                }
                else
                    colorType = ColorType.HEALTH_UNICOLOR;
                // We add the tags
                if (contentSize > 0) {
                    for (var i = contentY1; i <= contentY2; i++) {
                        this.addBackgroundColor((lateralBordersBool ? 1 : 0), (lateralBordersBool ? 1 : 0) + contentSize, i, new Color(colorType));
                    }
                }
                break;
        }
        // Finally, we return true
        return true;
    };
    return Bar;
}(RenderArea));
//# sourceMappingURL=Bar.js.map