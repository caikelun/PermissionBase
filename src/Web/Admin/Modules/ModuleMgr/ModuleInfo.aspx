<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ModuleInfo.aspx.cs" Inherits="Admin_Modules_ModuleMgr_ModuleInfo" EnableViewState="false" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>模块管理</title>
    <link rel="stylesheet" href="../../../Admin_Styles/<%=Request.Cookies["InterfaceStyle"].Value%>/dialog.css" />

    <script type="text/javascript" src="../../../Admin_Scripts/xmlHttpHelper.js"></script>

    <script type="text/javascript" src="../../../Admin_Scripts/stringHelper.js"></script>

    <script type="text/javascript" src="../../../Admin_Scripts/message.js"></script>

    <script type="text/javascript" src="Scripts/moduleInfo.js"></script>

</head>
<body>
    <form id="form1" runat="server">
        <div class="headerArea">
            <div class="header" id="divTitleMess" runat="server">
            </div>
            <div class="headerDesc">
                红色外框的输入项为必输项。</div>
        </div>
        <div class="main">
            <table cellpadding="3" cellspacing="0" width="100%" border="0">
                <colgroup>
                    <col align="left" valign="baseline" width="50px" />
                    <col align="left" valign="top" />
                </colgroup>
                <tr>
                    <td>
                        标示</td>
                    <td>
                        <input runat="server" type="text" id="txtModuleTag" maxlength="40" class="textBoxRed" style="width: 300px" /></td>
                </tr>
                <tr>
                    <td>
                        名称</td>
                    <td>
                        <input runat="server" type="text" id="txtModuleName" maxlength="20" class="textBoxRed" style="width: 300px" /></td>
                </tr>
                <tr>
                    <td>
                        排序ID</td>
                    <td>
                        <input runat="server" type="text" id="txtModuleOrderId" maxlength="9" class="textBoxRed" style="width: 300px" /></td>
                </tr>
                <tr>
                    <td valign="top">
                        备注</td>
                    <td>
                        <textarea runat="server" id="txtaModuleRemark" class="textBox" style="width: 300px; height: 35px"></textarea></td>
                </tr>
                <tr>
                    <td>
                        地址</td>
                    <td>
                        <input runat="server" type="text" id="txtModuleModuleUrl" maxlength="200" class="textBox" style="width: 300px" /></td>
                </tr>
                <tr>
                    <td>
                        已禁用</td>
                    <td>
                        <input runat="server" type="checkbox" id="cbModuleDisabled" /></td>
                </tr>
                <tr>
                    <td valign="top">
                        权限</td>
                    <td>
                        <div id="divRights" runat="server" class="scrollArea" style="width: 300px; height: 180px">
                        </div>
                    </td>
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
