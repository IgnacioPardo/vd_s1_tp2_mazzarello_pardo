function plotOkupas(dataPromise, divId) {
  dataPromise.then(astronautas => {
    // count total hours per year
    //let hoursPerYear = d3.rollup(astronautas, v => d3.sum(v, d => d.mision_hs), d => d.anio_mision)


    // Ammount of hs per year per country

    const data = {}

    count = d3.rollup(astronautas, v => v.length, d => d.anio_mision)
    years = count.keys()

    for (astronaut of astronautas) {
      year = astronaut.anio_mision
      if (!data[year]) {
        data[year] = {}
      }
      if (data[year][astronaut.ocupacion]) {
        data[year][astronaut.ocupacion] += 1
      } else {
        data[year][astronaut.ocupacion] = 1
      }
    }
    console.log(data)
    const data2 = []
    for (year in data) {
      for (ocupacion in data[year]) {
        data2.push({
          anio_mision: Number(year),
          ocupacion: ocupacion,
          cantidad: data[year][ocupacion]
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
        Plot.line(data2, {
          x: 'anio_mision',
          y: 'cantidad',
          stroke: 'ocupacion',
          title: 'ocupacion'
        }), 
        Plot.dot(data2, {
          x: 'anio_mision',
          y: 'cantidad',
          stroke: 'ocupacion',
          fill: 'ocupacion',
          size: 10,
          title: 'ocupacion'
        }),
        /* Plot.text(data2, {
          x: 'anio_mision',
          y: 'cantidad',
          text: 'ocupacion',
          dy: -4,
        }), */
      ],
      x: {
        label: 'Año de misión',
      },
      y: {
        label: 'Cantidad de astronautas',
        labelOffset: 70
      },
      color: {
        scheme: 'viridis',
        type: 'categorical',
        legend: true,
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
        stroke: '#f8f14e',
      }
    );

    d3.select(divId).append(() => chart)
  })
}
