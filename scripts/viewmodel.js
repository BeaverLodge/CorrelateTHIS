window.AppViewModel = function() {
  this.loading = ko.observable();
  this.sexFilterOptions = [];
  this.sexFilter = ko.observable();
  this.ageFilterOptions = [];
  this.ageFilter = ko.observable();


  ko.applyBinding(this);
}

$(function() {
  window.viewModel = new AppViewModel();
});
