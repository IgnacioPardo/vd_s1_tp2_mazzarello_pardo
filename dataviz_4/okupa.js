function plotOkupas(dataPromise, divId) {
  dataPromise.then(astronautas => {

    const data = {}

    // Iterate over the astronauts
    for (astronaut of astronautas) {

      // For each astronaut, get the year of the mission
      // and the occupation

      // If the year is not in the data object, create it
      year = astronaut.anio_mision
      if (!data[year]) {
        data[year] = {}
      }

      // If the occupation is not in the data object, create it
      // and set it to 1
      // If the occupation is in the data object, increment it
      if (data[year][astronaut.ocupacion]) {
        data[year][astronaut.ocupacion] += 1
      } else {
        data[year][astronaut.ocupacion] = 1
      }
    }
    
    const data2 = []

    // Iterate over the data object
    for (year in data) {
      // Iterate over the occupations
      for (ocupacion in data[year]) {
        // Add year, occupation and count to the data2 array
        data2.push({
          anio_mision: Number(year),
          ocupacion: ocupacion,
          cantidad: data[year][ocupacion]
        })
      }
    }

    // Plot the data
    // X axis: year of the mission
    // Y axis: quantity of astronauts
    // Color: occupation
    // On hover, the title of each line is the occupation
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
      ],
      x: {
        label: 'Año de misión',
      },
      y: {
        label: 'Cantidad de astronautas',
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
        width: '86.5%',
      },
    }),
      {
        stroke: '#f8f14e',
      }
    );

    d3.select(divId).append(() => chart)
  })
}
