<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="Admin_Modules_ModuleMgr_Default" EnableViewState="false" %>

<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" href="../../../Admin_Styles/<%=Request.Cookies["InterfaceStyle"].Value%>/mainForm.css" />

    <script type="text/javascript" src="../../../Admin_Scripts/killMouse.js"></script>

    <script type="text/javascript" src="../../../Admin_Scripts/xmlHttpHelper.js"></script>

    <script type="text/javascript" src="../../../Admin_Scripts/treeviewHelper.js"></script>

    <script type="text/javascript" src="../../../Admin_Scripts/openDialogHelper.js"></script>

    <script type="text/javascript" src="../../../Admin_Scripts/message.js"></script>

    <script type="text/javascript" src="Scripts/default.js"></script>

</head>
<body>
    <form id="form1" runat="server">
        <div id="divToolBar" class="topBar">
            <div class="toolBar">
                <button runat="server" style="width: 80px" type="button" class="toolBarBtn" id="btnNewModuleType"
                    onclick="btnNewModuleTypeClicked()">
                    <img align="absMiddle" src="../../../Admin_Images/new.gif" />&nbsp;新增分类</button>
                <button runat="server" style="width: 80px" type="button" class="toolBarBtn" id="btnNewModule" onclick="btnNewModuleClicked()">
                    <img align="absMiddle" src="../../../Admin_Images/new.gif" />&nbsp;新增模块</button>
                <button runat="server" style="width: 58px" type="button" class="toolBarBtn" id="btnEdit" onclick="btnEditClicked()">
                    <img align="absMiddle" src="../../../Admin_Images/edit.gif" />&nbsp;编辑</button>
                <button runat="server" style="width: 58px" type="button" class="toolBarBtn" id="btnMove" onclick="btnMoveClicked()">
                    <img align="absMiddle" src="../../../Admin_Images/move.gif" />&nbsp;移动</button>
                <button runat="server" style="width: 58px" type="button" class="toolBarBtn" id="btnDelete" onclick="btnDeleteClicked()">
                    <img align="absMiddle" src="../../../Admin_Images/delete.gif" />&nbsp;删除</button>
            </div>
            <div class="moduleName">模块管理</div>
        </div>
        <div id="divModulesTree" class="navArea">
            <iewc:TreeView ID="tvModules" runat="server" SelectExpands="False" AutoSelect="True" Width="100%" Height="100%"
                DefaultStyle="font-size:12px;font-family:宋体" CommonFilesRoot="../../../Supports/IEWebControls/" ShowToolTip="False">
					<iewc:TreeNodeType ImageUrl="../../../Admin_Images/root.gif" Type="root"></iewc:TreeNodeType>
					<iewc:TreeNodeType ImageUrl="../../../Admin_Images/folder.gif" Type="moduletype" ExpandedImageUrl="../../../Admin_Images/folderopen.gif"></iewc:TreeNodeType>
					<iewc:TreeNodeType ImageUrl="../../../Admin_Images/module.gif" Type="module"></iewc:TreeNodeType>
					<iewc:TreeNode Text="模块分类" Type="root"></iewc:TreeNode>
            </iewc:TreeView>
        </div>
        <div id="divRoot" class="mainArea">
        </div>
        <div id="divModuleTypeInfo" class="mainArea">
            <table cellpadding="3" cellspacing="0" width="100%" border="0">
                <colgroup>
                    <col align="left" valign="baseline" width="50px" />
                    <col align="left" valign="top" />
                </colgroup>
                <tr>
                    <td>
                        名称</td>
                    <td>
                        <input readonly type="text" id="txtModuleTypeName" class="textBox" style="width: 300px" /></td>
                </tr>
                <tr>
                    <td>
                        排序ID</td>
                    <td>
                        <input readonly type="text" id="txtModuleTypeOrderId" class="textBox" style="width: 300px" /></td>
                </tr>
                <tr>
                    <td valign="top">
                        备注</td>
                    <td>
                        <textarea readonly id="txtaModuleTypeRemark" class="textBox" style="width: 300px;
                            height: 60px"></textarea></td>
                </tr>
            </table>
        </div>
        <div id="divModuleInfo" class="mainArea">
            <table cellpadding="3" cellspacing="0" width="100%" border="0">
                <colgroup>
                    <col align="left" valign="baseline" width="50px" />
                    <col align="left" valign="top" />
                </colgroup>
                <tr>
                    <td>
                        标示</td>
                    <td>
                        <input readonly type="text" id="txtModuleTag" class="textBox" style="width: 300px" /></td>
                </tr>
                <tr>
                    <td>
                        名称</td>
                    <td>
                        <input readonly type="text" id="txtModuleName" class="textBox" style="width: 300px" /></td>
                </tr>
                <tr>
                    <td>
                        排序ID</td>
                    <td>
                        <input readonly type="text" id="txtModuleOrderId" class="textBox" style="width: 300px" /></td>
                </tr>
                <tr>
                    <td valign="top">
                        备注</td>
                    <td>
                        <textarea readonly id="txtaModuleRemark" class="textBox" style="width: 300px; height: 60px"></textarea></td>
                </tr>
                <tr>
                    <td>
                        地址</td>
                    <td>
                        <input readonly type="text" id="txtModuleModuleUrl" class="textBox" style="width: 300px" /></td>
                </tr>
                <tr>
                    <td>
                        已禁用</td>
                    <td>
                        <input readonly type="text" id="txtModuleDisabled" class="redCheck" style="width: 300px" /></td>
                </tr>
                <tr>
                    <td valign="top">
                        权限</td>
                    <td>
                        <div id="divRights" runat="server" class="scrollArea" style="width: 300px; height: 160px">
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="divStatusBar" class="statusBar">
            <%=WebConfigCache.Signature%>
        </div>
    </form>
</body>
</html>