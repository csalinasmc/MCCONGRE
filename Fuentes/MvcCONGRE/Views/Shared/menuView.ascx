<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="DocumentsCR" %>
<%@ Control Language="VB" Inherits="System.Web.Mvc.ViewUserControl" %>


<%
    Dim duser As String = "0000000000"
    Dim dtipo As String = ""
    If Not Session("DataUser") Is Nothing Then
          Dim objUser As DataUser
		  objUser = DirectCast(Session("DataUser"), DataUser)
        duser = objUser.CodUser
        dtipo = objUser.Tipo
    End If
    

    
    
    
%>

<div id="panelTreeMenu">
    <table id="tblTreeMenu"></table>
</div>
          
  <script type="text/javascript">
      $(document).ready(function() {

          var jsonMenu = {};
          
      <%If Not Session("DataUser") Is Nothing Then
          Dim Dadapt As New DataAdapter
          Dim arrayPrmtr As New ArrayList
          arrayPrmtr.Add(New String() {"@pcodigo", duser})
          arrayPrmtr.Add(New String() {"@ptype", dtipo})%>
      jsonMenu =<%=Dadapt.executeRowsToJSON("ePlaniW.menu_get", arrayPrmtr)%>
      <%End If%>
      
          
           gridConfigTreeMenu = {
                                   colNames: ["Id", "Menu","accion",""],
                                       colModel: [
	                                                  { name: 'id', index: 'id', width: 1, hidden: true, key: true },
	                                                  { name: 'name', index: 'name', width: "191", resizable: false, sortable: false },
	                                                  { name: "accion",width:1,hidden:true},
	                                                  { name: "buttonsDisable",width:1,hidden:true}
	                                                ]
                                };

           //var paramtrsPermisos = '{' +
                    //'"pcodigo":"<%'=duser %>",' +                    
                    //'"ptype":"<%'=dtipo%>"' +  
                    //'}';

           //parametersTreeMenu = {
           //"name": "tblTreeMenu",
           //    "procedure": "ePlaniW.menu_get",
           //    "parameters": paramtrsPermisos
           //}


           //inicializarGrid("tblTreeMenu", gridConfigTreeMenu)
            <%' If Not Session("DataUser") Is Nothing Then %>
            //procesarConsultaSubProceso('registrar', parametersTreeMenu, procesoTreeMenu, 'json');
            <% 'End If %>

           //$.jgrid.defaults = $.extend($.jgrid.defaults, { loadui: "enable" });

          gridConfigTreeMenu2 = $.extend(gridConfigTreeMenu, {
              datatype: "jsonstring",
              datastr: jsonMenu,
              gridview: true,
              pager: false,
              sortname: 'id',
              treeGrid: true,
              treeGridModel: 'adjacency',
              treedatatype: "local",
              ExpandColumn: 'name',
              caption: " &nbsp",
              treeIcons: { leaf: 'ui-icon-document-b' },
              autowidth: true,
              ExpandColClick: true,
              rowNum: 200,
              height: "auto",
              jsonReader: {
                  repeatitems: false,
                  root: function (obj) { return obj; },
                  page: function (obj) { return 1; },
                  total: function (obj) { return 1; },
                  records: function (obj) { return obj.length; }
              },
              onSelectRow: function (rowid) {
                  var rowdata = $("#tblTreeMenu").jqGrid('getRowData', rowid);
                  if (rowdata.isLeaf == "true") {
                      location.href = path + rowdata.accion;
                  }
              }
          });


          $("#panelTreeMenu").html('<table id="tblTreeMenu"></table>');
          inicializarGrid("tblTreeMenu", gridConfigTreeMenu2);


      });



   </script>