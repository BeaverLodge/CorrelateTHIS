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

    svg.append("g")
      .classed("cityscape", true)

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
    var distance = (value.populationBMean + diff) /1000 * 600;

    var svg = d3.select(element).select("svg");

    if (diff <= 0 ) { message = "...on average live " + absDiff + "km closer to the city" }
    else { message = "...on average live " + absDiff + "km further away from the city" }

    var text = svg.select(".description")
                  .text(message);


    var updater = svg.selectAll(".road")
      .data([distance]);

    updater.enter()
      .append("rect")
        .attr("x", 600)
        .attr("y", 150)
        .attr("width", 0)
        .attr("height", 20)
        .attr("class", "road")
        .attr("background", "black");

    updater
      .transition()
      .attr("x", function(d) { return 630 - d; })
      .attr("width", function(d) { return d; } );

    updater.exit()
        .transition()
        .attr("width", 0)
        .remove();

    var buildings = [{stroke: "#4C4C4C", fill: "#666666",
                      path: "m710,162 l14,4 l27,-70 l-30,-11 l-11,77z"},
                     {stroke: "#666666", fill: "#7f7f7f",
                      path: "m697,165 l23,1 l30,-144 l-49,-2 l-4,145z"},
                     {stroke: "#4c4c4c", fill: "#666666",
                      path: "m679,166 l-25,0 l-36,-120 l52,-4 l9,123z"},
                     {stroke: "#666666", fill: "#999999",
                      path: "m673,167 l-26,-158 l68,0 l-13,158 l-28,0z"}];
    var cityscape = svg.select(".cityscape");

    cityscape.selectAll(".buildings")
        .data(buildings)
        .enter()
          .append("path")
            .attr("d", function(d) { return d.path; })
            .attr("stroke", function(d) { return d.stroke; })
            .attr("stroke-width", 5)
            .attr("fill", function(d) { return d.fill; })
            .classed("buildings", true);

  }
};
