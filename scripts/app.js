$(function() 
{
  console.log("Loading data...");
  answerFrequency = {}
  d3.csv("../data/ndshs2010.csv")
    .row(function(d) { return d })
    .get(function(error, rows) {
      _(rows).each(function(row) {
        for (var question in row)
        {    
          answer = row[question];
          if (answer == " ") continue;
          current = answerFrequency[question] || {};
          current[answer] = (current[answer] || 0) + 1;
          answerFrequency[question] = current;
        }
      });
      console.log("Data loaded...");
      console.log(answerFrequency);
    });
});
