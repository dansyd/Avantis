 var Task = {
  id: null,
  name: 'Default name',
  desc: 'Default desc',
  points: null,
  projectId: null,
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
    var serializedData = $form.serializeArray();
    serializedData.push({name: 'task[project_id]', value: self.project_id});

    // Disable the inputs for the duration of the Ajax request.
    $inputs.prop("disabled", true);

    $.ajax({
        url: "/tasks",
        type: "post",
        dataType : "json",
        data: serializedData
    }).success(function (response){
      self.id = $.parseJSON(response.task).id;
      self.name = $.parseJSON(response.task).name;
      self.desc = $.parseJSON(response.task).desc;
      self.points = $.parseJSON(response.task).points;
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
        url: "/tasks/" + id,
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
        url: "/tasks/" + id,
        type: "put",
        dataType : "json",
        data: serializedData
    }).success(function (response){
      self.name = $.parseJSON(response.task).name;
      self.desc = $.parseJSON(response.task).desc;
      self.points = $.parseJSON(response.task).points;
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
  }

 }
