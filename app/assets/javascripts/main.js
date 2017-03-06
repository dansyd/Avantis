$(document).ready(function() {


  var project = Object.create(Project);


  $('#new-project').on('click', function(e) {
    e.preventDefault();
    project.get('/projects/new',function(res) {
      $('#project-dialog').html(res).show();
    });
    project.mode = 'create';
  });

  // New/Edit project
  $('#project-dialog').on('submit', '#form-project', function(e) {
    e.preventDefault();
    if (project.mode === "create") {
      project.createNew($(this), function() {
        var newProjectUI = createNewProjectElement();
        $('#projects-list').append(newProjectUI);
      });
    } else {
      project.update(project.id, $(this), function() {
        $('li[data-id="' + project.id + '"] .project-name').text(project.name);
        $('li[data-id="' + project.id + '"] .project-desc').text(project.desc);
        $('li[data-id="' + project.id + '"] .project-sprint span')
              .text(moment(project.sprint).diff(moment().startOf('day'), 'days'));
      });
    };
    resetForm($(this));
    $('#project-dialog').hide();
  });

  // Delete project with event delegation
  $('#projects-list').on('click', '.delete-project', function() {
    if (confirm('Are you sure?')) {
      project.delete(project.id, function() {
        $projectElement.remove();
      });
    }
  });

  // Edit project with event delegation for newly added projects
  $('#projects-list').on('click', '.edit-project', function() {
    var $projectElement = $(this).parent();
    project.id = $projectElement.data('id');
    project.get('/projects/'+ project.id +'/edit',function(res) {
      $('#project-dialog').html(res).appendTo($projectElement).show();
    });
    project.mode = 'edit';
  });


  function createNewProjectElement() {
    return "<li data-id='" + project.id + "'><h2 class='project-name'>" + project.name + "</h2><p class='project-name'>" + project.desc + "</p><p class='project-name'>Sprint(days left): <span>" + moment(project.sprint).diff(moment().startOf('day'), 'days') + "</span></p><button name='button' type='submit' class='edit-project'>Edit</button> <button name='button' type='submit' class='delete-project'>Delete</button></li>";
  }

  function resetForm($form) {
    $form.find('input:text, input:password, input:file, select, textarea').val('');
    $form.find('input:radio, input:checkbox')
         .removeAttr('checked').removeAttr('selected');
  }

});
