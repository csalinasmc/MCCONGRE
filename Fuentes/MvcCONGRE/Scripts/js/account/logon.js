$(function() {

//$("#tabs_LogOn").tabs();

//$('#tabs_LogOn').tabs('paging', { cycle: true, follow: true });
//$('#tabs_LogOn').tabs({ remote: true });
//$('#tabs_LogOn').tabs({ event: 'mouseover' });
});
window.onload = function() {
    //myLayout.hide('west');
    //myLayout.show('west');
};
$(window).load(function() {
    //myLayout.hide('west');
    //myLayout.show('west');
});

$(document).ready(function() {

$("#west").remove();
$("#north2").remove();
$("#north").remove();

    $("#tabs_LogOn").tabs();
    $("#txtuser").focus();
    $("#txtuser").keypress(function(event) {
        if (event.keyCode == 13) { ValidarLogeo('U'); }
    });
    $("#txtpass").keypress(function(event) {
        if (event.keyCode == 13) { ValidarLogeo('U'); }
    });

    $("#btningreso").button({ icons: { secondary: "ui-icon-locked"} });
    $('#btningreso').click(function() { ValidarLogeo('U'); });

    $("#btningresodni").button({ icons: { secondary: "ui-icon-locked"} });
    $('#btningresodni').click(function() { ValidarLogeo('T'); });
    $("#txtdni").keypress(function(event) {
        if (event.keyCode == 13) { ValidarLogeo('T'); }
    });
    //$("#passwordtrab").keypress(function(event) {
    //    if (event.keyCode == 13) { ValidarLogeo('T'); }
    //});
});

function ValidarLogeo(vtp) {
    
    var user = $('#txtuser').val();
    var pass = $('#txtpass').val();
    var vdni = $('#txtdni').val();
    //var vpasswordtrab = $('#passwordtrab').val();

    var parameters = { user: escape(user), passwd: escape(pass), dni: vdni, tp: vtp };
    var _post = $.post(path + "account/vallogon/", parameters);

    _post.success(function(requestData) {
        if (vtp == 'U')
            $("#div_resp_logeo").html(requestData);
        else
            $("#div_resp_logeodni").html(requestData);
    });
}
