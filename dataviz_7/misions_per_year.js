function plotHist(dataPromise, divId) {
    dataPromise.then(astronautas => {
        //count misions per year
        count = d3.rollup(astronautas, v => v.length, d => d.anio_mision)
        
        // convert to array
        data = Array.from(count).map(([key, value]) => {
            return {
                anio_mision: key,
                cantidad_misiones: value
            }
        });

        
        // Plot the data
        // X axis: year of the mission
        // Y axis: quantity of missions
        let chart = addTooltips(Plot.plot({
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
        }),
        {
            fill: '#f8f14e',
        })

        d3.select(divId).append(() => chart)
    })
}
