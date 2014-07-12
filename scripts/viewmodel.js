window.AppViewModel = function() {
  var self = this;
  this.loading = ko.observable(true);
  this.questionator = ko.observable(null);

  this.sexFilter = ko.observable();
  this.ageFilter = ko.observable();
  this.sexFilterOptions = ko.computed(function() {
    if (!self.questionator()) return [];
    var options = [{ value: "Any", key: null }];
    options = options.concat(_(self.questionator().questions['Sex'].answers).map(
      function(value, key) {
        return { value: value, key: key };
      }));
    return options;
  });

  this.ageFilterOptions = ko.computed(function() {
    if (!self.questionator()) return [];
    var options = [{ value: "Any", key: null }];
    options = options.concat(_(self.questionator().questions['AgeGroup1460plus'].answers).map(
      function(value, key) {
        return { value: value, key: key };
      }));
    return options;
  });

  this.filter = ko.computed(function() {
    var filter = {};
    if (self.ageFilter()) {
      filter["AgeGroup1460plus"] = self.ageFilter();
    }
    if (self.sexFilter()) {
      filter["Sex"] = self.sexFilter();
    }
    return filter;
  });

  this.comparisons = ko.computed(function() {
    if (self.loading()) {
      return;
    }
    return masher.compareTwoPopulations(self.filter(), {}, questionator.questions);
  });

  this.filter.subscribe(function(nv) {
    console.log(nv);
  });

  this.correlations = ko.observable();

  this.load = function() {
    var tasks = [questionator.load, masher.load]
    async.parallel(tasks, function(err) {
      self.loading(false);
      self.questionator(questionator);
    });
  };

  this.load();

  ko.applyBindings(this);
}

$(function() {
  window.viewModel = new AppViewModel();
});
