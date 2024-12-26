OnEnterKeyBusPerson = function() { FunctionClickresultBusPerson(fnc); };
function openDialogBusPerson(fnc) {
      pbuttonsBusPerson = { 'Aceptar': function() { FunctionClickresultBusPerson(fnc); }, 'Cancelar': function() { closeDialog("jqDialogBusPerson"); } }

      openDialogData('util/buspersona', {}, 880, 510, "Buscador de Personas", '#jqDialogBusPerson', null, pbuttonsBusPerson);
}
FunctionClickresultBusPerson = function(fnc) {
    var gsr = $("#tblResultBuspersona").jqGrid('getGridParam', 'selrow');
    if (gsr) {
        var row = jQuery("#tblResultBuspersona").jqGrid('getRowData', gsr);
        fnc(row);
        closeDialog("jqDialogBusPerson");
    } else {
        openDialogWarning("Seleccione una Persona.", 380, 150);
    }
}
