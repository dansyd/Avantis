 var project = {
  createNew: function($form) {

    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");

    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    // Fire off the request
    request = $.ajax({
        url: "/projects",
        type: "post",
        dataType : "json",
        data: serializedData
    });

    // Callback handler that will be called on success
    request.success(function (response, textStatus, jqXHR){
      var newProject = "<li><h2>" + $('#project_name').val() + "</h2><p>" + $('#project_desc').val() + "</p></li>";
      $('#projects-list').append(newProject);
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Reenable the inputs
        $inputs.prop("disabled", false);
    });
  }

 }
