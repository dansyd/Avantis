$(document).ready(function() {

  $('#new-project').on('click', function() {
    $('#new-project-dialog').show();
  });


  var request;
  $('#form-new-project').on('submit', function(e) {
    e.preventDefault();
    var newProject = Object.create(Project)
    newProject.createNew($(this));
  });


});
