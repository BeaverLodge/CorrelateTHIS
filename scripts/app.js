$(function() 
{
  window.questionator = new Questionator();
  window.masher = new DataHackMash();

  var tasks = [questionator.load, masher.load]

  async.parallel(tasks, function(err) {
    masher.compareTwoPopulations({ Alcohol: '1' }, {}, questionator.questions);
  });
});
