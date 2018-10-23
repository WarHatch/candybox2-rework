String.prototype.addAt = function (index, text) {
    return this.substr(0, index) + text + this.substr(index);
};
String.prototype.addChineseSpaces = function () {
    var newStr = "";
    for (var i = 0; i < Math.floor(this.length / 3); i++) {
        newStr += " ";
    }
    newStr += this;
    for (var i = 0; i < Math.floor(this.length / 3); i++) {
        newStr += " ";
    }
    return newStr;
};
String.prototype.fillWith = function (characters, howMuch) {
    var str = "";
    for (var i = 0; i < howMuch; i++) {
        str += characters;
    }
    return this.concat(str);
};
String.prototype.replaceAt = function (index, text) {
    return this.substr(0, index) + text + this.substr(index + text.length);
};
//# sourceMappingURL=string_prototype.js.map