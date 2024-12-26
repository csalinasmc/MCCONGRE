<%@ Control Language="VB" Inherits="System.Web.Mvc.ViewUserControl" %>
<%-- La siguiente línea permitirá solucionar la advertencia del compilador de ASP.NET --%>
<%: ""%>
<%
    If Request.IsAuthenticated Then
    %>
        ¡Le damos la bienvenida<b><%: Page.User.Identity.Name %></b>!
        [ <%: Html.ActionLink("Cerrar sesión", "LogOff", "Account")%> ]
    <%
    Else
    %>
        [ <%: Html.ActionLink("Iniciar sesión", "LogOn", "Account")%> ]
    <%        
    End If
%>