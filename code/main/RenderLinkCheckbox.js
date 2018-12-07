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
var RenderLinkCheckbox = /** @class */ (function (_super) {
    __extends(RenderLinkCheckbox, _super);
    // Constructor
    function RenderLinkCheckbox(element, callbackCollectionWhenChecked, callbackCollectionWhenUnchecked) {
        var _this = _super.call(this) || this;
        _this.element = element;
        _this.callbackCollectionWhenChecked = callbackCollectionWhenChecked;
        _this.callbackCollectionWhenUnchecked = callbackCollectionWhenUnchecked;
        return _this;
    }
    // Public methods
    RenderLinkCheckbox.prototype.run = function () {
        // We copy the render link so we can use it in the functions below
        var renderLink = this;
        // We set the change event
        $(this.element).change(function (event) {
            if ($(this).is(':checked')) {
                // We fire the callback collection
                renderLink.callbackCollectionWhenChecked.fire();
            }
            else {
                renderLink.callbackCollectionWhenUnchecked.fire();
            }
            return false; // Avoid event bubbling
        });
    };
    return RenderLinkCheckbox;
}(RenderLink));
//# sourceMappingURL=RenderLinkCheckbox.js.map