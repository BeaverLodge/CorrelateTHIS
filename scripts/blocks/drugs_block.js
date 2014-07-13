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

    svg.append("g")
       .classed("pop-pill", true);

    var popPill = svg.select(".pop-pill");
    popPill.append("ellipse")
        .attr("cx", 93).attr("cy", 86)
        .attr("rx", 70).attr("ry", 70)
        .attr("stroke", "#ffaa56").attr("stroke-width", 11)
        .attr("fill", "#ffd4aa");
    popPill.append("line")
        .attr("stroke", "#fff3e8").attr("stroke-width", 9)
        .attr("x1", 97).attr("x2", 97)
        .attr("y1", 21).attr("y2", 151);
    popPill.append("line")
        .attr("stroke", "#ffaa56").attr("stroke-width", 9)
        .attr("x1", 91).attr("x2", 91)
        .attr("y1", 21).attr("y2", 151);

    popPill.attr("transform", "translate(100 10)");

    svg.append("g")
       .classed("filter-pill", true);

    var filterPill = svg.select(".filter-pill");
    filterPill.append("ellipse")
        .attr("cx", 93).attr("cy", 86)
        .attr("rx", 70).attr("ry", 70)
        .attr("stroke", "#007f7f").attr("stroke-width", 11)
        .attr("fill", "#00bfbf");
    filterPill.append("line")
        .attr("stroke", "#00ffff").attr("stroke-width", 9)
        .attr("x1", 91).attr("x2", 91)
        .attr("y1", 21).attr("y2", 151);
    filterPill.append("line")
        .attr("stroke", "#007f7f").attr("stroke-width", 9)
        .attr("x1", 97).attr("x2", 97)
        .attr("y1", 21).attr("y2", 151);

    filterPill.attr("transform", "translate(500 10)");
  },
  update: function (element, valueAccessor) {
    var value = ko.unwrap(valueAccessor());
    var populationAverage = value.populationAMean;
    var filterAverage = value.populationBMean;

    var svg = d3.select(element).select("svg");


    console.log("filter mean: " + value.populationAMean);
    console.log("populaion average: " + value.populationBMean);
    var diff = Math.abs(value.populationAMean - value.populationBMean);
    // Are XX% more likely to have been a recent user of illicit drugs
    console.log(diff);

    var data = [];

    var text = svg.select(".description")
                  .text("...on average. Do STUFF");
  }
};
