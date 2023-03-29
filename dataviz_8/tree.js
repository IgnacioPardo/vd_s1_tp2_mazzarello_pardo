function plotTree(dataPromise, divId) {
    dataPromise.then(astronautas => {
        //count misions per year
        // console.log(astronautas)
        count = [... new Set(d3.rollup(astronautas, v => v.length, d => d.anio_mision))]
        //console.log(count)
        
        data = ["misiones"]

        data = data.concat(
            Array.from(count).map(([key, value]) => {
                var entry = "misiones|" + key.toString()

                return entry
            })
        )
        //astronautas.nacionalidad
        
        data = data.concat(
            Array.from(astronautas).map((d) => {
                var pais = d.nacionalidad.replace("/", " ")
                var entry = "misiones|" + d.anio_mision.toString() + "|" + pais

                return entry
            })
        )
        
        
        data = data.concat(
            Array.from(astronautas).map((d) => {

                // ignore if astronaut-mision-year-country combo already exists
                var astronauta = d.nombre
                var pais = d.nacionalidad.replace("/", " ")
                var entry = "misiones|" + d.anio_mision.toString() + "|" + pais + "|" + astronauta;
                return entry
            })
        )

        data = data.concat(
            Array.from(astronautas).map((d) => {

                // ignore if astronaut-mision-year-country combo already exists
                var astronauta = d.nombre
                var pais = d.nacionalidad.replace("/", " ")
                var entry = "misiones|" + d.anio_mision.toString() + "|" + pais + "|" + astronauta + "|" + d.mision_hs + " hs";
                return entry
            })
        )

        // remove null entries

        data = data.filter((d) => d != null)

        // remove duplicates
        
        data = [... new Set(data)]

        data_obj = data.map((d) => {
            return {
                name: d,
            }
        })

        // console.log(data_obj)
            
        /* data = Array.from(astronautas).map((d) => {
            return {
                name: d.anio_mision,
            }
        }); */


        let chart = Plot.plot({
            axis: null,
            inset: 10,
            insetLeft: 10,
            insetRight: 160,
            width: 1200,
            height: 1800,
            marks: [
                Plot.tree(data_obj, 
                    { path: "name", delimiter: "|"})
            ],
            style: {
                fontFamily: 'Prompt',
                background: 'black',
                color: '#f8f14e',
                padding: '50px',
            },
        })

        d3.select(divId).append(() => chart)

        var g = document.querySelectorAll('[aria-label="text"]')
        g.forEach((d) => {
            d.style.stroke = "black"
        })
    })
}
