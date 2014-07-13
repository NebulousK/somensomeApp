<%@ page contentType="text/html;charset=euc-kr"  pageEncoding="euc-kr" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.Statement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>
<%
response.setHeader("Access-Control-Allow-Origin", "*");
response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");

String returnStr="";
String err="'err':''";
String movieList = "'movie_list':''";
Connection conn = null;
Statement stmt = null;
ResultSet rs = null;
try
{
    request.setCharacterEncoding("euc-kr");
   
    
    Class.forName("com.mysql.jdbc.Driver");

    conn = DriverManager.getConnection(
        "jdbc:mysql://127.0.0.1:3306/books?useUnicode=true&characterEncoding=euckr", 
        "scott", 
        "tiger");
    stmt = conn.createStatement();
    String sql = "select id,subject, movie_url from movies order by id desc";

    rs= stmt.executeQuery(sql);
    
    StringBuffer tempList = new StringBuffer();
    int i=0;
    while(rs.next())
    {
        if(i != 0)
        {
            tempList.append(",");
        }
        tempList.append("{'id':'").append(rs.getInt("id"))
                .append("','subject':'").append(rs.getString("subject"))
                .append("','movie_url':'").append(rs.getString("movie_url")).append("'}");
        i++;
    }
    
    if(i==0)
    {       
        tempList.append("{'id':'")
                .append("','subject':'")
                .append("','movie_url':''}");
    }
    movieList = "'movie_list':[" + tempList.toString() + "]";
}
catch(Exception ex)
{
    err = "'err': '¿À·ù" + ex.toString() + "'";
}
finally
{
    try{ rs.close();}catch(Exception exRs){}
    try{ stmt.close();}catch(Exception exStmt){}
    try{ conn.close();}catch(Exception exConn){}
}
returnStr = "{'data':{" + movieList + "," + err + "}}";

out.println(returnStr.replace('\'','\"').trim());
%>

