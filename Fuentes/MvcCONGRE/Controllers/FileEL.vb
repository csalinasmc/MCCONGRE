Public Class FileEL
    Private _NIDEXPPLAZOSFILE As Integer
    Private _COD_TRAMITE_INT As Integer
    Private _COD_TRAMITE_EXT As Integer
    Private _SNOMBREARCHIVO As String
    Private _NACTIVO As Integer

    Property NIDEXPPLAZOSFILE() As Integer
        Get
            Return _NIDEXPPLAZOSFILE
        End Get
        Set(ByVal value As Integer)
            _NIDEXPPLAZOSFILE = value
        End Set
    End Property

    Property COD_TRAMITE_INT() As Integer
        Get
            Return _COD_TRAMITE_INT
        End Get
        Set(ByVal value As Integer)
            _COD_TRAMITE_INT = value
        End Set
    End Property

    Property COD_TRAMITE_EXT() As Integer
        Get
            Return _COD_TRAMITE_EXT
        End Get
        Set(ByVal value As Integer)
            _COD_TRAMITE_EXT = value
        End Set
    End Property


    Property SNOMBREARCHIVO() As String
        Get
            Return _SNOMBREARCHIVO
        End Get
        Set(ByVal value As String)
            _SNOMBREARCHIVO = value
        End Set
    End Property

    Property NACTIVO() As Integer
        Get
            Return _NACTIVO
        End Get
        Set(ByVal value As Integer)
            _NACTIVO = value
        End Set
    End Property
End Class
