window.Questionator = function() {
  var self = this;

  this.questions = {};

  this.load = function(callback) {
    console.log("Loading questions...")
    d3.csv("../data/variabledefinitions.csv")
      .row(function(d) { return d; })
      .get(function(error, rows) {
        _(rows).each(function(row) {
          if (self.questions[row.Variable] == undefined) { self.questions[row.Variable] = { answers: {}, answerUnitValue: {} }; }
          self.questions[row.Variable].answers[row.Value] = row.Label;
          self.questions[row.Variable].answerUnitValue[row.Value] = row.UnitValue;
        });
        d3.csv("../data/variabledescriptions.csv")
          .row(function(d) {return d; })
          .get(function(error, rows) {
            _(rows).each(function(row) {
              if (self.questions[row.Variable]) {
                self.questions[row.Variable]['question'] = row.Label;
              }
            });
          console.log("Questions loaded.")
          callback();
          });
      });
  }
}
