ko.bindingHandlers.locationBlock = {
  init: function (element, valueAccessor) {
    var svg = d3.select(element)
                .append("svg")
                .classed("block", true);

    svg.append("rect")
       .classed("background", true)
       .attr("height", 180)
       .attr("width", 800)
       .attr("fill", "#FFEFD4");

    svg.append("text")
       .classed("description", true)
       .attr("x", 400)
       .attr("y", 40);

  },
  update: function (element, valueAccessor) {
    var value = ko.unwrap(valueAccessor());
    var message = "";
    var calculateDistance = function(diff) {
      return value.populationBMean + diff;
    };

    var diff = Math.round(value.populationAMean - value.populationBMean);
    var absDiff = Math.abs(diff);
    var distance = value.populationBMean + diff;

    console.log(distance);
    var svg = d3.select(element).select("svg");

    if (diff <= 0 ) { message = "...on average live " + absDiff + "km closer to the city" }
    else { message = "...on average live" + absDiff + "km further away from the city" }

    var text = svg.select(".description")
                  .text(message);


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

    var city = {color: "grey",
                points: [{"x": 663, "y": 155},
                         {"x": 660, "y": 20},
                         {"x": 700, "y": 25},
                         {"x": 697, "y": 155}]}

    var city_background = {color: "#3A393A",
                           points: [{"x": 630, "y": 155},
                                    {"x": 620, "y": 45},
                                    {"x": 740, "y": 40},
                                    {"x": 730, "y": 155}]}

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

  }
};
