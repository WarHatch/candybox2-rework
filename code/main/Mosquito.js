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
var Mosquito = /** @class */ (function (_super) {
    __extends(Mosquito, _super);
    // Constructor
    function Mosquito(quest, pos, groundYPosition) {
        var _this = _super.call(this, quest, pos, new Naming("A forest mosquito", "a forest mosquito"), new RenderArea(1, 1), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement()) || this;
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, 0), new Pos(1, 1))));
        // Set the ground y position from the value given in parameter
        _this.groundYPosition = groundYPosition;
        // Set the perfect position above the ground
        _this.perfectYPositionAboveGround = Random.between(8, 13);
        // Set gravity
        _this.getQuestEntityMovement().setGravity(false);
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(1);
        _this.setHp(1);
        // Set the ascii art (well, it's actually just a ".")
        _this.getRenderArea().drawString(".");
        // Set the weapon and its delay
        _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("A proboscis", "a proboscis"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, -1), new Pos(3, 3))), 12));
        _this.getLastQuestEntityWeapon().getCloseCombatDelay().setOnceThenWaitDelay(20);
        return _this;
    }
    // update()
    Mosquito.prototype.update = function () {
        // Calculate the distance from the player
        var distanceFromPlayer = this.getGlobalPosition().getDistance(this.getQuest().getGame().getPlayer().getGlobalPosition().plus(new Pos(1, 0)));
        // Go towards the player
        this.goTowards(this.getGlobalPosition(), this.getQuest().getGame().getPlayer().getGlobalPosition().plus(new Pos(1, 0)));
        // Call the mother class update method
        _super.prototype.update.call(this);
    };
    return Mosquito;
}(QuestEntity));
//# sourceMappingURL=Mosquito.js.map