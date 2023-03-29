function plotFacet(dataPromise, divId) {
  dataPromise.then(
    (astronautas) => {

      let chart = Plot.plot({
        x: {
          tickFormat: (d) =>
            d === null ? "N/A" : d === "femenino" ? "F" : "M",
          label: "Género",
        },
        y: {
          grid: true,
          percent: true,
        },
        facet: {
          data: astronautas,
          x: "nacionalidad",
          label: "Nacionalidad",
        },
        marks: [
          Plot.barY(
            astronautas,
            Plot.groupX({ y: "proportion-facet" }, { x: "genero" })
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
          width: "100%",
        },
      });

      d3.select(divId).append(() => chart);
    }
  );
}
