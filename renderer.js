const remote = require("electron").remote;
const {ipcRenderer} = require("electron");

var currentpage = "mainpage";

var availableResolutions = [
  [1280, 720],
  [1366, 768],
  [1920, 1080],
  [800, 600],
  [1280, 960],
  [1600, 1200]
];
var currentresid = 0;
document.getElementById("restext").textContent = availableResolutions[currentresid][0] + "x" + availableResolutions[currentresid][1]

function quitGame() {
  pageTransition("blankpage");
  var window = remote.getCurrentWindow();
  setTimeout(function(){window.close();}, 800);
}

function openSettings() {
  pageTransition("settingspage");
}

function mainMenu() {
  pageTransition("mainpage");
}

function resize() {
  currentresid++;
  if (currentresid >= availableResolutions.length) {
    currentresid = 0;

    ipcRenderer.send("fullscreen", true);
    document.getElementById("restext").textContent = "Fullscreen";
  } else {
    ipcRenderer.send("fullscreen", false);
    ipcRenderer.send("resize", availableResolutions[currentresid][0], availableResolutions[currentresid][1]);
    document.getElementById("restext").textContent = availableResolutions[currentresid][0] + "x" + availableResolutions[currentresid][1]
  }
}

function pageTransition(target) {
  var targetpage = target;
  setTimeout(
    function() {
      var outpage = document.getElementById(currentpage);
      var inpage = document.getElementById(targetpage);

      currentpage = targetpage;

      outpage.classList.add("leftout");
      outpage.classList.add("ontop");

      inpage.classList.add("pagecurrent");
      inpage.classList.add("leftin");

      setTimeout(
        function() {
          outpage.classList.remove("pagecurrent");
          outpage.classList.remove("leftout");
          outpage.classList.remove("ontop");

          inpage.classList.remove("leftin");

          window.location = "#"
        }, 800);
    }, 200);
}
