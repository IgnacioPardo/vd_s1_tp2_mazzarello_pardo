var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv("/Users/lucamazzarello_/Desktop/Repos/Visualizacion_de_datos/vd_s1_tp2_mazzarello_pardo/vd_astronautas/astronautas.csv", function(data) {


  var x = d3.scaleLinear()
      .range([0, width])
      .domain([0, d3.max(data, function(d) { return +d.anio_mision; })])
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));


  var y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(data, function(d) { return +d.cantidad_misiones; })]);
  var yAxis = svg.append("g")
      .call(d3.axisLeft(y));


  function update(nAnio_mision) {

    var histogram = d3.histogram()
        .value(function(d) { return +d.anio_mision; })   
        .domain(x.domain()) 
        .thresholds(x.ticks(nAnio_mision)); 
  
    
    var anio_mision = histogram(data);
  
    
    y.domain([0, d3.max(anio_mision, function(d) { return d.length; })]);   
    yAxis
        .transition()
        .duration(1000)
        .call(d3.axisLeft(y));
  
    
    var bars = svg.selectAll("rect")
        .data(bins);
  
    
    bars.enter()
        .append("rect")
        .merge(bars)
        .transition()
        .duration(1000)
        .attr("x", 1)
        .attr("transform", function(d) {
            return "translate(" + x(d.x0) + "," + y(d.length) + ")";
        })
        .attr("width", function(d) {
            return x(d.x1) - x(d.x0) - 1;
        })
        .attr("height", function(d) {
            return height - y(d.length);
        });
  
    bars.exit().remove();
  }
  
  update(10);
});