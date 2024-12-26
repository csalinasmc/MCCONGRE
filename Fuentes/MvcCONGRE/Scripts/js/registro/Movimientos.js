

$(document).ready(function () {

    javascript: window.history.forward(1);

    CargarMovimientos();

    gridConfigDetalle = {
        height: 200,
        width: 950,
        colNames: ["#", "ORIGEN", "U. ENVIO", "DESTINO", "DOCUMENTO", "F. ENVIO", "F. RECEP.", "F. ATENC.", "DIAS", "ESTADO"],
        colModel: [
        { name: "ID_SEGUIMIENTO", index: 'ID_SEGUIMIENTO', width: 20, align: 'center', sorttype: 'number', searchoptions: { sopt: ['eq'] }, hidden: false
        , formatter: function (cellValue, options, rowObject) {

            var cellHtml = "<span style='font-weight: bold; font-size:10pt'>" + cellValue + "</span>";

            return cellHtml;
        }
        },
            { name: "ENT_ORIGEN", index: 'ENT_ORIGEN', width: 180, align: 'left', sorttype: 'string', searchoptions: { sopt: ['cn']} },
            { name: "USUARIO", index: 'USUARIO', width: 80, align: 'left', sorttype: 'string', searchoptions: { sopt: ['cn']} },
            { name: "DESC_ENTIDAD", index: 'DESC_ENTIDAD', width: 180, align: 'left', sorttype: 'string', searchoptions: { sopt: ['cn']} },
            { name: "DOCUMENTO", index: 'DOCUMENTO', width: 120, align: 'left', sorttype: 'number', searchoptions: { sopt: ['cn']} },
            { name: "FECHA_DES", index: 'FECHA_DES', width: 80, align: 'center', sorttype: 'number', searchoptions: { sopt: ['cn'] }, hidden: false },
            { name: "FECHA__RECEPCIONA", index: 'FECHA__RECEPCIONA', width: 80, align: 'center', sorttype: 'string', searchoptions: { sopt: ['cn']} },
            { name: "FECHA_ATENCION", index: 'FECHA_ATENCION', width: 80, align: 'center', sorttype: 'string', searchoptions: { sopt: ['cn'] }, hidden: false },
          { name: "DIAS_T_REC", index: 'DIAS_T_REC', width: 40, align: 'center', sorttype: 'number', searchoptions: { sopt: ['cn']} },
          { name: "ESTADO", index: 'ESTADO', width: 40, align: 'center', sorttype: 'number', searchoptions: { sopt: ['cn'] }, hidden: true },

        ],
        caption: "&nbsp;Movimientos del Expediente",
        rowNum: 10,
        loadonce: true,
        mtype: "GET",
        rownumbers: true,
        gridview: true,
        sortname: 'ID_SEGUIMIENTO',
        viewrecords: true,
        sortorder: "desc",
        ignoreCase: true,
        toolbar: [false, "bottom"]
        ,
        gridComplete: function () {
            var rowData = $(this).getDataIDs();

            for (var i = 0; i < rowData.length; i++) {
                var row = jQuery("#tblDetalle").jqGrid('getRowData', parseInt(rowData[i]));



                if (parseInt(row.NDIAS_TRANSCURRIDOS) > 15) {

                    $(this).jqGrid('setRowData', rowData[i], false, 'vencido');
                }

                if (parseInt(row.NDIAS_TRANSCURRIDOS) == 15) {
                    $(this).jqGrid('setRowData', rowData[i], false, 'vencehoy');
                }

                if (parseInt(row.NDIAS_TRANSCURRIDOS) > 9 && parseInt(row.NDIAS_TRANSCURRIDOS) < 15) {
                    $(this).jqGrid('setRowData', rowData[i], false, 'porvencer');
                }

                if (parseInt(row.NDIAS_TRANSCURRIDOS) < 10) {

                    $(this).jqGrid('setRowData', rowData[i], false, 'enproceso');
                }


            }
        }
    };
});



  function navPanelDetalle() {
    $("#tblDetalle").jqGrid('navGrid', '#ptblDetalle', { edit: false, add: false, del: false, search: false, refresh: false });

    //    $("#tblResult").toolbarButtonAdd("#t_tblResult", btnInsertar);
    //    $("#tblResult").toolSeparatorAdd('#t_tblResult');
    //    $("#tblResult").toolbarButtonAdd("#t_tblResult", btnEditar);
    //    $("#tblResult").toolSeparatorAdd('#t_tblResult');
    //    $("#tblResult").toolbarButtonAdd("#t_tblResult", btnEliminar);
    //    $("#tblResult").toolSeparatorAdd('#t_tblResult');
    //    $("#tblResult").toolbarButtonAdd("#t_tblResult", btnExportar);

    
    $("#tblDetalle").jqGrid('filterToolbar');
}

  function OnEnterKey() { };

function CargarMovimientos() {

    var sistema = $("#cbosistema").val();


    //var paramtrs = '{"P_NU_EMI":"' + $("#NU_EMI_").val() + '",P_NU_ANN":"' + $("#NU_ANN_").val() + '",P_ORIGENSISTEMA":"' + $("#ORIGENSISTEMA_").val() + '",P_COD_TRAMITE":"' + $("#cod_tramite_int").val() + '"}';

    var paramtrs = '{' +
                    '"P_NU_EMI":"' + $("#NU_EMI_").val() + '",' +
                    '"P_NU_ANN":"' + $("#NU_ANN_").val() + '",' +
                    '"P_ORIGENSISTEMA":"' + $("#ORIGENSISTEMA_").val() + '",' +
                    '"P_COD_TRAMITE":"' + $("#cod_tramite_int").val() + '"' +
                    '}';
    console.log(paramtrs);
    parameters = {
        "name": "tblResult",
        "procedure": sistema +".pkg_documentscr.SP_SMOVIMIENTOS_INTERNOS",

        "parameters": paramtrs
    }

    procesarConsultaSubProceso('registrarorcl', parameters, showmovimientos, 'json');
}

 function showmovimientos(request) {
     
    records = (request == null ? 0 : request.length),
    bindkeys = { "onEnter": OnEnterKey },
    gridConfigDetalle2 = $.extend(gridConfigDetalle, {
        data: request,
        datatype: "local"
    });

    $("#panelDetalle").html('<table id="tblDetalle" style="font-size: 10px"></table><div id="ptblDetalle"></div>');

  
    inicializarGrid("tblDetalle", gridConfigDetalle2, bindkeys);

    $("#tblDeatlle").jqGrid('filterToolbar');
    $("#tblDetalle").jqGrid('setFrozenColumns');
    $("#tblDetalle").trigger('reloadGrid', [{ current: true}]);

    $($("#panelDetalle .frozen-div .ui-jqgrid-htable")[2]).remove();

    navPanelDetalle();

    tblaux = "<table width='98%' border='black 1px solid' rules='all' cellpadding='5'  style='font-size:6pt;color:black;'>";
    tblaux += "<tr><td>#</td><td>ORIGEN</td><td>U. ENVIO</td><td>DESTINO</td><td>DOCUMENTO</td><td>F. ENVIO</td><td>F. RECEP</td><td>F. ATENC</td><td>DIAS</td><tr>";
    for (var i = 0; i < records; i++) {
      
        tblaux += "<tr>";
        tblaux += "<td>" + request[i].ID_SEGUIMIENTO  + "</td>";
        tblaux += "<td>" + request[i].ENT_ORIGEN +"</td>";
        tblaux += "<td>" + request[i].USUARIO +"</td>";
        tblaux += "<td>" + request[i].DESC_ENTIDAD +"</td>";
        tblaux += "<td>" + request[i].DOCUMENTO +"</td>";
        tblaux += "<td>" + request[i].FECHA_DES +"</td>";
        tblaux += "<td>" + (request[i].FECHA__RECEPCIONA == null ? "" : request[i].FECHA__RECEPCIONA) + "</td>";
        tblaux += "<td>" + (request[i].FECHA_ATENCION == null ? "" : request[i].FECHA_ATENCION ) + "</td>";
        tblaux += "<td>" + request[i].DIAS_T_REC + "</td>";
        tblaux += "</tr>";
    }

    tblaux += "</table>";
};

