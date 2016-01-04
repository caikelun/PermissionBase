<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Permissions.aspx.cs" Inherits="Admin_Modules_StaffMgr_Permissions" EnableViewState="false" %>

<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>职员管理</title>
    <link rel="stylesheet" href="../../../Admin_Styles/<%=Request.Cookies["InterfaceStyle"].Value%>/dialog.css" />

    <script type="text/javascript" src="../../../Admin_Scripts/xmlHttpHelper.js"></script>

    <script type="text/javascript" src="../../../Admin_Scripts/message.js"></script>

    <script type="text/javascript" src="Scripts/permissions.js"></script>

</head>
<body>
    <form id="form1" runat="server">
        <div class="headerArea">
            <div class="header">
                职员授权</div>
            <div class="headerDesc">
                蓝色“√”表示肯定授权，红色“╳”表示否定授权。</div>
        </div>
        <div id="divRightsTree" class="navTree" style="width: 380px; height: 411px">
            <iewc:TreeView ID="tvRights" runat="server" SelectExpands="True" AutoSelect="True" Width="100%" Height="100%"
                DefaultStyle="font-size:12px;font-family:宋体" CommonFilesRoot="../../../Supports/IEWebControls/" ShowToolTip="False">
				<iewc:TreeNodeType ImageUrl="../../../Admin_Images/folder.gif" Type="moduletype" ExpandedImageUrl="../../../Admin_Images/folderopen.gif"></iewc:TreeNodeType>
				<iewc:TreeNodeType ImageUrl="../../../Admin_Images/module.gif" Type="module"></iewc:TreeNodeType>
				<iewc:TreeNodeType ImageUrl="../../../Admin_Images/grant.gif" Type="grant"></iewc:TreeNodeType>
				<iewc:TreeNodeType ImageUrl="../../../Admin_Images/deny.gif" Type="deny"></iewc:TreeNodeType>
            </iewc:TreeView>
        </div>
        <div class="btnArea_2">
            <input type="button" class="button" id="btnSubmit" value="确定" onclick="btnSubmitClicked();" />&nbsp;<input
                type="button" class="button" id="btnCancel" value="取消" onclick="window.close();" />
        </div>
    </form>
</body>
</html>