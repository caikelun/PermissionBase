<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Roles.aspx.cs" Inherits="Admin_Modules_StaffMgr_Roles" EnableViewState="false" %>

<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>职员管理</title>
    <link rel="stylesheet" href="../../../Admin_Styles/<%=Request.Cookies["InterfaceStyle"].Value%>/dialog.css" />

    <script type="text/javascript" src="../../../Admin_Scripts/xmlHttpHelper.js"></script>

    <script type="text/javascript" src="../../../Admin_Scripts/message.js"></script>

    <script type="text/javascript" src="Scripts/roles.js"></script>

</head>
<body>
    <form id="form1" runat="server">
        <div class="headerArea">
            <div class="header" id="divTitleMess" runat="server">
                角色</div>
            <div class="headerDesc">
                请在要赋予当前职员的角色前打“√”。</div>
        </div>
        <div id="divDepartmentsTree" class="navTree" style="width: 380px; height: 411px">
            <iewc:TreeView ID="tvRoles" runat="server" SelectExpands="False" AutoSelect="True" Width="100%" Height="100%"
                DefaultStyle="font-size:12px;font-family:宋体" CommonFilesRoot="../../../Supports/IEWebControls/" ShowToolTip="False">
				<iewc:TreeNodeType ImageUrl="../../../Admin_Images/folder.gif" Type="roletype" ExpandedImageUrl="../../../Admin_Images/folderopen.gif"></iewc:TreeNodeType>
				<iewc:TreeNodeType ImageUrl="../../../Admin_Images/role.gif" Type="role"></iewc:TreeNodeType>
            </iewc:TreeView>
        </div>
        <div class="btnArea_2">
            <input type="button" class="button" id="btnSubmit" value="确定" onclick="btnSubmitClicked();" />&nbsp;<input
                type="button" class="button" id="btnCancel" value="取消" onclick="window.close();" />
        </div>
    </form>
</body>
</html>
