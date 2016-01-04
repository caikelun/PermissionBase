<%@ Page Language="C#" AutoEventWireup="true" CodeFile="NavBar.aspx.cs" Inherits="Admin_Frameset_NavBar"
    EnableViewState="false" %>

<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

    <script type="text/javascript" src="../../Admin_Scripts/killMouse.js"></script>

    <style type="text/css">
        *
        {
            font-size: 12px;
            font-family: 宋体;
        }
        body
        {
            margin:0px;
            overflow:hidden;
            background-color:ThreeDFace;
        }
        div.navArea
        {
	        overflow:auto;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div id="divTree" class="navArea">
            <iewc:TreeView ID="tvModules" runat="server" SelectExpands="True" AutoSelect="True"
                Width="100%" Height="100%" DefaultStyle="font-size:12px;font-family:宋体" CommonFilesRoot="../../Supports/IEWebControls/"
                ShowToolTip="False">
                <iewc:TreeNodeType ImageUrl="../../Admin_Images/folder.gif" ExpandedImageUrl="../../Admin_Images/folderopen.gif" Type="moduletype"></iewc:TreeNodeType>
                <iewc:TreeNodeType ImageUrl="../../Admin_Images/module.gif" Type="module"></iewc:TreeNodeType>
            </iewc:TreeView>
        </div>
    </form>
</body>
</html>
