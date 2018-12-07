var ATreeTicTacToeStep;
(function (ATreeTicTacToeStep) {
    ATreeTicTacToeStep[ATreeTicTacToeStep["PLAYING"] = 0] = "PLAYING";
    ATreeTicTacToeStep[ATreeTicTacToeStep["NOBODY_WINS"] = 1] = "NOBODY_WINS";
    ATreeTicTacToeStep[ATreeTicTacToeStep["YOU_LOSE"] = 2] = "YOU_LOSE";
})(ATreeTicTacToeStep || (ATreeTicTacToeStep = {}));
// N.B. : the case when the player wins isn't in this enumeration because this case is a new aTreeStep and is therefore handled by the global saving system
//# sourceMappingURL=ATreeTicTacToeStep.js.map