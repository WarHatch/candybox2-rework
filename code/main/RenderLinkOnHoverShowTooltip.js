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
var RenderLinkOnHoverShowTooltip = /** @class */ (function (_super) {
    __extends(RenderLinkOnHoverShowTooltip, _super);
    // Constructor
    function RenderLinkOnHoverShowTooltip(classHover, classTooltip) {
        var _this = _super.call(this) || this;
        _this.classHover = classHover;
        _this.classTooltip = classTooltip;
        return _this;
    }
    // Public methods
    RenderLinkOnHoverShowTooltip.prototype.run = function () {
        // We copy the render link so we can use it in the functions below
        var renderLink = this;
        // If we hover on the classHover elements
        $(this.classHover).hover(function (event) {
            // We show the classTooltip tooltips
            $(renderLink.classTooltip).css({
                "display": "block"
            });
            // Avoid event bubbling
            return false;
        });
        // Else, if we're out of the classHover elements
        $(this.classHover).mouseout(function (event) {
            // We stop showing the classTooltip tooltips
            $(renderLink.classTooltip).css({
                display: "none"
            });
            // Avoid event bubbling
            return false;
        });
        // If the mouse moves, we put the classTooltip elements under the mouse
        $(this.classHover).on('mousemove', function (e) {
            $(renderLink.classTooltip).css({
                left: e.pageX - $(document).scrollLeft(),
                top: e.pageY - $(document).scrollTop()
            });
        });
    };
    return RenderLinkOnHoverShowTooltip;
}(RenderLink));
//# sourceMappingURL=RenderLinkOnHoverShowTooltip.js.map