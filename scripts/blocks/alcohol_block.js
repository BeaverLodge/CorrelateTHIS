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
       .attr("fill", "#5C3B5F");
  },
  update: function (element, valueAccessor) {
    var value = ko.unwrap(valueAccessor());
    var diff = Math.abs(value.populationAMean - value.populationBMean);
    var data = [];
    var glassData = [];
    for (var i = 0; i < Math.floor(diff); i++) {
      data.push(1);
      glassData.push(1);
    }
    if (diff - Math.floor(diff) > 0) {
      data.push(diff - Math.floor(diff));
      glassData.push(1);
    }
    
    var msDelay = 500;
    var glassHeight = 80;
    var glassWidth = 50;
    var bonusVar = 100;

    var svg = d3.select(element).select("svg");

    var glassesGroup = svg.append('g')
      .attr("transform", "translate(20,20)");
    var glasses = glassesGroup.selectAll(".glass")
      .data(glassData);

    glasses.enter()
      .append("rect")
      .attr("class", "glass")
      .attr('fill', '#ffffff')
      .attr('stroke', '#dbc5c5')
      .attr('stroke-width', 2)
      .attr("width", glassWidth)
      .attr("height", glassHeight)
      .attr("x", function(d, i) { return i * (glassWidth + 10); } );

    var contentsGroup = svg.append('g')
      .attr("transform", "translate(20,20)");
    var contents = contentsGroup.selectAll(".contents")
      .data(data);

    contents.enter()
      .append("rect")
      .attr("class", "contents")
      .attr("x", function(d, i) { return i * (glassWidth + 10); } )
      .attr("y", glassHeight - 8)
      .attr("width", glassWidth)
      .attr("height", 0)
      .attr('fill-opacity', '0.1')
      .attr("fill", '#ff7f00');

    contents.transition()
      .delay(function(d, i) { return i * msDelay; })
      .attr("y", function(d) { return glassHeight - d * glassHeight + 8; } )
      .attr('fill-opacity', '0.9')
      .attr("height", function(d) { return d * glassHeight - 10; } );

    contents.exit()
      .transition()
      .attr("y", glassHeight - 8)
      .attr("height", 0)
      .remove();
    
    var bubbleGroup = svg.append('g')
      .attr("transform", "translate(20,10)");
    var bubblesData = _.reject(data, function(d) { return d < 1; });  
    var bubbles = bubbleGroup.selectAll(".bubble")
      .data(bubblesData);

    bubbles.enter()
      .append("rect")
      .attr("class", "bubble")
      .attr("x", function(d, i) { return i * (glassWidth + 10); } )
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
