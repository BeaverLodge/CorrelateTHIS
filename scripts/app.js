$(function() 
{
  var questionator = new Questionator();
  questionator.showMeThem(function(questions) {
    var masher = new DataHackMash();
      masher.load(function() {
        masher.compareTwoPopulations({ Alcohol: '1' }, {}, questions);
      });
  });
});
