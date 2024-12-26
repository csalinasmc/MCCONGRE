<%@ Page Language="VB" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage(Of DocumentsCR.RegisterModel)" %>

<asp:Content ID="registerTitle" ContentPlaceHolderID="TitleContent" runat="server"> Registrarse </asp:Content>

<asp:Content ID="registerContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2>Crear un documento nuevo</h2>
    <p>
        Use el formulario siguiente para crear una nueva cuenta. 
    </p>
    <p>
        Las contraseñas deben tener al menos <%: ViewData("PasswordLength") %> caracteres de largo.
    </p>

    <% Using Html.BeginForm() %>
        <%: Html.ValidationSummary(True, "La cuenta no se creó correctamente. Corrija los errores y vuelva a intentarlo.")%>
        <div>
            <fieldset>
                <legend>Información de la cuenta</legend>
                
                <div class="editor-label">
                    <%: Html.LabelFor(Function(m) m.UserName) %>
                </div>
                <div class="editor-field">
                    <%: Html.TextBoxFor(Function(m) m.UserName) %>
                    <%: Html.ValidationMessageFor(Function(m) m.UserName) %>
                </div>
                
                <div class="editor-label">
                    <%: Html.LabelFor(Function(m) m.Email) %>
                </div>
                <div class="editor-field">
                    <%: Html.TextBoxFor(Function(m) m.Email) %>
                    <%: Html.ValidationMessageFor(Function(m) m.Email) %>
                </div>
                
                <div class="editor-label">
                    <%: Html.LabelFor(Function(m) m.Password) %>
                </div>
                <div class="editor-field">
                    <%: Html.PasswordFor(Function(m) m.Password) %>
                    <%: Html.ValidationMessageFor(Function(m) m.Password) %>
                </div>
                
                <div class="editor-label">
                    <%: Html.LabelFor(Function(m) m.ConfirmPassword) %>
                </div>
                <div class="editor-field">
                    <%: Html.PasswordFor(Function(m) m.ConfirmPassword) %>
                    <%: Html.ValidationMessageFor(Function(m) m.ConfirmPassword) %>
                </div>
                
                <p>
                    <input type="submit" value="Registrarse" />
                </p>
            </fieldset>
        </div>
    <% End Using %>
</asp:Content>

