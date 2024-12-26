Public Class DataUser
    Private _CodPers As String
    Private _NomPers As String
    Private _UserLogin As String
    Private _Passwd As String
    Private _CodUser As String
    Private _CodSesion As String
    Private _PcUser As String
    Private _Tipo As String

    Sub New()
        _CodPers = ""
        _NomPers = ""
        _UserLogin = ""
        _Passwd = ""
        _CodUser = ""
        _PcUser = ""
        _CodSesion = ""
        _Tipo = ""
    End Sub

    Public Property CodSesion
        Get
            Return _CodSesion
        End Get
        Set(ByVal value)
            _CodSesion = value
        End Set
    End Property

    Public Property PcUser()
        Get
            Return _PcUser
        End Get
        Set(ByVal value)
            _PcUser = value
        End Set
    End Property

    Public Property Tipo()
        Get
            Return _Tipo
        End Get
        Set(ByVal value)
            _Tipo = value
        End Set
    End Property

    Public Property CodUser()
        Get
            Return _CodUser
        End Get
        Set(ByVal value)
            _CodUser = value
        End Set
    End Property

    Public Property CodPers()
        Get
            Return _CodPers
        End Get
        Set(ByVal value)
            _CodPers = value
        End Set
    End Property

    Public Property NomPers()
        Get
            Return _NomPers
        End Get
        Set(ByVal value)
            _NomPers = value
        End Set
    End Property

    Public Property UserLogin()
        Get
            Return _UserLogin
        End Get
        Set(ByVal value)
            _UserLogin = value
        End Set
    End Property

    Public Property Passwd()
        Get
            Return _Passwd
        End Get
        Set(ByVal value)
            _Passwd = value
        End Set
    End Property

End Class
