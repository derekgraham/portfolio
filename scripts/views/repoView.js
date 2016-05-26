(function(module) {
  var repoView = {};

  var ui = function() {
    var $repos = $('#repos');
    $repos.find('ul').empty();
    // $repos.show().siblings().hide();
  };

  var render = Handlebars.compile($('#repo-template').html());
  // var renderFollowers = Handlebars.compile($('#followers-template').html());

  repoView.index = function() {
    ui();
    $('#repos .repos').append(
      repos.with('name').map(render)
    );
    // $('#about .followers').append(
    //   followers.all.map(renderFollowers)
    // );
  };

  module.repoView = repoView;
})(window);
