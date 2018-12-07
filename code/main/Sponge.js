///<reference path="QuestEntity.ts"/>
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
var Sponge = /** @class */ (function (_super) {
    __extends(Sponge, _super);
    // Constructor
    function Sponge(quest, leftDownCornerPosition) {
        var _this = this;
        // Create the real global position
        var globalPosition = leftDownCornerPosition;
        globalPosition.add(new Pos(0, -Database.getAsciiHeight("places/quests/theSea/sponge") + 1));
        // Call the mother constructor
        _this = _super.call(this, quest, globalPosition, new Naming("A sponge", "a sponge"), new RenderArea(), new Pos(0, 0), new CollisionBoxCollection()) || this;
        //breaking change fix
        //REMEMEBER THAT 4 USED TO BE width
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, 0), new Pos(4, 1))));
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(40);
        _this.setHp(40);
        // Set the team (nature)
        _this.setTeam(QuestEntityTeam.NATURE);
        // Draw the ascii art
        _this.getRenderArea().resizeFromArray(Database.getAscii("places/quests/theSea/sponge"));
        _this.getRenderArea().drawArray(Database.getAscii("places/quests/theSea/sponge"));
        return _this;
    }
    // willDie()
    Sponge.prototype.willDie = function () {
        _super.prototype.willDie.call(this);
        this.getQuest().foundGridOrEqItem(new QuestItemFound(this.getQuest(), "gridItemPossessedSponge", "You found a sponge.", "You gain a sponge."));
    };
    return Sponge;
}(QuestEntity));
//# sourceMappingURL=Sponge.js.map