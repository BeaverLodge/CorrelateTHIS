ko.bindingHandlers.ageBlock = {
  init: function (element, valueAccessor) {
    var svg = d3.select(element)
      .append("svg")
      .classed("block", true)
      .classed("age", true)
      .style("height", 220);

    svg.append("rect")
       .classed("background", true)
       .attr("height", 220)
       .attr("width", 800)
       .style("fill", "#ad723d");

    svg.append("svg:image")
       .attr("xlink:href", "/images/age.png")
       .attr("x", "60")
       .attr("y", "60")
       .attr("width", "1263")
       .attr("height", "180");

    svg.append("text")
       .classed("description", true)
       .attr("x", 400)
       .attr("y", 40)
       .style("fill", "#86c1ec");

  },
  update: function (element, valueAccessor) {
    var value = ko.unwrap(valueAccessor());

    var diff = Math.abs(value.populationAMean - value.populationBMean);

    var data = [];

    var lessThan = value.populationAMean < value.populationBMean ? true : false;

    for (var i = 0; i < Math.floor(diff); i++) data.push(1);
    if (diff - Math.floor(diff) > 0) data.push(diff - Math.floor(diff));

    var svg = d3.select(element).select("svg");
    var ciggiGroup = svg.select(".ciggi-group");

    var adjective = lessThan ? "younger" : "older"
    var text = svg.select(".description")
                  .text("...on average be " + Math.round(diff * 10) / 10 + " years " + adjective);
    ciggiGroup.attr("transform", "translate(20 20)")

    var updater = ciggiGroup.selectAll(".ciggi")
       .data(data);

    var ciggiHeight = 140;
    var ciggiWidth = 15;
    var filterHeight = 40;

    updater.enter()
      .append("g")
        .classed("ciggi", true)
        .each(function(d, i) {
          var ciggi = d3.select(this);
          ciggi.append("rect")
            .classed("ciggi-body", true)
            .attr("x", i * (ciggiWidth + 5) )
            .attr("width", ciggiWidth)
            .attr("y", ciggiHeight - filterHeight)
            .attr("height", 0)
            .attr("fill", "white")

          ciggi.append("rect")
            .classed("ciggi-filter", true)
            .attr("x", i * (ciggiWidth + 5) )
            .attr("width", ciggiWidth)
            .attr("y", ciggiHeight - filterHeight)
            .attr("height", filterHeight)
            .attr("fill", "#e09c3b")

          ciggi.append("rect")
            .classed("ciggi-filter-band", true)
            .attr("x", i * (ciggiWidth + 5) )
            .attr("width", ciggiWidth)
            .attr("y", ciggiHeight - filterHeight)
            .attr("height", 3)
            .attr("fill", "#a88815")

          ciggi.append("rect")
            .classed("ciggi-flame", true)
            .attr("x", i * (ciggiWidth + 5) )
            .attr("width", ciggiWidth)
            .attr("y", 0)
            .attr("height", 10)
            .attr("fill", "#444")
        });

    updater
      .each(function(d, i) {
        var ciggi = d3.select(this);        
        ciggi.select(".ciggi-body")
             .transition()
             // .delay(function(d, i) { return i * 100; })
             .attr("y", (ciggiHeight - filterHeight) - d * (ciggiHeight - filterHeight) )
             .attr("height", d * (ciggiHeight - filterHeight) );
        ciggi.select(".ciggi-flame")
          .transition()
          // .delay(function(d, i) { return i * 100; })
          .attr("y", (ciggiHeight - filterHeight) - d * (ciggiHeight - filterHeight) )
          .attr("height", 10 )
          .attr("opacity", (d === 1 ? 0 : 1));
      })

    updater.exit()
      .remove();

    window.ciggiData = data;
  }
};