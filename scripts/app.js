$(function() 
{
  var masher = new DataHackMash();
  masher.load(function() {
    masher.compareTwoPopulations({}, { Alcohol: '2' });
  });
});