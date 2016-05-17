(function(module) {

  function Project (projectObject) {
    for(var prop in projectObject) {this[prop]= projectObject[prop];}

  }

  Project.all = [];
   
  timeSinceCreated = function(createdDate){
    var months = ['eleven','one','two','three','four','five','six','seven','eight','nine','ten', 'eleven'];
    var out = 'about ';
    myDays = parseInt((new Date() - new Date(createdDate))/60/60/24/1000);
    //fixme: do actual months from now calculation instead of 30 days.
    if (myDays < 365) {
      myMonths = parseInt(( new Date(createdDate).getMonth() - new Date().getMonth()));
      if (myDays < 30){ 
        out += myDays + ' days ago';
      } else {
        out += months[myMonths < 0 ? (12-myMonths) % 12 : Math.abs(12-myMonths % 12 - 1)] + ' months ago';
      }
    } else out += parseInt(myDays / 365) + ' years ago';
    return out;
  };

  Project.prototype.generateHtml = function (){
    this.relativePubDate = timeSinceCreated(this.publishedDate);
    var $source = $('#project-template').html();
    var filter = Handlebars.compile($source);
    $('#project-list').append(filter(this));
  };

  Project.fillProjectArray = function (rawProjectData) {  
    rawProjectData.sort(function(a,b) {
      return (new Date(b.publishedDate)) - (new Date(a.publishedDate));
    });

    rawProjectData.forEach(function(ele) {
      Project.all.push(new Project(ele));
    });

  };

  Project.loadProjectData = function () {
    if (localStorage.myPortfolioDigest && localStorage.myPortfolioData){
      Project.fillProjectArray(JSON.parse(localStorage.myPortfolioData));

    } else {
      $.getJSON({
        url: 'data/portfolio.json', 
        success: function(data, status, xhr){
          localStorage.myPortfolioData = JSON.stringify(data);
          localStorage.myPortfolioDigest = xhr.getResponseHeader('eTag');
          Project.fillProjectArray(data);
        }

      });
    }
    window.portfolioPage.initPage();
    
  };

  Project.checkForNewRemoteData = function() {
    $.ajax({
      type: 'HEAD',
      url: 'data/portfolio.json',
      success: function(data, status, xhr){
        var newDigest = xhr.getResponseHeader('eTag');
        if (newDigest !== localStorage.myPortfolioDigest){
          localStorage.clear('myPortfolioData');
          localStorage.clear('myPortfolioDigest');

        }
        Project.loadProjectData();

      }
    });
  };
  module.Project = Project;
})(window);