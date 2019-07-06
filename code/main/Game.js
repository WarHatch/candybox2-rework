///<reference path="Place.ts"/>
///<reference path="RenderLocation.ts"/>
///<reference path="RenderArea.ts"/>
///<reference path="Resource.ts"/>
// Config
Saving.registerBool("gameDebug", false);
Saving.registerString("gameLanguage", "en");
Saving.registerBool("gameInvertedColors", false);
// EqItems
Saving.registerString("gameWeaponSelected", "inventorySpecialNothingWeapon");
Saving.registerString("gameHatSelected", "inventorySpecialNothingHat");
Saving.registerString("gameBodyArmourSelected", "inventorySpecialNothingBodyArmour");
Saving.registerString("gameGlovesSelected", "inventorySpecialNothingGloves");
Saving.registerString("gameBootsSelected", "inventorySpecialNothingBoots");
// Stuff about gaining lollipops each second
Saving.registerNumber("gameSecondsElapsedSinceLastLollipopsProduction", 0);
// Resources
Saving.registerNumber("gameCandiesAccumulated", 0);
Saving.registerNumber("gameCandiesCurrent", 0);
Saving.registerNumber("gameCandiesMax", 0);
Saving.registerNumber("gameLollipopsAccumulated", 0);
Saving.registerNumber("gameLollipopsCurrent", 0);
Saving.registerNumber("gameLollipopsMax", 0);
Saving.registerNumber("gameChocolateBarsAccumulated", 0);
Saving.registerNumber("gameChocolateBarsCurrent", 0);
Saving.registerNumber("gameChocolateBarsMax", 0);
Saving.registerNumber("gamePainsAuChocolatAccumulated", 0);
Saving.registerNumber("gamePainsAuChocolatCurrent", 0);
Saving.registerNumber("gamePainsAuChocolatMax", 0);
Saving.registerNumber("gameCandiesEatenAccumulated", 0);
Saving.registerNumber("gameCandiesEatenCurrent", 0);
Saving.registerNumber("gameCandiesEatenMax", 0);
Saving.registerNumber("gameCandiesThrownAccumulated", 0);
Saving.registerNumber("gameCandiesThrownCurrent", 0);
Saving.registerNumber("gameCandiesThrownMax", 0);
Saving.registerNumber("gameCandiesUsedToRequestFeaturesAccumulated", 0);
Saving.registerNumber("gameCandiesUsedToRequestFeaturesCurrent", 0);
Saving.registerNumber("gameCandiesUsedToRequestFeaturesMax", 0);
Saving.registerNumber("gameCandiesInCauldronAccumulated", 0);
Saving.registerNumber("gameCandiesInCauldronCurrent", 0);
Saving.registerNumber("gameCandiesInCauldronMax", 0);
Saving.registerNumber("gameLollipopsInCauldronAccumulated", 0);
Saving.registerNumber("gameLollipopsInCauldronCurrent", 0);
Saving.registerNumber("gameLollipopsInCauldronMax", 0);
// Gifts
Saving.registerNumber("gameGiftPower", 0);
Saving.registerNumber("gameGiftHealth", 0);
Saving.registerNumber("gameGiftMagic", 0);
// The gamemode
Saving.registerString("gameGameMode", "normal");
var Game = /** @class */ (function () {
    // Constructor
    function Game(gameMode) {
        // Render locations
        this.statusBarLocation = new RenderLocation("#statusBar");
        this.mainContentLocation = new RenderLocation("#mainContent");
        this.candiesUsedToRequestFeatures = new Resource("gameCandiesUsedToRequestFeatures");
        this.candiesInCauldron = new Resource("gameCandiesInCauldron");
        this.lollipopsInCauldron = new Resource("gameLollipopsInCauldron");
        // Grid items
        this.gridItems = {};
        //tokens
        this.tokens = {};
        // EqItems
        this.weapons = {};
        this.hats = {};
        this.bodyArmours = {};
        this.gloves = {};
        this.boots = {};
        this.sweetTooth = new SweetTooth();
        // EqItems selected from the various arrays above (the selection being made in the inventory tab)
        this.selectedEqItems = {};
        // The quest log
        this.questLog = new QuestLog();
        // Locations
        this.place = null;
        this.savedPlace = null;
        // Hotkeys
        this.hotkeys = {}; // Hotkeys used by the places
        this.specialHotkeys = []; // Special hotkeys, not linked to the places we visit (used to switch tabs, for example)
        // Some info bools
        this.weAreQuesting = false;
        // Callbacks
        this.oneSecondCallbackCollection = new CallbackCollection();
        this.questCallbackCollection = new CallbackCollection();
        // Is the quest slowed down ?
        this.questSlowedDown = false;
        // Local autosave
        this.localAutosaveEnabled = false;
        this.localAutosaveSlot = null;
        this.localAutosaveTime = null; // Time in seconds before the next save
        // Is the status bar allowed to use the n key to go to the next tab? (this is set to false when using the computer...)
        this.isStatusBarAllowedToUseTheNKey = true;
        // We save the game mode given in parameter
        if (gameMode != null)
            Saving.saveString("gameGameMode", gameMode);
        // We create the grid items
        this.createGridItems();
        // We create the eqItems
        this.createEqItems();
        // We create the status bar
        this.statusBar = new StatusBar(this, 0);
        // We create the player
        this.player = new Player(this);
        // We create the resources
        this.candies = new Candies(this, "gameCandies");
        this.lollipops = new Lollipops(this, "gameLollipops");
        this.chocolateBars = new ChocolateBars(this, "gameChocolateBars");
        this.painsAuChocolat = new PainsAuChocolat(this, "gamePainsAuChocolat");
        this.candiesEaten = new CandiesEaten(this, "gameCandiesEaten");
        this.candiesThrown = new CandiesThrown(this, "gameCandiesThrown");
        // We update the status bar
        this.updateStatusBar();
        // We launch timeouts & intervals methods
        this.oneSecondIntervalId = window.setInterval(this.oneSecondMethod.bind(this), 1000);
        window.setTimeout(this.questMethod.bind(this), 100);
    }
    // Public methods
    Game.prototype.addHotkey = function (hotkey) {
        this.hotkeys[hotkey.getKeyString()] = hotkey;
    };
    Game.prototype.addSpecialHotkey = function (hotkey) {
        this.specialHotkeys.push(hotkey);
    };
    Game.prototype.applyInvertedColorsToCss = function () {
        if (Saving.loadBool("gameInvertedColors") == false)
            $('#invertColorsStylesheet').remove();
        else
            $('head').append('<link href="css/invertColors.css" rel="stylesheet" id="invertColorsStylesheet"/>');
    };
    Game.prototype.calcLollipopFarmProduction = function () {
        // Is the production each second ?
        Saving.saveBool("lollipopFarmIsProductionEachSecond", this.isLollipopFarmProductionEachSecond());
        // If we produce x lollipops each second
        if (Saving.loadBool("lollipopFarmIsProductionEachSecond")) {
            Saving.saveNumber("lollipopFarmProduction", (Saving.loadBool("gridItemPossessedShellPowder") ? 3 : 1) *
                (Saving.loadBool("gridItemPossessedPitchfork") ? 3 : 1) *
                (Saving.loadBool("gridItemPossessedGreenSharkFin") ? 5 : 1) *
                Math.ceil(100 * (1 - Math.exp(-(Saving.loadNumber("lollipopFarmLollipopsPlanted") - 20) / 5000))));
        }
        // Else
        else {
            switch (Saving.loadNumber("lollipopFarmLollipopsPlanted")) {
                case 1:
                    Saving.saveNumber("lollipopFarmProduction", 3600 * 8);
                    break;
                case 2:
                    Saving.saveNumber("lollipopFarmProduction", 3600 * 5);
                    break;
                case 3:
                    Saving.saveNumber("lollipopFarmProduction", 3600 * 2);
                    break;
                case 4:
                    Saving.saveNumber("lollipopFarmProduction", 3600);
                    break;
                case 5:
                    Saving.saveNumber("lollipopFarmProduction", 60 * 40);
                    break;
                case 6:
                    Saving.saveNumber("lollipopFarmProduction", 60 * 25);
                    break;
                case 7:
                    Saving.saveNumber("lollipopFarmProduction", 60 * 12);
                    break;
                case 8:
                    Saving.saveNumber("lollipopFarmProduction", 60 * 8);
                    break;
                case 9:
                    Saving.saveNumber("lollipopFarmProduction", 60 * 5);
                    break;
                case 10:
                    Saving.saveNumber("lollipopFarmProduction", 60 * 2);
                    break;
                case 11:
                    Saving.saveNumber("lollipopFarmProduction", 60);
                    break;
                case 12:
                    Saving.saveNumber("lollipopFarmProduction", 52);
                    break;
                case 13:
                    Saving.saveNumber("lollipopFarmProduction", 42);
                    break;
                case 14:
                    Saving.saveNumber("lollipopFarmProduction", 30);
                    break;
                case 15:
                    Saving.saveNumber("lollipopFarmProduction", 16);
                    break;
                case 16:
                    Saving.saveNumber("lollipopFarmProduction", 8);
                    break;
                case 17:
                    Saving.saveNumber("lollipopFarmProduction", 5);
                    break;
                case 18:
                    Saving.saveNumber("lollipopFarmProduction", 4);
                    break;
                case 19:
                    Saving.saveNumber("lollipopFarmProduction", 3);
                    break;
                case 20:
                    Saving.saveNumber("lollipopFarmProduction", 2);
                    break;
            }
        }
    };
    Game.prototype.canStartQuest = function () {
        if (this.player.getHp() == 0)
            return false;
        return true;
    };
    Game.prototype.clearAllIntervals = function () {
        clearInterval(this.oneSecondIntervalId);
    };
    Game.prototype.disableLocalAutosave = function () {
        this.localAutosaveEnabled = false;
        this.localAutosaveSlot = null;
    };
    Game.prototype.emptyAndFillSelectedEqItemsArray = function () {
        // Empty
        this.selectedEqItems = {};
        // Fill
        if (Saving.loadString("gameWeaponSelected") != "inventorySpecialNothingWeapon")
            this.selectedEqItems["weapon"] = this.weapons[Saving.loadString("gameWeaponSelected")];
        if (Saving.loadString("gameHatSelected") != "inventorySpecialNothingHat")
            this.selectedEqItems["hat"] = this.hats[Saving.loadString("gameHatSelected")];
        if (Saving.loadString("gameBodyArmourSelected") != "inventorySpecialNothingBodyArmour")
            this.selectedEqItems["bodyArmour"] = this.bodyArmours[Saving.loadString("gameBodyArmourSelected")];
        if (Saving.loadString("gameGlovesSelected") != "inventorySpecialNothingGloves")
            this.selectedEqItems["gloves"] = this.gloves[Saving.loadString("gameGlovesSelected")];
        if (Saving.loadString("gameBootsSelected") != "inventorySpecialNothingBoots")
            this.selectedEqItems["boots"] = this.boots[Saving.loadString("gameBootsSelected")];
    };
    Game.prototype.enableLocalAutosave = function (localAutosaveSlot) {
        this.localAutosaveEnabled = true;
        this.localAutosaveSlot = localAutosaveSlot;
        this.setDefaultLocalAutosaveTime();
    };
    Game.prototype.gainItem = function (itemSavingName) {
        Saving.saveBool(itemSavingName, true);
        this.player.reCalcMaxHp(); // We re calc the player max hp just in case
        this.calcLollipopFarmProduction(); // Idem for the farm production
    };
    //todo
    Game.prototype.gainToken = function () {
        var tempToken = new Token();
        this.tokens[tempToken.getTokenName()] = tempToken;
    };
    Game.prototype.getEqItemFromEqItemType = function (savingName, type) {
        switch (type) {
            case EqItemType.WEAPON:
                return this.weapons[savingName];
            case EqItemType.HAT:
                return this.hats[savingName];
            case EqItemType.BODYARMOUR:
                return this.bodyArmours[savingName];
            case EqItemType.GLOVES:
                return this.gloves[savingName];
            case EqItemType.BOOTS:
                return this.boots[savingName];
        }
    };
    Game.prototype.isEquipped = function (type, savingName) {
        if (this.selectedEqItems[type] == undefined || this.selectedEqItems[type] == null)
            return false;
        else
            return (this.selectedEqItems[type].getSavingName() == savingName);
    };
    Game.prototype.isLollipopFarmProductionEachSecond = function () {
        if (Saving.loadNumber("lollipopFarmLollipopsPlanted") > 20) {
            return true;
        }
        return false;
    };
    Game.prototype.load = function () {
        // Resources
        this.candies.load();
        this.lollipops.load();
        this.chocolateBars.load();
        this.painsAuChocolat.load();
        this.candiesEaten.load();
        this.candiesThrown.load();
        this.candiesUsedToRequestFeatures.load();
        this.candiesInCauldron.load();
        this.lollipopsInCauldron.load();
        // Handle inverted colors (we have to change the css now depending on the gameInvertedColors bool from the Saving module)
        this.applyInvertedColorsToCss();
    };
    Game.prototype.postLoad = function () {
        // We re calc the player hp
        this.player.reCalcMaxHp();
        // We update the status bar
        this.updateStatusBar(true);
        // Select correct items
        this.emptyAndFillSelectedEqItemsArray();
        // We go to the candy box
        this.goToCandyBox();
        // And we set the saved place (the village)
        this.savedPlace = new Village(this);
    };
    Game.prototype.resetPlayer = function () {
        // Save some important things
        var hp = this.player.getHp();
        var maxHp = this.player.getMaxHp();
        // Re-create the player
        this.player = new Player(this);
        // Restore the important things saved
        this.player.setHp(hp);
        this.player.setMaxHp(maxHp);
    };
    Game.prototype.resetSpecialHotkeys = function () {
        this.specialHotkeys = [];
    };
    Game.prototype.save = function () {
        // Resources
        this.candies.save();
        this.lollipops.save();
        this.chocolateBars.save();
        this.painsAuChocolat.save();
        this.candiesEaten.save();
        this.candiesThrown.save();
        this.candiesUsedToRequestFeatures.save();
        this.candiesInCauldron.save();
        this.lollipopsInCauldron.save();
    };
    Game.prototype.setPlace = function (place) {
        // If the current place isn't null, we warn it that we're going to stop displaying it
        if (this.place != null) {
            this.place.willStopBeingDisplayed();
            this.resetHotkeys();
            // If we didn't save this place we're not displaying anymore
            if (this.savedPlace == null) {
                // It means we're closing it actually, so we tell it that we're closing it
                this.place.willBeClosed();
            }
        }
        // Set the place
        this.place = place;
        // Callbacks
        this.resetResourcesCallbacks();
        this.place.willBeDisplayed();
        // Display the place for the first time
        this.displayPlace();
    };
    Game.prototype.unequipIfEquipped = function (savingName, type) {
        switch (type) {
            case EqItemType.WEAPON:
                if (this.selectedEqItems["weapon"] != null && this.selectedEqItems["weapon"].getSavingName() == savingName)
                    Saving.saveString("gameWeaponSelected", "inventorySpecialNothingWeapon");
                break;
            case EqItemType.HAT:
                if (this.selectedEqItems["hat"] != null && this.selectedEqItems["hat"].getSavingName() == savingName)
                    Saving.saveString("gameHatSelected", "inventorySpecialNothingHat");
                break;
            case EqItemType.BODYARMOUR:
                if (this.selectedEqItems["bodyArmour"] != null && this.selectedEqItems["bodyArmour"].getSavingName() == savingName)
                    Saving.saveString("gameBodyArmourSelected", "inventorySpecialNothingBodyArmour");
                break;
            case EqItemType.GLOVES:
                if (this.selectedEqItems["gloves"] != null && this.selectedEqItems["gloves"].getSavingName() == savingName)
                    Saving.saveString("gameGlovesSelected", "inventorySpecialNothingGloves");
                break;
            case EqItemType.BOOTS:
                if (this.selectedEqItems["boots"] != null && this.selectedEqItems["boots"].getSavingName() == savingName)
                    Saving.saveString("gameBootsSelected", "inventorySpecialNothingBoots");
                break;
        }
        this.emptyAndFillSelectedEqItemsArray();
    };
    Game.prototype.updatePlace = function () {
        this.displayPlace();
    };
    Game.prototype.updateStatusBar = function (reAdd) {
        if (reAdd === void 0) { reAdd = false; }
        if (reAdd)
            this.statusBar.deleteAndReAddEverything();
        this.statusBar.updateAll();
        this.statusBarLocation.render(this.statusBar.getRenderArea());
    };
    // "go to" methods
    Game.prototype.goToCandyBox = function () {
        this.saveCurrentMapPlace();
        this.setPlace(new CandyBox(this));
    };
    Game.prototype.goToCastle = function () {
        this.setPlace(new Castle(this));
    };
    Game.prototype.goToCastleEntrance = function () {
        this.setPlace(new CastleEntrance(this));
    };
    Game.prototype.goToCauldron = function () {
        this.saveCurrentMapPlace();
        this.setPlace(new Cauldron(this));
    };
    Game.prototype.goToCfg = function () {
        this.saveCurrentMapPlace();
        this.setPlace(new Cfg(this));
    };
    Game.prototype.goToInsideFortress = function () {
        this.setPlace(new InsideFortress(this));
    };
    Game.prototype.goToInsideYourBox = function () {
        this.saveCurrentMapPlace();
        this.setPlace(new InsideYourBox(this));
    };
    Game.prototype.goToInventory = function () {
        this.saveCurrentMapPlace();
        this.setPlace(new Inventory(this));
    };
    Game.prototype.goToLighthouse = function () {
        this.setPlace(new Lighthouse(this));
    };
    Game.prototype.goToLollipopFarm = function () {
        this.saveCurrentMapPlace();
        this.setPlace(new LollipopFarm(this));
    };
    Game.prototype.goToMainMap = function () {
        this.setPlace(new MainMap(this));
    };
    Game.prototype.goToMap = function () {
        this.setPlaceFromSavedMapPlace();
    };
    Game.prototype.goToSave = function () {
        this.saveCurrentMapPlace();
        this.setPlace(new Save(this));
    };
    Game.prototype.goToSorceressHut = function () {
        this.setPlace(new SorceressHut(this));
    };
    Game.prototype.goToTheArena = function () {
        this.saveCurrentMapPlace();
        this.setPlace(new TheArena(this));
    };
    Game.prototype.goToTheCave = function () {
        this.setPlace(new TheCave(this));
    };
    Game.prototype.goToTheComputer = function () {
        this.saveCurrentMapPlace();
        this.setPlace(new TheComputer(this));
    };
    Game.prototype.goToVillage = function () {
        this.setPlace(new Village(this));
    };
    Game.prototype.goToYourself = function () {
        this.setPlace(new Yourself(this));
    };
    // Public getters
    Game.prototype.getBodyArmours = function () {
        return this.bodyArmours;
    };
    Game.prototype.getBoots = function () {
        return this.boots;
    };
    Game.prototype.getCandies = function () {
        return this.candies;
    };
    Game.prototype.getCandiesEaten = function () {
        return this.candiesEaten;
    };
    Game.prototype.getCandiesInCauldron = function () {
        return this.candiesInCauldron;
    };
    Game.prototype.getCandiesThrown = function () {
        return this.candiesThrown;
    };
    Game.prototype.getCandiesUsedToRequestFeatures = function () {
        return this.candiesUsedToRequestFeatures;
    };
    Game.prototype.getChocolateBars = function () {
        return this.chocolateBars;
    };
    Game.prototype.getGloves = function () {
        return this.gloves;
    };
    Game.prototype.getHats = function () {
        return this.hats;
    };
    Game.prototype.getHotkeys = function () {
        return this.hotkeys;
    };
    Game.prototype.getGridItems = function () {
        return this.gridItems;
    };
    Game.prototype.getIsStatusBarAllowedToUseTheNKey = function () {
        return this.isStatusBarAllowedToUseTheNKey;
    };
    Game.prototype.getLocalAutosaveEnabled = function () {
        return this.localAutosaveEnabled;
    };
    Game.prototype.getLocalAutosaveSlot = function () {
        return this.localAutosaveSlot;
    };
    Game.prototype.getLocalAutosaveTime = function () {
        return this.localAutosaveTime;
    };
    Game.prototype.getLollipops = function () {
        return this.lollipops;
    };
    Game.prototype.getLollipopsInCauldron = function () {
        return this.lollipopsInCauldron;
    };
    Game.prototype.getPainsAuChocolat = function () {
        return this.painsAuChocolat;
    };
    Game.prototype.getQuestCallbackCollection = function () {
        return this.questCallbackCollection;
    };
    Game.prototype.getQuestLog = function () {
        return this.questLog;
    };
    Game.prototype.getQuestSlowedDown = function () {
        return this.questSlowedDown;
    };
    Game.prototype.getQuestSpeedUp = function () {
        return this.questSpeedUp;
    };
    Game.prototype.getOneSecondCallbackCollection = function () {
        return this.oneSecondCallbackCollection;
    };
    Game.prototype.getPlayer = function () {
        return this.player;
    };
    Game.prototype.getMainContentLocation = function () {
        return this.mainContentLocation;
    };
    Game.prototype.getSelectedEqItems = function () {
        return this.selectedEqItems;
    };
    Game.prototype.getSpecialHotkeys = function () {
        return this.specialHotkeys;
    };
    Game.prototype.getStatusBar = function () {
        return this.statusBar;
    };
    Game.prototype.getWeapons = function () {
        return this.weapons;
    };
    Game.prototype.getWeAreQuesting = function () {
        return this.weAreQuesting;
    };
    //allows for easier access to the sweet toother
    Game.prototype.getSweetTooth = function () {
        return this.sweetTooth;
    };
    //adds tokens to the users inventory
    Game.prototype.addToken = function () {
        for (var i = 0; i < 3; i++) {
            this.sweetTooth.setToken(new Token(), i);
        }
    };
    Game.prototype.printTokens = function () {
        var retVal = "//OWNED TOKENS\n";
        for (var token in this.tokens) {
            retVal += "|NAME: " + this.tokens[token].getTokenName() + " |TYPE: " + this.tokens[token].printType() + " |POWER: " + this.tokens[token].getPower().toString() + "\n";
        }
        return retVal;
    };
    // Public setters
    Game.prototype.setIsStatusBarAllowedToUseTheNKey = function (isStatusBarAllowedToUseTheNKey) {
        this.isStatusBarAllowedToUseTheNKey = isStatusBarAllowedToUseTheNKey;
    };
    Game.prototype.setQuestSlowedDown = function (questSlowedDown) {
        this.questSlowedDown = questSlowedDown;
    };
    Game.prototype.setQuestSpeedUp = function (questSpeedUp) {
        this.questSpeedUp = questSpeedUp;
    };
    Game.prototype.setWeAreQuesting = function (weAreQuesting) {
        this.weAreQuesting = weAreQuesting;
    };
    // Private methods
    Game.prototype.addEqItem = function (eqItem, array) {
        array[eqItem.getSavingName()] = eqItem;
    };
    Game.prototype.addGridItem = function (gridItem) {
        this.gridItems[gridItem.getSavingName()] = gridItem;
    };
    //ADD TOKENS TODO
    Game.prototype.addTokens = function (token) {
        //    this.tokens[] = token;
    };
    Game.prototype.createEqItems = function () {
        // Create weapons
        this.addEqItem(new WoodenSword(), this.weapons);
        this.addEqItem(new IronAxe(), this.weapons);
        this.addEqItem(new PolishedSilverSword(), this.weapons);
        this.addEqItem(new TrollBludgeon(), this.weapons);
        this.addEqItem(new MonkeyWizardStaff(), this.weapons);
        this.addEqItem(new EnchantedMonkeyWizardStaff(), this.weapons);
        this.addEqItem(new TribalSpear(), this.weapons);
        this.addEqItem(new SummoningTribalSpear(), this.weapons);
        this.addEqItem(new GiantSpoon(), this.weapons);
        this.addEqItem(new Scythe(), this.weapons);
        this.addEqItem(new GiantSpoonOfDoom(), this.weapons);
        //added already initialized sweet tooth
        this.addEqItem(this.sweetTooth, this.weapons);
        // Create hats
        this.addEqItem(new OctopusKingCrown(), this.hats);
        this.addEqItem(new OctopusKingCrownWithJaspers(), this.hats);
        this.addEqItem(new OctopusKingCrownWithObsidian(), this.hats);
        this.addEqItem(new MerchantHat(), this.hats);
        this.addEqItem(new SorceressHat(), this.hats);
        // Create body armours
        this.addEqItem(new LightweightBodyArmour(), this.bodyArmours);
        this.addEqItem(new KnightBodyArmour(), this.bodyArmours);
        this.addEqItem(new EnchantedKnightBodyArmour(), this.bodyArmours);
        // Create gloves
        this.addEqItem(new LeatherGloves(), this.gloves);
        this.addEqItem(new RedEnchantedGloves(), this.gloves);
        this.addEqItem(new PinkEnchantedGloves(), this.gloves);
        // Create boots
        this.addEqItem(new LeatherBoots(), this.boots);
        this.addEqItem(new RocketBoots(), this.boots);
        this.addEqItem(new BootsOfIntrospection(), this.boots);
    };
    Game.prototype.createGridItems = function () {
        // First line
        this.addGridItem(new GridItem("gridItemPossessedMainMap", "gridItemMainMapName", "gridItemMainMapDescription", "gridItems/mainMap", new Pos(0, 0)));
        this.addGridItem(new GridItem("gridItemPossessedTimeRing", "gridItemTimeRingName", "gridItemTimeRingDescription", "gridItems/timeRing", new Pos(1, 0)));
        this.addGridItem(new GridItem("gridItemPossessedThirdHouseKey", "gridItemThirdHouseKeyName", "gridItemThirdHouseKeyDescription", "gridItems/thirdHouseKey", new Pos(2, 0)));
        this.addGridItem(new GridItem("gridItemPossessedBeginnersGrimoire", "gridItemBeginnersGrimoireName", "gridItemBeginnersGrimoireDescription", "gridItems/beginnersGrimoire", new Pos(3, 0)));
        // Second line
        this.addGridItem(new Feather("gridItemPossessedFeather", "gridItemFeatherName", "gridItemFeatherDescription", "gridItems/feather", new Pos(0, 1)));
        this.addGridItem(new GridItem("gridItemPossessedPogoStick", "gridItemPogoStickName", "gridItemPogoStickDescription", "gridItems/pogoStick", new Pos(1, 1)));
        this.addGridItem(new GridItem("gridItemPossessedHeartPlug", "gridItemHeartPlugName", "gridItemHeartPlugDescription", "gridItems/heartPlug", new Pos(2, 1)));
        this.addGridItem(new GridItem("gridItemPossessedAdvancedGrimoire", "gridItemAdvancedGrimoireName", "gridItemAdvancedGrimoireDescription", "gridItems/advancedGrimoire", new Pos(3, 1)));
        // Third line
        this.addGridItem(new GridItem("gridItemPossessedSponge", "gridItemSpongeName", "gridItemSpongeDescription", "gridItems/sponge", new Pos(0, 2)));
        this.addGridItem(new GridItem("gridItemPossessedShellPowder", "gridItemShellPowderName", "gridItemShellPowderDescription", "gridItems/shellPowder", new Pos(1, 2)));
        this.addGridItem(new GridItem("gridItemPossessedRedSharkFin", "gridItemRedSharkFinName", "gridItemRedSharkFinDescription", "gridItems/redSharkFin", new Pos(2, 2)));
        this.addGridItem(new GridItem("gridItemPossessedBlackMagicGrimoire", "gridItemBlackMagicGrimoireName", "gridItemBlackMagicGrimoireDescription", "gridItems/blackMagicGrimoire", new Pos(3, 2)));
        // Fourth line
        this.addGridItem(new GridItem("gridItemPossessedGreenSharkFin", "gridItemGreenSharkFinName", "gridItemGreenSharkFinDescription", "gridItems/greenSharkFin", new Pos(0, 3)));
        this.addGridItem(new GridItem("gridItemPossessedPurpleSharkFin", "gridItemPurpleSharkFinName", "gridItemPurpleSharkFinDescription", "gridItems/purpleSharkFin", new Pos(1, 3)));
        this.addGridItem(new GridItem("gridItemPossessedHeartPendant", "gridItemHeartPendantName", "gridItemHeartPendantDescription", "gridItems/heartPendant", new Pos(2, 3)));
        this.addGridItem(new GridItem("gridItemPossessedFortressKey", "gridItemFortressKeyName", "gridItemFortressKeyDescription", "gridItems/fortressKey", new Pos(3, 3)));
        // Fifth line
        this.addGridItem(new UnicornHorn("gridItemPossessedUnicornHorn", "gridItemUnicornHornName", "gridItemUnicornHornDescription", "gridItems/unicornHorn", new Pos(0, 4)));
        this.addGridItem(new XinopherydonClaw("gridItemPossessedXinopherydonClaw", "gridItemXinopherydonClawName", "gridItemXinopherydonClawDescription", "gridItems/xinopherydonClaw", new Pos(1, 4)));
        this.addGridItem(new GridItem("gridItemPossessedPitchfork", "gridItemPitchforkName", "gridItemPitchforkDescription", "gridItems/pitchfork", new Pos(2, 4)));
        this.addGridItem(new GridItem("gridItemPossessedTalkingCandy", "gridItemTalkingCandyName", "gridItemTalkingCandyDescription", "gridItems/talkingCandy", new Pos(3, 4)));
        // Sixth line
        this.addGridItem(new GridItem("gridItemPossessedP", "gridItemPName", "gridItemPDescription", "gridItems/p", new Pos(0, 5)));
        this.addGridItem(new GridItem("gridItemPossessedL", "gridItemLName", "gridItemLDescription", "gridItems/l", new Pos(1, 5)));
        this.addGridItem(new GridItem("gridItemPossessedA", "gridItemAName", "gridItemADescription", "gridItems/a", new Pos(2, 5)));
        this.addGridItem(new GridItem("gridItemPossessedY", "gridItemYName", "gridItemYDescription", "gridItems/y", new Pos(3, 5)));
    };
    Game.prototype.displayArea = function (renderArea, scrolling, gap, defaultScroll) {
        if (scrolling === void 0) { scrolling = false; }
        if (gap === void 0) { gap = 0; }
        if (defaultScroll === void 0) { defaultScroll = 0; }
        this.mainContentLocation.render(renderArea);
        this.mainContentLocation.setScrolling(scrolling, defaultScroll);
        if (scrolling == false)
            this.mainContentLocation.setContentGap(gap);
        else
            this.mainContentLocation.setContentGap(0);
    };
    Game.prototype.displayPlace = function () {
        this.displayArea(this.place.getRenderArea(), this.place.getScrolling(), this.place.getGap(), this.place.getDefaultScroll());
    };
    Game.prototype.handleCandiesProduction = function () {
        this.candies.add(Saving.loadNumber("lollipopFarmCurrentCandiesProduction"));
    };
    Game.prototype.handleLollipopProduction = function () {
        // If at least one lollipop is planted
        if (Saving.loadNumber("lollipopFarmLollipopsPlanted") > 0) {
            // If the production is each second
            if (Saving.loadBool("lollipopFarmIsProductionEachSecond")) {
                // We just add the production as lollipops
                this.lollipops.add(Saving.loadNumber("lollipopFarmProduction"));
            }
            // Else
            else {
                // If it's time for a new production
                if (Saving.loadNumber("lollipopFarmTimeSinceLastProduction") >= Saving.loadNumber("lollipopFarmProduction") - 1) {
                    // We reset the time
                    Saving.saveNumber("lollipopFarmTimeSinceLastProduction", 0);
                    // We add one lollipop
                    this.lollipops.add(1);
                }
                else {
                    // We increase the time
                    Saving.saveNumber("lollipopFarmTimeSinceLastProduction", Saving.loadNumber("lollipopFarmTimeSinceLastProduction") + 1);
                }
            }
        }
    };
    Game.prototype.handlePondConversion = function () {
        // Variables
        var conversionAmount;
        // If the conversion is activated
        if (Saving.loadBool("lollipopFarmPondFeedingLolligators")) {
            // Set the conversion amount
            conversionAmount = Saving.loadNumber("lollipopFarmPondConversionRate");
            // If we don't have enough candies, lower this conversion rate
            if (this.candies.getCurrent() < conversionAmount)
                conversionAmount = this.candies.getCurrent();
            // If the conversionAmount is > 0, we convert
            if (conversionAmount > 0) {
                this.candies.add(-conversionAmount);
                this.lollipops.add(conversionAmount);
            }
        }
    };
    Game.prototype.localAutosave = function () {
        // If local autosave is enabled and there's a local auto save slot and there's a local autosave time
        if (this.localAutosaveEnabled == true && this.localAutosaveSlot != null && this.localAutosaveTime != null) {
            // If it's time to save
            if (this.localAutosaveTime <= 0) {
                // We save
                Saving.save(this, MainLoadingType.LOCAL, this.localAutosaveSlot);
                // We reset the time
                this.setDefaultLocalAutosaveTime();
            }
            // Else, we decrease the local autosave time
            else
                this.localAutosaveTime -= 1;
        }
    };
    Game.prototype.questMethod = function () {
        // Re set the timeout, depending on if the time is slowed down or not
        window.setTimeout(this.questMethod.bind(this), ((this.questSlowedDown && this.weAreQuesting) ? 200 : 100 + this.getQuestSpeedUp()));
        // Special place callbacks
        this.questCallbackCollection.fire();
    };
    Game.prototype.oneSecondMethod = function () {
        // Our methods
        this.player.magicHealthRegain();
        this.handleCandiesProduction();
        this.handleLollipopProduction();
        this.handlePondConversion();
        this.localAutosave();
        // Special place callbacks
        this.oneSecondCallbackCollection.fire();
    };
    Game.prototype.resetHotkeys = function () {
        this.hotkeys = {};
    };
    Game.prototype.resetResourcesCallbacks = function () {
        // Reset status bar resources callbacks
        this.candies.getCallbackCollection().reset();
        this.lollipops.getCallbackCollection().reset();
        // Reset other resources callbacks
        this.candiesEaten.getCallbackCollection().reset();
        this.candiesThrown.getCallbackCollection().reset();
        // Reset interval callbacks
        this.oneSecondCallbackCollection.reset();
        this.questCallbackCollection.reset();
    };
    Game.prototype.saveCurrentMapPlace = function () {
        if (this.savedPlace == null)
            this.savedPlace = this.place;
    };
    Game.prototype.setDefaultLocalAutosaveTime = function () {
        this.localAutosaveTime = 600;
    };
    Game.prototype.setPlaceFromSavedMapPlace = function () {
        // If there's a saved place
        if (this.savedPlace != null) {
            this.setPlace(this.savedPlace); // We set the saved place as the current place
            this.savedPlace = null; // There's no saved place anymore
        }
    };
    return Game;
}());
//# sourceMappingURL=Game.js.map