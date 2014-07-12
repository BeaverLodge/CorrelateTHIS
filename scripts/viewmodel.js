window.AppViewModel = function() {
  var self = this;
  this.loading = ko.observable(true);
  this.questionator = ko.observable(null);

  function getComputedFilterOption(questionKey) {
    return ko.computed(function() {
      if (!self.questionator()) return [];
      var options = [{ value: "Any", key: null }];
      options = options.concat(_(self.questionator().questions[questionKey].answers).map(
        function(value, key) {
          return { value: value, key: key };
        }));
      return options;
    });
  }

  this.sexFilter = ko.observable();
  this.ageFilter = ko.observable();
  this.illicitFilter = ko.observable();
  this.marijuanaFilter = ko.observable();
  this.alcoholFilter = ko.observable();
  this.remotenessFilter = ko.observable();
  this.smokingFilter = ko.observable();

  this.sexFilterOptions = getComputedFilterOption("Sex");
  this.ageFilterOptions = getComputedFilterOption("AgeGroup1460plus");
  this.illicitFilterOptions = getComputedFilterOption("Illicit");
  this.marijuanaFilterOptions = getComputedFilterOption("Marijuana");
  this.alcoholFilterOptions = getComputedFilterOption("Alcohol");
  this.remotenessFilterOptions = getComputedFilterOption("ASGCremoteness4");
  this.smokingFilterOptions = getComputedFilterOption("Tobacco");

  this.filter = ko.computed(function() {
    var filter = {};
    if (self.ageFilter()) filter["AgeGroup1460plus"] = self.ageFilter();
    if (self.sexFilter()) filter["Sex"] = self.sexFilter();
    if (self.illicitFilter()) filter["Illicit"] = self.illicitFilter();
    if (self.marijuanaFilter()) filter["Marijuana"] = self.marijuanaFilter();
    if (self.alcoholFilter()) filter["Alcohol"] = self.alcoholFilter();
    if (self.remotenessFilter()) filter["ASGCremoteness4"] = self.remotenessFilter();
    if (self.smokingFilter()) filter["Tobacco"] = self.smokingFilter();
    return filter;
  });

  this.comparisons = ko.computed(function() {
    if (self.loading()) {
      return;
    }
    return masher.compareTwoPopulations(self.filter(), {}, questionator.questions);
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
