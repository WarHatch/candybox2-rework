///<reference path="MonkeyWizardStaffMotherClass.ts"/>
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
var MonkeyWizardStaff = /** @class */ (function (_super) {
    __extends(MonkeyWizardStaff, _super);
    // Constructor
    function MonkeyWizardStaff() {
        var _this = _super.call(this, "eqItemWeaponMonkeyWizardStaff", "eqItemWeaponMonkeyWizardStaffName", "eqItemWeaponMonkeyWizardStaffDescription", "eqItems/weapons/monkeyWizardStaff") || this;
        // Set the timer
        _this.timer = 0;
        return _this;
    }
    // Public getters
    MonkeyWizardStaff.prototype.getQuestEntityWeapon = function (quest, player) {
        var qew = new QuestEntityWeapon(quest, player, new Naming("The monkey wizard staff", "the monkey wizard staff"), player.getClassicCollisionBoxCollection(), 2);
        qew.getCloseCombatDelay().setFixedDelay(1);
        return qew;
    };
    // update()
    MonkeyWizardStaff.prototype.update = function (player, quest) {
        // Handle the timer
        if (this.timer < 10)
            this.timer += 1;
        else {
            this.timer = 0;
            var ent = this.getRandomEnemy(player, quest);
            if (ent != null)
                this.castPurpleBall(player, quest, ent);
        }
    };
    return MonkeyWizardStaff;
}(MonkeyWizardStaffMotherClass));
//# sourceMappingURL=MonkeyWizardStaff.js.map