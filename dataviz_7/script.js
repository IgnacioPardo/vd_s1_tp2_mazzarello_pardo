
d3.csv("../vd_astronautas/astronautas.csv", d3.autoType).then(astronautas => {
    //count misions per year
    console.log(astronautas)
    count = d3.rollup(astronautas, v => v.length, d => d.anio_mision)
    console.log(count)
    
    data = Array.from(count).map(([key, value]) => {
        return {
            anio_mision: key,
            cantidad_misiones: value
        }
    });

    console.log(data)

    let chart = Plot.plot({
        marks: [
            Plot.barY(data, {
                x: 'anio_mision',
                y: 'cantidad_misiones',
            }),
            
        ],
        x: {
            label: 'Año de misión',
            labelOffset: 40,
            fontSize: 14,
        },
        y: {
            label: 'Cantidad de misiones',
            labelOffset: 10,
            fontSize: 20,
        },
        color: {
            scheme: 'reds',
            legend: true,
        },
        style: {
            fontFamily: 'sans-serif',
            fontSize: 14,
            background: 'black',
            color: 'yellow',
            padding: '50px',
        },
    })

    d3.select('#chart').append(() => chart)
})
