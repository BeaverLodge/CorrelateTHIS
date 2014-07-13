ko.bindingHandlers.smokingBlock = {
  init: function (element, valueAccessor) {
    var svg = d3.select(element)
      .append("svg")
      .classed("block", true)
      .classed("smoking", true);

    svg.append("rect")
       .classed("background", true)
       .attr("height", 180)
       .attr("width", 800)
       .attr("fill", "#71652b");

    svg.append("g")
       .classed("ciggi-group", true)
       .attr("transform", "translate(300 20)")

    svg.append("text")
       .classed("sub-description", true)
       .attr("x", 150)
       .attr("y", 160)
       .attr("fill", "#81c5f8");

    svg.append("text")
       .attr("x", 150)
       .attr("y", 35)
       .text("Average")
       .attr("fill", "#81c5f8")
       .attr("text-anchor", "middle")

    svg.append("text")
       .classed("per-week", true)
       .attr("x", 150)
       .attr("y", 117)
       .attr("font-size", 110)
       .attr("font-weight", "light")
       .attr("letter-spacing", -4)
       .attr("fill", "#81c5f8")
       .attr("text-anchor", "middle")
       .text()

    svg.append("text")
       .attr("x", 150)
       .attr("y", 140)
       .attr("fill", "#81c5f8")
       .attr("text-anchor", "middle")
       .text("cigarettes per week")


  },
  update: function (element, valueAccessor) {
    var value = ko.unwrap(valueAccessor());

    var diff = Math.abs(value.populationAMean - value.populationBMean) * 7;

    var data = [];

    var lessThan = value.populationAMean < value.populationBMean ? true : false;


    var ciggisToShow = Math.min(value.populationAMean * 7, 25);
    for (var i = 0; i < Math.floor(ciggisToShow); i++) data.push(1);
    if (ciggisToShow - Math.floor(ciggisToShow) > 0) data.push(ciggisToShow - Math.floor(ciggisToShow));

    var svg = d3.select(element).select("svg");
    var ciggiGroup = svg.select(".ciggi-group");

    var adjective = lessThan ? "fewer" : "more"
    if (value.populationAMean == value.populationBMean)
    {
      svg.select(".sub-description").text("");
    } else {
      svg.select(".sub-description").text("...that's " + Math.round(diff * 10) / 10 + " " + adjective + " than everyone else");
    }

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
            .attr("fill", "#444");

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

    svg.select(".per-week", true)
       .text((value.populationAMean * 7).toFixed(1))
  }
};
