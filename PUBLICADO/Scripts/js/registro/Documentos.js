var idmenuselected = 0;

updateProgressColor = function () {
    
        $(this).css('background', '#F000');    
}


    var listTemas = new Array();
    var dataGrid = new Array();
    var rowid = 0;



    $(document).ready(function () {



        javascript: window.history.forward(1);


        $.post(path + "registro/getListTema", null, function (data) {
            listTemas = data;
        }, 'json');

        $("#lblCerrar").click(function () {
            window.open(path + "Acceso/Index", "_self");
        });

        $("#lblCambiarClave").click(function () {
            openDialogDataFunction1("acceso/cambiarpassw", null, 300, 150, "Cambio de Clave", null, { 'Aceptar': function () { SaveClave(); }, 'Cancelar': function () { closeDialog("jqDialog1"); } });
        });

        $("#effect").hide();

        $("#btnFiltrar").button({
            text: true,
            icons: {
                primary: " ui-icon-search"
            }
        }).click(function () {

            ProcesoBuscar(idmenu);
        });

        $("#txtfechaini").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'MM yy',
            showButtonPanel: true,
            onClose: function () {
                var iMonth = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
                var iYear = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                $(this).datepicker('setDate', new Date(iYear, iMonth, 1));
            },

            beforeShow: function () {
                if ((selDate = $(this).val()).length > 0) {
                    iYear = selDate.substring(selDate.length - 4, selDate.length);
                    iMonth = jQuery.inArray(selDate.substring(0, selDate.length - 5), $(this).datepicker('option', 'monthNames'));
                    $(this).datepicker('option', 'defaultDate', new Date(iYear, iMonth, 1));
                    $(this).datepicker('setDate', new Date(iYear, iMonth, 1));
                }
            }
        });

        //    ProcesoBuscar(-1);

        gridConfig = {
            height: 290,
            width: '100%',
            //colNames: ["", "Situación", "COD_ENTIDAD", "Emisor", "F. Ingreso", "Expediente", "H. Ruta", "ENT_DESTINO", "Destino", "Derivación", "Asunto", "F. Venc.", "F. Fin", "# Días", "P.L.", "N° Proyecto", "Estado Proyecto", "COD_TRAMITE_REF", "Tema", "NIDTEMA"],
            colNames: ["", "Situación", "COD_ENTIDAD", "Emisor", "F. Ingreso", "Expediente", "Oficio", "ENT_DESTINO", "Destino", "Respuesta", "Asunto", "Origen", "nu_emi_", "nu_ann_", "nu_cor_emi_", "nu_ann_resp_", "nu_emi_resp_", "F. Venc.", "# Días", "P.L.", "N° Proyecto", "Estado Proyecto", "COD_TRAMITE_REF", "Tema", "NIDTEMA", "Rpta MC"],
            rowNum: 10,
            loadonce: true,
            mtype: "GET",
            rownumbers: true,
            gridview: true,
            sortname: 'FECHA_ING',
            viewrecords: true,
            sortorder: "desc",
            ignoreCase: true,
            toolbar: [true, "bottom"],
            gridComplete: function () {

                $(".btnUpload").button(
                    {
                        icons: { primary: 'icon_attach' },
                        text: true
                    }
                        ).click(function () {
                            var file = $(this).parent().find('input:file');
                            file.click();
                        });








                $(".listTema").autocomplete({
                    source: listTemas,
                    focus: function (event, ui, o) {
                        $(this).val(ui.item.label);
                        return false;
                    },
                    select: function (event, ui) {
                        var text = this;
                        var p = {};
                        rowid = parseInt($(text).attr('rowid'));
                        p.NIDTEMA = ui.item.value;
                        p.SDESCRIPCION = ui.item.label;
                        p.COD_TRAMITE_INT = $(text).attr('nidtramite');
                        p.CODIGOENTIDAD = idmenu;
                        p.ANIO = $("#cboanio").val();
                        p.MES = $("#cbomes").val();
                        p.CODIGOUSUARIO = $("#txhiduser").val();
                        p.NU_EMI = $(text).attr('NU_EMI');
                        p.NU_ANN = $(text).attr('NU_ANN');
                        p.NU_COR_EMI = $(text).attr('NU_COR_EMI');
                        p.NU_ANN_RESP = $(text).attr('NU_ANN_RESP');
                        p.NU_EMI_RESP = $(text).attr('NU_EMI_RESP');                      
                        p.ORIGENSISTEMA = $(text).attr('ORIGENSISTEMA');
                       // console.log("select: " + p);
                        $.post(path + "registro/saveTema", p, function (data) {
                            listTemas = data[0];

                            $(".listTema").autocomplete({ source: listTemas });

                            dataGrid = data[1];

                            $("#tblResult").jqGrid('setGridParam', { data: dataGrid }).trigger('reloadGrid');
                            $("#tblResult").jqGrid('setSelection', rowid, true);

                            $(text).css('border', 'none');
                        }, 'json');

                        return false;
                    }
                });
            },
            ondblClickRow: function (i) {
                var sistema = $("#cbosistema").val();
                var row = jQuery("#tblResult").jqGrid('getRowData', i);
                openDialogDataFunction1("registro/Movimientos", {
                    P_COD_TRAMITE_EXT: row.COD_TRAMITE_REF, P_COD_TRAMITE_INT: row.COD_TRAMITE, P_NU_EMI: row.NU_EMI, P_NU_ANN: row.NU_ANN, P_ORIGENSISTEMA: row.ORIGENSISTEMA, P_SISTEMA: sistema
                }, 1000, 600, "Documento", null, {
                    'Imprimir': function () {

                        var det = $("#panelDetalle").html();
                        $("#panelDetalle").html('');
                        var htmlprint = $("#jqDialog1").html() + tblaux;
                        $("#printdoc").html(htmlprint);
                        $("#printdoc").jqprint();
                        $("#printdoc").html('');
                        $("#panelDetalle").html(det);

                    },
                    'Cerrar': function () { closeDialog("jqDialog1"); }
                });
            }
        };
    }).unload(function () {

    });

    btnInsertar = {
        caption: "Nuevo&nbsp;&nbsp;",
        title: "Agregar un nuevo registro",
        buttonid: "btnInsertar",
        buttonicon: "ui-icon-plus",
        onClickButton: function () {

            openDialogDataFunction1("registro/inputs", { type: "N", P_NCODIGO: "", P_NCODIGOSUBTIPOCTRL: idmenuselected }, 1250, 750, "Nuevo Registro", null, { 'Guardar': function () { Save('N'); }, 'Cancelar': function () { Cancel(); } });

        }
    },

btnEditar = {
    caption: "Modificar&nbsp;&nbsp;",
    title: "Modificar un registro seleccionado",
    buttonid: "btnEditar",
    buttonicon: "ui-icon-pencil",
    onClickButton: function () {
        var gsr = $("#tblResult").jqGrid('getGridParam', 'selrow');
        if (gsr) {
            var row = jQuery("#tblResult").jqGrid('getRowData', gsr);

            openDialogDataFunction1("registro/inputs", { type: "M", P_NCODIGO: row.NCODIGO, P_NCODIGOSUBTIPOCTRL: idmenuselected }, 1250, 750, "Modificar Registro", null, { 'Guardar': function () { Save('M'); }, 'Cancelar': function () { Cancel(); } });
        } else {
            openDialogWarning("Seleccione la fila a editar.", 380, 150);
        }
    }
},
btnEliminar = {
    caption: "Eliminar&nbsp;&nbsp;",
    title: "Eliminar un registro seleccionado",
    buttonid: "btnEliminar",
    buttonicon: "ui-icon-trash",
    onClickButton: function () {
        var gsr = $("#tblResult").jqGrid('getGridParam', 'selrow');
        if (gsr) {
            var row = jQuery("#tblResult").jqGrid('getRowData', gsr);
            openDialogConfirm1("\u00BFEst\u00E1 seguro de eliminar", 350, {
                "Si": function () {
                    var parmter = {};
                    parmter.P_NCODIGO = row.NCODIGO;
                    parmter.P_SESTADOACTUAL = "2";

                    closeDialog("jqDialogConfirmacion1");
                    $.post(path + "registro/delete", parmter, updateresultDEL, 'text');
                },
                "No": function () {
                    closeDialog("jqDialogConfirmacion1");
                }
            });
        } else {
            openDialogWarning("Seleccione la fila a eliminar.", 380, 150);
        }
    }
},
btnExportar = {
    caption: "Descargar&nbsp;&nbsp;",
    title: "Descargar fomato excel",
    buttonid: "btnExportar",
    buttonicon: "ui-icon-arrowthickstop-1-s",
    onClickButton: function () {


        var totalpag = parseInt($("#sp_1_ptblResult").text());


        var strHtmlexport = "";

        strHtmlexport += "<html>";
        strHtmlexport += "<head>";
        strHtmlexport += "<meta name='tipo_contenido'  content='text/html;' http-equiv='content-type' charset='utf-8'>";
        strHtmlexport += "</head>";
        strHtmlexport += "<body>";

        strHtmlexport += "<table style='BORDER-RIGHT: #000000 thin solid; BORDER-TOP: #000000 thin solid; BORDER-LEFT: #000000 thin solid; BORDER-BOTTOM: #000000 thin solid' cellspacing='0' width=800 border=1>";
        strHtmlexport += "<tr>";
        strHtmlexport += "<td style='font-family: Verdana,Arial, Helvetica, sans-serif;font-size: 10px;font-weight: normal;color: black;vertical-align: middle;text-align: center;background-color: #dadada  ;text-decoration:none' >N°</td>";
        strHtmlexport += "<td style='font-family: Verdana,Arial, Helvetica, sans-serif;font-size: 10px;font-weight: normal;color: black;vertical-align: middle;text-align: center;background-color: #dadada  ;text-decoration:none' >Situación</td>";
        strHtmlexport += "<td style='font-family: Verdana,Arial, Helvetica, sans-serif;font-size: 10px;font-weight: normal;color: black;vertical-align: middle;text-align: center;background-color: #dadada;text-decoration:none'>Emisor</td>";
        strHtmlexport += "<td style='font-family: Verdana,Arial, Helvetica, sans-serif;font-size: 10px;font-weight: normal;color: black;vertical-align: middle;text-align: center;background-color: #dadada;text-decoration:none'>F. Ingreso</td>";
        strHtmlexport += "<td style='font-family: Verdana,Arial, Helvetica, sans-serif;font-size: 10px;font-weight: normal;color: black;vertical-align: middle;text-align: center;background-color: #dadada;text-decoration:none' >Expediente</td>";
        strHtmlexport += "<td style='font-family: Verdana,Arial, Helvetica, sans-serif;font-size: 10px;font-weight: normal;color: black;vertical-align: middle;text-align: center;background-color: #dadada;text-decoration:none' >Oficio Ingreso</td>";
        strHtmlexport += "<td style='font-family: Verdana,Arial, Helvetica, sans-serif;font-size: 10px;font-weight: normal;color: black;vertical-align: middle;text-align: center;background-color: #dadada;text-decoration:none' >Destino</td>";
        strHtmlexport += "<td style='font-family: Verdana,Arial, Helvetica, sans-serif;font-size: 10px;font-weight: normal;color: black;vertical-align: middle;text-align: center;background-color: #dadada;text-decoration:none' >Oficio Respuesta</td>";
        strHtmlexport += "<td style='font-family: Verdana,Arial, Helvetica, sans-serif;font-size: 10px;font-weight: normal;color: black;vertical-align: middle;text-align: center;background-color: #dadada;text-decoration:none' >Asunto</td>";
        strHtmlexport += "<td style='font-family: Verdana,Arial, Helvetica, sans-serif;font-size: 10px;font-weight: normal;color: black;vertical-align: middle;text-align: center;background-color: #dadada;text-decoration:none' >F. Venc.</td>";
        strHtmlexport += "<td style='font-family: Verdana,Arial, Helvetica, sans-serif;font-size: 10px;font-weight: normal;color: black;vertical-align: middle;text-align: center;background-color: #dadada;text-decoration:none' >F. Fin</td>";
        strHtmlexport += "<td style='font-family: Verdana,Arial, Helvetica, sans-serif;font-size: 10px;font-weight: normal;color: black;vertical-align: middle;text-align: center;background-color: #dadada;text-decoration:none' ># Días</td>";
        if (idmenu == 11) {
            strHtmlexport += "<td style='font-family: Verdana,Arial, Helvetica, sans-serif;font-size: 10px;font-weight: normal;color: black;vertical-align: middle;text-align: center;background-color: #dadada;text-decoration:none' >P.L.</td>";
            strHtmlexport += "<td style='font-family: Verdana,Arial, Helvetica, sans-serif;font-size: 10px;font-weight: normal;color: black;vertical-align: middle;text-align: center;background-color: #dadada;text-decoration:none' >N° Proyecto</td>";
            strHtmlexport += "<td style='font-family: Verdana,Arial, Helvetica, sans-serif;font-size: 10px;font-weight: normal;color: black;vertical-align: middle;text-align: center;background-color: #dadada;text-decoration:none' >Estado Proyecto</td>";
        } else {
            strHtmlexport += "<td style='font-family: Verdana,Arial, Helvetica, sans-serif;font-size: 100px;font-weight: normal;color: black;vertical-align: middle;text-align: center;background-color: #dadada;text-decoration:none' >Tema</td>";
        }
        strHtmlexport += "</tr>";
        var nro = 0;
        for (var i = 0; i < totalpag; i++) {

            var data = $("#tblResult").jqGrid('getRowData');

            for (var x = 0; x < data.length; x++) {
                nro++;
                strHtmlexport += "<tr>";
                strHtmlexport += "<td align=center>&nbsp;" + nro + "</td>";
                strHtmlexport += "<td align=center>&nbsp;" + data[x].ESTADO_EVAL + "</td>";
                strHtmlexport += "<td align=center>&nbsp;" + data[x].DESC_ENTIDAD + "</td>";
                strHtmlexport += "<td align=center>&nbsp;" + data[x].FECHA_ING + "</td>";
                strHtmlexport += "<td align=center>&nbsp;" + data[x].COD_TRAMITE_ANIO + "</td>";
                strHtmlexport += "<td align=center>&nbsp;" + data[x].COD_TRAMITE + "</td>";
                strHtmlexport += "<td align=center>&nbsp;" + data[x].DESC_ENTIDAD_DESTINO + "</td>";
                strHtmlexport += "<td align=center>&nbsp;" + data[x].SDERIVACION + "</td>";
                strHtmlexport += "<td align=center>&nbsp;" + data[x].ASUNTO + "</td>";
                strHtmlexport += "<td align=center>&nbsp;" + data[x].DFECHA_VENCIMIENTO + "</td>";
//                strHtmlexport += "<td align=center>&nbsp;" + data[x].FECHA_FIN + "</td>";
                strHtmlexport += "<td align=center>&nbsp;" + data[x].NDIAS_TRANSCURRIDOS + "</td>";
                if (idmenu == 11) {
                    strHtmlexport += "<td align=center>&nbsp;" + ($(data[x].NFLAGPROYECTOLEY).is(':checked') ? 'Si' : 'No') + "</td>";
                    strHtmlexport += "<td align=center>&nbsp;" + $(data[x].SNUMEROPROYECTOLEY).val() + "</td>";
                    strHtmlexport += "<td align=center>&nbsp;" + data[x].SESTADOPROYECTOLEY + "</td>";
                } else {
                    strHtmlexport += "<td align=center>&nbsp;" + $(data[x].STEMA).val() + "</td>";
                }


                strHtmlexport += "</tr>";
            }
            $(".ui-icon-seek-next").click();
        }

        strHtmlexport += "</table>";
        strHtmlexport += "</body>";
        strHtmlexport += "</html>";

        $(".ui-icon-seek-first").click();

        window.location = 'data:application/vnd.ms-excel,' + encodeURIComponent(strHtmlexport);

    }

},
btnRefrescar = {
    caption: "Refrescar&nbsp;&nbsp;",
    title: "Refrescar",
    buttonid: "btnExportar",
    buttonicon: "ui-icon-refresh",
    onClickButton: function () {
        
        ProcesoBuscar(idmenu);
    }

}
;



var Save = function (type) {

    var parmter = {};

    parmter.l_type = $("#txhoperacion").val();
    parmter.l_ncodigo = $('#txhcodigo').val();
    parmter.l_sdenominacion = $('#txtdenominacion').val();
    parmter.l_snumeroinforme = $('#tctnumeroinforme').val();
    parmter.l_dfecha = $('#txtfecha').val();
    parmter.l_ncodigorec = $('#txhcodigorecomendacion').val();
    parmter.l_dfecharec = $("#txtfecharecomendacion").val();
    parmter.l_srn = $('#txtrn').val();
    parmter.l_splazo = $('#txtplazo').val();
    parmter.l_sorgresponsable = $('#txtOrgano').val();
    parmter.l_sestadoactual = $('#cbosituacion').val();
    parmter.l_srecomendacion = $('#txtrecomendacion').val();
    parmter.l_sacxrealizar = $('#txtaccionxrealizar').val();
    parmter.l_sacrepoci = $('#txtaccionreportada').val();
    parmter.l_seguimientooci = $('#txtseguimiento').val();
    parmter.l_sestadoreg = '1';
    parmter.l_dfechaimplementacion = $('#txtfechaimple').val();
    parmter.l_ncodigosubtipoctrl = $("#cbotipo").val();

    parmter.l_ncodigoorganigrama = $('#txhOrgano').val();

    if ($("#cbotipo").val() == "9999999999") {
        openDialogWarning("Seleccione el tipo de control.", 380, 150);

        return;
    }

    if ($("#tctnumeroinforme").val() == "") {
        openDialogWarning("Ingrese el numero de informe.", 380, 150);
        $("#tctnumeroinforme").focus();
        return;
    }
    if ($("#txtdenominacion").val() == "") {
        openDialogWarning("Ingrese la denominacion del informe.", 380, 150);
        $("#txtdenominacion").focus();
        return;
    }



    if ($("#tdinputview").val() == "0") {

        $.post(path + "registro/saveinforme", parmter, updateresult, 'json');
    }
    else {

        if ($("#txtrn").val() == "") {
            openDialogWarning("Ingrese el numero de recomendación.", 380, 150);
            $("#txtrn").focus();
            return;
        }
        if ($("#txtrecomendacion").val() == "") {
            openDialogWarning("Ingrese la recomendación.", 380, 150);
            $("#txtrecomendacion").focus();
            return;
        }
        if ($("#txtOrgano").val() == "") {
            openDialogWarning("Ingrese el organo responsable", 380, 150);
            $("#txtOrgano").focus();
            return;
        }

        $.post(path + "registro/saverecomendacion", parmter, updateresult, 'json');
    }


}



var updateresult = function (data) {

    openDialogInfo(data[0].msg, "250", "250", null, function () {

        $('#txhcodigo').val(data[0].ncodigo);
        $("#tdinputview").val('0');
        $("#tdlistrecomendacion").show();
        $("#tdinputrecomendacion").hide();

       
    })


}
var Cancel = function () {
    var tdvisible = $("#tdinputview").val();

    if (tdvisible == "1") {
        $("#tdinputview").val("0");
        $("#tdlistrecomendacion").show();
        $("#tdinputrecomendacion").hide();
        
        ProcesoBuscar2();
    } else {

        closeDialog("jqDialog1");

    };
}
var updateresultDEL = function (data) {


    //{ "Aceptar": function() { closeDialog("jqDialogInfo"); }
    openDialogInfo(data[0].msg, "250", "250", null, function () {
        //        closeDialog("jqDialog1");
        //        $("#btnbuscar").click();
        //                $('#txhcodigo').val(res[1]);

       
        ProcesoBuscar(idmenu);


    })


}

var navPanel = function () {
    $("#tblResult").jqGrid('navGrid', '#ptblResult', { edit: false, add: false, del: false, search: false, refresh: false });


    $("#tblResult").toolbarButtonAdd("#t_tblResult", btnRefrescar);
    $("#tblResult").toolSeparatorAdd('#t_tblResult');
    $("#tblResult").toolbarButtonAdd("#t_tblResult", btnExportar);

    $("#tblResult").jqGrid('filterToolbar', { searchOperators: true });
   
}


function setDataGrid(data) {
    dataGrid = data;
}

OnEnterKey = function () { };

function ProcesoBuscar(sw) {
    var sistema = $("#cbosistema").val();
    if (sw==0) {
        openDialogError('Debe seleccionar la Enitdad Emisor');
        return;
    }
    var paramtrs = '{' +
                    '"P_COD_TRAMITE_INT":"' + '0' + '",' +
                    '"P_COD_TRAMITE_EXT":"' + '0' + '",' +
                    '"P_FECHAINI":"' + '' + '",' +
                    '"P_FECHAFIN":"' + '' + '",' +
                    '"P_ANIO":"' + $("#cboanio").val() + '",' +
                    '"P_MES":"' + $("#cbomes").val() + '",' +
                    '"P_CODIGOENTIDAD":"' + sw + '",' +
                    '"P_CODIGOUSUARIO":"' + $("#txhiduser").val() + '"' +                
                    '}';
    console.log(paramtrs);
    parameters = {
        "name": "tblResult",
        "procedure": sistema + ".pkg_documentscr.sp_sexpedientescr",

        "parameters": paramtrs
    }

    procesarConsultaSubProceso('registrarorcl', parameters, function (request) {
        var 
    records = (request == null ? 0 : request.length),
    bindkeys = { "onEnter": OnEnterKey },
        gridConfig2 = $.extend(gridConfig, {
            caption: '&nbsp;ENTIDAD&nbsp;:&nbsp;' + textmenuitem.toUpperCase(),
            data: request,
            datatype: "local", colModel: [
        { name: "COLOR", index: 'COLOR', sorttype: 'string', width: 20, align: 'center',
            formatter: function (cellValue, options, rowObject) {

                return "<img alt='' src='" + path + "Content/img/" + cellValue + ".png' />";

            }

        },
        { name: "ESTADO_EVAL", index: 'ESTADO_EVAL', width: 60, sorttype: 'string',

            stype: 'select', editoptions: { value: ":Todos;Finalizado:Finalizados;Vencido:Vencidos;Vencen hoy:Vencen Hoy;Por vencer:Por Vencer;Ingreso nuevo:Ingresos Nuevos;Ingreso hoy:Ingresaron Hoy" }

        },
        { name: "COD_ENTIDAD", index: 'COD_ENTIDAD', width: 100, sorttype: 'string', searchoptions: { sopt: ['cn'] }, hidden: true },
            { name: "DESC_ENTIDAD", index: 'DESC_ENTIDAD', width: 100, align: 'left', sorttype: 'string', searchoptions: { sopt: ['cn']} },
            { name: "FECHA_ING", index: 'FECHA_ING', width: 70, align: 'center', sorttype: 'string', searchoptions: { sopt: ['cn']} },
            { name: "COD_TRAMITE_ANIO", index: 'COD_TRAMITE_ANIO', width: 80, align: 'center', sorttype: 'string', searchoptions: { sopt: ['cn']} },
            { name: "COD_TRAMITE", index: 'COD_TRAMITE', width: 80, align: 'center', sorttype: 'number', searchoptions: { sopt: ['cn']} },
            { name: "ENT_DESTINO", index: 'ENT_DESTINO', align: 'center', sorttype: 'string', searchoptions: { sopt: ['cn'] }, hidden: true },
            { name: "DESC_ENTIDAD_DESTINO", index: 'DESC_ENTIDAD_DESTINO', width: 100, align: 'left', sorttype: 'string', searchoptions: { sopt: ['cn']} },
            { name: "SDERIVACION", index: 'SDERIVACION', width: 80, align: 'left', sorttype: 'string', searchoptions: { sopt: ['cn']} },
             { name: "ASUNTO", index: 'ASUNTO', width: 180, align: 'left', sorttype: 'string', searchoptions: { sopt: ['cn']} },
            { name: "ORIGENSISTEMA", index: 'ORIGENSISTEMA', width: 20, align: 'left', sorttype: 'string', searchoptions: { sopt: ['cn']} },
             { name: "NU_EMI", index: 'NU_EMI', width: 20, align: 'left', sorttype: 'string', searchoptions: { sopt: ['cn'] }, hidden: true },
              { name: "NU_ANN", index: 'NU_ANN', width: 20, align: 'left', sorttype: 'string', searchoptions: { sopt: ['cn'] }, hidden: true },
               { name: "nu_cor_emi", index: 'nu_cor_emi', width: 20, align: 'left', sorttype: 'string', searchoptions: { sopt: ['cn'] }, hidden: true },
                { name: "nu_ann_resp", index: 'nu_ann_resp', width: 20, align: 'left', sorttype: 'string', searchoptions: { sopt: ['cn'] }, hidden: true },
                 { name: "nu_emi_resp", index: 'nu_emi_resp', width: 20, align: 'left', sorttype: 'string', searchoptions: { sopt: ['cn'] }, hidden: true },
            // { name: "NU_EMI", index: "NU_EMI", hidden: true },
            //   { name: "NU_ANN", index: "NU_ANN", hidden: true },
            // { name: "nu_cor_emi", index: "nu_cor_emi", hidden: true },
            //  { name: "nu_ann_resp", index: "nu_ann_resp", hidden: true },
            // { name: "nu_emi_resp", index: "nu_emi_resp", hidden: true }, 
             {name: "DFECHA_VENCIMIENTO", index: 'DFECHA_VENCIMIENTO', width: 70, align: 'string', sorttype: 'string', searchoptions: { sopt: ['cn']} },
            //{ name: "FECHA_FIN", index: "FECHA_FIN", width: 70, align: 'center', sorttype: 'string', searchoptions: { sopt: ['cn']} },
             {name: "NDIAS_TRANSCURRIDOS", index: 'NDIAS_TRANSCURRIDOS', width: 45, align: 'center', sorttype: 'number', searchoptions: { sopt: ['eq']} },
             { name: "NFLAGPROYECTOLEY", index: 'NFLAGPROYECTOLEY', width: 20, align: 'center', stype: 'select', editoptions: { value: ":Todos;Yes:Si;No:No" }, sorttype: 'string', hidden: (idmenu == 11 ? false : true),
                 formatter: function (cellValue, options, rowObject) {

                     return "<input  type='checkbox' value='" + cellValue + "' onchange='activarText(this);' " + (cellValue == 'Yes' ? 'disabled checked' : '') + "  />";

                 }
             },
             { name: "SNUMEROPROYECTOLEY", index: 'SNUMEROPROYECTOLEY', width: 80, align: 'center', sorttype: 'string', searchoptions: { sopt: ['cn'] }, hidden: (idmenu == 11 ? false : true),
                 formatter: function (cellValue, options, rowObject) {
                     var html;
                     if (cellValue != null && cellValue != '') {
                         html = "<a href='" + rowObject.SLINK + "' target='_blank'>" + cellValue + "</a>";
                     } else {
                         html = "<input id='" + rowObject.COD_TRAMITE + "' nexpediente='" + rowObject.COD_TRAMITE_ANIO + "' NU_EMI='" + rowObject.NU_EMI + "' NU_ANN='" + rowObject.NU_ANN + "' NU_COR_EMI='" + rowObject.NU_COR_EMI + "' NU_ANN_RESP='" + rowObject.NU_ANN_RESP + "' NU_EMI_RESP='" + rowObject.NU_EMI_RESP + "' ORIGENSISTEMA='" + rowObject.ORIGENSISTEMA + "' onchange='confirmSaveProyLey(this);'" + " type='text' value='" + (cellValue == null || cellValue == '' ? '' : cellValue) + "' style='margin:2px;width:60px;text-align:center' disabled/>";
                     }
                     return html;
                 }
             },
             { name: "SESTADOPROYECTOLEY", index: 'SESTADOPROYECTOLEY', width: 100, align: 'center', sorttype: 'string', searchoptions: { sopt: ['eq'] }, hidden: (idmenu == 11 ? false : true) },
                { name: "COD_TRAMITE_REF", index: "COD_TRAMITE_REF", hidden: true },
                { name: "STEMA", index: "STEMA", width: 200, align: 'left', sorttype: 'string', searchoptions: { sopt: ['cn'] }, hidden: (idmenu == 12 ? false : true),
                    formatter: function (cellValue, options, rowObject) {
                        var html = "";
                        //console.log("' NU_EMI='" + rowObject.NU_EMI + "' NU_ANN='" + rowObject.NU_ANN + "' ORIGENSISTEMA='" + rowObject.ORIGENSISTEMA);                        
                        html += "<input rowid='" + options.rowId + "' id='" + rowObject.NIDTEMA + "' nidtramite='" + rowObject.COD_TRAMITE + "' NU_EMI='" + rowObject.NU_EMI + "' NU_ANN='" + rowObject.NU_ANN + "' NU_COR_EMI='" + rowObject.NU_COR_EMI + "' NU_ANN_RESP='" + rowObject.NU_ANN_RESP + "' NU_EMI_RESP='" + rowObject.NU_EMI_RESP + "' ORIGENSISTEMA='" + rowObject.ORIGENSISTEMA + "' class='ui-text listTema' style='width:186px;height:90%;margin-left:5px; " + (cellValue == null || cellValue == "" ? "" : "border:none;") + "' onkeypress='saveTema(event,this)' type='text'  value='" + (cellValue == null ? '' : cellValue) + "" + "'/>";
                        return html;
                    }
                },
                { name: "NIDTEMA", index: "NIDTEMA", hidden: true },
                { name: "SNOMBREFILE", index: "SNOMBREFILE", width: 120, align: 'center', sorttype: 'string', searchoptions: { sopt: ['eq'] }, hidden: true,
                    formatter: function (cellValue, options, rowObject) {

                        var html = "";

                        if (cellValue)
                            if (cellValue.search(".doc") >= 0 || cellValue.search(".docx") >= 0)

                                html += "<a href='" + pathFiles + cellValue + "' >" + cellValue + "</a> ";
                            else
                                html += "<a href='" + pathFiles + cellValue + "' target='_blank'>" + cellValue + "</a> ";
                        else
                            html += "<input type='file'  class='fileUpload' COD_TRAMITE='" + rowObject.COD_TRAMITE + "' COD_TRAMITE_REF='" + rowObject.COD_TRAMITE_REF + "'  name='fileRpt" + options.rowId + "' id='fileRpt" + options.rowId + "' style='opacity:0;width:0px;height:0px;' onchange='UploadFile(this);' fila='" + options.rowId + "'/><button class='btnUpload'>Adjuntar</button>";
                        return html;
                    }
                },



        ]
        });

        $("#panelResult").html('<table id="tblResult" style="font-size: 10px"></table><div id="ptblResult"></div>');

        //    $("#panelResult").html('<table id="tblResult" style="font-size: 10px"></table><div id="ptblResult"></div><input type="hidden" id="ctblResult" name="ctblResult" value="' + records + '" />');
        inicializarGrid("tblResult", gridConfig2, bindkeys);

        $("#tblResult").jqGrid('filterToolbar');
        $("#tblResult").jqGrid('setFrozenColumns');
        $("#tblResult").trigger('reloadGrid', [{ current: true}]);

        $($("#panelResult .frozen-div .ui-jqgrid-htable")[2]).remove();

        navPanel();

        $("#gbox_tblResult").width('100%');
        $("#gview_tblResult").width('100%');
        $("#t_tblResult").width('100%');
        $("#ptblResult").width('100%');
        $(".ui-jqgrid-bdiv").width('100%');





    }, 'json');
    CargarTotales();
   
}

function runEffect() {
  
    setTimeout(function () {
        $("#divalerta").show();
        $("#effect").show('clip', null, 1000, null);
    }, 1000);

}


function close_alerta() {

    h = $("#divalerta").height();

    if (h > 29) {

        $("#alerta").hide('fade', null, 1000, null);

        $("#divalerta").animate({
            height: 29
        }, 1000);
        setTimeout(function () {
            $("#iconalerta").attr("src", path + "Content/img/iup.png")
        }, 500);
    } else {
        $("#alerta").show('fade', null, 1000, null);

        $("#divalerta").animate({
            height: 190
        }, 1000);
        setTimeout(function () {
            $("#iconalerta").attr("src", path + "Content/img/idown.png")
        }, 500);        
    }       

};


function CargarTotales() {

    var sistema = $("#cbosistema").val();
    var paramtrs = '{' +
                    '"P_ANIO":"' + $("#cboanio").val() + '",' +
                    '"P_MES":"' + $("#cbomes").val() + '",' +
                    '"P_CODIGOENTIDAD":"' + idmenu + '"' +
                    '}';

    parameters = {
        "name": "leyenda",
        "procedure": sistema + ".pkg_documentscr.sp_sleyenda",
        "parameters": paramtrs
    }
   
    procesarConsultaSubProceso('registrarorcl', parameters, PintarLeyenda, 'json');
}

function PintarLeyenda(data) {
    $("#lblperiodo").text($("#cboanio").val() + ($("#cbomes").val()=="00"?"":" - " + $("#txtmes").val()) );
    var porcentaje = 0.0;

    $("#iconazul").attr("src", path + "Content/img/azul.png");
    $("#iconrojo").attr("src", path + "Content/img/rojo.png");
    $("#iconambar").attr("src", path + "Content/img/ambar.png");
    $("#iconnaranja").attr("src", path + "Content/img/naranja.png");
    $("#iconverde").attr("src", path + "Content/img/verde.png");
    $("#iconceleste").attr("src", path + "Content/img/celeste.png");

    for (var i = 1; i <= 6; i++) {

        $("#cant" + i).text('0');

    }
    $("#lbltotalexp").text('0');
    
    for (var i = 0; i < data.length; i++) {        
        $("#cant" + data[i].ORDEN).text(data[i].CANTIDAD);
        $("#lbltotalexp").text(data[i].TOTAL);
    }

    setTimeout(function () {
        $("#iconalerta").attr("src", path + "Content/img/idown.png");
    }, 3000);


    setTimeout(function () {
        runEffect();
    }, 1000);


}


function SaveClave() {

    if ($("#Password1").val() != $("#Password2").val()) {
        openDialogInfo("La clave ingresada no es la misma", "250", "250", null, null);

    } else

        if ($("#Password1").val() == "" || $("#Password2").val() == "") {
            openDialogInfo("La clave ingresada es incorrecta", "250", "250", null, null);

        } else

            if ($("#Password1").val().length < 5) {
                openDialogInfo("La clave ingresada debe tener mínimo cinco caracteres", "250", "250", null, null);

            }

            else {
                parmter = { p_password1: $("#Password1").val(), p_password2: $("#Password1").val() };

                $.post(path + "acceso/SavePassword", parmter, returnSaveClave, 'text');
            }
}

function returnSaveClave(respons) {
    if (respons == "0") {
        openDialogInfo("La clave fue cambiada con éxito.<br>Vuelva a inciar sesión", "250", "250", null, function () {
            closeDialog("jqDialog1");
            window.open(path + "Acceso/Index", "_self");
        });
    } else {
        openDialogInfo("Ha ocurrido un error.", "250", "250", null, function () {
            closeDialog("jqDialog1");
           
        });
    }

}

function activarText(obj) {    
    var text = $(obj).parent().parent().find('input[type=text]');
    
    $(text).prop('disabled', !$(obj).is(':checked')).focus();   
}


function confirmSaveProyLey(obj) {

    var text = $(obj).parent().parent().find('input[type=text]');
    var chk = $(obj).parent().parent().find('input[type=checkbox]');
    if ($(text).val().length > 0)
        openDialogConfirm1('¿Desea grabar el <b>Proyecto de Ley N° ' + $(text).val() + '</b> para el <b>Expediente N°: ' + $(text).attr('nexpediente') + '</b>?', undefined, {
            'Si': function () {
                closeDialog('jqDialogConfirmacion1');
                var p = {};
                p.P_SNUMEROPROYECTOLEY = $(text).val();
                p.P_SESTADOPROYECTOLEY = '';
                p.P_COD_TRAMITE_INT = $(text).attr('id');

                p.NU_EMI = $(text).attr('NU_EMI');
                p.NU_ANN = $(text).attr('NU_ANN');
                p.NU_COR_EMI = $(text).attr('NU_COR_EMI');
                p.NU_ANN_RESP = $(text).attr('NU_ANN_RESP');
                p.NU_EMI_RESP = $(text).attr('NU_EMI_RESP');
                p.ORIGENSISTEMA = $(text).attr('ORIGENSISTEMA');
                console.log(p);
                $.post(path + "registro/saveProyectoLey", p, function () {
                    $(text).prop('disabled', true);
                    $(chk).prop('disabled', true);

                }, 'text');
            },
            'No': function () {
                closeDialog('jqDialogConfirmacion1');
            }
        });

    }



    function saveTema(e, obj) {
       
        if (e.keyCode == 13) {
            var text = $(obj).parent().parent().find('input[type=text]');
            var nidtema = $(obj).parent().parent().find('input[type=hidden]');
            var p = {};
            rowid = parseInt($(obj).attr('rowid'));

            p.NIDTEMA = obj.id;
            p.SDESCRIPCION = $(obj).val();
            p.COD_TRAMITE_INT = $(obj).attr('nidtramite');
            p.CODIGOENTIDAD = idmenu;
            p.ANIO = $("#cboanio").val();
            p.MES = $("#cbomes").val();
            p.CODIGOUSUARIO = $("#txhiduser").val();
            p.NU_EMI = $(obj).attr('NU_EMI');
            p.NU_ANN = $(obj).attr('NU_ANN');
            p.NU_COR_EMI = $(obj).attr('NU_COR_EMI');
            p.NU_ANN_RESP = $(obj).attr('NU_ANN_RESP');
            p.NU_EMI_RESP = $(obj).attr('NU_EMI_RESP');
            p.ORIGENSISTEMA = $(obj).attr('ORIGENSISTEMA');
           
            //console.log(p);
            $.post(path + "registro/saveTema", p, function (data) {

                listTemas = data[0];

                $(".listTema").autocomplete({ source: listTemas });


                dataGrid = data[1];

                $("#tblResult").jqGrid('setGridParam', { data: dataGrid }).trigger('reloadGrid');
                $("#tblResult").jqGrid('setSelection', rowid, true);

                $(text).css('border', 'none');
            }, 'json');
        }
    }



    function UploadFile(file) {

        openDialogConfirm1("Esta seguro de adjuntar el archivo?", 350, {
            "Si": function () {
                closeDialog("jqDialogConfirmacion1");

                var td = $(file).parent();
                var cod_tramite = $(file).attr('cod_tramite');
                var cod_tramite_ref = $(file).attr('cod_tramite_ref');
                var archivo = $(file).prop("files")[0];

                var xhr = new XMLHttpRequest();
                xhr.open('POST', path + 'Registro/Upload?cod_tramite=' + cod_tramite + '&cod_tramite_ref=' + cod_tramite_ref + '&filename=' + archivo.name + '&ANIO=' + $("#cboanio").val() + '&MES=' + $("#cbomes").val() + '&CODIGOUSUARIO=' + $("#txhiduser").val() + '&CODIGOENTIDAD=' + idmenu);
                xhr.setRequestHeader('Content-type', 'multipart/form-data');

                xhr.send(archivo);
                xhr.onreadystatechange = function () {

                    if (xhr.readyState == 4 && xhr.status == 200) {

                        var obj = JSON.parse(xhr.responseText);

                        td.find('button,input').remove();
                        var html;

                        if (archivo.name.search(".doc") >= 0 || archivo.name.search(".docx") >= 0)

                            html = "<a href='" + pathFiles + archivo.name + "' >" + archivo.name + "</a> ";
                        else
                            html = "<a href='" + pathFiles + archivo.name + "' target='_blank'>" + archivo.name + "</a> ";

                        td.append(html);

                        $("#tblResult").jqGrid('resetSelection');
                    }

                } 
                
            },
            "No": function () {
                closeDialog("jqDialogConfirmacion1");
                $('#tblResult').jqGrid('trigger', 'reloadGrid');
            }
        });

        
    }
