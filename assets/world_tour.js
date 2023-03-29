async function plotWorldTour(dataPromise, divId){

    var astronautas = await dataPromise
    // console.log(astronautas)

    var width = 500;
    var height = 500;
    var inset = 10;
    var graticule = d3.geoGraticule();

    var outline = {type: "Sphere"};

    var world = await d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")

    // console.log(world)
    
    var land = topojson.feature(world, world.objects.land);
    // console.log(land)

    var borders = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);
    // console.log(borders)
    
    var countries = topojson.feature(world, world.objects.countries).features;
    //console.log(countries)

    // countries.forEach(d => {
    //     console.log(d.properties.name);
    // })

    var sphere = ({ type: "Sphere" });
    console.log(sphere)
    var tilt = 20;

    var projection = d3.geoOrthographic().fitExtent([[inset, inset], [width - inset, height - inset]], outline)
    var vx = 0.001, vy = -0.001;
    //define context with width and height
    // var context = d3.select("body").append("canvas");
    var context = d3.select(divId).append("canvas").attr("width", width).attr("height", height).attr("id", "worldmap").node().getContext("2d");

    // var context = DOM.context2d(width, height);
    var path = d3.geoPath(projection, context);

    // var path = d3.geo.path().projection(projection);
    // console.log(context.canvas)
    
    function render(country, arc) {
        context.clearRect(0, 0, width, height);
        context.beginPath(), path(land), context.fillStyle = "#1E1E1E", context.fill();
        context.beginPath(), path(country), context.fillStyle = "#f8f14e", context.fill();
        context.beginPath(), path(borders), context.strokeStyle = "#f8f14e", context.lineWidth = 0.5, context.stroke();
        context.beginPath(), path(sphere), context.strokeStyle = "#f8f14e", context.lineWidth = 1.5, context.stroke();
        context.beginPath(), path(arc), context.stroke();
        return context.canvas;
    }

    async function navigate(country, p1, p2, ip, iv) {
       await d3.transition()
            .delay(500)
            .duration(1250)
            .tween("render", () => t => {
                projection.rotate(iv(t));
                render(country, { type: "LineString", coordinates: [p1, ip(t)] });
            })
            .transition()
            .tween("render", () => t => {
                render(country, { type: "LineString", coordinates: [ip(t), p2] });
            })
            .end();
    }

    let p1, p2 = [0, 0], r1, r2 = [0, 0, 0];
    //render("Argentina",  {type: "LineString", coordinates: [ip(t), p2]})
    
    //for (const country of countries) {
    for (const astronauta of astronautas) {
        var ast_pais = astronauta.nacionalidad;
    
        var country_name_map = {
            "EE.UU.": "United States of America",
            "Italia": "Italy",
            "U.S.S.R/Rusia": "Russia",
            "Japon": "Japan",
            "Reino Unido": "United Kingdom",
            "Paises Bajos": "Netherlands",
            "Alemania": "Germany",
            "Dinamarca": "Denmark",
            "Francia": "France",
            "Kasajistan": "Kazakhstan",
            "Emiratos Arabes Unidos": "United Arab Emirates",
        }
        
        if (country_name_map[ast_pais] != undefined){
            ast_pais = country_name_map[ast_pais];
        }

        var country = countries.find(c => c.properties.name === ast_pais)
        // if (country == undefined){
        //     console.log(ast_pais)
        //     continue;
        // }
        //console.log({ast_pais, country})
        
        //document.querySelector("#nacionalidad").innerHTML = ast_pais;
        //document.querySelector("#nombre").innerHTML = astronauta.nombre;

        var typed_name = new Typed('#nombre', {
            strings: ["Nombre: ", "Nombre: " + astronauta.nombre],
            typeSpeed: 50,
            loop: false,
            cursorChar: '',
            smartBackspace: true,
        });

        var typed_pais = new Typed('#nacionalidad', {
            strings: ["Pais: ", "Pais: " + astronauta.nacionalidad],
            typeSpeed: 50,
            loop: false,
            cursorChar: '',
            smartBackspace: true,
        });

        var typed_pais = new Typed('#anio_mision', {
            strings: ["Año de Mision: ", "Año de Mision: " + astronauta.anio_mision],
            typeSpeed: 50,
            loop: false,
            cursorChar: '',
            smartBackspace: true,
        });
        var typed_pais = new Typed('#horas', {
            strings: ["Horas: ", "Horas: " + astronauta.mision_hs + "hs"],
            typeSpeed: 50,
            loop: false,
            cursorChar: '',
            smartBackspace: true,
        });

        var name = country.properties.name;
        //console.log(name)
        // yield render(country);

        p1 = p2, p2 = d3.geoCentroid(country);
        r1 = r2, r2 = [-p2[0], tilt - p2[1], 0];
        const ip = d3.geoInterpolate(p1, p2);
        const iv = Versor.interpolateAngles(r1, r2);
        
        //console.log(p1, p2, r1, r2, ip, iv);
        await navigate(country, p1, p2, ip, iv);
    }
}
class Versor {
    static fromAngles([l, p, g]) {
        l *= Math.PI / 360;
        p *= Math.PI / 360;
        g *= Math.PI / 360;
        const sl = Math.sin(l), cl = Math.cos(l);
        const sp = Math.sin(p), cp = Math.cos(p);
        const sg = Math.sin(g), cg = Math.cos(g);
        return [
            cl * cp * cg + sl * sp * sg,
            sl * cp * cg - cl * sp * sg,
            cl * sp * cg + sl * cp * sg,
            cl * cp * sg - sl * sp * cg
        ];
    }
    static toAngles([a, b, c, d]) {
        return [
            Math.atan2(2 * (a * b + c * d), 1 - 2 * (b * b + c * c)) * 180 / Math.PI,
            Math.asin(Math.max(-1, Math.min(1, 2 * (a * c - d * b)))) * 180 / Math.PI,
            Math.atan2(2 * (a * d + b * c), 1 - 2 * (c * c + d * d)) * 180 / Math.PI
        ];
    }
    static interpolateAngles(a, b) {
        const i = Versor.interpolate(Versor.fromAngles(a), Versor.fromAngles(b));
        return t => Versor.toAngles(i(t));
    }
    static interpolateLinear([a1, b1, c1, d1], [a2, b2, c2, d2]) {
        a2 -= a1, b2 -= b1, c2 -= c1, d2 -= d1;
        const x = new Array(4);
        return t => {
            const l = Math.hypot(x[0] = a1 + a2 * t, x[1] = b1 + b2 * t, x[2] = c1 + c2 * t, x[3] = d1 + d2 * t);
            x[0] /= l, x[1] /= l, x[2] /= l, x[3] /= l;
            return x;
        };
    }
    static interpolate([a1, b1, c1, d1], [a2, b2, c2, d2]) {
        let dot = a1 * a2 + b1 * b2 + c1 * c2 + d1 * d2;
        if (dot < 0) a2 = -a2, b2 = -b2, c2 = -c2, d2 = -d2, dot = -dot;
        if (dot > 0.9995) return Versor.interpolateLinear([a1, b1, c1, d1], [a2, b2, c2, d2]);
        const theta0 = Math.acos(Math.max(-1, Math.min(1, dot)));
        const x = new Array(4);
        const l = Math.hypot(a2 -= a1 * dot, b2 -= b1 * dot, c2 -= c1 * dot, d2 -= d1 * dot);
        a2 /= l, b2 /= l, c2 /= l, d2 /= l;
        return t => {
            const theta = theta0 * t;
            const s = Math.sin(theta);
            const c = Math.cos(theta);
            x[0] = a1 * c + a2 * s;
            x[1] = b1 * c + b2 * s;
            x[2] = c1 * c + c2 * s;
            x[3] = d1 * c + d2 * s;
            return x;
        };
    }
}
