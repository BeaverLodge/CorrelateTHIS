ko.bindingHandlers.alcoholBlock = {
  init: function (element, valueAccessor) {
    var svg = d3.select(element)
      .append("svg")
      .classed("block", true)
      .classed("alcohol", true);

    svg.append("rect")
       .classed("background", true)
       .attr("height", 180)
       .attr("width", 800)
       .attr("fill", "#88c2ea");
    svg.append('g')
      .attr("transform", "translate(50,20)")
      .classed("glasses-group", true);
    svg.append('g')
      .attr("transform", "translate(50,20)")
      .classed("contents-group", true);
    svg.append('g')
      .attr("transform", "translate(50,10)")
      .classed("bubbles-group", true);
    svg.append('text')
      .style("font-size", 20)
      .style("fill", "#AB4429")
      .attr("x", 400)
      .attr("y", 160)
      .classed('description', true);      
  },
  update: function (element, valueAccessor) {
    var value = ko.unwrap(valueAccessor());
    var diff = Math.abs(value.populationAMean - value.populationBMean);
    var data = [];
    var glassData = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    for (var i = 0; i < Math.floor(diff); i++) {
      data.push(1);
    }
    if (diff - Math.floor(diff) > 0) {
      data.push(diff - Math.floor(diff));
    }
    
    var msDelay = 200;
    var glassHeight = 80;
    var glassWidth = 50;
    var bonusVar = 100;
    var variable = 50;

    var svg = d3.select(element).select("svg");

    var text = "average frequency of alcohol consumption";
    var description = svg.select('.description')
      .text(text);

    var glassesGroup = svg.select(".glasses-group");
    var glasses = glassesGroup.selectAll(".glass")
      .data(glassData);

    glasses.enter()
      .append("g")
      .classed("glass", true)
      .each(function (d, i) {
        var glass = d3.select(this);      
        glass.append("rect")
        .attr('fill', '#ffffff')
        .attr('stroke', '#dbc5c5')
        .attr('stroke-width', 2)
        .attr("width", glassWidth)
        .attr("height", glassHeight)
        .attr("x", i * (glassWidth + variable));
        glass.append('text')
          .text(d)
          .attr('x', i * (glassWidth + variable) + (glassWidth / 2))
          .attr('y', glassHeight + 20)
          .attr('text-anchor', 'middle')
          .attr('fill', '#71652b');
        glass.append('rect')
          .attr('x', i * (glassWidth + variable) + glassWidth)
          .attr('y', glassHeight / 4)
          .attr('fill', 'transparent')
          .attr('stroke', '#dbc5c5')
          .attr('stroke-width', 4)
          .attr("width", glassWidth / 4)
          .attr("height", glassHeight / 2);          
      })

    var contentsGroup = svg.select('.contents-group');
    var contents = contentsGroup.selectAll(".contents")
      .data(data);

    contents.enter()
      .append("rect")
      .attr("class", "contents")
      .attr("x", function(d, i) { return i * (glassWidth + variable); } )
      .attr("y", glassHeight - 8)
      .attr("width", glassWidth)
      .attr("height", 0)
      .attr('fill-opacity', '0.1')
      .attr("fill", '#ff7f00');

    contents.transition()
      .delay(function(d, i) { return i * msDelay; })
      .duration(1000)
      .attr("y", function(d) { return glassHeight - d * glassHeight + 8; } )
      .attr('fill-opacity', '0.9')
      .attr("height", function(d) { return d * glassHeight - 10; } );

    contents.exit()
      .transition()
      .attr("y", glassHeight - 8)
      .attr("height", 0)
      .remove();
    
    var bubbleGroup = svg.select('.bubbles-group');
    var bubblesData = _.reject(data, function(d) { return d < 1; });  
    var bubbles = bubbleGroup.selectAll(".bubble")
      .data(bubblesData);

    bubbles.enter()
      .append("rect")
      .attr("class", "bubble")
      .attr("x", function(d, i) { return i * (glassWidth + variable); } )
      .attr("y", function(d) { return glassHeight - d * glassHeight + 10; })
      .attr("width", glassWidth)
      .attr("height", 0)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 0)
      .attr('fill-opacity', '0.0')
      .attr("fill", '#ffffff');

    bubbles.transition()
      .delay(function(d, i) { return i * msDelay; })
      .duration(3000)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
      .attr("y", function(d) { return glassHeight - d * glassHeight + 8; } )
      .attr('fill-opacity', '0.9')
      .attr("height", 10 );

    bubbles.exit()
      .transition()
      .attr("y", glassHeight - 8)
      .attr("height", 0)
      .remove();  
  } 
};
