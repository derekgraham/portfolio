(function(module) {
  var aboutController = {};
  var projectsController = {};
  var skillsController = {};
  var experienceController = {};
  var reposController = {};

  window.Project.checkForNewRemoteData();

  aboutController.index = function() {
    $('.tab-content').hide();
    $('#about').fadeIn(2000);

  };  

  projectsController.index = function() {
    $('.tab-content').hide();
    $('#projects').fadeIn(2000);

  };	

  skillsController.index = function() {
    $('.tab-content').hide();
    $('#skills').fadeIn(2000);

  };

  experienceController.index = function() {
    $('.tab-content').hide();
    $('#experience').fadeIn(2000);
    experiences.getData(experienceView.index);

  };

  reposController.index = function() {
    // $('.tab-content').hide();
    // $('#repos').fadeIn(2000);
    $('#repos').fadeIn(2000).siblings().hide();
    repos.requestRepos(repoView.index);

  };

  module.aboutController = aboutController;
  module.projectsController = projectsController;
  module.skillsController = skillsController;
  module.experienceController = experienceController;
  module.reposController = reposController;

})(window);


