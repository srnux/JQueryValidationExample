(function ($, win, doc) {
    "use strict";
    var jqueryValidationRules = {};

    // file path validation added
    // valid are windows folders and network folders c:\temp, c:\temp\any\, //temp/any
    $.validator.addMethod("folderpath", function (value, element) {
        return this.optional(element) || /^(\\(\\[^\s\\]+)+|([A-Za-z]:(\\)?|[A-z]:(\\[^\s\\]+)+))(\\)?$/.test(value);
    }, "Incorect file path");
    
    jqueryValidationRules.UTIL =
    {
        setupFormValidation: function (formToValidate) {
            //form validation rules  
            $(formToValidate).validate({
                rules: {
                    Url: {
                        required:true,
                        url:true
                    },
                    Username: { // username is required and its lenght must be between 6 and 40 chars
                        required: true,
                        minlength: 6,
                        maxlength: 40
                    },
                    SaveToFolder: {
                        required: true,
                        folderpath: true
                    }
                },
                messages: {
                    Url: {
                        required: "Url is required",
                        url: "Please insert valid Url."
                    },
                    Username: {
                        required: "Please input Username.",
                        minlength: "Username must contain more than {0} characters.",
                        maxlength: "Username cannot contain more than {0} characters."
                    },
                    SaveToFolder: {
                        required:"Folder path is required.",
                        folderpath: "Please enter valid Windows file or network path."
                    }
                },
                showErrors: function (errorMap, errorList) {
                    errorList.forEach(function (error) {
                        $(error.element).css("border", "2px solid #f0a2a5");//draw red border around
                    });
                    this.defaultShowErrors();
                },
                onfocusout: function (element) {
                    // validate element on focus lost
                    if ($(element).valid()) {
                        $(element).css("border", "none");//remove red border
                    }
                },
                ignore: [], // validate hidden fields
                onkeyup: false //turn off auto validate whilst typing
            });
        }
    };

    // 1st option - uncomment to autoexecute function on document ready
    // when the dom has loaded setup form validation rules
    $(function() {
        var formToValidate = $(doc).find("form");
        for (var i = 0; i < formToValidate.length; i++) {
            // apply validations to all forms
            jqueryValidationRules.UTIL.setupFormValidation(formToValidate[i]);
        }
    });

    // 2nd option, call this as a jquery plugin
    // Example: $("#settingsForm").setupFormValidation() in doc ready of View
    $.extend($.fn, {
        setupFormValidation: function () {
            
            //form validation rules - same as above
            this.validate({
                rules: {
                    Url: {
                        required:true,
                        url:true
                    },
                    Username: { // username is required and its lenght must be between 6 and 40 chars
                        required: true,
                        minlength: 6,
                        maxlength: 40
                    },
                    SaveToFolder: {
                        required: true,
                        folderpath: true
                    }
                },
                messages: {
                    Url: {
                        required: "Url is required",
                        url: "Please insert valid Url."
                    },
                    Username: {
                        required: "Please input Username.",
                        minlength: "Username must contain more than {0} characters.",
                        maxlength: "Username cannot contain more than {0} characters."
                    },
                    SaveToFolder: {
                        required:"Folder path is required.",
                        folderpath: "Please enter valid Windows file or network path."
                    }
                },
                showErrors: function (errorMap, errorList) {
                    errorList.forEach(function (error) {
                        $(error.element).css("border", "2px solid #f0a2a5");//draw red border around
                    });
                    this.defaultShowErrors();
                },
                onfocusout: function (element) {
                    // validate element on focus lost
                    if ($(element).valid()) {
                        $(element).css("border", "none");//remove red border
                    }
                },
                ignore: [], // validate hidden fields
                onkeyup: false //turn off auto validate whilst typing
            });
        }
    });

    // Extend function that gets all the properties from the source and adds them to destination
    Object.extend = function (destination, source) {
        for (var property in source)
            destination[property] = source[property];
        return destination;
    };

})(jQuery, window, document);