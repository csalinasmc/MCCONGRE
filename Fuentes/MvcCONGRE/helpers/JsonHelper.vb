Imports System
Imports System.Collections.Generic
Imports System.Linq
Imports System.Web
'Imports System.Runtime.Serialization.Json
Imports System.Web.Script.Serialization
Imports System.IO
Imports System.Text
Public Class JsonHelper
    '<summary>
    ' JSON Serialization
    '</summary>

    Public Function JsonSerializer(Of T As {New, Class})(ByVal ot As T) As String
        Dim serializer As New JavaScriptSerializer()
        serializer.MaxJsonLength = 1000000000
        Return serializer.Serialize(ot)

    End Function

    Public Function JsonDeserialize(Of T As {New, Class})(ByVal jsonString As String) As T
        Dim serializer As New JavaScriptSerializer()
        serializer.MaxJsonLength = 1000000000
        Return serializer.Deserialize(Of T)(jsonString)

    End Function

    ' public static string JsonSerializer<T> (T t)
    ' {
    '     DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(T));
    '     MemoryStream ms = new MemoryStream();
    '     ser.WriteObject(ms, t);
    '     string jsonString = Encoding.UTF8.GetString(ms.ToArray());
    '     ms.Close();
    '     return jsonString;
    ' }  
    ''<summary>
    '' JSON Deserialization
    '' </summary>
    ' public static T JsonDeserialize<T> (string jsonString)
    ' {
    '     DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(T));
    '     MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jsonString));
    '     T obj = (T)ser.ReadObject(ms);
    '     return obj;
    ' }
End Class
