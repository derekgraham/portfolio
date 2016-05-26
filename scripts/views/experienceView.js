(function(module) {
  var experienceView = {};

  Handlebars.registerHelper('exp_list', function(items, options) {
    var out = '';
    for(var i=0, l = items.length; i<l; i++) {
      if (!out.includes(options.fn(items[i]))){
        out = out + '<option value="' + options.fn(items[i]) + '">'+ options.fn(items[i]) + '</option value>';
      }
    }
    return out;
  });

  var ui = function() {
    var $experience = $('#experience');
    $experience.find('ul').empty();
    // $experience.show().siblings().hide();
  };

  var render = Handlebars.compile($('#experience-template').html());
  // var renderFollowers = Handlebars.compile($('#followers-template').html());

  experienceView.index = function() {
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
