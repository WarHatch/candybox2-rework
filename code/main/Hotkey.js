var Hotkey = /** @class */ (function () {
    // Constructor
    function Hotkey(keyString, callbackCollection) {
        this.pressed = false; // Is this hotkey pressed ?
        // Set the key string
        this.keyString = keyString;
        // Handle special keys
        switch (this.keyString) {
            case "up":
                this.key = 38;
                break;
            case "down":
                this.key = 40;
                break;
            case "left":
                this.key = 37;
                break;
            case "right":
                this.key = 39;
                break;
            case "space":
                this.key = 32;
                break;
            case "enter":
                this.key = 13;
                break;
            case "delete":
                this.key = 8;
                break;
            case "numpad0":
                this.key = 96;
                break;
            case "numpad1":
                this.key = 97;
                break;
            case "numpad2":
                this.key = 98;
                break;
            case "numpad3":
                this.key = 99;
                break;
            case "numpad4":
                this.key = 100;
                break;
            case "numpad5":
                this.key = 101;
                break;
            case "numpad6":
                this.key = 102;
                break;
            case "numpad7":
                this.key = 103;
                break;
            case "numpad8":
                this.key = 104;
                break;
            case "numpad9":
                this.key = 105;
                break;
            default:
                this.key = this.keyString.toUpperCase().charCodeAt(0);
                break; // We convert to upper case to please our great jQuery master
        }
        this.callbackCollection = callbackCollection;
    }
    // Public getters
    Hotkey.prototype.getCallbackCollection = function () {
        return this.callbackCollection;
    };
    Hotkey.prototype.getKey = function () {
        return this.key;
    };
    Hotkey.prototype.getKeyString = function () {
        return this.keyString;
    };
    Hotkey.prototype.getPressed = function () {
        return this.pressed;
    };
    // Public setters
    Hotkey.prototype.setPressed = function (pressed) {
        this.pressed = pressed;
    };
    return Hotkey;
}());
//# sourceMappingURL=Hotkey.js.map