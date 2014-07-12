window.DataHackMash = function() {
  var self = this;

  this.surveyResponses = null;

  this.calculateQuestionAnswerFrequency = function()
  {
    var questionAnswerFrequency = {}
    _(self.surveyResponses).each(function(surveyResponse) {
      for (var question in surveyResponse)
      {    
        var answer = surveyResponse[question];
        if (answer == " ") continue;
        var currentQuestion = questionAnswerFrequency[question] || {};
        currentQuestion[answer] = (currentQuestion[answer] || 0) + 1;
        questionAnswerFrequency[question] = currentQuestion;
      }
    }); 
    return questionAnswerFrequency;
  }


  this.load = function(callback) {
    console.log("Loading data...");
    d3.csv("../data/2013-state-of-the-service-employee-census-data-snip.csv")
      .get(function(error, rows) {
        self.surveyResponses = rows;
        console.log("Data loaded...");
        callback();
      });  
  };
};