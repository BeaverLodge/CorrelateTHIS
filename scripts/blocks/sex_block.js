ko.bindingHandlers.sexBlock = {
  init: function (element, valueAccessor) {
    var svg = d3.select(element)
      .append("svg")
      .classed("block", true)
      .classed("sex", true)
      .style("height", 180)

    svg.append("rect")
       .classed("background", true)
       .attr("height", 180)
       .attr("width", 800)
       .attr("fill", "#88c2ea");

    // male logo
    svg.append("path").attr("d", "M120,60 L140,40").attr("stroke", "#bd5830").attr("stroke-width", 12).attr("fill", "transparent");
    svg.append("path").attr("d", "M120,40 L140,40 L140,60").attr("stroke", "#bd5830").attr("stroke-width", 12).attr("fill", "transparent");

    // female logo
    svg.append("path").attr("d", "M220,140 L220,165").attr("stroke", "#bd5830").attr("stroke-width", 12).attr("fill", "transparent");
    svg.append("path").attr("d", "M205,152  L235,152").attr("stroke", "#bd5830").attr("stroke-width", 12).attr("fill", "transparent");

    // other stuff
    svg.append("g").classed("pie-male", true).attr("transform", "translate(90 90)")
    svg.append("g").classed("pie-female", true).attr("transform", "translate(220 90)")
    svg.append("text").attr("transform", "translate(90 95)").attr("text-anchor", "middle").classed("label-male", true).attr("fill", "#71652b");
    svg.append("text").attr("transform", "translate(220 95)").attr("text-anchor", "middle").classed("label-female", true).attr("fill", "#71652b");

    svg.append("text")
       .attr("transform", "translate(300 100)")
       .style('font-size', 30)
       .style('text-anchor', 'start')
       .attr('fill', '#bd5830')
       .classed("description", true);
  },
  update: function (element, valueAccessor) {
    var value = ko.unwrap(valueAccessor());

    console.log(value);
    var males = value.populationAAnswerFrequency.Sex["Portion1"] || 0;
    var females = value.populationAAnswerFrequency.Sex["Portion2"] || 0;

    var width = 100,
        height = 100,
        radius = Math.min(width, height) / 2;

    var pieGroup = d3.select(element).select(".pie-female");
    var data = [{ value: females, label: 'yes'}, { value: 1-females, label: 'no'}];
    var color = d3.scale.ordinal().range(["#FFF", "#000"]);
    var arc = d3.svg.arc()
        .outerRadius(radius)
        .innerRadius(radius - 20);
    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.value; });
    var g = pieGroup.selectAll(".arc").data(pie(data));
    g.enter().append("path")
     .attr("d", arc)
     .attr("class", "arc");
    g.attr("d", arc);

    pieGroup = d3.select(element).select(".pie-male");
    var data = [{ value: males, label: 'yes'}, { value: 1-males, label: 'no'}];
    var color = d3.scale.ordinal().range(["#FFF", "#000"]);
    var arc = d3.svg.arc()
        .outerRadius(radius)
        .innerRadius(radius - 20);
    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.value; });
    g = pieGroup.selectAll(".arc").data(pie(data))
    g.enter().append("path")
     .attr("d", arc)
     .attr("class", "arc");
    g.attr("d", arc)

    d3.select(".label-female").text(Math.round(females * 100) + "%");
    d3.select(".label-male").text(Math.round(males * 100) + "%");

    var description = "";
    if (males > females) description = "more likely male than female";
    if (males < females) description = "more likely female than male";

    d3.select(element).select(".description")
      .text(description);


  }
};
