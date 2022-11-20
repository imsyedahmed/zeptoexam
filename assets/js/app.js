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
                var row = `
                    <tr>
                        <td>${itm.name}</td>
                        <td><p style="font-family: ${itm.name}">Hello World!</p></td>
                        <td><a href="javascript:deleteFont(${itm.id});" class="text-danger">Delete</a></td>
                    </tr>
                `;
                var style = `
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

function selectOptionsFont() {
    $.get("http://localhost/zeptoexam/api/font.php?type=list", function (data) {
        var dt = JSON.parse(data);
        if (dt.status) {
            dt.items.forEach(itm => {
                var opt = `<option value="${itm.id}">${itm.name}</option>`;
                $('.fonts_id').append(opt);
            });
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
            dt.groups.forEach(itm => {
                var dfiles = JSON.parse(itm.files);
                var files = '';
                var count = 0;
                dfiles.forEach(jst => {
                    files += jst.name + ', '
                    count++;
                });
                var row = `
                    <tr>
                        <td>${itm.name}</td>
                        <td>${files}</td>
                        <td>${count}</td>
                        <td><a href="javascript:deleteGroup(${itm.id});" class="text-danger">Delete</a></td>
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

/**
 * 
 * @param {*} id 
 */
 function deleteGroup(id) {
    var ct = confirm('Are you sure want to delete?');
    if (ct) {
        $.get(`http://localhost/zeptoexam/api/group.php?type=delete&id=${id}`, function (data) {
            var dt = JSON.parse(data);
            if (dt.status) {
                $('#grouplist').html('');
                fontGroupList();
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

$(document).on("click", "#addmore", function () {
    var $clone = $('#clone-row:eq(0)').clone();
    $clone.find('.fonts_id').val('');
    $clone.find('.fonts_name').val('');
    $('#nlist').append($clone);
});

$(document).on("change", ".fonts_id", function () {
    var $fid = $(this).val();
    if ($fid != '') {
        var $fname = $(this).find('option:selected').text();
        $(this).parents('tr').find('.fonts_name').val($fname);
    }
});

$(document).on("submit", "#group-font", function (e) {
    e.preventDefault();
    var form = $(this);
    var formdata = form.serialize();
    $.post("http://localhost/zeptoexam/api/group.php?type=new", formdata, function (data) {
        var dt = JSON.parse(data);
        if (dt.status) {
            $('#success').show();
            $('#success').html(dt.msg);
        } else {
            $('#error').show();
            $('#error').html(dt.msg);
        }
    });
});

