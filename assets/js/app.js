// all ajax function 
function uploadFormData(formData) {
    $.ajax({
        url: "http://localhost/zeptoexam/api/font.php?type=upload",
        type: "POST",
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        success: function (data) {
            var dt = JSON.parse(data);
            if (dt.status) {
                $('#success').show();
                $('#success').html(dt.msg);
                $('#fontlist').html('');
                $("head").remove("#customFontFamily");
                fontList();
            } else {
                $('#error').show();
                $('#error').html(dt.msg);
            }

        }
    });
}

/**
 * all font list 
 */
function fontList() {
    $.get("http://localhost/zeptoexam/api/font.php?type=list", function (data) {
        var dt = JSON.parse(data);
        $("head").append("<style id='customFontFamily'></style>");
        if (dt.status) {
            dt.items.forEach(itm => {
                let row = `
                    <tr>
                        <td>${itm.name}</td>
                        <td><p style="font-family: ${itm.name}">Hello World!</p></td>
                        <td><a href="javascript:deleteFont(${itm.id});" class="text-danger">Delete</a></td>
                    </tr>
                `;
                let style = `
                    @font-face {
                        font-family: '${itm.name}';
                        src: url('http://localhost/zeptoexam/api/fonts/${itm.file_name}') format('truetype');
                    }
                `;
                $("#customFontFamily").append(style);
                $('#fontlist').append(row);

            })
        }
    });
}


/**
 * all font list 
 */
 function fontGroupList() {
    $.get("http://localhost/zeptoexam/api/group.php?type=list", function (data) {
        var dt = JSON.parse(data);
        if (dt.status) {
            dt.items.forEach(itm => {
                let row = `
                    <tr>
                        <td>${itm.name}</td>
                        <td><p style="font-family: ${itm.name}">Hello World!</p></td>
                        <td><a href="javascript:deleteEdit(${itm.id});" class="text-primary">Edit</a>&nbsp;<a href="javascript:deleteFont(${itm.id});" class="text-danger">Delete</a></td>
                    </tr>
                `;
                $('#grouplist').append(row);

            })
        }
    });
}

/**
 * 
 * @param {*} id 
 */
function deleteFont(id) {
    var ct = confirm('Are you sure want to delete?');
    if (ct) {

        $.get(`http://localhost/zeptoexam/api/font.php?type=delete&id=${id}`, function (data) {
            var dt = JSON.parse(data);
            if (dt.status) {
                $('#fontlist').html('');
                $("head").remove("#customFontFamily");
                fontList();
            }
        });
    }
}

// upload input font file 
$('#page-load').on('change', 'input[type=file]', function () {
    var fd = new FormData();
    var files = $('#file')[0].files[0];
    fd.append('file', files);
    uploadFormData(fd);
});
// end upload input font file 

$(document).ready(function () {
    // upload font file 
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
    // end of upload font file 

});


