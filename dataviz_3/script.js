d3.csv('../vd_astronautas/astronautas.csv', d3.autoType).then(data => {
    console.log(data)
    // Guardamos el svg generado en la variable chart
    let chart = Plot.plot({
      height: 1000,
      marks: [
        Plot.dot(data, {
            x: 'anio_nacimiento',
            y: 'nombre',
            r: 'anio_mision',
            fill: 'edad_mision',
            stroke: 'black',
            opacity: 1,
        }),
      ],
      color:{
          legend: true,
          range: ['blue', 'red'],
      },
      y: {
        labelAngle: -45,
      }
    })
    // Agregamos chart al div#chart de index.html
    d3.select('#chart').append(() => chart)
  })
  