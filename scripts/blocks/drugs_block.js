ko.bindingHandlers.drugsBlock = {
  init: function (element, valueAccessor) {
    var svg = d3.select(element)
      .append("svg")
      .classed("block", true)
      .classed("drugs", true);

    svg.append("rect")
       .classed("background", true)
       .attr("height", 180)
       .attr("width", 800)
       .attr("fill", "#EBD2FF");

    svg.append("text")
       .classed("description", true)
       .attr("x", 400)
       .attr("y", 40);

  },
  update: function (element, valueAccessor) {
    var value = ko.unwrap(valueAccessor());

    var diff = Math.abs(value.populationAMean - value.populationBMean);

    var data = [];

    var svg = d3.select(element).select("svg");

    var text = svg.select(".description")
                  .text("...on average. Do STUFF");
  }
};
