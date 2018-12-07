///<reference path="../../main/QuestEntity.ts"/>
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
var PeacefulForest_Tree = /** @class */ (function (_super) {
    __extends(PeacefulForest_Tree, _super);
    // Constructor
    function PeacefulForest_Tree(quest, pos) {
        var _this = _super.call(this, quest, pos, // The global position of the tree in the quest. We use the value given in parameter.
        new Naming("A tree", "a tree"), // The name of the entity as it will appear in the quest log. Two parameters : the first one ("A tree") is used at the beginning of a sentence, and the second one ("a tree") is used inside a sentence
        new RenderArea(3, 1), // The tree render area : 3 characters width and 1 character height
        new Pos(0, 0), // The position of where the render area is drawn relatively to the global position (see three lines above)
        new CollisionBoxCollection(), // The collision box collection of the tree, made of one collision box (position 0, 0, size 3, 1)
        new QuestEntityMovement() // The tree's movement. We don't give any parameter because the tree isn't actually moving.
        ) || this;
        //Breaking Change fix
        _this.setCbc(new CollisionBoxCollection((new CollisionBox(_this, new Pos(0, 0), new Pos(3, 1)))));
        // Set gravity : the tree can fall (even if it probably won't because it lays on the ground)
        _this.getQuestEntityMovement().setGravity(true);
        // Set destructible
        _this.setDestructible(true); // The tree will be destructible
        _this.setMaxHp(50); // Set the maximum health points
        _this.setHp(50); // Set the health points
        // Set the ascii art
        _this.getRenderArea().drawString("|||", 0, 0); // Draw the tree ("|||") on the render area
        // Add the tree's weapon. It will be attacking with its leaves.
        _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, // Nothing important here
        new Naming("Its leaves", "its leaves"), // The weapon's name
        new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, -1), new Pos(5, 2))), // The tree collision box collection, made of one collision box (position -1, -1, size 5, 2)
        1)); // The weapon's damage (1)
        // Set the weapon's delay
        _this.getLastQuestEntityWeapon().getCloseCombatDelay().setFixedDelay(5); // This means the tree will inflict damage every 5 seconds
        return _this;
    }
    return PeacefulForest_Tree;
}(QuestEntity));
//# sourceMappingURL=PeacefulForest_Tree.js.map