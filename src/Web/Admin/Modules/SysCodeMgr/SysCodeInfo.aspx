<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SysCodeInfo.aspx.cs" Inherits="Admin_Modules_SysCodeMgr_SysCodeInfo" EnableViewState="false" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>代码管理</title>
    <link rel="stylesheet" href="../../../Admin_Styles/<%=Request.Cookies["InterfaceStyle"].Value%>/dialog.css" />

    <script type="text/javascript" src="../../../Admin_Scripts/xmlHttpHelper.js"></script>

    <script type="text/javascript" src="../../../Admin_Scripts/stringHelper.js"></script>

    <script type="text/javascript" src="../../../Admin_Scripts/message.js"></script>

    <script type="text/javascript" src="Scripts/sysCodeInfo.js"></script>

</head>
<body>
    <form id="form1" runat="server">
        <div class="headerArea">
            <div class="header" id="divTitleMess" runat="server">
            </div>
            <div class="headerDesc">
                红色外框的输入项为必输项。“标示”不能重复。</div>
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
                        <input runat="server" type="text" id="txtSysCodeTag" maxlength="40" class="textBoxRed"
                            style="width: 300px" /></td>
                </tr>
                <tr>
                    <td>
                        名称</td>
                    <td>
                        <input runat="server" type="text" id="txtSysCodeName" maxlength="20" class="textBoxRed"
                            style="width: 300px" /></td>
                </tr>
                <tr>
                    <td>
                        排序ID</td>
                    <td>
                        <input runat="server" type="text" id="txtSysCodeOrderId" maxlength="9" class="textBoxRed"
                            style="width: 300px" /></td>
                </tr>
                <tr>
                    <td valign="top">
                        备注</td>
                    <td>
                        <textarea runat="server" id="txtaSysCodeRemark" class="textBox" style="width: 300px;
                            height: 60px"></textarea></td>
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
