
// On page load, animate the title
window.document.onload = page_load();

function page_load() {
  title_animation();
}

// Animate the title using Typed.js
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
  // Given a dot, mark it as selected and unmark the previous one

  selected_dot.classList.remove("selected_dot");
  selected_dot.classList.add("dot");

  dot.classList.remove("dot");
  dot.classList.add("selected_dot");

  selected_dot = dot;
}

function navigate(e) {
  // Given a dot, scroll to the corresponding chart
  check_dot(e);

  var id = e.id.split("_dot")[0];
  document.getElementById(id).scrollIntoView({
    behavior: "smooth",
    inline: 'center',
    block: 'center',
  });
}

function auto_check_dots() {
  // For each chart, check the corresponding dot when it is visible
  var observer = new IntersectionObserver(
    function (entries) {
      if (entries[0].isIntersecting === true) {
        var id = entries[0].target.id;
        var dot = document.getElementById(id + "_dot");
        check_dot(dot);
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
  // Launch fullscreen mode
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen();
  }
}

function exitFullscreen() {
  // Exit fullscreen mode
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

function toggleFullScreen() {
  // Toggle fullscreen mode
  if (!document.fullscreenElement) {
    launchFullScreen();
  } else {
    exitFullscreen();
  }
}

var state = false;

function animateShow(element) {
  // Animate the appearance of an element
  element.classList.remove("hidden");
  element.classList.add("visible");
}

function start() {
  // Start the visualization
  if (!state) {
    // Play the audio
    new Audio("assets/audio.mp3").play();

    // Launch fullscreen mode after 1 second
    setTimeout(() => {
      launchFullScreen();
    }, 1000);

    // Hide the intro and show the rest of the page
    var intro = document.getElementById("intro");
    var playground = document.getElementById("playground");
    var footer = document.querySelector("footer");

    var dots = document.getElementById("dots");

    intro.style.display = "none";

    animateShow(playground);
    animateShow(footer);
    animateShow(dots);

    state = true;

    // Plot the charts
    plotCharts().then(() => {

      // Create a page dot for each chart
      document.querySelectorAll(".chart").forEach((chart) => {
        var char_id = chart.id;
        var newDot = document.createElement("div");
        newDot.classList.add("dot");
        newDot.id = char_id + "_dot";
        newDot.setAttribute("onclick", "navigate(this)");
        dots.appendChild(newDot);
      });

      // The selected dot starts as the first dot
      dots = document.querySelector("#dots");
      first_dot = dots.children[0];
      selected_dot = first_dot;
      check_dot(selected_dot);

      // Check the dot when the corresponding chart is visible
      auto_check_dots();
      // Make the charts visible and scrollable
      document.querySelector("HTML").style.overflow = "unset";
    });
  }
}

async function plotCharts() {
  // Load the data from the csv file
  const data = d3.csv("https://ignaciopardo.github.io/vd_s1_tp2_mazzarello_pardo/vd_astronautas/astronautas.csv", d3.autoType);


  // Plot the charts
  // To each chart, we pass the data and the id of the div where it will be plotted
  plotWorldTour(data, "#worldTour");
  plotHist(data, "#hist_chart");
  plotHsPerYear(data, "#hist2_chart");
  plotTree(data, "#tree_chart");
  plotFacet(data, "#facet_chart");
  plotOkupas(data, "#line_chart");
}
