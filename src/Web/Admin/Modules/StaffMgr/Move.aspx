<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Move.aspx.cs" Inherits="Admin_Modules_StaffMgr_Move" EnableViewState="false" %>

<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>职员管理</title>
    <link rel="stylesheet" href="../../../Admin_Styles/<%=Request.Cookies["InterfaceStyle"].Value%>/dialog.css" />

    <script type="text/javascript" src="../../../Admin_Scripts/xmlHttpHelper.js"></script>

    <script type="text/javascript" src="../../../Admin_Scripts/message.js"></script>

    <script type="text/javascript" src="Scripts/move.js"></script>

</head>
<body>
    <form id="form1" runat="server">
        <div class="headerArea">
            <div class="header" id="divTitleMess" runat="server">
                移动职员</div>
            <div class="headerDesc">
                请选择您要移动到的目标父节点。</div>
        </div>
        <div id="divDepartmentsTree" class="navTree" style="width: 350px; height: 372px">
            <iewc:TreeView ID="tvDepartments" runat="server" SelectExpands="False" AutoSelect="True" Width="100%" Height="100%"
                DefaultStyle="font-size:12px;font-family:宋体" CommonFilesRoot="../../../Supports/IEWebControls/" ShowToolTip="False">
				<iewc:TreeNodeType ImageUrl="../../../Admin_Images/root.gif" Type="root"></iewc:TreeNodeType>
				<iewc:TreeNodeType ImageUrl="../../../Admin_Images/folder.gif" Type="department" ExpandedImageUrl="../../../Admin_Images/folderopen.gif"></iewc:TreeNodeType>
				<iewc:TreeNode Text="部门" Type="root"></iewc:TreeNode>
            </iewc:TreeView>
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