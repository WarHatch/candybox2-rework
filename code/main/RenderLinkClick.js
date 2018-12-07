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
var RenderLinkClick = /** @class */ (function (_super) {
    __extends(RenderLinkClick, _super);
    // Constructor
    function RenderLinkClick(element, callbackCollection) {
        var _this = _super.call(this) || this;
        _this.element = element;
        _this.callbackCollection = callbackCollection;
        return _this;
    }
    // Public methods
    RenderLinkClick.prototype.run = function () {
        // We copy the render link so we can use it in the functions below
        var renderLink = this;
        //added click instead of mouse up to see if that runs the game
        $(this.element).click(function (event) {
            renderLink.callbackCollection.fire();
            return false; // Avoid event bubbling
        });
    };
    return RenderLinkClick;
}(RenderLink));
//# sourceMappingURL=RenderLinkClick.js.map