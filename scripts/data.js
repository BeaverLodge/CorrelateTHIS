window.DataHackMash = function() {
  var self = this;

  this.surveyResponses = null;

  this.calculateQuestionAnswerFrequency = function(filter)
  {
    var questionAnswerCount = {}
    var filtered = _(self.surveyResponses).where(filter);
    var filteredResults = filtered.length;
    _(filtered).each(function(surveyResponse) {
      for (var question in surveyResponse)
      {    
        var answer = surveyResponse[question];
        var currentQuestion = questionAnswerCount[question] || {};
        currentQuestion[answer] = (currentQuestion[answer] || 0) + 1 / filteredResults;
        questionAnswerCount[question] = currentQuestion;
      }
    }); 
    return questionAnswerCount;
  }

  this.compareTwoPopulations = function(populationAFilter, populationBFilter) 
  {
    var populationAAnswerFrequency = self.calculateQuestionAnswerFrequency(populationAFilter);  
    var populationBAnswerFrequency = self.calculateQuestionAnswerFrequency(populationBFilter);  
    for (var questionKey in populationBAnswerFrequency)
    {
      console.log("question:" + questionKey)
      console.log(populationAAnswerFrequency[questionKey]);
      console.log(populationBAnswerFrequency[questionKey]);
    }
  }

  this.load = function(callback) {
    console.log("Loading data...");
    d3.csv("../data/ndshs2010.csv")
      .get(function(error, rows) {
        self.surveyResponses = rows;
        console.log("Data loaded...");
        callback();
      });  
  };
};