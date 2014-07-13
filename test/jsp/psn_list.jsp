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
String psnList = "'psn_list':''";
Connection conn = null;
Statement stmt = null;
ResultSet rs = null;
try
{
    request.setCharacterEncoding("euc-kr");
    String userName = request.getParameter("user_name");
    
    Class.forName("com.mysql.jdbc.Driver");

    conn = DriverManager.getConnection(
        "jdbc:mysql://127.0.0.1:3306/books?useUnicode=true&characterEncoding=euckr", 
        "scott", 
        "tiger");
    stmt = conn.createStatement();
    String sql = "select user_id, user_name, tel from users where user_name like '%" + 
                  userName + 
                  "%'  order by user_name";

    rs= stmt.executeQuery(sql);
    
    StringBuffer tempList = new StringBuffer();
    int i=0;
    while(rs.next())
    { 
        if(i != 0)
        {
            tempList.append(",");
        }
        
        tempList.append("{'user_id':'").append(rs.getString("user_id"))
                .append("','user_name':'").append(rs.getString("user_name"))
                .append("','tel':'").append(rs.getString("tel")).append("'}");
        i++;
    }
    
    if(i==0)
    {       
        err = "'err': '해당 직원이 존재하지 않습니다.'";
    }
    psnList = "'psn_list':[" + tempList.toString() + "]";
}
catch(Exception ex)
{
    err = "'err': '오류.. 적절히 처리'";
}
finally
{
    try{ rs.close();}catch(Exception exRs){}
    try{ stmt.close();}catch(Exception exStmt){}
    try{ conn.close();}catch(Exception exConn){}
}
returnStr = "{'data':{" + psnList + "," + err + "}}";

out.println(returnStr.replace('\'','\"').trim());
%>

