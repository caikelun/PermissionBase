<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="Admin_Modules_StaffMgr_Default" EnableViewState="false" %>

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
                <button runat="server" style="width: 58px" type="button" class="toolBarBtn" id="btnNew" onclick="btnNewClicked()">
                    <img align="absMiddle" src="../../../Admin_Images/new.gif" />&nbsp;新增</button>
                <button runat="server" style="width: 58px" type="button" class="toolBarBtn" id="btnEdit" onclick="btnEditClicked()">
                    <img align="absMiddle" src="../../../Admin_Images/edit.gif" />&nbsp;编辑</button>
                <button runat="server" style="width: 80px" type="button" class="toolBarBtn" id="btnEditPassword" onclick="btnEditPasswordClicked()">
                    <img align="absMiddle" src="../../../Admin_Images/editpassword.gif" />&nbsp;修改密码</button>
                <button runat="server" style="width: 58px" type="button" class="toolBarBtn" id="btnMove" onclick="btnMoveClicked()">
                    <img align="absMiddle" src="../../../Admin_Images/move.gif" />&nbsp;移动</button>
                <button runat="server" style="width: 58px" type="button" class="toolBarBtn" id="btnRole" onclick="btnRoleClicked()">
                    <img align="absMiddle" src="../../../Admin_Images/role.gif" />&nbsp;角色</button>
                <button runat="server" style="width: 58px" type="button" class="toolBarBtn" id="btnPermission" onclick="btnPermissionClicked()">
                    <img align="absMiddle" src="../../../Admin_Images/permission.gif" />&nbsp;授权</button>
                <button runat="server" style="width: 58px" type="button" class="toolBarBtn" id="btnDelete" onclick="btnDeleteClicked()">
                    <img align="absMiddle" src="../../../Admin_Images/delete.gif" />&nbsp;删除</button>
            </div>
            <div class="moduleName">职员管理</div>
        </div>
        <div id="divDepartmentsTree" class="navArea">
            <iewc:TreeView ID="tvDepartments" runat="server" SelectExpands="False" AutoSelect="True" Width="100%" Height="100%"
                DefaultStyle="font-size:12px;font-family:宋体" CommonFilesRoot="../../../Supports/IEWebControls/" ShowToolTip="False">
					<iewc:TreeNodeType ImageUrl="../../../Admin_Images/root.gif" Type="root"></iewc:TreeNodeType>
					<iewc:TreeNodeType ImageUrl="../../../Admin_Images/folder.gif" Type="department" ExpandedImageUrl="../../../Admin_Images/folderopen.gif"></iewc:TreeNodeType>
					<iewc:TreeNodeType ImageUrl="../../../Admin_Images/staff.gif" Type="staff"></iewc:TreeNodeType>
					<iewc:TreeNodeType ImageUrl="../../../Admin_Images/staffdisabled.gif" Type="staffdisabled"></iewc:TreeNodeType>
					<iewc:TreeNode Text="部门" Type="root"></iewc:TreeNode>
            </iewc:TreeView>
        </div>
        <div id="divRoot" class="mainArea">
        </div>
        <div id="divDepartmentInfo" class="mainArea">
            <table cellpadding="3" cellspacing="0" width="100%" border="0">
                <colgroup>
                    <col align="left" valign="baseline" width="50px" />
                    <col align="left" valign="top" />
                </colgroup>
                <tr>
                    <td>
                        名称</td>
                    <td>
                        <input readonly type="text" id="txtDepartmentName" class="textBox" style="width: 300px" /></td>
                </tr>
                <tr>
                    <td>
                        排序ID</td>
                    <td>
                        <input readonly type="text" id="txtDepartmentOrderId" class="textBox" style="width: 300px" /></td>
                </tr>
                <tr>
                    <td>
                        电话号码</td>
                    <td>
                        <input readonly type="text" id="txtDepartmentPhone" class="textBox" style="width: 300px" /></td>
                </tr>
                <tr>
                    <td>
                        分机号码</td>
                    <td>
                        <input readonly type="text" id="txtDepartmentExtNumber" class="textBox" style="width: 300px" /></td>
                </tr>
                <tr>
                    <td>
                        传真号码</td>
                    <td>
                        <input readonly type="text" id="txtDepartmentFax" class="textBox" style="width: 300px" /></td>
                </tr>
                <tr>
                    <td valign="top">
                        备注</td>
                    <td>
                        <textarea readonly id="txtaDepartmentRemark" class="textBox" style="width: 300px;
                            height: 60px"></textarea></td>
                </tr>
            </table>
        </div>
        <div id="divStaff" class="mainArea">
            <table cellpadding="3" cellspacing="0" width="100%" border="0">
                <colgroup>
                    <col align="left" valign="baseline" width="37px" />
                    <col align="left" valign="top" width="145px" />
                    <col align="left" valign="baseline" width="50px" />
                    <col align="left" valign="top" />
                </colgroup>
                <tr>
                    <td>
                        登录ID</td>
                    <td>
                        <input readonly type="text" id="txtStaffLoginId" class="textBox" style="width: 120px" /></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        姓名</td>
                    <td>
                        <input readonly type="text" id="txtStaffName" class="textBox" style="width: 120px" /></td>
                    <td>
                        已禁用</td>
                    <td>
                        <input readonly type="text" id="txtStaffDisabled" class="textBox" style="width: 120px" /></td>
                </tr>
                <tr>
                    <td>
                        排序ID</td>
                    <td>
                        <input readonly type="text" id="txtStaffOrderId" class="textBox" style="width: 120px" /></td>
                    <td>
                        身份证号</td>
                    <td>
                        <input readonly type="text" id="txtStaffIdCard" class="textBox" style="width: 120px" /></td>
                </tr>
                <tr>
                    <td>
                        编号</td>
                    <td>
                        <input readonly type="text" id="txtStaffCode" class="textBox" style="width: 120px" /></td>
                    <td>
                        最高学历</td>
                    <td>
                        <input readonly type="text" id="txtStaffDegree" class="textBox" style="width: 120px" /></td>
                </tr>
                <tr>
                    <td>
                        性别</td>
                    <td>
                        <input readonly type="text" id="txtStaffSex" class="textBox" style="width: 120px" /></td>
                    <td>
                        政治面貌</td>
                    <td>
                        <input readonly type="text" id="txtStaffPolitical" class="textBox" style="width: 120px" /></td>
                </tr>
                <tr>
                    <td>
                        婚否</td>
                    <td>
                        <input readonly type="text" id="txtStaffMarried" class="textBox" style="width: 120px" /></td>
                    <td>
                        出生日期</td>
                    <td>
                        <input readonly type="text" id="txtStaffBirthday" class="textBox" style="width: 120px" /></td>
                </tr>
                <tr>
                    <td>
                        国籍</td>
                    <td>
                        <input readonly type="text" id="txtStaffCountry" class="textBox" style="width: 120px" /></td>
                    <td>
                        入职日期</td>
                    <td>
                        <input readonly type="text" id="txtStaffEntersDay" class="textBox" style="width: 120px" /></td>
                </tr>
                <tr>
                    <td>
                        民族</td>
                    <td>
                        <input readonly type="text" id="txtStaffNation" class="textBox" style="width: 120px" /></td>
                    <td>
                        离职日期</td>
                    <td>
                        <input readonly type="text" id="txtStaffLeavesDay" class="textBox" style="width: 120px" /></td>
                </tr>
                <tr>
                    <td>
                        职位</td>
                    <td>
                        <input readonly type="text" id="txtStaffPosition" class="textBox" style="width: 120px" /></td>
                    <td>
                        办公电话</td>
                    <td>
                        <input readonly type="text" id="txtStaffOfficePhone" class="textBox" style="width: 120px" /></td>
                </tr>
                <tr>
                    <td>
                        职称</td>
                    <td>
                        <input readonly type="text" id="txtStaffTitle" class="textBox" style="width: 120px" /></td>
                    <td>
                        分机号码</td>
                    <td>
                        <input readonly type="text" id="txtStaffExtNumber" class="textBox" style="width: 120px" /></td>
                </tr>
                <tr>
                    <td>
                        手机</td>
                    <td>
                        <input readonly type="text" id="txtStaffCellPhone" class="textBox" style="width: 120px" /></td>
                    <td>
                        家庭电话</td>
                    <td>
                        <input readonly type="text" id="txtStaffFamilyPhone" class="textBox" style="width: 120px" /></td>
                </tr>
                <tr>
                    <td>
                        Email</td>
                    <td>
                        <input readonly type="text" id="txtStaffEmail" class="textBox" style="width: 120px" /></td>
                    <td>
                        邮政编码</td>
                    <td>
                        <input readonly type="text" id="txtStaffZipCode" class="textBox" style="width: 120px" /></td>
                </tr>
                <tr>
                    <td valign="top">
                        备注</td>
                    <td rowspan="2">
                        <textarea readonly id="txtaStaffRemark" class="textBox" style="width: 120px;
                            height: 40px"></textarea></td>
                    <td valign="top">
                        家庭住址</td>
                    <td>
                        <textarea readonly id="txtaStaffAddress" class="textBox" style="width: 120px;
                            height: 40px"></textarea></td>
                </tr>
            </table>
        </div>
        <div id="divStatusBar" class="statusBar">
            <%=WebConfigCache.Signature%>
        </div>
    </form>
</body>
</html>