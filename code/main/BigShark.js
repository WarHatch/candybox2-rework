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
var BigShark = /** @class */ (function (_super) {
    __extends(BigShark, _super);
    // Constructor
    function BigShark(quest, pos) {
        var _this = _super.call(this, quest, pos, new Naming("A shark", "a shark"), new RenderArea(47, 10), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement(new Pos(-1, 0))) || this;
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(14, 0), new Pos(2, 1)), new CollisionBox(_this, new Pos(13, 1), new Pos(2, 1)), new CollisionBox(_this, new Pos(12, 2), new Pos(4, 1)), new CollisionBox(_this, new Pos(41, 2), new Pos(5, 1)), new CollisionBox(_this, new Pos(11, 3), new Pos(7, 1)), new CollisionBox(_this, new Pos(35, 3), new Pos(11, 1)), new CollisionBox(_this, new Pos(2, 4), new Pos(40, 1)), new CollisionBox(_this, new Pos(0, 5), new Pos(40, 1)), new CollisionBox(_this, new Pos(1, 6), new Pos(44, 1)), new CollisionBox(_this, new Pos(3, 7), new Pos(43, 1)), new CollisionBox(_this, new Pos(15, 8), new Pos(3, 1)), new CollisionBox(_this, new Pos(16, 9), new Pos(1, 1))));
        // By default, finType is null
        _this.finType = null;
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(200);
        _this.setHp(200);
        // Set the ascii art
        _this.getRenderArea().drawArray(Database.getAscii("places/quests/theSea/bigShark"));
        // Set the transparency
        _this.setTransparency(new RenderTransparency(" ", "%"));
        // Set the weapon and its delay
        _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("Its sharp teeth", "its sharp teeth"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, -1), new Pos(49, 12))), Random.between(30, 42)));
        _this.getLastQuestEntityWeapon().getCloseCombatDelay().setFixedDelay(1);
        return _this;
    }
    // draw()
    BigShark.prototype.draw = function (renderArea) {
        // Mother class draw method
        _super.prototype.draw.call(this, renderArea);
        // Add the fin color if we have a special fin type
        if (this.finType != null) {
            switch (this.finType) {
                case BigSharkFinType.RED:
                    this.drawFinColor(renderArea, ColorType.BIGSHARK_FIN_RED);
                    break;
                case BigSharkFinType.GREEN:
                    this.drawFinColor(renderArea, ColorType.BIGSHARK_FIN_GREEN);
                    break;
                case BigSharkFinType.PURPLE:
                    this.drawFinColor(renderArea, ColorType.BIGSHARK_FIN_PURPLE);
                    break;
            }
        }
    };
    // willDie()
    BigShark.prototype.willDie = function () {
        this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage(this.getDeathMessage() + " (and found " + Algo.pluralFormat(this.getQuest().foundCandies(500 + Random.upTo(30) * 35), " candy", " candies") + ")", this.getQuest().getCandiesFoundMessage()));
        if (this.finType != null) {
            switch (this.finType) {
                case BigSharkFinType.RED:
                    this.getQuest().foundGridOrEqItem(new QuestItemFound(this.getQuest(), "gridItemPossessedRedSharkFin", "You found a red shark fin", "You gain a red shark fin"));
                    break;
                case BigSharkFinType.GREEN:
                    this.getQuest().foundGridOrEqItem(new QuestItemFound(this.getQuest(), "gridItemPossessedGreenSharkFin", "You found a green shark fin", "You gain a green shark fin"));
                    break;
                case BigSharkFinType.PURPLE:
                    this.getQuest().foundGridOrEqItem(new QuestItemFound(this.getQuest(), "gridItemPossessedPurpleSharkFin", "You found a purple shark fin", "You gain a purple shark fin"));
                    break;
            }
        }
    };
    // Public methods
    BigShark.prototype.hasFin = function (finType) {
        this.finType = finType;
    };
    // Private methods
    BigShark.prototype.drawFinColor = function (renderArea, colorType) {
        // If the fin color wouldn't be outside of the quest
        if (this.getGlobalPosition().x + this.getRenderAreaPosition().x + this.getQuest().getGlobalDrawingOffset().x + 11 >= 0 &&
            this.getGlobalPosition().x + this.getRenderAreaPosition().x + this.getQuest().getGlobalDrawingOffset().x + 18 <= 99) {
            // We draw it
            renderArea.addBackgroundColor(this.getGlobalPosition().x + this.getQuest().getRealQuestPosition().x + this.getRenderAreaPosition().x + this.getQuest().getGlobalDrawingOffset().x + 14, this.getGlobalPosition().x + this.getQuest().getRealQuestPosition().x + this.getRenderAreaPosition().x + this.getQuest().getGlobalDrawingOffset().x + 15, this.getGlobalPosition().y + this.getQuest().getRealQuestPosition().y + this.getRenderAreaPosition().y + this.getQuest().getGlobalDrawingOffset().y + 0, new Color(colorType));
            renderArea.addBackgroundColor(this.getGlobalPosition().x + this.getQuest().getRealQuestPosition().x + this.getRenderAreaPosition().x + this.getQuest().getGlobalDrawingOffset().x + 13, this.getGlobalPosition().x + this.getQuest().getRealQuestPosition().x + this.getRenderAreaPosition().x + this.getQuest().getGlobalDrawingOffset().x + 15, this.getGlobalPosition().y + this.getQuest().getRealQuestPosition().y + this.getRenderAreaPosition().y + this.getQuest().getGlobalDrawingOffset().y + 1, new Color(colorType));
            renderArea.addBackgroundColor(this.getGlobalPosition().x + this.getQuest().getRealQuestPosition().x + this.getRenderAreaPosition().x + this.getQuest().getGlobalDrawingOffset().x + 12, this.getGlobalPosition().x + this.getQuest().getRealQuestPosition().x + this.getRenderAreaPosition().x + this.getQuest().getGlobalDrawingOffset().x + 16, this.getGlobalPosition().y + this.getQuest().getRealQuestPosition().y + this.getRenderAreaPosition().y + this.getQuest().getGlobalDrawingOffset().y + 2, new Color(colorType));
            renderArea.addBackgroundColor(this.getGlobalPosition().x + this.getQuest().getRealQuestPosition().x + this.getRenderAreaPosition().x + this.getQuest().getGlobalDrawingOffset().x + 11, this.getGlobalPosition().x + this.getQuest().getRealQuestPosition().x + this.getRenderAreaPosition().x + this.getQuest().getGlobalDrawingOffset().x + 18, this.getGlobalPosition().y + this.getQuest().getRealQuestPosition().y + this.getRenderAreaPosition().y + this.getQuest().getGlobalDrawingOffset().y + 3, new Color(colorType));
        }
    };
    return BigShark;
}(QuestEntity));
//# sourceMappingURL=BigShark.js.map