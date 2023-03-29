function plotHsPerYear(dataPromise, divId) {
  dataPromise.then(astronautas => {
    
    const data = {}
    // Count the number of astronauts per year
    count = d3.rollup(astronautas, v => v.length, d => d.anio_mision)
    
    // Get the years
    years = count.keys()
    
    // For each year, count the total hours per country
    for (year of years) {
      data[year] = {}
      for (astronaut of astronautas) {

        var pais = ((astronaut.nacionalidad == "Emiratos Arabes Unidos") ? "UAE" : astronaut.nacionalidad)

        if (astronaut.anio_mision == year) {
          if (data[year][pais]) {
            data[year][pais] += astronaut.mision_hs
          } else {
            data[year][pais] = astronaut.mision_hs
          }
        }
      }
    }

    // Convert the data to an array of objects
    // Each object has the year, the country and the total hours
    const data2 = []
    for (year in data) {
      for (country in data[year]) {
        data2.push({
          anio_mision: Number(year),
          nacionalidad: country,
          mision_hs_x_anio: Number(data[year][country])
        })
      }
    }

    // Plot the data
    // The data is a matrix of years and countries
    // The color of each cell is the total hours
    // The text in each cell is the total hours
    // On hover, the title of each cell is the country
    let chart = addTooltips(Plot.plot({
      marks: [
        Plot.cell(data2, {
          x: 'anio_mision',
          y: 'nacionalidad',
          fill: 'mision_hs_x_anio',
          title: d => d.mision_hs_x_anio?.toFixed(0),
        }),
        Plot.text(data2, {
          x: "anio_mision",
          y: "nacionalidad",
          text: d => d.mision_hs_x_anio?.toFixed(1),
          title: "nacionalidad"
        })
      ],
      x: {
        label: 'Año de misión',
      },
      y: {
        label: 'Horas totales',
        labelOffset: 70
      },
      color: {   
        scheme: 'viridis',
        type: 'categorical',
      },
      style: {
        fontFamily: 'Prompt',
        fontSize: 10,
        background: 'black',
        color: '#f8f14e',
        padding: '50px',
      },
    }),
    {
      fill: '#f8f14e',
    }
    );

    d3.select(divId).append(() => chart)
  })
}
