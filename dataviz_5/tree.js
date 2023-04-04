function plotTree(dataPromise, divId) {
    dataPromise.then(astronautas => {

        // A tree is a hierarchical structure
        // The root is the top of the tree
        // The leaves are the bottom of the tree

        // An example of a tree:

        // misiones
        //   1961
        //     USA
        //       John Glenn
        //       Alan Shepard
        //     USSR
        //       Yuri Gagarin
        //   1962
        //     USA
        //       Scott Carpenter
        //       Gordon Cooper
        //       Wally Schirra

        // The root is "misiones"
        // The leaves are the astronauts

        //count misions per year
        count = [... new Set(d3.rollup(astronautas, v => v.length, d => d.anio_mision))]
        
        // Data structure for the tree
        // Start with the root
        data = ["misiones"]

        // For each year, add a new entry to the tree
        // The entry is the root + the year
        data = data.concat(
            Array.from(count).map(([key, value]) => {
                var entry = "misiones|" + key.toString()

                return entry
            })
        )

        // For each country, add a new entry to the tree
        // The entry is the root + the year + the country
        data = data.concat(
            Array.from(astronautas).map((d) => {
                var pais = d.nacionalidad.replace("/", " ")
                var entry = "misiones|" + d.anio_mision.toString() + "|" + pais

                return entry
            })
        )
        
        // For each astronaut, add a new entry to the tree
        // The entry is the root + the year + the country + the astronaut
        data = data.concat(
            Array.from(astronautas).map((d) => {

                // ignore if astronaut-mision-year-country combo already exists
                var astronauta = d.nombre
                var pais = d.nacionalidad.replace("/", " ")
                var entry = "misiones|" + d.anio_mision.toString() + "|" + pais + "|" + astronauta;
                return entry
            })
        )

        // For each astronaut, add a new entry to the tree
        // The entry is the root + the year + the country + the astronaut + the austronaut's total mission hours
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

        // Plot the data
        // Tree chart of the astronauts
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

        // Change the stroke color of the text, because it's white by default
        var g = document.querySelectorAll('[aria-label="text"]')
        g.forEach((d) => {
            d.style.stroke = "black"
        })
    })
}
