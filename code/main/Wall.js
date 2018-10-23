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
var Wall = /** @class */ (function (_super) {
    __extends(Wall, _super);
    // Constructor
    function Wall(quest, pos) {
        return _super.call(this, quest, pos, new Naming("A wall", "a wall"), null, new Pos(0, 0), new CollisionBoxCollection()) || this;
    }
    // Public method
    Wall.prototype.addBox = function (pos, size) {
        this.getCbc().addCollisionBox(new CollisionBox(this, pos, size));
    };
    Wall.prototype.removeBoxes = function () {
        this.getCbc().removeBoxes();
    };
    return Wall;
}(QuestEntity));
//# sourceMappingURL=Wall.js.map