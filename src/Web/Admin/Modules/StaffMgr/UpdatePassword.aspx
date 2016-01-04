<%@ Page Language="C#" AutoEventWireup="true" CodeFile="UpdatePassword.aspx.cs" Inherits="Admin_Modules_StaffMgr_UpdatePassword" EnableViewState="false" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>职员管理</title>
    <link rel="stylesheet" href="../../../Admin_Styles/<%=Request.Cookies["InterfaceStyle"].Value%>/dialog.css" />

    <script type="text/javascript" src="../../../Admin_Scripts/xmlHttpHelper.js"></script>

    <script type="text/javascript" src="../../../Admin_Scripts/stringHelper.js"></script>

    <script type="text/javascript" src="../../../Admin_Scripts/message.js"></script>

    <script type="text/javascript" src="Scripts/updatePassword.js"></script>

</head>
<body>
    <form id="form1" runat="server">
        <div class="headerArea">
            <div class="header" id="divTitleMess" runat="server">
                修改密码</div>
            <div class="headerDesc">
                红色外框的输入项为必输项。“密码”长度必须大于等于 6 位。</div>
        </div>
        <div class="main">
            <table cellpadding="3" cellspacing="0" width="100%" border="0">
                <colgroup>
                    <col align="left" valign="baseline" width="55px" />
                    <col align="left" valign="top" />
                </colgroup>
                <tr>
                    <td>
                        密码</td>
                    <td>
                        <input type="password" id="txtPassword" maxlength="20" class="textBoxRed"
                            style="width: 300px" /></td>
                </tr>
                <tr>
                    <td>
                        密码确认</td>
                    <td>
                        <input type="password" id="txtRePassword" maxlength="20" class="textBoxRed"
                            style="width: 300px" /></td>
                </tr>
            </table>
        </div>
        <div id="divAlertMess" class="alert">
        </div>
        <div class="btnArea">
            <input type="button" class="button" id="btnSubmit" value="确定" onclick="btnSubmitClicked();" />&nbsp;<input
                type="button" class="button" id="btnCancel" value="取消" onclick="window.close();" />
        </div>
    </form>
</body>
</html>
