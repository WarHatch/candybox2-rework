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
var RenderLinkSimpleInput = /** @class */ (function (_super) {
    __extends(RenderLinkSimpleInput, _super);
    // Constructor
    function RenderLinkSimpleInput(element, callbackCollection, defaultValue, hasFocus) {
        var _this = _super.call(this) || this;
        _this.element = element;
        _this.callbackCollection = callbackCollection;
        _this.defaultValue = defaultValue;
        _this.hasFocus = hasFocus;
        return _this;
    }
    // Public methods
    RenderLinkSimpleInput.prototype.run = function () {
        // We copy the render link so we can use it in the functions below
        var renderLink = this;
        // If the default value isn't null
        if (this.defaultValue != null) {
            // We set the default value
            $(this.element).val(this.defaultValue);
        }
        // We set the change event
        $(this.element).change(function (event) {
            // We fire the callback collection
            renderLink.callbackCollection.fire();
            return false; // Avoid event bubbling
        });
        if (this.hasFocus)
            $(this.element).focus();
    };
    return RenderLinkSimpleInput;
}(RenderLink));
//# sourceMappingURL=RenderLinkSimpleInput.js.map