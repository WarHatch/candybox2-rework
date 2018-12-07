var CollisionBoxCollection = /** @class */ (function () {
    // Constructor
    function CollisionBoxCollection() {
        var boxes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            boxes[_i] = arguments[_i];
        }
        this.boxes = boxes;
    }
    // Public method
    CollisionBoxCollection.prototype.addCollisionBox = function (collisionBox) {
        this.boxes.push(collisionBox);
    };
    CollisionBoxCollection.prototype.collidesWith = function (collisionBoxCollection, pos) {
        if (pos === void 0) { pos = new Pos(0, 0); }
        // We test if one of our boxes collide with one of the boxes of the collection given in parameters
        for (var i = 0; i < this.boxes.length; i++) {
            for (var j = 0; j < collisionBoxCollection.getBoxes().length; j++) {
                // If there's a collision between those two, we return true
                if (this.boxes[i].collidesWith(collisionBoxCollection.getBoxes()[j], pos))
                    return true;
            }
        }
        // No collision, we return false
        return false;
    };
    CollisionBoxCollection.prototype.move = function (pos) {
        // We move each collision box
        for (var i = 0; i < this.boxes.length; i++) {
            this.boxes[i].move(pos);
        }
    };
    CollisionBoxCollection.prototype.removeBoxes = function () {
        this.boxes = [];
    };
    // Public getters
    CollisionBoxCollection.prototype.getBoxes = function () {
        return this.boxes;
    };
    return CollisionBoxCollection;
}());
//# sourceMappingURL=CollisionBoxCollection.js.map