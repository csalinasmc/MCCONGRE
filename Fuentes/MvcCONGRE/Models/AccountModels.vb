Imports System.ComponentModel
Imports System.ComponentModel.DataAnnotations
Imports System.Globalization

#Region "Models"
<PropertiesMustMatch("NewPassword", "ConfirmPassword", ErrorMessage:="La nueva contraseña y la contraseña de confirmación no coinciden.")> _
Public Class ChangePasswordModel
    Private oldPasswordValue As String
    Private newPasswordValue As String
    Private confirmPasswordValue As String

    <Required()> _
    <DataType(DataType.Password)> _
    <DisplayName("Contraseña actual")> _
    Public Property OldPassword() As String
        Get
            Return oldPasswordValue
        End Get
        Set(ByVal value As String)
            oldPasswordValue = value
        End Set
    End Property

    <Required()> _
    <ValidatePasswordLength()> _
    <DataType(DataType.Password)> _
    <DisplayName("Nueva contraseña")> _
    Public Property NewPassword() As String
        Get
            Return newPasswordValue
        End Get
        Set(ByVal value As String)
            newPasswordValue = value
        End Set
    End Property

    <Required()> _
    <DataType(DataType.Password)> _
    <DisplayName("Confirmar la nueva contraseña")> _
    Public Property ConfirmPassword() As String
        Get
            Return confirmPasswordValue
        End Get
        Set(ByVal value As String)
            confirmPasswordValue = value
        End Set
    End Property
End Class

Public Class LogOnModel
    Private userNameValue As String
    Private passwordValue As String
    Private rememberMeValue As Boolean

    <Required()> _
    <DisplayName("Nombre de usuario")> _
    Public Property UserName() As String
        Get
            Return userNameValue
        End Get
        Set(ByVal value As String)
            userNameValue = value
        End Set
    End Property

    <Required()> _
    <DataType(DataType.Password)> _
    <DisplayName("Contraseña")> _
    Public Property Password() As String
        Get
            Return passwordValue
        End Get
        Set(ByVal value As String)
            passwordValue = value
        End Set
    End Property

    <DisplayName("Recordar mi cuenta")> _
    Public Property RememberMe() As Boolean
        Get
            Return rememberMeValue
        End Get
        Set(ByVal value As Boolean)
            rememberMeValue = value
        End Set
    End Property
End Class

<PropertiesMustMatch("Password", "ConfirmPassword", ErrorMessage:="La contraseña y la contraseña de confirmación no coinciden.")> _
Public Class RegisterModel
    Private userNameValue As String
    Private passwordValue As String
    Private confirmPasswordValue As String
    Private emailValue As String

    <Required()> _
    <DisplayName("Nombre de usuario")> _
    Public Property UserName() As String
        Get
            Return userNameValue
        End Get
        Set(ByVal value As String)
            userNameValue = value
        End Set
    End Property

    <Required()> _
    <DataType(DataType.EmailAddress)> _
    <DisplayName("Dirección de correo electrónico")> _
    Public Property Email() As String
        Get
            Return emailValue
        End Get
        Set(ByVal value As String)
            emailValue = value
        End Set
    End Property

    <Required()> _
    <ValidatePasswordLength()> _
    <DataType(DataType.Password)> _
    <DisplayName("Contraseña")> _
    Public Property Password() As String
        Get
            Return passwordValue
        End Get
        Set(ByVal value As String)
            passwordValue = value
        End Set
    End Property

    <Required()> _
    <DataType(DataType.Password)> _
    <DisplayName("Confirmar contraseña")> _
    Public Property ConfirmPassword() As String
        Get
            Return confirmPasswordValue
        End Get
        Set(ByVal value As String)
            confirmPasswordValue = value
        End Set
    End Property
End Class
#End Region

#Region "Servicios"
' El tipo FormsAuthentication está sellado y contiene miembros estáticos, por lo que es difícil
' realizar pruebas unitarias en el código que llama a sus miembros. La interfaz y la clase auxiliar siguientes muestran
' cómo crear un contenedor abstracto en torno a un tipo como este para que puedan realizarse pruebas unitarias en el código de AccountController
' .

Public Interface IMembershipService
    ReadOnly Property MinPasswordLength() As Integer

    Function ValidateUser(ByVal userName As String, ByVal password As String) As Boolean
    Function CreateUser(ByVal userName As String, ByVal password As String, ByVal email As String) As MembershipCreateStatus
    Function ChangePassword(ByVal userName As String, ByVal oldPassword As String, ByVal newPassword As String) As Boolean
End Interface

Public Class AccountMembershipService
    Implements IMembershipService

    Private ReadOnly _provider As MembershipProvider

    Public Sub New()
        Me.New(Nothing)
    End Sub

    Public Sub New(ByVal provider As MembershipProvider)
        _provider = If(provider, Membership.Provider)
    End Sub

    Public ReadOnly Property MinPasswordLength() As Integer Implements IMembershipService.MinPasswordLength
        Get
            Return _provider.MinRequiredPasswordLength
        End Get
    End Property

    Public Function ValidateUser(ByVal userName As String, ByVal password As String) As Boolean Implements IMembershipService.ValidateUser
        If String.IsNullOrEmpty(userName) Then Throw New ArgumentException("El valor no puede ser NULL ni estar vacío.", "userName")
        If String.IsNullOrEmpty(password) Then Throw New ArgumentException("El valor no puede ser NULL ni estar vacío.", "password")

        Return _provider.ValidateUser(userName, password)
    End Function

    Public Function CreateUser(ByVal userName As String, ByVal password As String, ByVal email As String) As MembershipCreateStatus Implements IMembershipService.CreateUser
        If String.IsNullOrEmpty(userName) Then Throw New ArgumentException("El valor no puede ser NULL ni estar vacío.", "userName")
        If String.IsNullOrEmpty(password) Then Throw New ArgumentException("El valor no puede ser NULL ni estar vacío.", "password")
        If String.IsNullOrEmpty(email) Then Throw New ArgumentException("El valor no puede ser NULL ni estar vacío.", "email")

        Dim status As MembershipCreateStatus
        _provider.CreateUser(userName, password, email, Nothing, Nothing, True, Nothing, status)
        Return status
    End Function

    Public Function ChangePassword(ByVal userName As String, ByVal oldPassword As String, ByVal newPassword As String) As Boolean Implements IMembershipService.ChangePassword
        If String.IsNullOrEmpty(userName) Then Throw New ArgumentException("El valor no puede ser NULL ni estar vacío.", "username")
        If String.IsNullOrEmpty(oldPassword) Then Throw New ArgumentException("El valor no puede ser NULL ni estar vacío.", "oldPassword")
        If String.IsNullOrEmpty(newPassword) Then Throw New ArgumentException("El valor no puede ser NULL ni estar vacío.", "newPassword")

        ' El elemento ChangePassword() subyacente iniciará una excepción en lugar de
        ' devolver false en determinados escenarios de error.
        Try
            Dim currentUser As MembershipUser = _provider.GetUser(userName, True)
            Return currentUser.ChangePassword(oldPassword, newPassword)
        Catch ex As ArgumentException
            Return False
        Catch ex As MembershipPasswordException
            Return False
        End Try
    End Function
End Class

Public Interface IFormsAuthenticationService
    Sub SignIn(ByVal userName As String, ByVal createPersistentCookie As Boolean)
    Sub SignOut()
End Interface

Public Class FormsAuthenticationService
    Implements IFormsAuthenticationService

    Public Sub SignIn(ByVal userName As String, ByVal createPersistentCookie As Boolean) Implements IFormsAuthenticationService.SignIn
        If String.IsNullOrEmpty(userName) Then Throw New ArgumentException("El valor no puede ser NULL ni estar vacío.", "userName")

        FormsAuthentication.SetAuthCookie(userName, createPersistentCookie)
    End Sub

    Public Sub SignOut() Implements IFormsAuthenticationService.SignOut
        FormsAuthentication.SignOut()
    End Sub
End Class
#End Region

#Region "Validación"
Public NotInheritable Class AccountValidation
    Public Shared Function ErrorCodeToString(ByVal createStatus As MembershipCreateStatus) As String
        ' Vaya a http://go.microsoft.com/fwlink/?LinkID=177550 para
        ' obtener una lista completa de códigos de estado.
        Select Case createStatus
            Case MembershipCreateStatus.DuplicateUserName
                Return "El nombre de usuario ya existe. Escriba otro nombre de usuario."

            Case MembershipCreateStatus.DuplicateEmail
                Return "Ya existe un nombre de usuario para esa dirección de correo electrónico. Especifique otra dirección de correo electrónico."

            Case MembershipCreateStatus.InvalidPassword
                Return "La contraseña especificada no es válida. Escriba un valor de contraseña válido."

            Case MembershipCreateStatus.InvalidEmail
                Return "La dirección de correo electrónico especificada no es válida. Compruebe el valor e inténtelo de nuevo."

            Case MembershipCreateStatus.InvalidAnswer
                Return "La respuesta de recuperación de la contraseña especificada no es válida. Compruebe el valor e inténtelo de nuevo."

            Case MembershipCreateStatus.InvalidQuestion
                Return "La pregunta de recuperación de la contraseña especificada no es válida. Compruebe el valor e inténtelo de nuevo."

            Case MembershipCreateStatus.InvalidUserName
                Return "El nombre de usuario especificado no es válido. Compruebe el valor e inténtelo de nuevo."

            Case MembershipCreateStatus.ProviderError
                Return "El proveedor de autenticación devolvió un error. Compruebe los datos especificados e inténtelo de nuevo. Si el problema continúa, póngase en contacto con el administrador del sistema."

            Case MembershipCreateStatus.UserRejected
                Return "La solicitud de creación de usuario se ha cancelado. Compruebe los datos especificados e inténtelo de nuevo. Si el problema continúa, póngase en contacto con el administrador del sistema."

            Case Else
                Return "Error desconocido. Compruebe los datos especificados e inténtelo de nuevo. Si el problema continúa, póngase en contacto con el administrador del sistema."
        End Select
    End Function
End Class

<AttributeUsage(AttributeTargets.Class, AllowMultiple:=True, Inherited:=False)> _
Public NotInheritable Class PropertiesMustMatchAttribute
    Inherits ValidationAttribute

    Private Const _defaultErrorMessage As String = "'{0}' y '{1}' no coinciden."
    Private ReadOnly _confirmProperty As String
    Private ReadOnly _originalProperty As String
    Private ReadOnly _typeId As New Object()

    Public Sub New(ByVal originalProperty As String, ByVal confirmProperty As String)
        MyBase.New(_defaultErrorMessage)

        _originalProperty = originalProperty
        _confirmProperty = confirmProperty
    End Sub

    Public ReadOnly Property ConfirmProperty() As String
        Get
            Return _confirmProperty
        End Get
    End Property

    Public ReadOnly Property OriginalProperty() As String
        Get
            Return _originalProperty
        End Get
    End Property

    Public Overrides ReadOnly Property TypeId() As Object
        Get
            Return _typeId
        End Get
    End Property

    Public Overrides Function FormatErrorMessage(ByVal name As String) As String
        Return String.Format(CultureInfo.CurrentUICulture, ErrorMessageString, OriginalProperty, ConfirmProperty)
    End Function

    Public Overrides Function IsValid(ByVal value As Object) As Boolean
        Dim properties As PropertyDescriptorCollection = TypeDescriptor.GetProperties(value)
        Dim originalValue = properties.Find(OriginalProperty, True).GetValue(value)
        Dim confirmValue = properties.Find(ConfirmProperty, True).GetValue(value)
        Return Object.Equals(originalValue, confirmValue)
    End Function
End Class

<AttributeUsage(AttributeTargets.Field Or AttributeTargets.Property, AllowMultiple:=False, Inherited:=True)> _
Public NotInheritable Class ValidatePasswordLengthAttribute
    Inherits ValidationAttribute

    Private Const _defaultErrorMessage As String = "'{0}' debe tener al menos {1} caracteres."
    Private ReadOnly _minCharacters As Integer = Membership.Provider.MinRequiredPasswordLength

    Public Sub New()
        MyBase.New(_defaultErrorMessage)
    End Sub

    Public Overrides Function FormatErrorMessage(ByVal name As String) As String
        Return String.Format(CultureInfo.CurrentUICulture, ErrorMessageString, name, _minCharacters)
    End Function

    Public Overrides Function IsValid(ByVal value As Object) As Boolean
        Dim valueAsString As String = TryCast(value, String)
        Return (valueAsString IsNot Nothing) AndAlso (valueAsString.Length >= _minCharacters)
    End Function
End Class
#End Region
