<%@ Page Language="C#" AutoEventWireup="true" CodeFile="UserInfoViewer.aspx.cs" Inherits="Admin_Modules_UserMgr_UserInfoViewer" EnableViewState="false" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>用户信息管理</title>
    <link rel="stylesheet" href="../../../Admin_Styles/<%=Request.Cookies["InterfaceStyle"].Value%>/dialog.css" />
    <script type="text/javascript">
        window.returnValue = true;
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="headerArea">
            <div class="header">
                查看用户信息</div>
            <div class="headerDesc">&nbsp;</div>
        </div>
        <div class="main">
            <table cellpadding="3" cellspacing="0" width="100%" border="0">
                <colgroup>
                    <col align="left" valign="baseline" width="50px" />
                    <col align="left" valign="top" width="145px" />
                    <col align="left" valign="baseline" width="50px" />
                    <col align="left" valign="top" />
                </colgroup>
                <tr>
                    <td>
                        登录ID</td>
                    <td>
                        <input readonly runat="server" type="text" id="txtUserLoginId" class="textBox"
                            style="width: 120px" /></td>
                    <td>
                        注册时间</td>
                    <td>
                        <input readonly runat="server" type="text" id="txtUserRegisterDate" class="textBox"
                            style="width: 120px" /></td>
                </tr>
                <tr>
                    <td>
                        姓名</td>
                    <td>
                        <input readonly runat="server" type="text" id="txtUserName" class="textBox"
                            style="width: 120px" /></td>
                    <td>
                        办公电话</td>
                    <td>
                        <input readonly runat="server" type="text" id="txtUserOfficePhone" class="textBox"
                            style="width: 120px" /></td>
                </tr>
                <tr>
                    <td>
                        性别</td>
                    <td>
                        <input readonly runat="server" type="text" id="txtUserSex" class="textBox"
                            style="width: 120px" /></td>
                    <td>
                        家庭电话</td>
                    <td>
                        <input readonly runat="server" type="text" id="txtUserFamilyPhone" class="textBox"
                            style="width: 120px" /></td>
                </tr>
                <tr>
                    <td>
                        出生日期</td>
                    <td>
                        <input readonly runat="server" type="text" id="txtUserBirthday"
                            class="textBox" style="width: 120px" /></td>
                    <td>
                        手机</td>
                    <td>
                        <input readonly runat="server" type="text" id="txtUserCellPhone" class="textBox"
                            style="width: 120px" /></td>
                </tr>
                <tr>
                    <td>
                        身份证号</td>
                    <td>
                        <input readonly runat="server" type="text" id="txtUserIdCard" class="textBox"
                            style="width: 120px" /></td>
                    <td>
                        Email</td>
                    <td>
                        <input readonly runat="server" type="text" id="txtUserEmail" class="textBox"
                            style="width: 120px" /></td>
                </tr>
                <tr>
                    <td>
                        是否禁用</td>
                    <td>
                        <input readonly runat="server" type="text" id="txtUserDisabled" class="textBox"
                            style="width: 120px"  /></td>
                    <td>
                        邮政编码</td>
                    <td>
                        <input readonly runat="server" type="text" id="txtUserZipCode" class="textBox"
                            style="width: 120px" /></td>
                </tr>
                <tr>
                    <td valign="top">
                        备注</td>
                    <td>
                        <textarea readonly runat="server" id="txtaUserRemark" class="textBox" style="width: 120px;
                            height: 60px"></textarea></td>
                    <td valign="top">
                        通讯住址</td>
                    <td>
                        <textarea readonly runat="server" id="txtaUserAddress" class="textBox" style="width: 120px;
                            height: 60px"></textarea></td>
                </tr>
            </table>
        </div>
        <div class="btnArea">
            <input type="button" class="button" id="btnCancel" value="关闭" onclick="window.close();" />
        </div>
    </form>
</body>
</html>
