window.document.onload = page_load();

function page_load() {
    title_animation();
}

function title_animation() {
  var typed = new Typed("#title", {
    strings: ["🔭 Misiones de Astronautas 🧑‍🚀"],
    typeSpeed: 50,
    backSpeed: 50,
    loop: false,
    onComplete: function (self) {
      animateShow(document.getElementById("intro"));
    },
    cursorChar: "",
  });
}

var selected_dot;

function check_dot(dot) {
  console.log(dot);
  selected_dot.classList.remove("selected_dot");
  selected_dot.classList.add("dot");

  dot.classList.remove("dot");
  dot.classList.add("selected_dot");

  selected_dot = dot;
}

function navigate(e) {
  check_dot(e);

  var id = e.id.split("_dot")[0];
  document.getElementById(id).scrollIntoView({
    behavior: "smooth",
  });
}

function auto_check_dots() {
  var observer = new IntersectionObserver(
    function (entries) {
      if (entries[0].isIntersecting === true) {
        var id = entries[0].target.id;
        var dot = document.getElementById(id + "_dot");
        check_dot(dot);
      } else {
        console.log("Item has just DISAPPEARED!");
      }
    },
    { threshold: [0] }
  );

  var charts = document.querySelectorAll(".chart");
  charts.forEach((chart) => {
    observer.observe(chart);
  });
}

function launchFullScreen() {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen();
  }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        launchFullScreen();
    } else {
        exitFullscreen();
    }
}

var state = false;

function animateShow(element) {
  element.classList.remove("hidden");
  element.classList.add("visible");
}

function start() {
  if (!state) {
    new Audio("audio.mp3").play();

    /* setTimeout(() => {
                    launchFullScreen();
                }, 1000); */

    var intro = document.getElementById("intro");
    var playground = document.getElementById("playground");
    var footer = document.querySelector("footer");

    var dots = document.getElementById("dots");

    intro.style.display = "none";

    animateShow(playground);
    animateShow(footer);
    animateShow(dots);

    state = true;

    plotCharts().then(() => {
      dots = document.querySelector("#dots");
      first_dot = dots.children[0];
      selected_dot = first_dot;
      check_dot(selected_dot);
      auto_check_dots();
      document.querySelector("HTML").style.overflow = "unset";
    });
  }
}

async function plotCharts() {

    const data = d3.csv("../vd_astronautas/astronautas.csv", d3.autoType);

    plotWorldTour(data);
    plotHist(data);
    plotHist2(data);
    plotTree(data);
    plotFacet(data);
}
