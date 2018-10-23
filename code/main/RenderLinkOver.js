///<reference path="RenderLink.ts"/>
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
var RenderLinkOver = /** @class */ (function (_super) {
    __extends(RenderLinkOver, _super);
    // Constructor
    function RenderLinkOver(firstElement, secondElement) {
        var _this = _super.call(this) || this;
        _this.firstElement = firstElement;
        _this.secondElement = secondElement;
        return _this;
    }
    // Public methods
    RenderLinkOver.prototype.run = function () {
        // We copy the render link so we can use it in the functions below
        var renderLink = this;
        $(this.firstElement).mouseenter(function (event) {
            $(renderLink.secondElement).show();
            return false; // Avoid event bubbling
        })
            .mouseleave(function (event) {
            $(renderLink.secondElement).hide();
            return false; // Avoid event bubbling
        });
        /*
        $(this.firstElement).hover(
            function(){
                $(renderLink.secondElement).css('visibility', 'visible');
            },
            function(){
                $(renderLink.secondElement).css('visibility', 'hidden');
            }
        );
        */
    };
    return RenderLinkOver;
}(RenderLink));
//# sourceMappingURL=RenderLinkOver.js.map