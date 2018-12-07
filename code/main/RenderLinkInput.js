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
var RenderLinkInput = /** @class */ (function (_super) {
    __extends(RenderLinkInput, _super);
    // Constructor
    function RenderLinkInput(element, enigmaAnswer, callbackCollection, callbackCollectionWrong) {
        var _this = _super.call(this) || this;
        _this.element = element;
        _this.enigmaAnswer = enigmaAnswer;
        _this.callbackCollection = callbackCollection;
        _this.callbackCollectionWrong = callbackCollectionWrong;
        return _this;
    }
    // Public methods
    RenderLinkInput.prototype.run = function () {
        // We copy the render link so we can use it in the functions below
        var renderLink = this;
        // We set the change event
        $(this.element).change(function (event) {
            // We check if the new value correspond to the answer (if it does we fire the callbacks)
            if (renderLink.enigmaAnswer.isRight($(this).val()))
                renderLink.callbackCollection.fire();
            // Here it means that the new value doesn't correspond to the answers
            else if (renderLink.callbackCollectionWrong != null) {
                renderLink.callbackCollectionWrong.fire();
            }
            // We empty the input area
            $(this).val("");
            return false; // Avoid event bubbling
        });
        // We set the focus
        $(this.element).focus();
    };
    return RenderLinkInput;
}(RenderLink));
//# sourceMappingURL=RenderLinkInput.js.map