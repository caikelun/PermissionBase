<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="Admin_Modules_ChangeMyPwd_Default" EnableViewState="false"  %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" href="../../../Admin_Styles/<%=Request.Cookies["InterfaceStyle"].Value%>/mainForm.css" />


    <script type="text/javascript" src="../../../Admin_Scripts/killMouse.js"></script>

    <script type="text/javascript" src="../../../Admin_Scripts/xmlHttpHelper.js"></script>

    <script type="text/javascript" src="../../../Admin_Scripts/stringHelper.js"></script>

    <script type="text/javascript" src="../../../Admin_Scripts/message.js"></script>

    <script type="text/javascript" src="Scripts/default.js"></script>

</head>
<body>
    <form id="form1" runat="server">
        <div id="divToolBar" class="topBar">
            <div class="toolBar">
            </div>
            <div class="moduleName">
                修改密码</div>
        </div>
        <div id="divMain" class="crossMainArea">
            <div style="padding:15px">
                <table cellpadding="5" cellspacing="0" border="0">
                    <colgroup>
                        <col align="left" valign="baseline" width="60px" />
                        <col align="left" valign="top" />
                    </colgroup>
                    <tr>
                        <td>
                            原密码</td>
                        <td>
                            <input type="password" id="txtOldPassword" class="textBox" style="width: 300px" /></td>
                    </tr>
                    <tr>
                        <td>
                            新密码</td>
                        <td>
                            <input type="password" id="txtNewPassword" class="textBox" style="width: 300px" /></td>
                    </tr>
                    <tr>
                        <td>
                            新密码确认</td>
                        <td>
                            <input type="password" id="txtReNewPassword" class="textBox" style="width: 300px" /></td>
                    </tr>
                    <tr>
                        <td align="center" colspan="2">
                            <div id="divAlertMess" class="alert">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" colspan="2">
                            <input type="button" class="button" id="btnSubmit" value="确定" onclick="btnSubmitClicked();" /></td>
                    </tr>
                </table>
            </div>
        </div>
        <div id="divStatusBar" class="statusBar">
            <%=WebConfigCache.Signature%>
        </div>
    </form>
</body>
</html>
