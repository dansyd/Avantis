$(document).ready(function() {

  $("#toggle").click(function() {
    $(this).toggleClass('on');
    $("#resize").toggleClass("active");
  });


  // *************************************
  // PROJECT
  // *************************************

  var project = Object.create(Project);

  // New project btn click with event delegation for newly added projects
  $('#new-project').on('click', function(e) {
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
    closeForm();
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
    var $projectItems = $('#projects-list li');
    if ($projectItems.length === 0) {
      $('.projects-wrapper h2').remove();
      $('#new-project').before('<ul id="projects-list" class="projects-list"></ul>');
    };
    return "<li data-id='" + project.id + "' class='project-item'>"
      + "<div class='project-item-wrapper'>"
        + "<h2 class='project-name'>" + project.name + "</h2>"
        + "<p class='project-desc'>" + project.desc + "</p>"
        + "<p class='project-sprint'>Sprint (days left): <span>" + moment(project.sprint).diff(moment().startOf('day'), 'days') + "</span></p>"
        + "<div class='project-team'><button name='button' type='submit' class='add-member-project'>+</button></div>"
        + "<button name='button' type='submit' class='edit-project'>Edit</button>"
        + " <button name='button' type='submit' class='delete-project'>Delete</button>"
      + "</div>"
      + "<button name='button' type='submit' id='new-task' class='new-task-btn'>New Task</button>"
    + "</li>";
  };

  // *************************************
  // MEMBERS - PROJECT
  // *************************************


  // Add member to project btn click with event delegation
  $('.projects-wrapper').on('click', '.add-member-project', function() {
    project.id = $(this).closest('li.project-item').data('id');
    project.getForm('/projects/' + project.id + '/member/add',function(res) {
      $('#form-dialog').html(res);
      showForm();
    });
  });

  // Save new members in db
  $('#form-dialog').on('submit', '#add-member-form', function(e) {
    e.preventDefault();
    project.addMembers(project.id, $(this),function(res) {
    var $projectItem = $('li[data-id="' + project.id + '"]');
    var $teamElement = $projectItem.find('p.project-team');
    var $newMember = '';
    $(res).each(function(index, avatarUrl) {
      $newMember += '<div class="team-member-avatar" style="background-image: url(' + avatarUrl +');"></div>';
    });
    $projectItem.find('button.add-member-project').before($newMember);
    closeForm();
    });
  });

  // *************************************
  // TASKS
  // *************************************

  var task = Object.create(Task)

  // New task btn click with event delegation for newly added projects
  $('.projects-wrapper').on('click', '#new-task', function(e) {
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
    closeForm();
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

  // Reopen a completed task
  $('.reopen-task').on('click', function() {
    var $taskElement = $(this).closest('li.task-item');
    task.id = $taskElement.data('id');
    task.reopen(function(memberName) {
      var $taskStatus = '<p class="task-status">Taken by: ' + memberName + '</p>';
      $taskElement.find('.task-status').remove();
      $taskElement.find('.task-points').after($taskStatus);
      $taskElement.find('.reopen-task').remove();
    });
  });

  // Generate new task element
  function createNewTaskElement($projectParent) {
    if ($projectParent.find('ul.tasks-list').length === 0) {
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
  };

  // *************************************
  // MEMBERS - TASK
  // *************************************

  // Take task
  $('.tasks-list').on('click', '.take-task', function() {
    task.id = $(this).closest('li.task-item').data('id');
    var $taskControls = $(this).closest('.task-controls');
    task.take(function() {
      var $newControls = '<button name="button" type="submit" class="release-task">Release</button> '
      + '<button name="button" type="submit" class="complete-task">Mark as complete</button>';
      $taskControls.empty().append($newControls);
    });
  });

  // Release task
  $('.tasks-list').on('click', '.release-task', function() {
    task.id = $(this).closest('li.task-item').data('id');
    var $taskControls = $(this).closest('.task-controls');
    task.release(function() {
      var $newControls = '<button name="button" type="submit" class="take-task">Take</button>';
      $taskControls.empty().append($newControls);
    });
  });

  // Complete task
  $('.tasks-list').on('click', '.complete-task', function() {
    task.id = $(this).closest('li.task-item').data('id');
    var $taskControls = $(this).closest('.task-controls');
    task.complete(function() {
      var $newControls = '<h3>Completed</h3>';
      $taskControls.empty().append($newControls);
    });
  });

  // *************************************
  // HELPERS
  // *************************************

  // Close form dialog
  $('#form-dialog').on('click', '#dialog-cancel-btn', function() {
    closeForm();
  });

  // UI feedback when selecting available users
  $('#form-dialog').on('click','.team-member-label', function() {
    $(this).find('div').toggleClass('team-member-selected');
  });

  function showForm() {
    $('.form-dialog-container').css({opacity: 0, display: 'flex'}).animate({opacity: 1}, 100);
  };

  function closeForm() {
    $('.form-dialog-container').fadeOut(100, function() {
      $('#form-dialog').empty();
    });
  };

});
