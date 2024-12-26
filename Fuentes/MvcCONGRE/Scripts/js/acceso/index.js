

$(document).ready(function () {

    javascript: window.history.forward(1);
    $("#txtusuario").focus();

    $("#btnnext").button({
        text: true,
        icons: {
            primary: "ui-icon-seek-next"
        }
    })
    .click(function () {

        iniciarsesion();



    });
}).keypress(function (e) {
    if (e.which == 13) {
        iniciarsesion();
    }
});

function iniciarsesion() {
    var parmter = {};

    parmter.p_usuario = $("#txtusuario").val();
    parmter.p_password = $("#txtpaswword").val();

    if ($("#txtusuario").val() == "") {
        openDialogWarning("Ingrese el usuario", 380, 150);
        $("#txtusuario").focus();
        return;
    }

    if ($("#txtpaswword").val() == "") {
        openDialogWarning("Ingrese la contraseña", 380, 150);
        $("#txtpaswword").focus();
        return;
    }

    
   $.post( path + "Acceso/Validar", parmter, resultado, 'text');
}


function resultado(data) {

//    alert(data);
    if (data == "1") {
//                window.location.href = "../Registro/DocumentsCR";
        
        window.open(path + "Registro/Documentos", "_self");
    } else {
        openDialogWarning("Cuenta de acceso inválida", 380, 150);
    }
    

}