ko.bindingHandlers.ageBlock = {
  init: function (element, valueAccessor) {

  },
  update: function (element, valueAccessor) {
  	$(element).text(JSON.stringify(ko.unwrap(valueAccessor())));
  }
};