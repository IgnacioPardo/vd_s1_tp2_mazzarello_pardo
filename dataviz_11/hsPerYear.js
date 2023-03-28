function plotHsPerYear(dataPromise, divId) {
  dataPromise.then(astronautas => {
    // count total hours per year
    //let hoursPerYear = d3.rollup(astronautas, v => d3.sum(v, d => d.mision_hs), d => d.anio_mision)
    

    // Ammount of hs per year per country

    const data = {}

    count = d3.rollup(astronautas, v => v.length, d => d.anio_mision)
    years = count.keys()
    
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
    console.log(data2)
    
    /* data = Array.from(hoursPerYear).map(([key, value]) => {
      return {
        anio_mision: key,
        mision_hs_x_anio: value
      }
    }); */
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
