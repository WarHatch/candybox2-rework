///<reference path="./../../main/Spikes.ts"/>
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
var HardcorePlatformer_Spikes = /** @class */ (function (_super) {
    __extends(HardcorePlatformer_Spikes, _super);
    function HardcorePlatformer_Spikes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Public methods
    HardcorePlatformer_Spikes.prototype.update = function () {
        // If the player is too close, we disappear!!
        if (this.getQuest().getGame().getPlayer().getGlobalPosition().x > this.getGlobalPosition().x - 5)
            this.setDead(true);
        // Call the mother class update method
        _super.prototype.update.call(this);
    };
    return HardcorePlatformer_Spikes;
}(Spikes));
//# sourceMappingURL=HardcorePlatformer_Spikes.js.map