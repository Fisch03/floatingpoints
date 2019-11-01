const remote = require("electron").remote;
const {ipcRenderer} = require("electron");

let currentpage = "mainpage";

//List of available Resolutions
let availableResolutions = [
  ["Fullscreen"],
  [1280, 720],
  [1366, 768],
  [1920, 1080],
  [800, 600],
  [1280, 960],
  [1600, 1200]
];
let currentresid = 1;
document.getElementById("restext").textContent = availableResolutions[currentresid][0] + "x" + availableResolutions[currentresid][1]

//Functions called by Buttons on the Page
function startGame() {
  pageTransition("blankpage");
  setTimeout(function(){window.location.href = "./game.html"}, 800);
}
function quitGame() {
  pageTransition("blankpage");
  let electronWindow = remote.getCurrentWindow();
  setTimeout(function(){electronWindow.close();}, 800);
}
function openSettings() {
  pageTransition("settingspage");
}
function mainMenu() {
  pageTransition("mainpage");
}

//Go to the next available Resolution and apply it
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

//Transition to the target page with an animation
function pageTransition(target) {
  let targetpage = target;
  setTimeout(
    function() {
      let outpage = document.getElementById(currentpage);
      let inpage = document.getElementById(targetpage);

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
