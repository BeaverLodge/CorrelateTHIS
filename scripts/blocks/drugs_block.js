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
       .attr("fill", "#73B9F3");

    svg.append("text")
       .classed("description", true)
       .style("font-size", 28)
       .style("font-weight", "bold")
       .style("fill", "#5D5124")
       .attr("x", 440)
       .attr("y", 80);

    svg.append("text")
       .classed("tagline", true)
       .style("font-size", 16)
       .style("fill", "#5D5124")
       .attr("x", 430)
       .attr("y", 160);

    svg.append("g")
       .classed("pop-pill", true);

    var popPill = svg.select(".pop-pill");
    popPill.append("ellipse")
        .attr("cx", 93).attr("cy", 86)
        .attr("rx", 70).attr("ry", 70)
        .attr("stroke", "#5D5124").attr("stroke-width", 11)
        .attr("fill", "#858930");
    popPill.append("line")
        .attr("stroke", "#5D5124").attr("stroke-width", 9)
        .attr("x1", 97).attr("x2", 97)
        .attr("y1", 21).attr("y2", 151);

    popPill.attr("transform", "translate(700 110) scale(0.4)");

    svg.append("g")
       .classed("filter-pill", true);

    var filterPill = svg.select(".filter-pill");
    filterPill.append("ellipse")
        .attr("cx", 93).attr("cy", 86)
        .attr("rx", 70).attr("ry", 70)
        .attr("stroke", "#5D5124").attr("stroke-width", 11)
        .attr("fill", "#858930");
    filterPill.append("line")
        .attr("stroke", "#5D5124").attr("stroke-width", 9)
        .attr("x1", 97).attr("x2", 97)
        .attr("y1", 21).attr("y2", 151);

    filterPill.attr("transform", "translate(60 10)");
  },
  update: function (element, valueAccessor) {
    var value = ko.unwrap(valueAccessor());
    var filterAverage = value.populationAMean;
    var populationAverage = value.populationBMean;

    var svg = d3.select(element).select("svg");

    var text = svg.select(".description")
                  .text(Math.round(filterAverage * 100) + "% chance of doing illicit drugs");
    var difference = Math.round(filterAverage * 100) - Math.round(populationAverage * 100);
    var descriptor = (difference < 0) ? "less" : "more"
    var text = svg.select(".tagline")
                  .text("That's " + Math.abs(difference) + "% " + descriptor +" than the average of " + Math.round(populationAverage * 100) + "%");

    var arc = d3.svg.arc().outerRadius(70).innerRadius(0);
    var pie = d3.layout.pie().sort(null).value(function(d) { return d.value; });

    var popPieGroup = d3.select(element).select(".pop-pill");
    var popData = [{ value: populationAverage, label: 'yes'}, { value: 1-populationAverage, label: 'no'}];

    var popGroup = popPieGroup.selectAll(".arc").data(pie(popData));
    popGroup.enter().append("path").attr("d", arc).attr("class", "arc");
    popGroup.attr("d", arc).attr("transform", "translate(93, 86)");

    var filterPieGroup = d3.select(element).select(".filter-pill");
    var filterData = [{ value: filterAverage, label: 'yes'}, { value: 1-filterAverage, label: 'no'}];

    var filterGroup = filterPieGroup.selectAll(".arc").data(pie(filterData));
    filterGroup.enter().append("path").attr("d", arc).attr("class", "arc");
    filterGroup.attr("d", arc).attr("transform", "translate(93, 86)");

  }
};
