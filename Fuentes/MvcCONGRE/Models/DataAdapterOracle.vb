Imports Oracle.DataAccess.Client

Public Class DataAdapterOracle
    Private driver As String = ConfigurationManager.ConnectionStrings("ConnectionOracle").ConnectionString.ToString

    Private driverSGD As String = ConfigurationManager.ConnectionStrings("ConnectionOracleSGD").ConnectionString.ToString
    Private cnOrcl As OracleConnection = Nothing

    Private Sub initDB()
        If Me.cnOrcl Is Nothing Then
            Try
                Me.cnOrcl = New OracleConnection(Me.driver)
                Me.cnOrcl.Open()
            Catch exp As Exception
                Throw exp
            End Try

        End If
    End Sub
    Private Sub initDB_SGD()
        If Me.cnOrcl Is Nothing Then
            Try
                Me.cnOrcl = New OracleConnection(Me.driverSGD)
                Me.cnOrcl.Open()
            Catch exp As Exception
                Throw exp
            End Try

        End If
    End Sub
    Private Sub closeDB()

        If Me.cnOrcl.State = ConnectionState.Open Then
            Me.cnOrcl.Close()
        End If
        Me.cnOrcl = Nothing

    End Sub


    Public Function executeProcedure(ByVal _Store As String) As String
        Dim _return As String = ""
        Try
            initDB()
            Dim cmd As New OracleCommand
            Dim da As New OracleDataAdapter
            Dim SqlQuery As String = ""
            cmd.Connection = cnOrcl
            cmd.CommandText = _Store
            cmd.ExecuteNonQuery()
            _return = "Ok"

        Catch ex As Exception
            Throw New Exception(ex.Message)
            _return = ":("
        Finally
            closeDB()
        End Try
        Return _return
    End Function

    Public Function ReturnData(ByVal _Store As String, ByVal _ParamArr As ArrayList) As String
        Dim _return As String = ""


        Dim nomPrmtr As String = ""
        Dim valPrmtr As String = ""
        Dim strParam As String = ""
        Dim cn As New OracleConnection(Me.driver)
        If (_Store.Substring(0, 6) = "IDOSGD") Then
            cn = New OracleConnection(Me.driverSGD)
        End If
        Dim da As New OracleDataAdapter(_Store, cn)
        With da.SelectCommand
            .CommandType = CommandType.StoredProcedure


            For Each element In _ParamArr
                nomPrmtr = element(0)
                valPrmtr = IIf(element(1) = Nothing, "", element(1))
                .Parameters.Add(nomPrmtr, valPrmtr)
                strParam += "{" + nomPrmtr + " : " + valPrmtr + "}"
            Next

            .Parameters.Add("P_RESULTADO", OracleDbType.RefCursor).Direction = ParameterDirection.Output

        End With

        'Dim log As New Log

        'log.WriteLog(da.SelectCommand.CommandText)

        Dim ds As New DataSet

        Try
            da.Fill(ds)
            Dim Covrttbl As New MyDataTableConverter
            _return = Covrttbl.GetJson(ds.Tables(0))

        Catch ex As Exception
            Throw New Exception(ex.Message)
            _return = ex.Message
        Finally

        End Try
        'log.WriteLog(_return)
        Return _return
    End Function



    Public Function ExecuteText(ByVal qry As String) As String
        Dim _return As String = ""
        Dim nomPrmtr As String = ""
        Dim valPrmtr As String = ""
        Dim strParam As String = ""
        Dim cn As New OracleConnection(Me.driver)

        Dim da As New OracleDataAdapter(qry, cn)
        da.SelectCommand.CommandType = CommandType.Text



        Dim log As New Log

        log.WriteLog(da.SelectCommand.CommandText)

        Dim ds As New DataSet

        Try
            da.Fill(ds)
            Dim Covrttbl As New MyDataTableConverter
            _return = Covrttbl.GetJson(ds.Tables(0))

        Catch ex As Exception
            Throw New Exception(ex.Message)
            _return = ex.Message
        Finally

        End Try
        'log.WriteLog(_return)
        Return _return
    End Function


    Public Function ReturnDataTableDirect(ByVal _TableName As String) As DataTable
        Dim _return As String = ""




        Dim cn As New OracleConnection(Me.driver)
        Try
            Dim da As New OracleDataAdapter(_TableName, cn)
            da.SelectCommand.CommandType = CommandType.TableDirect


            Dim ds As New DataSet


            da.Fill(ds)


            Return ds.Tables(0)
        Catch exOrcl As OracleException
            cn.Close()

            Throw exOrcl

        Catch ex As Exception
            cn.Close()

            Throw ex
        End Try


    End Function
    Public Function ReturnDataTable(ByVal _Store As String, ByVal _ParamArr As ArrayList) As DataTable
        Dim _return As String = ""


        Dim nomPrmtr As String = ""
        Dim valPrmtr As String = ""
        Dim log As New Log
        Dim strParam As String = ""
        Dim cn As New OracleConnection(Me.driver)
        If (_Store.Substring(0, 6) = "IDOSGD") Then
            cn = New OracleConnection(Me.driverSGD)
        End If
        Try
            Dim da As New OracleDataAdapter(_Store, cn)
            With da.SelectCommand
                .CommandType = CommandType.StoredProcedure


                For Each element In _ParamArr
                    nomPrmtr = element(0)
                    valPrmtr = IIf(element(1) = Nothing, "", element(1))
                    .Parameters.Add(nomPrmtr, valPrmtr)
                    strParam += "{" + nomPrmtr + " : " + valPrmtr + "}"
                Next

                .Parameters.Add("P_RESULTADO", OracleDbType.RefCursor).Direction = ParameterDirection.Output

            End With



            'log.WriteLog(da.SelectCommand.CommandText + " parametros " + strParam)

            Dim ds As New DataSet


            da.Fill(ds)


            Return ds.Tables(0)
        Catch exOrcl As OracleException
            cn.Close()
            log.WriteLog(exOrcl.Message)
            Throw exOrcl

        Catch ex As Exception
            cn.Close()
            log.WriteLog(ex.Message)
            Throw ex
        End Try


    End Function

    Public Function ReturnDataSet(ByVal _Store As String, ByVal _ParamArr As ArrayList) As DataSet
        Dim _return As String = ""


        Dim nomPrmtr As String = ""
        Dim valPrmtr As String = ""
        Dim log As New Log
        Dim strParam As String = ""
        Dim cn As New OracleConnection(Me.driver)
        Try
            Dim da As New OracleDataAdapter(_Store, cn)
            With da.SelectCommand
                .CommandType = CommandType.StoredProcedure


                For Each element In _ParamArr
                    nomPrmtr = element(0)
                    valPrmtr = IIf(element(1) = Nothing, "", element(1))
                    .Parameters.Add(nomPrmtr, valPrmtr)
                    strParam += "{" + nomPrmtr + " : " + valPrmtr + "}"
                Next

                .Parameters.Add("P_RESULTADO1", OracleDbType.RefCursor).Direction = ParameterDirection.Output
                .Parameters.Add("P_RESULTADO2", OracleDbType.RefCursor).Direction = ParameterDirection.Output

            End With



            'log.WriteLog(da.SelectCommand.CommandText + " parametros " + strParam)

            Dim ds As New DataSet


            da.Fill(ds)


            Return ds
        Catch exOrcl As OracleException
            cn.Close()
            log.WriteLog(exOrcl.Message)
            Throw exOrcl

        Catch ex As Exception
            cn.Close()
            log.WriteLog(ex.Message)
            Throw ex
        End Try


    End Function
    Public Function ExecProcedure(ByVal _Store As String, ByVal _ParamArr As ArrayList) As String
        Dim _return As String = ""


        Dim nomPrmtr As String = ""
        Dim valPrmtr As String = ""
        Dim cn As New OracleConnection(Me.driver)
        Dim log As New Log
        Dim strParam As String = ""
        Try


            Dim cmd As New OracleCommand(_Store, cn)
            cmd.CommandType = CommandType.StoredProcedure
            With cmd.Parameters


                For Each element In _ParamArr
                    nomPrmtr = element(0)
                    valPrmtr = IIf(element(1) = Nothing, "", element(1))
                    .Add(nomPrmtr, valPrmtr.ToUpper)
                    strParam += "{" + nomPrmtr + " : " + valPrmtr + "}"
                Next

                .Add("l_resultado", OracleDbType.Varchar2, 1000, DBNull.Value, ParameterDirection.Output)

            End With



            'log.WriteLog(cmd.CommandText + " parametros " + strParam)



            cn.Open()
            cmd.ExecuteNonQuery()
            _return = Convert.ToString(cmd.Parameters("l_resultado").Value)


            log.WriteLog(_return)

            Return _return

        Catch exOrcl As OracleException
            cn.Close()
            log.WriteLog(exOrcl.Message)
            Throw exOrcl

        Catch ex As Exception
            cn.Close()
            log.WriteLog(ex.Message)
            Throw ex
        End Try

    End Function

    Public Function InsertFile(ByVal files As IList(Of FileEL), ByVal sesion As Int64) As String
        Dim _return As String = ""


        Dim nomPrmtr As String = ""
        Dim valPrmtr As String = ""
        Dim cn As New OracleConnection(Me.driver)
        Dim log As New Log
        Dim strParam As String = ""
        Try


            Dim cmd As New OracleCommand("MCCONGRE.pkg_documentscr.sp_insarchivos", cn)
            cmd.CommandType = CommandType.StoredProcedure
            'With cmd.Parameters

            '.Add("P_XMLFILES", OracleDbType.XmlType, Funciones.ConvertObjectToXMLString(files), ParameterDirection.Input)

            ' .Add("P_NSESION", OracleDbType.Int64, sesion, ParameterDirection.Input)

            '  End With







            cn.Open()
            cmd.ExecuteNonQuery()





            Return "OK"

        Catch exOrcl As OracleException
            cn.Close()

            Throw exOrcl

        Catch ex As Exception
            cn.Close()

            Throw ex
        End Try

    End Function
End Class
