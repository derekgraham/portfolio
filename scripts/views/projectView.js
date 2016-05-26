(function(module) {

  // Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
  var portfolioPage = {};

  portfolioPage.populateFilter = function(template_id) {
    var $source = $(template_id).html();
    var filter = Handlebars.compile($source);
    return filter({myProjects: Project.all});
  };

  Handlebars.registerHelper('cat_list', function(items, options) {
    var out = '';
    for(var i=0, l = items.length; i<l; i++) {
      if (!out.includes(options.fn(items[i]))){
        out = out + '<option value="' + options.fn(items[i]) + '">'+ options.fn(items[i]) + '</option value>';
      }
    }
    return out;
  });

  portfolioPage.handleCategoryFilter = function() {
    $('#category-filter').on('change', function() {
      if ($(this).val()) {
        $('article').hide();
        var val = $(this).val();
        $('article').each(function() {
          if ($(this).attr('data-category') === val) {
            $(this).fadeIn(1000);
          }
        });

      } else {

        $('article').show();
      }
    });

  };


  //fixme: create some longer bogus data and get show more / less working
  portfolioPage.setTeasers = function() {
      // Hide any elements after the first 2 (<p> tags in this case)
      // in any artcile body:
    $('.project-body *:nth-of-type(n+2)').hide();

    $('#projects').on('click', '.read-on', function(event) {
      event.preventDefault();
      if ($(this).text() === 'Show Less') {
        $('.project-body *:nth-of-type(n+2)').hide();
        $(this).html('Read on &rarr;');
      } else {
        $(this).text('Show Less');
        $(this).parent().find('.project-body *:nth-of-type(n+2)').fadeIn(2000);
      }
    });
  };

  portfolioPage.initPage = function (){
    Project.all.forEach(function(a){
      a.generateHtml();
    });

    $('#category-filter').append(portfolioPage.populateFilter('#category-filter-template'));
    portfolioPage.handleCategoryFilter();
  };
  module.portfolioPage = portfolioPage;
})(window);
