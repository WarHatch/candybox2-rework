var Algo;
(function (Algo) {
    // Return 0 is the number given is under 0, else return the number given
    function correctIfUnderZero(n) {
        if (n < 0)
            return 0;
        return n;
    }
    Algo.correctIfUnderZero = correctIfUnderZero;
    // Return the maximum value a javascript Number can get before loosing precision
    function getMaximumJavascriptInt() {
        return 9007199254740992; // 2^53
    }
    Algo.getMaximumJavascriptInt = getMaximumJavascriptInt;
    // Return a Pos object corresponding to a direction
    // x and y values can be between -a and a, but they can't both be 0
    function getRandomNotImmobileDirectionUpToThisSpeed(a) {
        var pos = new Pos();
        // Set x and y
        pos.x = Random.between(-a, a);
        if (pos.x != 0)
            pos.y = Random.between(-a, a);
        else {
            // x is 0, so y can't be 0 : we pick positive or negative randomly
            if (Random.flipACoin())
                pos.y = Random.between(-a, -1);
            else
                pos.y = Random.between(1, a);
        }
        // We possibly invert x and y because since x is treated first, basically it has more chance than y to be 0
        if (Random.flipACoin())
            pos.invert();
        // We return the position
        return pos;
    }
    Algo.getRandomNotImmobileDirectionUpToThisSpeed = getRandomNotImmobileDirectionUpToThisSpeed;
    // Add the html <u> tag around the specified letter in the string given, and return the resulting string
    function makeUnderlinedLetter(s, underlinedLetter) {
        if (underlinedLetter != -1)
            return s.slice(0, underlinedLetter) + "<u>" + s.charAt(underlinedLetter) + "</u>" + s.slice(underlinedLetter + 1, s.length);
        else
            return s;
    }
    Algo.makeUnderlinedLetter = makeUnderlinedLetter;
    // Transform a number in a string and add whitespaces every three figures
    function numberToStringButNicely(n) {
        // We store the number as a string in the variable str
        var str = n.toString();
        // If the number isn't going to loose precision because it's too big, we add whitespaces every three characters
        if (n < getMaximumJavascriptInt()) {
            // If the var is bigger than 3 characters
            if (str.length > 3) {
                for (var i = Math.floor(str.length / 3); i > 0; i--) {
                    if (i * 3 != str.length) // To avoid adding a whitespace at the left of multiple-of-three strings
                        str = str.addAt(str.length - i * 3, " ");
                }
            }
        }
        // Return str
        return str;
    }
    Algo.numberToStringButNicely = numberToStringButNicely;
    // Create a string from a number and a word added depending on the plurality of the number
    function pluralFormat(n, singular, plural) {
        if (n == 1)
            return n.toString() + singular;
        return n.toString() + plural;
    }
    Algo.pluralFormat = pluralFormat;
    // Create a string from a number and a word added depending on the plurality of the number (and format the number nicely)
    function pluralFormatNicely(n, singular, plural) {
        if (n == 1)
            return numberToStringButNicely(n) + singular;
        return numberToStringButNicely(n) + plural;
    }
    Algo.pluralFormatNicely = pluralFormatNicely;
    // Remove all special characters from a string, only let lower-case letters
    function simplifyString(s) {
        return s.toLowerCase().replace(/[^\w]|_/g, "");
    }
    Algo.simplifyString = simplifyString;
    // Return the biggest number between two numbers
    function takeBiggest(a, b) {
        if (a > b)
            return a;
        return b;
    }
    Algo.takeBiggest = takeBiggest;
})(Algo || (Algo = {}));
//# sourceMappingURL=Algo.js.map