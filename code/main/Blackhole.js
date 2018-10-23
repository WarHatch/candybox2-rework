///<reference path="QuestEntitySpell.ts"/>
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
var Blackhole = /** @class */ (function (_super) {
    __extends(Blackhole, _super);
    // Constructor
    function Blackhole(quest, pos, damage, questEntityDamageReason) {
        var _this = 
        // Call the mother class constructor
        _super.call(this, quest, pos, new Naming("A blackhole", "a blackhole")) || this;
        // Set from parameters
        _this.damage = damage;
        _this.questEntityDamageReason = questEntityDamageReason;
        // Create the collision box collection
        _this.cbcDamage = new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, -3), new Pos(2, 1)), new CollisionBox(_this, new Pos(-3, -2), new Pos(6, 1)), new CollisionBox(_this, new Pos(-4, -1), new Pos(8, 1)), new CollisionBox(_this, new Pos(-5, 0), new Pos(10, 1)), new CollisionBox(_this, new Pos(-4, 1), new Pos(8, 1)), new CollisionBox(_this, new Pos(-3, 2), new Pos(6, 1)), new CollisionBox(_this, new Pos(-1, 3), new Pos(2, 1)));
        // Set the timer
        _this.timer = 30;
        // Set the colors for the first time
        _this.reAddColors();
        return _this;
    }
    // Public methods
    Blackhole.prototype.update = function () {
        // Lower the timer
        this.timer -= 1;
        // Re add the colors
        this.reAddColors();
        // Inflict damage to any entity under us
        for (var i = 0; i < this.getQuest().getEntities().length; i++) {
            // If it is destructible
            if (this.getQuest().getEntities()[i].getDestructible()) {
                // If it has a collision box collection
                if (this.getQuest().getEntities()[i].getCbc() != null) {
                    // If this collision box collection collides with ours
                    if (this.getQuest().getEntities()[i].getCbc().collidesWith(this.cbcDamage)) {
                        this.getQuest().getEntities()[i].inflictDamage(this.damage, this.questEntityDamageReason);
                    }
                }
            }
        }
        // If the timer is too low, we're dead!
        if (this.timer <= 0)
            this.setDead(true);
        // Call the mother class update method
        _super.prototype.update.call(this);
    };
    // Private methods
    Blackhole.prototype.addColorsFirstLayer = function (colorType) {
        this.addColor(new QuestEntitySpellColor(this.getQuest(), new Pos(-1, 0), new Pos(2, 1), new Color(colorType, true)));
    };
    Blackhole.prototype.addColorsSecondLayer = function (colorType) {
        this.addColor(new QuestEntitySpellColor(this.getQuest(), new Pos(-2, -1), new Pos(4, 1), new Color(colorType, true)));
        this.addColor(new QuestEntitySpellColor(this.getQuest(), new Pos(-2, +1), new Pos(4, 1), new Color(colorType, true)));
        this.addColor(new QuestEntitySpellColor(this.getQuest(), new Pos(-2, 0), new Pos(1, 1), new Color(colorType, true)));
        this.addColor(new QuestEntitySpellColor(this.getQuest(), new Pos(+1, 0), new Pos(1, 1), new Color(colorType, true)));
    };
    Blackhole.prototype.addColorsThirdLayer = function (colorType) {
        this.addColor(new QuestEntitySpellColor(this.getQuest(), new Pos(-1, -3), new Pos(2, 1), new Color(colorType, true)));
        this.addColor(new QuestEntitySpellColor(this.getQuest(), new Pos(-3, -2), new Pos(6, 1), new Color(colorType, true)));
        this.addColor(new QuestEntitySpellColor(this.getQuest(), new Pos(-4, -1), new Pos(2, 1), new Color(colorType, true)));
        this.addColor(new QuestEntitySpellColor(this.getQuest(), new Pos(+2, -1), new Pos(2, 1), new Color(colorType, true)));
        this.addColor(new QuestEntitySpellColor(this.getQuest(), new Pos(-5, 0), new Pos(3, 1), new Color(colorType, true)));
        this.addColor(new QuestEntitySpellColor(this.getQuest(), new Pos(+2, 0), new Pos(3, 1), new Color(colorType, true)));
        this.addColor(new QuestEntitySpellColor(this.getQuest(), new Pos(-4, +1), new Pos(2, 1), new Color(colorType, true)));
        this.addColor(new QuestEntitySpellColor(this.getQuest(), new Pos(+2, +1), new Pos(2, 1), new Color(colorType, true)));
        this.addColor(new QuestEntitySpellColor(this.getQuest(), new Pos(-3, +2), new Pos(6, 1), new Color(colorType, true)));
        this.addColor(new QuestEntitySpellColor(this.getQuest(), new Pos(-1, +3), new Pos(2, 1), new Color(colorType, true)));
    };
    Blackhole.prototype.reAddColors = function () {
        // Remove the colors
        this.removeColors();
        // Re add them
        switch (this.timer) {
            case 30:
                this.addColorsFirstLayer(ColorType.BLACKHOLE_GREY240);
                break;
            case 29:
                this.addColorsFirstLayer(ColorType.BLACKHOLE_GREY220);
                this.addColorsSecondLayer(ColorType.BLACKHOLE_GREY240);
                break;
            case 28:
                this.addColorsFirstLayer(ColorType.BLACKHOLE_GREY200);
                this.addColorsSecondLayer(ColorType.BLACKHOLE_GREY220);
                this.addColorsThirdLayer(ColorType.BLACKHOLE_GREY240);
                break;
            case 27:
                this.addColorsFirstLayer(ColorType.BLACKHOLE_GREY180);
                this.addColorsSecondLayer(ColorType.BLACKHOLE_GREY200);
                this.addColorsThirdLayer(ColorType.BLACKHOLE_GREY220);
                break;
            case 26:
                this.addColorsFirstLayer(ColorType.BLACKHOLE_GREY160);
                this.addColorsSecondLayer(ColorType.BLACKHOLE_GREY180);
                this.addColorsThirdLayer(ColorType.BLACKHOLE_GREY200);
                break;
            case 25:
                this.addColorsFirstLayer(ColorType.BLACKHOLE_GREY140);
                this.addColorsSecondLayer(ColorType.BLACKHOLE_GREY160);
                this.addColorsThirdLayer(ColorType.BLACKHOLE_GREY180);
                break;
            case 24:
                this.addColorsFirstLayer(ColorType.BLACKHOLE_GREY120);
                this.addColorsSecondLayer(ColorType.BLACKHOLE_GREY140);
                this.addColorsThirdLayer(ColorType.BLACKHOLE_GREY160);
                break;
            case 23:
                this.addColorsFirstLayer(ColorType.BLACKHOLE_GREY100);
                this.addColorsSecondLayer(ColorType.BLACKHOLE_GREY120);
                this.addColorsThirdLayer(ColorType.BLACKHOLE_GREY140);
                break;
            case 22:
                this.addColorsFirstLayer(ColorType.BLACKHOLE_GREY80);
                this.addColorsSecondLayer(ColorType.BLACKHOLE_GREY100);
                this.addColorsThirdLayer(ColorType.BLACKHOLE_GREY120);
                break;
            case 21:
                this.addColorsFirstLayer(ColorType.BLACKHOLE_GREY60);
                this.addColorsSecondLayer(ColorType.BLACKHOLE_GREY80);
                this.addColorsThirdLayer(ColorType.BLACKHOLE_GREY100);
                break;
            case 20:
                this.addColorsFirstLayer(ColorType.BLACKHOLE_GREY40);
                this.addColorsSecondLayer(ColorType.BLACKHOLE_GREY60);
                this.addColorsThirdLayer(ColorType.BLACKHOLE_GREY80);
                break;
            case 19:
                this.addColorsFirstLayer(ColorType.BLACKHOLE_GREY20);
                this.addColorsSecondLayer(ColorType.BLACKHOLE_GREY40);
                this.addColorsThirdLayer(ColorType.BLACKHOLE_GREY60);
                break;
            default:
                this.addColorsFirstLayer(Random.fromArray([ColorType.BLACKHOLE_GREY20, ColorType.BLACKHOLE_GREY40, ColorType.BLACKHOLE_GREY60]));
                this.addColorsSecondLayer(Random.fromArray([ColorType.BLACKHOLE_GREY20, ColorType.BLACKHOLE_GREY40, ColorType.BLACKHOLE_GREY60]));
                this.addColorsThirdLayer(Random.fromArray([ColorType.BLACKHOLE_GREY20, ColorType.BLACKHOLE_GREY40, ColorType.BLACKHOLE_GREY60]));
                break;
        }
    };
    return Blackhole;
}(QuestEntitySpell));
//# sourceMappingURL=Blackhole.js.map