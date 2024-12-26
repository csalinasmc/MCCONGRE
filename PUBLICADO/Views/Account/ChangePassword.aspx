<%@ Page Language="VB" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage(Of DocumentsCR.ChangePasswordModel)" %>

<asp:Content ID="changePasswordTitle" ContentPlaceHolderID="TitleContent" runat="server"> Cambiar contraseña </asp:Content>

<asp:Content ID="changePasswordContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2>Cambiar contraseña</h2>
    <p>
        Use el formulario siguiente para cambiar la contraseña. 
    </p>
    <p>
        Las nuevas contraseñas deben tener al menos <%: ViewData("PasswordLength") %> caracteres.
    </p>

    <% Using Html.BeginForm() %>
        <%: Html.ValidationSummary(True, "La contraseña no se cambió correctamente. Corrija los errores y vuelva a intentarlo.")%>
        <div>
            <fieldset>
                <legend>Información de la cuenta</legend>
                
                <div class="editor-label">
                    <%: Html.LabelFor(Function(m) m.OldPassword) %>
                </div>
                <div class="editor-field">
                    <%: Html.PasswordFor(Function(m) m.OldPassword) %>
                    <%: Html.ValidationMessageFor(Function(m) m.OldPassword) %>
                </div>
                
                <div class="editor-label">
                    <%: Html.LabelFor(Function(m) m.NewPassword) %>
                </div>
                <div class="editor-field">
                    <%: Html.PasswordFor(Function(m) m.NewPassword) %>
                    <%: Html.ValidationMessageFor(Function(m) m.NewPassword) %>
                </div>
                
                <div class="editor-label">
                    <%: Html.LabelFor(Function(m) m.ConfirmPassword) %>
                </div>
                <div class="editor-field">
                    <%: Html.PasswordFor(Function(m) m.ConfirmPassword) %>
                    <%: Html.ValidationMessageFor(Function(m) m.ConfirmPassword) %>
                </div>
                
                <p>
                    <input type="submit" value="Cambiar contraseña" />
                </p>
            </fieldset>
        </div>
    <% End Using %>
</asp:Content>

