ko.bindingHandlers.smokingBlock = {
  init: function (element, valueAccessor) {
  	d3.select(element)
  	  .append("svg")
  	  .attr("width", 400)
  	  .attr("height", 200);
  },
  update: function (element, valueAccessor) {
  	var value = ko.unwrap(valueAccessor());
  	var valueA = value.populationAMean;
  	var valueB = value.populationAMean;

  	svg = d3.select(element).select("svg")
  	svg.style("background", "red")
  }
};