var CollisionBox = /** @class */ (function () {
    // Constructor
    function CollisionBox(questEntity, position, size) {
        this.questEntity = questEntity;
        this.position = position;
        this.size = size;
    }
    // Public methods
    CollisionBox.prototype.collidesWith = function (collisionBox, pos) {
        if (pos === void 0) { pos = new Pos(0, 0); }
        // We return false if we detect that the collision is impossible
        if (collisionBox.questEntity.getGlobalPosition().x + collisionBox.position.x + collisionBox.size.x <= this.questEntity.getGlobalPosition().x + this.position.plus(pos).x)
            return false;
        if (collisionBox.questEntity.getGlobalPosition().x + collisionBox.position.x >= this.questEntity.getGlobalPosition().x + this.position.plus(pos).x + this.size.x)
            return false;
        if (collisionBox.questEntity.getGlobalPosition().y + collisionBox.position.y + collisionBox.size.y <= this.questEntity.getGlobalPosition().y + this.position.plus(pos).y)
            return false;
        if (collisionBox.questEntity.getGlobalPosition().y + collisionBox.position.y >= this.questEntity.getGlobalPosition().y + this.position.plus(pos).y + this.size.y)
            return false;
        // Else, we return true
        return true;
    };
    CollisionBox.prototype.move = function (pos) {
        this.position.add(pos);
    };
    // Public getters
    CollisionBox.prototype.getPosition = function () {
        return this.position;
    };
    CollisionBox.prototype.getSize = function () {
        return this.size;
    };
    return CollisionBox;
}());
//# sourceMappingURL=CollisionBox.js.map