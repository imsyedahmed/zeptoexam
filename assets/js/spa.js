$(window).on('hashchange', function () {
    var page = window.location.hash != '' ? window.location.hash : "#home.html";
    $.get(page.substring(1), function (pageContent) {
        $("#page-load").html(pageContent);
        if ($('#fontlist-table').length ) {
            fontList();
        }
        if($('#grouplist-table').length ) {
            fontGroupList();
        }
        if($('.fonts_id').length){
            selectOptionsFont();
        }
    });
});

$(window).on('load', function () {
    var page;
    if (performance.getEntriesByType("navigation")[0].type == 'reload' || window.location.hash) {
        page = window.location.hash;
        if(page == ''){
            page = '#home.html';
        }
        $.get(page.substring(1), function (pageContent) {

            $("#page-load").html(pageContent);
            if($('#fontlist-table').length ) {
                fontList();
            }
            if($('#grouplist-table').length ) {
                fontGroupList();
            }
            if($('.fonts_id').length){
                selectOptionsFont();
            }

        });
        
    }
    else {
        page = 'home.html';
        $.get(page, function (pageContent) {
            $("#page-load").html(pageContent);
            if($('#fontlist-table').length ) {
                fontList();
            }
            if($('#grouplist-table').length ) {
                fontGroupList();
            }
            if($('.fonts_id').length){
                selectOptionsFont();
            }
        });
    }
}); 