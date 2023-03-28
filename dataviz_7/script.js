function plotHist(){
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
                labelOffset: 30,
                fontSize: 14,
                fontSize: '20',
            },
            y: {
                label: 'Cantidad de misiones',
                labelOffset: 10,
                fontSize: '20',
            },
            color: {
                scheme: 'reds',
                legend: true,
            },
            style: {
                fontFamily: 'sans-serif',
                background: 'black',
                color: '#f8f14e',
                padding: '50px',
            },
        })

        d3.select('#hist_chart').append(() => chart)
    })
}
