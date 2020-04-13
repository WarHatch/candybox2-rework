const gameElementApiURL = "https://education-game-tool-2020.herokuapp.com";
// const gameElementApiURL = "localhost:8090"; // dev

const createNewSession = (lessonId, playerName = 'NO NAME SPECIFIED') => {
  $.post(`${gameElementApiURL}/lesson/${lessonId}/session/register`,
    {
      sessionId: uuidv4(),
      playerName,
      lessonId,
    }).done(
      (newSessionData) => {
        console.log(newSessionData);

        setGlobalParams(newSessionData, 800, 600)
        mountScript();
      }).fail(response => console.error(response));
}

const setGlobalParams = (newSessionData, canvasWidth, canvasHeight) => {
  window.session = newSessionData;
  window.htmlCanvas = {
    canvasWidth,
    canvasHeight,
  }
}

const mountScript = () => {
  var newScript = document.createElement("script");
  newScript.src = gameElementApiURL + "/bundle.js";
  document.body.appendChild(newScript);
}

// TODO: could be handled on server-side
const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Expects that gameCanvas already exists in DOM
 */
const startGame = () => {
  // FIXME: get lessonId from input
  createNewSession("candy")
}

// const edugameContainer = $("##htmlcanvas-edugame-script-0")[0];

const edugameButton = $("#play-edugame-button")[0];
edugameButton.addEventListener('click', startGame);
