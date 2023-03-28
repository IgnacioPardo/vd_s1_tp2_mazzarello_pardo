function plotHist2(dataPromise) {
    dataPromise.then(astronautas => {
        // count total hours per year
        let hoursPerYear = d3.rollup(astronautas, v => d3.sum(v, d => d.mision_hs), d => d.anio_mision)
        data = Array.from(hoursPerYear).map(([key, value]) => {
            return {
                anio_mision: key,
                mision_hs_x_anio: value
            }
        });
        let chart = Plot.plot({
            marks: [
                Plot.barY(data, {
                    x: 'anio_mision',
                    y: 'mision_hs_x_anio',
                }),
                
            ],
            x: {
                label: 'Año de misión',
                labelOffset: 40,
                fontSize: 14,
                tickFormat: "d",
            },
            y: {
                label: 'Horas totales por año',
                tickFormat: "H",
                labelOffset: 4,
                fontSize: 20,
            },
            color: {
                scheme: 'reds',
                legend: true,
            },
            style: {
                fontFamily: 'Prompt',
                fontSize: 10,
                background: 'black',
                color: '#f8f14e',
                padding: '50px',
            },
        })
        d3.select('#hist2_chart').append(() => chart)
    })
}