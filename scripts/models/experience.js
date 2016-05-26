(function(module) {
  var experience = {};

  experience.all = [];

  experience.getData = function(callback) {
    experience.all = experienceData;
    callback();
  };



  module.experience = experience;
  // module.followers = followers;
})(window);
