ko.bindingHandlers.locationBlock = {
  init: function (element, valueAccessor) {
    d3.select(element)
      .append("svg")
      .classed("block", true);
  },
  update: function (element, valueAccessor) {
    var value = ko.unwrap(valueAccessor());
    var message = "";

    var diff = Math.round(value.populationAMean - value.populationBMean);
    var absDiff = Math.abs(diff);

    if (diff <= 0 ) {
      message = "you live " + absDiff + "km closer to the city"
    } else {
      message = "you live " + absDiff + "km further away from the city"
    }

    svg = d3.select(element).select("svg");

    var city = {color: "grey",
                points: [{"x": 583, "y": 155},
                         {"x": 580, "y": 20},
                         {"x": 620, "y": 25},
                         {"x": 617, "y": 155}]}

    var city_background = {color: "light-grey",
                           points: [{"x": 550, "y": 155},
                                    {"x": 540, "y": 45},
                                    {"x": 670, "y": 40},
                                    {"x": 660, "y": 155}]}

    svg.selectAll(".city-background")
      .data([city_background.points])
      .enter()
        .append("polygon")
          .attr("points", function(d) {
            return d.map(function(d) {
              return [d.x, d.y].join(",");
            }).join(" ");
          })
          .attr("stroke", city_background.color)
          .attr("fill", city_background.color);

    svg.selectAll(".city")
      .data([city.points])
      .enter()
        .append("polygon")
          .attr("points", function(d) {
            return d.map(function(d) {
              return [d.x, d.y].join(",");
            }).join(" ");
          })
          .attr("stroke", city.color)
          .attr("fill", city.color);

    var textUpdater = svg.selectAll(".block-message")
      .data([diff]);

    textUpdater.enter()
      .append("text")
       .attr("x", 50)
       .attr("y", 150)
       .attr("class", "block-message")
       .text(message);

    textUpdater
      .transition()
      .text(message);

    textUpdater.exit()
      .transition()
      .text()
      .remove()

    var updater = svg.selectAll(".road")
      .data([absDiff]);

    updater.enter()
      .append("rect")
        .attr("x", 460)
        .attr("y", 80)
        .attr("width", 0)
        .attr("height", 20)
        .attr("class", "road")
        .attr("background", "black");

    updater
      .transition()
      .attr("x", function(d) {return 460 - (d * 30); })
      .attr("width", function(d) { return d * 30; } );

    updater.exit()
        .transition()
        .attr("width", 0)
        .remove();

  }
};
