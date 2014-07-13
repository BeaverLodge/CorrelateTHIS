ko.bindingHandlers.ageBlock = {
  init: function (element, valueAccessor) {
    var svg = d3.select(element)
      .append("svg")
      .classed("block", true)
      .classed("age", true)
      .style("height", 240);

    svg.append("rect")
       .classed("background", true)
       .attr("height", 240)
       .attr("width", 800)
       .style("fill", "#ad723d");

    svg.append("svg:image")
       .classed("age-image", true)
       .attr("xlink:href", "/images/age.png")
       .attr("x", "60")
       .attr("y", "95")
       .attr("width", "1263")
       .attr("height", "180");

    svg.append("text")
       .classed("description", true)
       .attr("x", 400)
       .attr("y", 40)
       .style("font-size", 30)
       .style("font-weight", "bold")
       .style("fill", "#86c1ec");

    svg.append("text")
       .classed("sub-description", true)
       .attr("x", 400)
       .attr("y", 60)
       .style("fill", "#86c1ec");

    svg.append("path")
        .classed("average-arrow", true)
        .attr("d", "M420,70 L400,90 L380,70 Z")
        .attr("fill", "#86c1ec")
        .attr("transform", "translate(0,0)")
        .attr("opacity", 0.5)

    svg.append("path")
        .attr("d", "M420,70 L400,90 L380,70 Z")
        .attr("fill", "#86c1ec")

  },
  update: function (element, valueAccessor) {
    var value = ko.unwrap(valueAccessor());

    var diff = Math.abs(value.populationAMean - value.populationBMean);

    var data = [];

    var lessThan = value.populationAMean < value.populationBMean ? true : false;

    for (var i = 0; i < Math.floor(diff); i++) data.push(1);
    if (diff - Math.floor(diff) > 0) data.push(diff - Math.floor(diff));

    var svg = d3.select(element).select("svg");

    var scale = d3.scale.linear().domain([14.5,70]).range([40,1200])

    svg.select(".age-image")
       .transition()
       .duration(2500)
       .attr("x", 400 - scale(value.populationAMean));

    svg.select(".average-arrow")
       .transition()
       .duration(2500)
       .attr("transform", "translate(" + (719.5 - scale(value.populationAMean)) + ", 0)");

    svg.select(".description").text("average " + value.populationAMean.toFixed(1) + " years old")

    var subDescription = ""
    if (value.populationAMean < value.populationBMean) subDescription = "that's " + diff.toFixed(1) + " years younger than the average";  
    if (value.populationAMean > value.populationBMean) subDescription = "that's " + diff.toFixed(1) + " years older than the average";  
    svg.select(".sub-description").text(subDescription)


  }
};