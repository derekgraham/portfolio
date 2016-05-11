var projects = [];

function Projects (projectObject) {
  for(var prop in projectObject) {this[prop]= projectObject[prop];}

}

timeSinceCreated = function(createdDate){
  myDays = parseInt((new Date() - new Date(createdDate))/60/60/24/1000);

  if (myDays < 365) {
    return myDays + ' days ago';
 		
  } else return parseInt(myDays / 365) + ' years ago';

};

Projects.prototype.toHtml = function() {
  var $tempProject = $('article.template').clone();

  $tempProject.attr('data-category', this.category);
  $tempProject.find('h5').html(this.name);
  console.log(this.name);
  $tempProject.find('address a').html(this.maker);


  switch (this.mediaType ){
  case 'image':
    $tempProject.find('img').attr('src',this.mediaURL);
    $tempProject.find('.project-image-link').attr('href',this.projectURL);
    $tempProject.find('.project-image-title').html(this.title);
    $tempProject.find('.project-image').toggleClass('hidden');
    break;
  case 'video':
    console.log($tempProject.find('video source'));
    $tempProject.find('video source').attr('src',this.mediaURL['src']);
    $tempProject.find('video source').attr('type',this.mediaURL['type']);
    $tempProject.find('.project-video').toggleClass('hidden');
    break;
  case 'gallery':
    break;
  }

//   $tempProject.find('address a').attr('href',this.authorUrl);
  $tempProject.find('.project-body').html(this.description);
  $tempProject.find('time').attr('pubdate',this.publishedDate);

// // console.log($tempProject);

//   // This is a separate inclusion of the publication date as a 'title' attribute
//   // to show on hover:
  $tempProject.find('time[pubdate]').attr('title', this.publishedDate);

//   // Display the date as a relative number of "days ago":
  $tempProject.find('time').html('about ' + timeSinceCreated(this.publishedDate));

  // $tempProject.append('<hr>');

  $tempProject.removeClass('template');

  return $tempProject;
};

// Sort our data by date published, descending order
myPortfolioData.sort(function(a,b) {
  return (new Date(b.publishedDate)) - (new Date(a.publishedDate));
});

// Now iterate through our transformed collection and instantiate a new Project instance
myPortfolioData.forEach(function(ele) {
  projects.push(new Projects(ele));
});

// Append each Project in the project section
projects.forEach(function(a){
  $('#projects').append(a.toHtml());
});
