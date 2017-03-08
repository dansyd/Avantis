$(document).ready(function() {

  // *************************************
  // PROJECT
  // *************************************

  var project = Object.create(Project);

  // New project btn click with event delegation for newly added projects
  $('#new-project').on('click', function(e) {
    e.preventDefault();
    project.getForm('/projects/new',function(res) {
      $('#form-dialog').html('<h2>New Project</h2>' + res);
      showForm();
    });
    project.mode = 'create';
  });

  // Edit project btn click with event delegation for newly added projects
  $('.projects-wrapper').on('click', '.edit-project', function() {
    var $projectElement = $(this).closest('li.project-item');
    project.id = $projectElement.data('id');
    project.getForm('/projects/'+ project.id +'/edit',function(res) {
      $('#form-dialog').html('<h2>Edit Project</h2>' + res);
      showForm();
    });
    project.mode = 'edit';
  });

  // Create/Edit project
  $('#form-dialog').on('submit', '#project-form', function(e) {
    e.preventDefault();
    if (project.mode === "create") {
      project.create($(this), function() {
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
    $('.form-dialog-container').fadeOut(500, function() {
      $('#form-dialog').empty();
    });
  });

  // Delete project with event delegation
  $('.projects-wrapper').on('click', '.delete-project', function() {
    if (confirm('Are you sure?')) {
      var $projectElement = $(this).closest('li.project-item');
      project.id = $projectElement.data('id');
      project.delete(project.id, function() {
        $projectElement.remove();
        // check if no projects, give a message
        if ($('#projects-list li').length === 0) {
          $('#projects-list').remove();
          $('#new-project').before('<h2>No projects</h2>');
        }
      });
    }
  });

  // Generate new project element
  function createNewProjectElement() {
    var $projectsList = $('#projects-list');
    if ($projectsList.length === 0) {
      $('.projects-wrapper h2').remove();
      $('#new-project').before('<ul id="projects-list"></ul>');
    };
    return "<li data-id='" + project.id + "' class='project-item'>"
      + "<h2 class='project-name'>" + project.name + "</h2>"
      + "<p class='project-desc'>" + project.desc + "</p>"
      + "<p class='project-sprint'>Sprint(days left): <span>" + moment(project.sprint).diff(moment().startOf('day'), 'days') + "</span></p>"
      + "<button name='button' type='submit' class='edit-project'>Edit</button>"
      + " <button name='button' type='submit' class='delete-project'>Delete</button>"
      + " <button name='button' type='submit' class='add-member-projec'>Add Member</button>"
      + " <button name='button' type='submit' id='new-task'>New Task</button>"
    + "</li>";
  }

  // *************************************
  // TASKS
  // *************************************

  var task = Object.create(Task)

  // New task btn click with event delegation for newly added projects
  $('.projects-wrapper').on('click', '#new-task', function(e) {
    e.preventDefault();
    task.getForm('/tasks/new',function(res) {
      $('#form-dialog').html('<h2>New Task</h2>' + res);
      showForm();
    });
    task.project_id = $(this).closest('li.project-item').data('id');
    task.mode = 'create';
  });

  // Edit task btn click with event delegation for newly added tasks
  $('.projects-wrapper').on('click', '.edit-task', function() {
    var $taskElement = $(this).closest('li.task-item');
    task.id = $taskElement.data('id');
    task.getForm('/tasks/'+ task.id +'/edit',function(res) {
      $('#form-dialog').html('<h2>Edit Task</h2>' + res);
      showForm();
    });
    task.mode = 'edit';
  });

  // Create/Edit task
  $('#form-dialog').on('submit', '#task-form', function(e) {
    e.preventDefault();
    if (task.mode === "create") {
      task.create($(this), function() {
        var $projectParent = $('#projects-list li[data-id="' + task.project_id + '"]');
        var newTaskUI = createNewTaskElement($projectParent);
        $projectParent.find('.tasks-list').append(newTaskUI);
      });
    } else {
      task.update(task.id, $(this), function() {
        $('.tasks-list li[data-id="' + task.id + '"] .task-name').text(task.name);
        $('.tasks-list li[data-id="' + task.id + '"] .task-desc').text(task.desc);
        $('.tasks-list li[data-id="' + task.id + '"] .task-points').text('Points: ' + task.points);
      });
    };
    $('.form-dialog-container').fadeOut(500, function() {
      $('#form-dialog').empty();
    });
  });

  // Delete task with event delegation
  $('.projects-wrapper').on('click', '.delete-task', function() {
    if (confirm('Are you sure?')) {
      var $taskElement = $(this).closest('li.task-item');
      task.id = $taskElement.data('id');
      task.delete(task.id, function() {
        if ($taskElement.closest('ul.tasks-list').children().length === 1) {
          $taskElement.closest('ul.tasks-list').remove();
        } else {
          $taskElement.remove();
        }
      });
    }
  });

  // Generate new task element
  function createNewTaskElement($projectParent) {
    if ($projectParent.find('ul').length === 0) {
      var $tasksList = $('<ul class="tasks-list"></ul>');
      $projectParent.find('#new-task').before($tasksList);
    };
    return "<li data-id='" + task.id + "' class='task-item'>"
      + "<h3 class='task-name'>" + task.name + "</h3>"
      + "<p class='task-desc'>" + task.desc + "</p>"
      + "<p class='task-points'>Points: " + task.points + "</p>"
      + "<button name='button' type='submit' class='edit-task'>Edit</button>"
      + " <button name='button' type='submit' class='delete-task'>Delete</button>"
    + "</li>";
  }

  // *************************************
  // HELPERS
  // *************************************

  // Close form dialog
  $('#form-dialog').on('click', '#dialog-cancel-btn', function() {
    $('.form-dialog-container').fadeOut(100, function() {
      $('#form-dialog').empty();
    });
  });

  function showForm() {
    $('.form-dialog-container').css({opacity: 0, display: 'flex'}).animate({opacity: 1}, 100);
  }

});
