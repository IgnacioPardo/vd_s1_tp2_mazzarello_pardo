function plotFacet(dataPromise) {
  dataPromise.then(
    (astronautas) => {
      //count misions per year
      console.log(astronautas);

      data = [];

      count = d3.rollup(
        astronautas,
        (v) => v.length,
        (d) => d.anio_mision,
        (d) => d.genero
      );

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
          padding: "50px",
          width: "80%",
        },
      });

      d3.select("#facet_chart").append(() => chart);
    }
  );
}
