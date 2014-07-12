window.AppViewModel = function() {
  this.loading = ko.observable(true);
  this.sexFilterOptions = ko.observableArray([]);
  this.sexFilter = ko.observable();
  this.ageFilterOptions = ko.observableArray([]);
  this.ageFilter = ko.observable();


  ko.applyBindings(this);
}

$(function() {
  window.viewModel = new AppViewModel();
});
