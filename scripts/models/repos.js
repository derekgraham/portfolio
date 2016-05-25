(function(module) {
  var repos = {};
  var followers = {};

  repos.all = [];
  // followers.all = [];

  repos.requestRepos = function(callback) {
    /* DONE: How would you like to fetch your repos? Someone say AJAX!?
       Don't forget to call the callback! */
    $.get('/github/users/codefellows-seattle-301d4/repos' +
       '?per_page=15' +
       '&sort=updated')
       .done(function(data) {
         repos.all = data;
       }).done(callback);
  };

  repos.with = function(attr) {
    /* DONE: This Model method filters the full repos collection based
        on a particular attribute. You could use this to filter all
        repos that have a non-zero `forks_count`, `stargazers_count`,
        or `watchers_count`. */
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
  // module.followers = followers;
})(window);
