function plotFacet(dataPromise, divId) {
  dataPromise.then(
    (astronautas) => {

      // Plot the data
      // X axis: year of the mission
      // Y axis: quantity of astronauts
      // Facet: country
      // Plot the data per gender
      let chart = addTooltips(Plot.plot({
        x: {
          // tickFormat: (d) =>
          //   d === null ? "N/A" : d === "femenino" ? "F" : "M",
          tickFormat: (d) => d === "Emiratos Arabes Unidos" ? "EAU" : d,
          label: "Género",
          tickRotate: -14,
        },
        y: {
          grid: true,
        },
        
        marks: [
          Plot.barY(
            astronautas,
            Plot.groupX(
              { y: "count" }, 
              { x: "nacionalidad", fill: "genero" }
            )
          ),
          Plot.ruleY([0]),
        ],
        color: {
          legend: true,
        },
        style: {
          fontFamily: "sans-serif",
          background: "black",
          color: "#f8f14e",
          padding: "50px",
        },
      }));

      d3.select(divId).append(() => chart);
    }
  );
}
