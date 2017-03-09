 var Project = {
  id: null,
  name: 'Default name',
  desc: 'Default desc',
  sprint: null,
  mode: '',

  // Send request for new action to get form partial from rails.
  getForm: function(url, callback) {
    $.ajax({
        url: url,
        type: "get",
        dataType : "html"
    }).success(function (response){
      callback(response);
    }).fail(function (jqXHR, textStatus, errorThrown){
      // Log the error to the console
      console.error(
        "The following error occurred: "+
        textStatus, errorThrown
      );
    });
  },

  create: function($form, callback) {
    var self = this;
    // Cache all the fields
    var $inputs = $form.find("input, select, button, textarea");

    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Disable the inputs for the duration of the Ajax request.
    $inputs.prop("disabled", true);

    $.ajax({
        url: "/projects",
        type: "post",
        dataType : "json",
        data: serializedData
    }).success(function (response){
      self.id = $.parseJSON(response.project).id;
      self.name = $.parseJSON(response.project).name;
      self.desc = $.parseJSON(response.project).desc;
      self.sprint = $.parseJSON(response.project).sprint;
      callback();
    }).fail(function (jqXHR, textStatus, errorThrown){
      // Log the error to the console
      console.error(
          "The following error occurred: "+
          textStatus, errorThrown
      );
    }).always(function () {
      // Reenable the inputs
      $inputs.prop("disabled", false);
    });
  },

  delete: function(id, callback) {
    $.ajax({
        url: "/projects/" + id,
        type: "delete",
        dataType : "json"
    }).success(function (response){
      callback();
    }).fail(function (jqXHR, textStatus, errorThrown){
      // Log the error to the console
      console.error(
          "The following error occurred: "+
          textStatus, errorThrown
      );
    });
  },

  update: function(id, $form, callback) {
    var self = this;
    // Cache all the fields
    var $inputs = $form.find("input, select, button, textarea");

    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Disable the inputs for the duration of the Ajax request.
    $inputs.prop("disabled", true);

    $.ajax({
        url: "/projects/" + id,
        type: "put",
        dataType : "json",
        data: serializedData
    }).success(function (response){
      self.name = $.parseJSON(response.project).name;
      self.desc = $.parseJSON(response.project).desc;
      self.sprint = $.parseJSON(response.project).sprint;
      callback();
    }).fail(function (jqXHR, textStatus, errorThrown){
      // Log the error to the console
      console.error(
          "The following error occurred: "+
          textStatus, errorThrown
      );
    }).always(function () {
      // Reenable the inputs
      $inputs.prop("disabled", false);
    });
  },

  addMembers: function(projectId, $form, callback) {
    var self = this;
    // Cache all the fields
    var $inputs = $form.find("input, button");

    // Disable the inputs for the duration of the Ajax request.
    $inputs.prop("disabled", true);

    var data = {
      user_ids: $form.find('input:checked').map(function(){ return $(this).val() }).get(),
      project_id: projectId
    }

    $.ajax({
        url: "/projects/member/add",
        type: "post",
        dataType : "json",
        data: data
    }).success(function (response){
      callback(response.avatars);
    }).fail(function (jqXHR, textStatus, errorThrown){
      // Log the error to the console
      console.error(
          "The following error occurred: "+
          textStatus, errorThrown
      );
    }).always(function () {
      // Reenable the inputs
      $inputs.prop("disabled", false);
    });
  },

 }
