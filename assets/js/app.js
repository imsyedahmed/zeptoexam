function uploadFormData(formData) {
    $('#loader-icon').show();
    $.ajax({
        url: "127.0.0.1:8000/api/upload.php",
        type: "POST",
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        success: function (data) {
            $('#drop-area').append(data);
            $('#loader-icon').hide()
            $('#success-message-info').html("Added Successfully");
            $('#success-message-info').css("display", "inline-block");
        }
    });
}

$(document).ready(function () {
    
    $('#drop-area').on({
        dragover: function (e) {
            e.stopPropagation();
            e.preventDefault();
            return false;
        },
        dragleave: function (e) {
            e.stopPropagation();
            e.preventDefault();
            return false;
        },
        drop: function (e) {
            e.stopPropagation();
            e.preventDefault();
            var file = e.originalEvent.dataTransfer.files[0];
            var fd = new FormData();
            fd.append('file', file);
            uploadFormData(fd);
        }
    });

    $("input[type=file]").change(function () {
        var fd = new FormData();
        var files = $('#file')[0].files[0];
        fd.append('file', files);
        uploadFormData(fd);
    });

});