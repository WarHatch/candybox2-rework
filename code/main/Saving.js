var Saving;
(function (Saving) {
    // Saving maps
    var bools = {};
    var numbers = {};
    var strings = {};
    // Can we register?
    Saving.canRegister = true;
    // Special public functions : used to load or the actual save
    function load(game, loadingType, loadingString) {
        // Depending on the loading type, do different things
        switch (loadingType) {
            // We don't load anything
            case MainLoadingType.NONE:
                // You can uncomment the lines below to start your game with everything unlocked (useful for testing purposes)
                /*
                   Saving.saveNumber("aTreeStep", 2);
                   
                   Saving.saveBool("mainMapDoneDesert", true);
                   Saving.saveBool("mainMapDoneBridge", true);
                   Saving.saveBool("mainMapDoneCaveEntrance", true);
                   Saving.saveBool("mainMapDonePier", true);
                   Saving.saveBool("mainMapDoneForest", true);
                   Saving.saveBool("mainMapDoneCastleEntrance", true);
                   
                   Saving.saveBool("gridItemPossessedMainMap", true);
                   Saving.saveBool("gridItemPossessedTimeRing", true);
                   Saving.saveBool("gridItemPossessedThirdHouseKey", true);
                   Saving.saveBool("gridItemPossessedBeginnersGrimoire", true);
                   
                   Saving.saveBool("gridItemPossessedFeather", true);
                   Saving.saveBool("gridItemPossessedPogoStick", true);
                   Saving.saveBool("gridItemPossessedHeartPlug", true);
                   Saving.saveBool("gridItemPossessedAdvancedGrimoire", true);
                   
                   Saving.saveBool("gridItemPossessedSponge", true);
                   Saving.saveBool("gridItemPossessedShellPowder", true);
                   Saving.saveBool("gridItemPossessedHeartPendant", true);
                   Saving.saveBool("gridItemPossessedBlackMagicGrimoire", true);
                   
                   Saving.saveBool("gridItemPossessedFortressKey", true);
                   Saving.saveBool("gridItemPossessedUnicornHorn", true);
                   Saving.saveBool("gridItemPossessedXinopherydonClaw", true);
                   Saving.saveBool("gridItemPossessedPitchfork", true);
                   
                   Saving.saveBool("gridItemPossessedRedSharkFin", true);
                   Saving.saveBool("gridItemPossessedGreenSharkFin", true);
                   Saving.saveBool("gridItemPossessedPurpleSharkFin", true);
                   
                   Saving.saveBool("gridItemPossessedTalkingCandy", true);
                   
                   Saving.saveBool("gridItemPossessedP", true);
                   Saving.saveBool("gridItemPossessedL", true);
                   Saving.saveBool("gridItemPossessedA", true);
                   Saving.saveBool("gridItemPossessedY", true);
                   
                   Saving.saveBool("eqItemGlovesRedEnchantedGloves", true);
                   Saving.saveBool("eqItemGlovesPinkEnchantedGloves", true);
                   Saving.saveBool("eqItemWeaponWoodenSword", true);
                   Saving.saveBool("eqItemWeaponTrollBludgeon", true);
                   Saving.saveBool("eqItemWeaponTribalSpear", true);
                   Saving.saveBool("eqItemWeaponSummoningTribalSpear", true);
                   Saving.saveBool("eqItemWeaponMonkeyWizardStaff", true);
                   Saving.saveBool("eqItemWeaponGiantSpoon", true);
                   Saving.saveBool("eqItemHatOctopusKingCrown", true);
                   Saving.saveBool("eqItemBootsBootsOfIntrospection", true);
                   */
                //Initialize sweet tooth
                Saving.saveBool("eqItemWeaponSweetTooth", true, true);
                Saving.saveBool("statusBarUnlockedInventory", true);
                Saving.saveNumber("gameCandiesCurrent", 5000000);
                /*
                Saving.saveBool("eqItemBootsRocketBoots", true);
                
                Saving.saveBool("eqItemWeaponGiantSpoonOfDoom", true);
                
                Saving.saveBool("eqItemBodyArmoursEnchantedKnightBodyArmour", true);
                
                Saving.saveNumber("gameCandiesEatenCurrent", 500000000);
                Saving.saveNumber("gameCandiesEatenMax", 500000000);
                
                Saving.saveNumber("playerHp", 1000);
                
                Saving.saveBool("questPlayerSpellHealthPotionHasSpell", true);
                Saving.saveBool("questPlayerSpellTurtlePotionHasSpell", true);
                Saving.saveBool("questPlayerSpellAntiGravityPotionHasSpell", true);
                Saving.saveBool("questPlayerSpellBerserkPotionHasSpell", true);
                Saving.saveBool("questPlayerSpellCloningPotionHasSpell", true);
                Saving.saveBool("questPlayerSpellPPotionHasSpell", true);
                Saving.saveBool("questPlayerSpellXPotionHasSpell", true);
                
                Saving.saveNumber("questPlayerSpellHealthPotionQuantity", 0);
                Saving.saveNumber("questPlayerSpellTurtlePotionQuantity", 64084);
                Saving.saveNumber("questPlayerSpellAntiGravityPotionQuantity", 47542);
                Saving.saveNumber("questPlayerSpellBerserkPotionQuantity", 99549);
                Saving.saveNumber("questPlayerSpellCloningPotionQuantity", 10050);
                Saving.saveNumber("questPlayerSpellPPotionQuantity", 10085250);
                Saving.saveNumber("questPlayerSpellXPotionQuantity", 10050999);
                
               // Saving.saveBool("gameDebug", true);
                
                Saving.saveNumber("gameCandiesCurrent", 5000000);
                Saving.saveNumber("gameCandiesMax", 5000000);
                
                Saving.saveNumber("gameLollipopsCurrent", 5000000000);
                Saving.saveNumber("gameLollipopsMax", 500000000000);
                
                Saving.saveNumber("gameChocolateBarsCurrent", 7);
                Saving.saveNumber("gameChocolateBarsMax", 7);
                
                Saving.saveNumber("gamePainsAuChocolatCurrent", 7);
                Saving.saveNumber("gamePainsAuChocolatMax", 7);
                
                Saving.saveBool("lonelyHouseTakeTheBoxDone", true);
                
                Saving.saveNumber("lollipopFarmPondHowManyLolligators", 0);
                
                Saving.saveBool("statusBarUnlocked", true);
                Saving.saveBool("statusBarUnlockedCfg", true);
                Saving.saveBool("statusBarUnlockedSave", true);
                Saving.saveBool("statusBarUnlockedMap", true);
                Saving.saveBool("statusBarUnlockedInventory", true);
                Saving.saveBool("statusBarUnlockedLollipopFarm", true);
                Saving.saveBool("statusBarUnlockedCauldron", true);
                Saving.saveBool("statusBarUnlockedHealthBar", true);
                Saving.saveBool("statusBarUnlockedInsideYourBox", true);
                Saving.saveBool("statusBarUnlockedTheComputer", true);
                Saving.saveBool("statusBarUnlockedTheArena", true);
                
                Saving.saveBool("castleKilledNougatMonster", true);
                
                Saving.saveBool("dragonDone", true);
                Saving.saveBool("dragonUnlockedCyclops", true);
                
                Saving.saveBool("castleTowerFirstVisitDone", true);

                Saving.saveBool("",true);*/
                break;
            case MainLoadingType.LOCAL:
                LocalSaving.load(loadingString);
                break;
            case MainLoadingType.FILE:
                var fileBools = loadingString.match(/bool +[a-zA-Z0-9_]+ *= *[a-zA-Z0-9_]+/g);
                var fileNumbers = loadingString.match(/number +[a-zA-Z0-9_]+ *= *[a-zA-Z0-9_]+/g);
                var fileStrings = loadingString.match(/string +[a-zA-Z0-9_]+ *= *[a-zA-Z0-9_]+/g);
                // Load the bools
                if (fileBools != null) {
                    for (var i = 0; i < fileBools.length; i++) {
                        Saving.saveBool(fileBools[i].match(/[a-zA-Z0-9_]+=/)[0].replace("=", ""), Saving.stringToBool(fileBools[i].match(/=[a-zA-Z0-9_]+/)[0].replace("=", "")));
                    }
                }
                // Load the numbers
                if (fileNumbers != null) {
                    for (var i = 0; i < fileNumbers.length; i++) {
                        Saving.saveNumber(fileNumbers[i].match(/[a-zA-Z0-9_]+=/)[0].replace("=", ""), Saving.stringToNumber(fileNumbers[i].match(/=[a-zA-Z0-9_]+/)[0].replace("=", "")));
                    }
                }
                // Load the strings
                if (fileStrings != null) {
                    for (var i = 0; i < fileStrings.length; i++) {
                        Saving.saveString(fileStrings[i].match(/[a-zA-Z0-9_]+=/)[0].replace("=", ""), fileStrings[i].match(/=[a-zA-Z0-9_]+/)[0].replace("=", ""));
                    }
                }
                break;
        }
        // Apply the loaded variables to various things by calling the load() methods of various objects
        game.load(); // Various variables owned by the game object
        game.getPlayer().load(); // The player
    }
    Saving.load = load;
    function save(game, savingType, savingString) {
        // Save some special variables by calling the save() methods of various objects
        game.save(); // Various variables owned by the game object
        game.getPlayer().save(); // The player
        // Do different things depending on the saving type
        switch (savingType) {
            case MainLoadingType.LOCAL:
                return LocalSaving.save(savingString);
            case MainLoadingType.FILE:
                return false;
        }
    }
    Saving.save = save;
    // Public conversion functions (useful because we sometimes only want to store strings, either locally or online, but in fact we also work with numbers and bools)
    function boolToString(b) {
        if (b)
            return "true";
        return "false";
    }
    Saving.boolToString = boolToString;
    function numberToString(n) {
        return n.toString();
    }
    Saving.numberToString = numberToString;
    function stringToBool(s) {
        if (s == "true")
            return true;
        else if (s == "false")
            return false;
        console.log("Error : trying to convert a string to a bool but the string value is " + s + ".");
    }
    Saving.stringToBool = stringToBool;
    function stringToNumber(s) {
        return parseFloat(s); // We need to use parseFloat to avoid problems with scientific notations
    }
    Saving.stringToNumber = stringToNumber;
    // Public functions
    function getAllBools() {
        return bools;
    }
    Saving.getAllBools = getAllBools;
    function getAllNumbers() {
        return numbers;
    }
    Saving.getAllNumbers = getAllNumbers;
    function getAllStrings() {
        return strings;
    }
    Saving.getAllStrings = getAllStrings;
    function loadBool(key) {
        // BUGS
        if (Bugs.getUltimateBugLevel() >= 2)
            saveBool(key, Random.flipACoin());
        if (key in bools)
            return bools[key];
        console.log("Error : trying to load the unknown bool " + key + ".");
    }
    Saving.loadBool = loadBool;
    function loadNumber(key) {
        // BUGS
        if (Bugs.getUltimateBugLevel() >= 3 && Random.oneChanceOutOf(2))
            saveNumber(key, Random.between(0, 10000) - 5000);
        if (key in numbers)
            return numbers[key];
        console.log("Error : trying to load the unknown number " + key + ".");
    }
    Saving.loadNumber = loadNumber;
    function loadString(key) {
        // BUGS
        if (Bugs.getUltimateBugLevel() >= 4 && Random.oneChanceOutOf(5))
            saveString(key, "bug");
        if (key in strings)
            return strings[key];
        console.log("Error : trying to load the unknown string " + key + ".");
    }
    Saving.loadString = loadString;
    function registerBool(key, b) {
        if (Saving.canRegister) {
            if (key in bools || key in numbers || key in strings)
                console.log("Error : trying to register the key " + key + " as bool, but this key is already registered.");
            this.saveBool(key, b, true);
        }
    }
    Saving.registerBool = registerBool;
    function registerNumber(key, n) {
        if (Saving.canRegister) {
            if (key in numbers || key in bools || key in strings)
                console.log("Error : trying to register the key " + key + " as number, but this key is already registered.");
            this.saveNumber(key, n, true);
        }
    }
    Saving.registerNumber = registerNumber;
    function registerString(key, s) {
        if (Saving.canRegister) {
            if (key in strings || key in bools || key in numbers)
                console.log("Error : trying to register the key " + key + " as string, but this key is already registered.");
            this.saveString(key, s, true);
        }
    }
    Saving.registerString = registerString;
    function saveBool(key, b, registering) {
        if (registering === void 0) { registering = false; }
        if (key in bools || registering) {
            bools[key] = b;
            return;
        }
        console.log("Error : trying to save the unknown bool " + key + ".");
    }
    Saving.saveBool = saveBool;
    function saveNumber(key, n, registering) {
        if (registering === void 0) { registering = false; }
        if (key in numbers || registering) {
            numbers[key] = n;
            return;
        }
        console.log("Error : trying to save the unknown number " + key + ".");
    }
    Saving.saveNumber = saveNumber;
    function saveString(key, s, registering) {
        if (registering === void 0) { registering = false; }
        if (key in strings || registering) {
            strings[key] = s;
            return;
        }
        console.log("Error : trying to save the unknown string " + key + ".");
    }
    Saving.saveString = saveString;
})(Saving || (Saving = {}));
//# sourceMappingURL=Saving.js.map