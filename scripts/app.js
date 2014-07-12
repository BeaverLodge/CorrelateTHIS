$(function() 
{
  var masher = new DataHackMash();
  masher.load(function() {
    console.log(masher.calculateQuestionAnswerFrequency());
  });
});