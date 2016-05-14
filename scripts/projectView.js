// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var portfolioPage = {};

portfolioPage.populateFilter = function(template_id) {
  var $source = $(template_id).html();
  var filter = Handlebars.compile($source);
  return filter({myProjects: projects});
};


Handlebars.registerHelper('list', function(items, options) {
  var out = '';
  for(var i=0, l = items.length; i<l; i++) {
    // below works if we have <option value" in the template instead of here.
    // out = out + options.fn(items[i]);
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
      // $('article.template').hide();

    }
  });

};

portfolioPage.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function() {
    var val = $(this).attr('data-content');
    console.log(val);
    $('.tab-content').hide();
    $('.tab-content').each(function(index) {
      if ($(this).attr('id') === val) {
        $(this).fadeIn(2000);
      }
    });
  });
  $('.top').on('click', '.logo', function() {
    $('.main-nav .tab:first').click();

  });


  $('.main-nav .tab:first').click();
};

//TODO: update my code to handle this situation 
// 1. add longer data to data.js
// 2. show/hide longer and shorter versions

portfolioPage.setTeasers = function() {
    // Hide any elements after the first 2 (<p> tags in this case)
    // in any artcile body:
  $('.project-body *:nth-of-type(n+2)').hide();

    // TODO:DONE Add a delegated event handler to reveal the remaining paragraph.
    //       When a .read-on link is clicked, we can:
    //        1. Prevent the default action of a link (to navigate away from the page).
    //        2. Reveal everything in that particular article now.
    //        3. Hide that read-on link!
    //       Ideally, we should attach this as just 1 event handler
    //       on the #articles section, and let it process any .read-on clicks that
    //       happen.
  $('#projects').on('click', '.read-on', function(event) {
    event.preventDefault();
    console.log($(this).text());
    if ($(this).text() === 'Show Less') {
      $('.project-body *:nth-of-type(n+2)').hide();
      $(this).html('Read on &rarr;');
    } else {
      $(this).text('Show Less');
      $(this).parent().find('.project-body *:nth-of-type(n+2)').fadeIn(2000);
    }
  });
};

$(document).ready(function() {
  $('#category-filter').append(portfolioPage.populateFilter('#category-filter-template'));
  // portfolioPage.populateFilter();
  portfolioPage.handleCategoryFilter();
  portfolioPage.handleMainNav();
    // portfolioPage.setTeasers();
});



