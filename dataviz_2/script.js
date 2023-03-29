d3.csv('../vd_astronautas/astronautas.csv', d3.autoType).then(data => {
    // console.log(data)
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
      y:{
        label: 'Algo',
        tickRotate: 45,
      },
      style: {
        fontFamily: 'sans-serif',
        fontSize: 12,
        background: 'hsl(0, 100%, 50%)',
        color: 'yellow',
        padding: '10px',
      },
    })
    // Agregamos chart al div#chart de index.html
    d3.select('#chart').append(() => chart)
  })
  