ko.bindingHandlers.sexBlock = {
  init: function (element, valueAccessor) {
    var svg = d3.select(element)
      .append("svg")
      .classed("block", true)
      .classed("sex", true);

    svg.append("rect")
       .classed("background", true)
       .attr("height", 180)
       .attr("width", 800)
       .attr("fill", "#DDD");

    svg.append("g").classed("pie", true)
                  .attr("transform", "translate(90 90)")
 

  },
  update: function (element, valueAccessor) {
    var value = ko.unwrap(valueAccessor());

    var lessThan = value.populationAMean < value.populationBMean ? true : false;

    var pieGroup = d3.select(element).select(".pie");

    var width = 160,
        height = 160,
        radius = Math.min(width, height) / 2;

    var data = [{ value: 0.5, label: 'Male'}, { value: 0.5, label: 'Female'}];
    var color = d3.scale.ordinal().range(["#FFF", "#000"]);
    var arc = d3.svg.arc()
        .outerRadius(radius)
        .innerRadius(radius - 20);
    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.value; });
    var g = pieGroup.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");
    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.value); });

  }
};