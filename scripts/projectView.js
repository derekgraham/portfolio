// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var portfolioPage = {};

portfolioPage.populateFilter = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {

      var val = $(this).attr('data-category');
      var optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

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
      $('article.template').hide();

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

// TODO:DONE Call all of the above functions, once we are sure the DOM is ready.
$(document).ready(function() {
  portfolioPage.populateFilter();
  portfolioPage.handleCategoryFilter();
  portfolioPage.handleMainNav();
    // portfolioPage.setTeasers();
});
