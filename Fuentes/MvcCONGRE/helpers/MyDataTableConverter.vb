Public Class MyDataTableConverter
    Public Function GetJson(ByVal dt As DataTable) As String

        Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
        Dim rows As New List(Of Dictionary(Of String, Object))()
        Dim row As Dictionary(Of String, Object) = Nothing
        For Each dr As DataRow In dt.Rows
            row = New Dictionary(Of String, Object)()
            For Each dc As DataColumn In dt.Columns
                'If dc.ColumnName.Trim() = "ds_linea" Then
                row.Add(dc.ColumnName.Trim(), dr(dc))
                ' End If
            Next
            rows.Add(row)
        Next
        serializer.MaxJsonLength = 1000000000
        Return serializer.Serialize(rows)
    End Function

    Public Function GetJson_ofDataset(ByVal ds As DataSet) As String

        Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
        Dim list As New List(Of Object)()
        For Each dt As DataTable In ds.Tables
            Dim rows As New List(Of Dictionary(Of String, Object))()
            Dim row As Dictionary(Of String, Object) = Nothing
            For Each dr As DataRow In dt.Rows
                row = New Dictionary(Of String, Object)()
                For Each dc As DataColumn In dt.Columns
                    'If dc.ColumnName.Trim() = "ds_linea" Then
                    row.Add(dc.ColumnName.Trim(), dr(dc))
                    ' End If
                Next
                rows.Add(row)
            Next
            list.Add(rows)
        Next
        
        serializer.MaxJsonLength = 1000000000
        Return serializer.Serialize(list)
    End Function

End Class