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

  this.meanUnitValueForQuestion = function(answerFrequency, questionDefinition)
  {
    var sumOfUnitValues = 0;  
    var numResponses = 0;
    for (var answerKey in answerFrequency)
    {
      sumOfUnitValues += answerFrequency[answerKey] * questionDefinition.answerUnitValue[answerKey];
      numResponses += answerFrequency[answerKey];
    }
    return sumOfUnitValues / numResponses;
  }

  // WHICH DRUGS

  this.compareTwoPopulations = function(populationAFilter, populationBFilter, questions) 
  {
    var populationAAnswerFrequency = self.calculateQuestionAnswerFrequency(populationAFilter);  
    var populationBAnswerFrequency = self.calculateQuestionAnswerFrequency(populationBFilter);  
    for (var questionKey in populationBAnswerFrequency)
    {
      if (!questions[questionKey]) continue;
      console.log("\n\n" + questions[questionKey].question);
      var unionOfAnswerKeys = _.union(_(populationAAnswerFrequency).keys(), _(populationBAnswerFrequency).keys())
      var distinctAnswerKeys = _.uniq(unionOfAnswerKeys);
      var populationAAverage = self.meanUnitValueForQuestion(populationAAnswerFrequency[questionKey], questions[questionKey]);
      var populationBAverage = self.meanUnitValueForQuestion(populationBAnswerFrequency[questionKey], questions[questionKey]);

      console.log("Mean of " + populationAAverage.toFixed(3) + " vs " + populationBAverage.toFixed(3));
      for (var answerKey in distinctAnswerKeys)
      {
        if (!questions[questionKey].answers[answerKey]) continue;
        console.log(questions[questionKey].answers[answerKey] 
            + ": " + (populationAAnswerFrequency[questionKey][answerKey] || 0).toFixed(3)
            + " vs " + (populationBAnswerFrequency[questionKey][answerKey] || 0).toFixed(3));

      }
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
