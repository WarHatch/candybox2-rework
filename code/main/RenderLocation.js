///<reference path="./../../libs/jquery.d.ts"/>
var RenderLocation = /** @class */ (function () {
    // Constructor
    function RenderLocation(locationString, scrolling) {
        if (scrolling === void 0) { scrolling = false; }
        this.scrolling = null;
        this.setLocationString(locationString);
        this.setScrolling(scrolling);
    }
    // Public methods
    RenderLocation.prototype.render = function (renderArea) {
        $(this.locationString).html(renderArea.getForRendering());
        renderArea.runLinks();
    };
    RenderLocation.prototype.setContentGap = function (gap) {
        var ex, outerWidth, addGap = 0;
        // Get our outer width
        outerWidth = $(this.locationString).outerWidth();
        // Get the real ex value
        ex = this.getRealExValueFromTheStatusBar();
        // If our outerWidth is bigger than the window, calc an additional gap
        if (outerWidth > $(window).width())
            addGap = -(outerWidth - $(window).width()) / 2;
        // Finally change the "left" value of our div
        $(this.locationString).css({ "left": ((gap / 2) * ex + addGap).toString() + "px" });
    };
    // Public setters    
    RenderLocation.prototype.setLocationString = function (locationString) {
        this.locationString = locationString;
    };
    RenderLocation.prototype.setScrolling = function (scrolling, defaultScroll) {
        if (defaultScroll === void 0) { defaultScroll = 0; }
        // If the scrolling is different
        if (this.scrolling != scrolling) {
            this.scrolling = scrolling;
            // We initialize or stop scrolling, depending on the new scrolling value
            if (this.scrolling)
                this.initScrolling(defaultScroll);
            else
                this.stopScrolling();
        }
    };
    // Public getters
    RenderLocation.prototype.getScroll = function () {
        return $("html").scrollTop();
    };
    RenderLocation.prototype.getScrolling = function () {
        return this.scrolling;
    };
    // Private methods
    RenderLocation.prototype.getRealExValueFromTheStatusBar = function () {
        // DISCLAIMER
        // Yes, I know that this method is really ugly
        // But if I don't do this way, there are some stupid gaps in long quests and the browser zooms in and out (or even without zooming in Chrome)
        // If anyone has a better cross-browser solution, please tell me!
        // Return the real "ex" value in pixels
        return $("#statusBar").outerWidth() / 100;
    };
    RenderLocation.prototype.initScrolling = function (defaultScroll) {
        // Scroll to the default scroll
        $("html").scrollTop(defaultScroll);
        // Set css for our location string
        $(this.locationString).css({
            'position': 'absolute',
            'left': '0',
            'top': '0',
            'overflow-x': 'scroll'
        });
        // Set css for around the status bar
        $("#aroundStatusBar").css({
            'position': 'fixed',
            'top': '0',
            'left': '0',
            'right': '0',
            'height': '0'
        });
    };
    RenderLocation.prototype.stopScrolling = function () {
        // Set the scroll to 0
        $("html").scrollTop(0);
        // Reset css for our location string
        $(this.locationString).css({
            'position': 'relative',
            'overflow-x': 'hidden'
        });
        // Reset css for around the status bar
        $("#aroundStatusBar").css({
            'position': 'relative',
            'top': 'auto',
            'left': 'auto',
            'right': 'auto',
            'height': 'auto'
        });
    };
    return RenderLocation;
}());
//# sourceMappingURL=RenderLocation.js.map