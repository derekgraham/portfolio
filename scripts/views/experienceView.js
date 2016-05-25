(function(module) {
  var experienceView = {};

  var ui = function() {
    var $experience = $('#experience'); 
    $experience.find('ul').empty();
    $experience.show().siblings().hide();
  };

  var render = Handlebars.compile($('#experience-template').html());
  // var renderFollowers = Handlebars.compile($('#followers-template').html());

  repoView.index = function() {
    ui();
    $('#experience .experience').append(
      experienceData.map(render)
    );
    // $('#about .followers').append(
    //   followers.all.map(renderFollowers)
    // );
  };

  module.experienceView = experienceView;
})(window);

