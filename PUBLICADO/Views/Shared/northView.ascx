<%@ Control Language="VB" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import Namespace="DocumentsCR" %>

<style type="text/css">
    .auto-style1 {
        color: #0000CC;
        font-size: x-large;
    }
</style>

<%
    Dim nompers As String = ""
    Dim util As New Util
 If Not Session("DataUser") Is Nothing Then
    Dim objUser As DataUser
	objUser = DirectCast(Session("DataUser"), DataUser)
     nompers  = objUser.NomPers
 End If 
 
%>
<%--<table border="0" class="<%=iif(nompers <> "" And Not nompers Is DBNull.Value ,"barTitle","") %>" style="padding: 0px; margin: 0px;" cellspacing="0" cellpadding="0">
	<tr>
		<td><div class="ui-titleBar" id="div_titulo"></div></td>
		<td class="left">&nbsp;</td>
		<td class="center" style="width: 400px; text-align: center; vertical-align: middle;">
			<% If nompers <> "" And Not nompers Is DBNull.Value Then%>
			Bienvenido: <b><%=nompers%></b> 
			<br/> Fecha: <b><% =Now.ToShortDateString%></b> | <a title="Cerrar Sesi&oacute;n" href="<%=util.getLink("account/logout")%>" >Cerrar Sesi&oacute;n</a>
			<% End If%>
		</td>
	</tr>
</table>--%>
<table width="90%">
   
    <tr>
        <td width="12%">
           <%-- <marquee><img alt="" src="../../Content/img/logo_ministerio.png" /></marquee>--%>
            <img alt="" src="<%=util.getImage("logo_ministerio.png")%>" />
        </td>
        <td style="text-align:left; font-family: 'Bernard MT Condensed'; color: #5c9ccc;" width="75%" class="auto-style1">
            <em>Consulta de Viaticos
        </em>
        </td>
     
    </tr>
</table>