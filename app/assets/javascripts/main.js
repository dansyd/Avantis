$(document).ready(function() {

  // *************************************
  // PROJECT
  // *************************************

  var project = Object.create(Project);

  // Edit project btn click with event delegation for newly added projects
  $('#new-project').on('click', function(e) {
    e.preventDefault();
    project.getForm('/projects/new',function(res) {
      $('#form-dialog').html('<h2>New Project</h2>' + res).show();
    });
    project.mode = 'create';
  });

  // Edit project btn click with event delegation for newly added projects
  $('#projects-list').on('click', '.edit-project', function() {
    var $projectElement = $(this).parent();
    project.id = $projectElement.data('id');
    project.getForm('/projects/'+ project.id +'/edit',function(res) {
      $('#form-dialog').html(' ' + res).appendTo($projectElement).show();
    });
    project.mode = 'edit';
  });

  // New/Edit project
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
    resetForm($(this));
    $('#form-dialog').hide();
  });

  // Delete project with event delegation
  $('#projects-list').on('click', '.delete-project', function() {
    if (confirm('Are you sure?')) {
      var $projectElement = $(this).parent();
      project.id = $projectElement.data('id');
      project.delete(project.id, function() {
        $projectElement.remove();
      });
    }
  });

  // Generate new project element
  function createNewProjectElement() {
    return "<li data-id='" + project.id + "'><h2 class='project-name'>" + project.name + "</h2><p class='project-desc'>" + project.desc + "</p><p class='project-sprint'>Sprint(days left): <span>" + moment(project.sprint).diff(moment().startOf('day'), 'days') + "</span></p><button name='button' type='submit' class='edit-project'>Edit</button> <button name='button' type='submit' class='delete-project'>Delete</button><button name='button' type='submit' id='new-task'>New Task</button></li>";
  }

  // *************************************
  // TASKS
  // *************************************

  var task = Object.create(Task)

  // New task btn click with event delegation for newly added projects
  $('#projects-list').on('click', '#new-task', function(e) {
    e.preventDefault();
    task.getForm('/tasks/new',function(res) {
      $('#form-dialog').html(res).show();
    });
    task.project_id = $(this).parent().data('id');
    task.mode = 'create';
  });

  // Edit task btn click with event delegation for newly added tasks
  $('#tasks-list').on('click', '.edit-task', function() {
    var $taskElement = $(this).parent();
    task.id = $taskElement.data('id');
    task.getForm('/tasks/'+ task.id +'/edit',function(res) {
      $('#form-dialog').html(res).appendTo($taskElement).show();
    });
    task.mode = 'edit';
  });

  // New/Edit task
  $('#form-dialog').on('submit', '#task-form', function(e) {
    e.preventDefault();
    if (task.mode === "create") {
      task.create($(this), function() {
        var newTaskUI = createNewTaskElement();
        $('#projects-list li[data-id="' + task.project_id + '"]').append(newTaskUI);
      });
    } else {
      task.update(task.id, $(this), function() {
        $('#tasks-list li[data-id="' + task.id + '"] .task-name').text(task.name);
        $('#tasks-list li[data-id="' + task.id + '"] .task-desc').text(task.desc);
        $('#tasks-list li[data-id="' + task.id + '"] .task-points').text('Points: ' + task.points);
      });
    };
    resetForm($(this));
    $('#form-dialog').hide();
  });

  // Delete task with event delegation
  $('#projects-list').on('click', '.delete-task', function() {
    if (confirm('Are you sure?')) {
      var $taskElement = $(this).parent();
      task.id = $taskElement.data('id');
      task.delete(task.id, function() {
        $taskElement.remove();
      });
    }
  });

  // Generate new task element
  function createNewTaskElement() {
    return "<li data-id='" + task.id + "'><h3 class='task-name'>" + task.name + "</h3><p class='task-desc'>" + task.desc + "</p><p class='task-points'>Points: " + task.points + "</p><button name='button' type='submit' class='edit-project'>Edit</button> <button name='button' type='submit' class='delete-project'>Delete</button></li>";
  }

  // *************************************
  // HELPERS
  // *************************************

  // Close form dialog
  $('#form-dialog').on('click', '#dialog-cancel-btn', function() {
    console.log('asdds');
    $('#form-dialog').hide();
    resetForm($('#form-dialog'));
  });

  // clear all the form elements
  function resetForm($form) {
    $form.find('input:text, input:password, input:file, select, textarea').val('');
    $form.find('input:radio, input:checkbox')
         .removeAttr('checked').removeAttr('selected');
  }

});
