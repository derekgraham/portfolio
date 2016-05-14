var projects = [];

function Projects (projectObject) {
  for(var prop in projectObject) {this[prop]= projectObject[prop];}

}

timeSinceCreated = function(createdDate){
  var out = 'about ';
  myDays = parseInt((new Date() - new Date(createdDate))/60/60/24/1000);

  if (myDays < 365) {
    out += myDays + ' days ago';
 		
  } else out += parseInt(myDays / 365) + ' years ago';
  return out;
};

Projects.prototype.generateHtml = function (){

  Handlebars.registerHelper('if', function(conditional, options) {
    if(conditional) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });
  this.relativePubDate = timeSinceCreated(this.publishedDate);
  var $source = $('#project-template').html();
  var filter = Handlebars.compile($source);
  $('#project-list').append(filter(this));
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
  // $('#projects').append(a.toHtml());
  a.generateHtml();
});

