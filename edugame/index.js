const gameElementApiURL = "https://education-game-tool-2020.herokuapp.com";

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
  // newScript.src = gameElementApiURL + "/bundle.js";
  newScript.src = "/edu.js";
  document.body.appendChild(newScript);
}

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// reads event input and starts the game
const startGame = (e) => {
  e.preventDefault();
  if (window.gameEnded !== false) {
    const lessonIdInput = e.target[0].value;
    const studentIdInput = e.target[1].value;
    // Expects that gameCanvas already exists in DOM
    createNewSession(lessonIdInput, studentIdInput)
  } else {
    alert("⚠ Žaidimo sesijau jau vyksta")
  }
}

const edugameForm = $("#edugameForm")[0];
edugameForm.addEventListener('submit', startGame);
