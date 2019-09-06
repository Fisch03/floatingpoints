const remote = require("electron").remote;
var currentpage = "mainpage";


function quitGame() {
  var window = remote.getCurrentWindow();
  setTimeout(function(){window.close();}, 600);
}

function openSettings() {
  pageTransition("settingspage");
}

function mainMenu() {
  pageTransition("mainpage");
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
