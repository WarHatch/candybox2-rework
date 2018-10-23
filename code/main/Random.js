var Random;
(function (Random) {
    function between(a, b) {
        // BUGS
        if (Bugs.getUltimateBugLevel() >= 2)
            return b;
        return Math.floor(Math.random() * (b - a + 1)) + a;
    }
    Random.between = between;
    function flipACoin() {
        // BUGS
        if (Bugs.getUltimateBugLevel() >= 2)
            return true;
        if (Math.random() < 0.5)
            return false;
        return true;
    }
    Random.flipACoin = flipACoin;
    function fromArray(arr) {
        // BUGS
        if (Bugs.getUltimateBugLevel() >= 4)
            return fromArray(["a", "b", "c", "d", -852, null, "aniwey", "ilovebugs", "42", 42]);
        return arr[upTo(arr.length - 1)];
    }
    Random.fromArray = fromArray;
    function fromPosition(pos) {
        // BUGS
        if (Bugs.getUltimateBugLevel() >= 3)
            return new Pos(-pos.x, -pos.y);
        return new Pos(Random.upTo(pos.x), Random.upTo(pos.y));
    }
    Random.fromPosition = fromPosition;
    function oneChanceOutOf(n) {
        // BUGS
        if (Bugs.getUltimateBugLevel() >= 1)
            return flipACoin();
        if (this.upTo(n - 1) == 0)
            return true;
        return false;
    }
    Random.oneChanceOutOf = oneChanceOutOf;
    function upTo(n) {
        // BUGS
        if (Bugs.getUltimateBugLevel() >= 3)
            return -n;
        return Math.floor(Math.random() * (n + 1));
    }
    Random.upTo = upTo;
})(Random || (Random = {}));
//# sourceMappingURL=Random.js.map