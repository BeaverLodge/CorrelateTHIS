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
        var answerKey = surveyResponse[question];
        var currentQuestion = questionAnswerCount[question] || {};
        currentQuestion[answerKey] = (currentQuestion[answerKey] || 0) + 1 / filteredResults;
        currentQuestion["Count" + answerKey] = (currentQuestion["Count" + answerKey] || 0) + 1;
        currentQuestion["Portion" + answerKey] = currentQuestion["Count" + answerKey] / self.surveyResponses.length;
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
      if (answerKey.indexOf("Count") != -1) continue;
      if (answerKey.indexOf("Portion") != -1) continue;
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
    var blah = {};
    for (var questionKey in populationBAnswerFrequency)
    {
      if (!questions[questionKey]) continue;
      // console.log("\n\n" + questions[questionKey].question);
      var unionOfAnswerKeys = _.union(_(populationAAnswerFrequency).keys(), _(populationBAnswerFrequency).keys())
      var distinctAnswerKeys = _.uniq(unionOfAnswerKeys);
      var populationAMean = self.meanUnitValueForQuestion(populationAAnswerFrequency[questionKey], questions[questionKey]);
      var populationBMean = self.meanUnitValueForQuestion(populationBAnswerFrequency[questionKey], questions[questionKey]);

      blah[questionKey] = {
        populationAMean: populationAMean,
        populationBMean: populationBMean,
        populationAAnswerFrequency: populationAAnswerFrequency,
        populationBAnswerFrequency: populationBAnswerFrequency
      };

      // console.log("Mean of " + populationAMean.toFixed(3) + " vs " + populationBMean.toFixed(3));
      // for (var answerKey in distinctAnswerKeys)
      // {
      //   if (!questions[questionKey].answers[answerKey]) continue;
      //   console.log(questions[questionKey].answers[answerKey] 
      //       + ": " + (populationAAnswerFrequency[questionKey][answerKey] || 0).toFixed(3)
      //       + " vs " + (populationBAnswerFrequency[questionKey][answerKey] || 0).toFixed(3));
      // }
    }
    return blah;
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
