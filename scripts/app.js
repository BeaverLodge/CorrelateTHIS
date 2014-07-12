$(function() 
{
  var masher = new DataHackMash();

  console.log("Loading questions...");
  questions = {};

  d3.csv("../data/variabledefinitions.csv")
    .row(function(d) { return d; })
    .get(function(error, rows) {
      _(rows).each(function(row) {
        if (questions[row.Variable] == undefined) {
          questions[row.Variable] = {answers: [{value: row.Value, label: row.Label}]};
        } else {
          questions[row.Variable].answers.push({value: row.Value, label: row.Label});
        }
      });
    d3.csv("../data/variabledescriptions.csv")
      .row(function(d) {return d; })
      .get(function(error, rows) {
        _(rows).each(function(row) {
          if (questions[row.Variable]) {
            questions[row.Variable]['question'] = row.Label;
          }
        });
      console.log("Questions loaded...");
      console.log(questions);
      masher.load(function() {
        masher.compareTwoPopulations({ Alcohol: '2' }, {}, questions);
      });
      });
    });
});
