page('/', projects);
page('/about', about);
page('/skills', skills);
page('/experience', experience);
page();

function projects() {
  console.log('Projects Route');
  projectsController.index();
}

function about() {
  console.log('About route');
  aboutController.index();

}

function skills() {
  skillsController.index();

}

function experience() {
  experienceController.index();
}