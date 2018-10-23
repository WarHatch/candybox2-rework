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
var EnchantedMonkeyWizardStaff = /** @class */ (function (_super) {
    __extends(EnchantedMonkeyWizardStaff, _super);
    // Constructor
    function EnchantedMonkeyWizardStaff() {
        var _this = _super.call(this, "eqItemWeaponEnchantedMonkeyWizardStaff", "eqItemWeaponEnchantedMonkeyWizardStaffName", "eqItemWeaponEnchantedMonkeyWizardStaffDescription", "eqItems/weapons/enchantedMonkeyWizardStaff") || this;
        // Set the timer
        _this.timer = 0;
        return _this;
    }
    // Public getters
    EnchantedMonkeyWizardStaff.prototype.getQuestEntityWeapon = function (quest, player) {
        var qew = new QuestEntityWeapon(quest, player, new Naming("The monkey wizard staff (enchanted)", "the monkey wizard staff (enchanted)"), player.getClassicCollisionBoxCollection(), 2);
        qew.getCloseCombatDelay().setFixedDelay(0);
        return qew;
    };
    // update()
    EnchantedMonkeyWizardStaff.prototype.update = function (player, quest) {
        // Handle the timer
        if (this.timer < 4)
            this.timer += 1;
        else {
            this.timer = 0;
            var ent = this.getRandomEnemy(player, quest);
            if (ent != null)
                this.castPurpleBall(player, quest, ent);
        }
    };
    return EnchantedMonkeyWizardStaff;
}(MonkeyWizardStaffMotherClass));
//# sourceMappingURL=EnchantedMonkeyWizardStaff.js.map