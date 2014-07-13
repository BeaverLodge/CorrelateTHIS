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


  this.title = ko.computed(function() {
    var title = "";
    switch(self.sexFilter()) {
      case "-2": title += "Ambiguous Australians"; break;
      case "1": title += "Australian males"; break;
      case "2": title += "Australian females"; break;
      case null: title += "Australians"; break;
    }

    switch(self.ageFilter()) {
      case "1": title += " between 14 and 17 years old"; break;
      case "2": title += " between 18 and 24 years old"; break;
      case "3": title += " between 25 and 29 years old"; break;
      case "4": title += " between 30 and 39 years old"; break;
      case "5": title += " between 40 and 49 years old"; break;
      case "6": title += " between 50 and 59 years old"; break;
      case "7": title += " over 60 years old"; break;
    }

    var badHabits = [];
    switch(self.illicitFilter()) {
      case "1": badHabits.push(" never use illicit drugs"); break;
      case "2": badHabits.push(" used to use illicit drugs"); break;
      case "3": badHabits.push(" have recently used illicit drugs"); break;
    }

    switch(self.marijuanaFilter()) {
      case "1": badHabits.push(" never smoked marijuana"); break;
      case "2": badHabits.push(" used to smoke marijuana"); break;
      case "3": badHabits.push(" have recently smoked marijuana"); break;
    }

    switch(self.alcoholFilter()) {
      case "1": badHabits.push(" drink alcohol daily"); break;
      case "2": badHabits.push(" drink alcohol weekly"); break;
      case "3": badHabits.push(" infrequently drink alcohol"); break;
      case "4": badHabits.push(" no longer drink alcohol"); break;
      case "5": badHabits.push(" never drink alcohol"); break;
    }

    switch(self.remotenessFilter()) {
      case "1": badHabits.push(" live in a major city"); break;
      case "2": badHabits.push(" live suburbia"); break;
      case "3": badHabits.push(" live in country"); break;
      case "4": badHabits.push(" live in remote Australia"); break;
    }

    switch(self.smokingFilter()) {
      case "1": badHabits.push(" smoke daily"); break;
      case "2": badHabits.push(" occasionally smoke"); break;
      case "3": badHabits.push(" used to smoke"); break;
      case "4": badHabits.push(" never smoke"); break;
    }

    if (badHabits.length > 0) {
      title += " who ";
      for (var i = 0; i < badHabits.length; i++)
      {
        title += badHabits[i];
        if (i < badHabits.length - 1)
        {
          title += i < badHabits.length - 2 ? ", " : " and ";
        }
      }
    }

    return title;
  });

  this.load();

  ko.applyBindings(this);
}

$(function() {
  window.viewModel = new AppViewModel();
});
