<%@ Page Language="VB" Inherits="System.Web.Mvc.ViewPage" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Movimientos</title>
    <style type="text/css">
        .dochead{color:Black;font-size:8pt;}
    </style>
    </head>
<body>
    <div style="width: 98%">
  
    <input type="hidden" id="NU_EMI_" value="<%=ViewData("NU_EMI_")%>"/>
    <input type="hidden" id="NU_ANN_" value="<%=ViewData("NU_ANN_")%>"/>
    <input type="hidden" id="ORIGENSISTEMA_" value="<%=ViewData("ORIGENSISTEMA_")%>"/>
    <input type="hidden" id="cod_tramite_int" value="<%=ViewData("COD_TRAMITE_INT")%>"/>

    <input type="hidden" id="cod_tramite_ext" value="<%=ViewData("COD_TRAMITE_EXT")%>"/>
       <fieldset style="padding-left:10px;padding-bottom:10px">
       <legend>Documento:</legend>
       <table width="100%" class="dochead">
       <tr>
       <td width="100">Expediente:
       </td>
       <td width="20">
           Prioridad:
       </td>
       <td width="120">
       Fecha de Ingreso:
       </td>
           <td width="20">
               Estado:</td>
       </tr>


       <tr>
       <td width="100"><label ><%=ViewData("NUMERO_EXPEDIENTE") %></label></td>
       <td width="20">
           <label><%= ViewData("PRIORIDAD")%></label></td>
       <td width="120">
           <label><%=ViewData("FECHA_INGRESO") %></label></td>
           <td width="20">
               <label><%=ViewData("ESTADO") %></label></td>
       </tr>


       </table>
       </fieldset>
     
           
       <fieldset style="padding-left:10px;padding-bottom:10px">
       <legend>Origen:</legend>
       <table width="100%" class="dochead">
       <tr>
       <td width="100">Entidad:</td>
       <td>
       <label><%= ViewData("ENTIDAD_ORIGEN")%></label>
       </td>
       </tr>
       </table>
       </fieldset>

    
           
       <fieldset style="padding-left:10px;padding-bottom:10px">
       <legend>Descripción:</legend>
       <table width="100%" class="dochead">
       <tr>
       <td width="100">Asunto:</td>
       <td>
       <label><%= ViewData("ASUNTO")%></label>
       </td>
       </tr>
       <tr>
       <td width="100">Documento:</td>
       <td>
           <label><%= ViewData("DOCUMENTO")%></label></td>
       </tr>
       </table>
       </fieldset>
     <hr />
       <div id="panelDetalle" style="font-size:8pt;">
        <table id="tblDetalle" >
        </table>
        <div id="ptblDetalle">
            </div>
        <input type="hidden" id="ctblDetalle" name="ctblDetalle" value="" />
    </div>
    
    </div>
    <div id="printdoc"></div>
</body>
</html>
