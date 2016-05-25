(function(module) {
  var experiences = {};

  experiences.all = [];

  experiences.getData = function(callback) {
    experiences.all = experienceData;
    callback();
  };



  module.experiences = experiences;
  // module.followers = followers;
})(window);
