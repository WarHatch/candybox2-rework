*********************************************************************************************
					CANDYBOX 2 REWORK

Candybox 2 rework is intended to introduce a new weapon, The Sweet Tooth, with the ability
to customize abilities. The sweet tooth has 3 spots to hold tokens, each with their own 
ability type and power. A new arena quest will also be available. This quest will generate 
endless rooms to fight many different kinds of enemies. These enemies will drop tokens, 
which can later be applied to the sword on one of the 3 spots for a large fee of candies. 

The Sweet Tooth, token customization, and endless room generation are intended to add 
endgame content andRPG buld customization for Candybox 2, and economic value to candies.
*********************************************************************************************
-RELEASE 12/6/2016
Bug fixes include the following:
 -TypeScript 1.8 breaking change that disallowed this accessing 
before super-call in 35 files
 -genText.py for incompatible character-set
 -ascii generation error where backslashes created escape
  characters


Currently the sword is implemented and playable. The sword will automatically appear in the
inventory, and can be equipped in the inventory. Tokens are randomly generated and applied on the game start. New tokens can be 
rolled for at the forge. Stats for the tokens can be viewed from the inventory screen and at 
the forge. 

*********************************************************************************************
HOW TO BUILD AND RUN THE GAME

Original Instructions: https://candybox2.github.io/source_code.html

You will need to install typescript, yuicompressor, and python. Once they are installed, 
the game can be compiled with compile.bat.

*Python in compile.bat is called with py, but should be changed depending on how your 
machine calls python.

Once compiled, candybox2.js and candybox2_uncompressed.js are generated. The game can be ran 
in index.html. 

*index.html uses the compressed js file, while index - actually readable.js uses the 
uncompressed file. this is very useful for debugging.
************************************************************************************************
CONTRIBUTION

Do what you want, I really don't care. Feel free to create an extra branch. 

Pull requests will need an explanation of the new features and bug fixes. I will review the 
information and commit the pull.