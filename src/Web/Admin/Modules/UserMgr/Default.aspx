<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="Admin_Modules_UserMgr_Default"
    EnableViewState="false" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
<head runat="server">
    <title></title>
    <link rel="stylesheet" href="../../../Admin_Styles/<%=Request.Cookies["InterfaceStyle"].Value%>/mainForm.css" />

    <script type="text/javascript" src="../../../Admin_Scripts/killMouse.js"></script>

    <script type="text/javascript" src="../../../Admin_Scripts/xmlHttpHelper.js"></script>

    <script type="text/javascript" src="../../../Admin_Scripts/openDialogHelper.js"></script>

    <script type="text/javascript" src="../../../Admin_Scripts/message.js"></script>

    <script type="text/javascript" src="Scripts/default.js"></script>

    <script src="../../../Supports/ActiveWidgetsGrid102/runtime/lib/grid.js"></script>

    <link rel="stylesheet" href="../../../Supports/ActiveWidgetsGrid102/runtime/styles/classic/grid.css" />
    <link rel="stylesheet" href="../../../Admin_Styles/<%=Request.Cookies["InterfaceStyle"].Value%>/activeGrid.css" />
    <style type="text/css">
		.active-column-0 {width: 80px;}
		.active-column-1 {width: 100px;}
		.active-column-2 {width: 160px;}
		.active-column-3 {width: 140px;}
		.active-column-4 {width: 70px;}
	</style>
</head>
<body>
    <form id="form1" runat="server">
        <div id="divToolBar" class="topBar">
            <div class="toolBar">
                <button runat="server" style="width: 58px" type="button" class="toolBarBtn" id="btnBrowse"
                    onclick="btnBrowseClicked()">
                    <img align="absMiddle" src="../../../Admin_Images/browse.gif" />&nbsp;查看</button>
                <button runat="server" style="width: 58px" type="button" class="toolBarBtn" id="btnNew"
                    onclick="btnNewClicked()">
                    <img align="absMiddle" src="../../../Admin_Images/new.gif" />&nbsp;新增</button>
                <button runat="server" style="width: 58px" type="button" class="toolBarBtn" id="btnEdit"
                    onclick="btnEditClicked()">
                    <img align="absMiddle" src="../../../Admin_Images/edit.gif" />&nbsp;编辑</button>
                <button runat="server" style="width: 80px" type="button" class="toolBarBtn" id="btnEditPassword"
                    onclick="btnEditPasswordClicked()">
                    <img align="absMiddle" src="../../../Admin_Images/editpassword.gif" />&nbsp;修改密码</button>
                <button runat="server" style="width: 58px" type="button" class="toolBarBtn" id="btnDelete"
                    onclick="btnDeleteClicked()">
                    <img align="absMiddle" src="../../../Admin_Images/delete.gif" />&nbsp;删除</button>
            </div>
            <div class="moduleName">
                用户信息管理</div>
        </div>
        <div id="divMain" class="crossMainArea">

            <script type="text/javascript">
                var _count_of_page = 20;
                var _data = new Active.XML.Table;
                _data.setAsync(false);
                _data.setURL("RemoteHandlers/GetUsers.ashx");
                _data.setParameter("firstResult", "0");
                _data.setParameter("maxResults", _count_of_page);
                _data.setColumns(["LoginId", "Name", "Email", "RegisterDate", "Disabled"]);
                _data.request();
	            var _grid = new Active.Controls.Grid;
	            _grid.sort = function(i, d) { };
	            _grid.setColumnProperty("texts", ["登陆ID", "姓名", "Email", "注册时间", "是否禁用"]);
	            _grid.setDataModel(_data);
	            document.write(_grid);
            </script>

        </div>
        <div id="divGridNavbar" class="gridNavbar">
            当前在第<span id="spanCurrentPageNum"></span>页，共<span id="spanMaxPageNum"></span>页，每页<span
                id="spanCountOfPage"></span>行。&nbsp;跳转到第
            <select id="selPageNum" onchange="selPageNumChanged();">
            </select>
            页&nbsp;<input type="button" class="button" id="btnJump" value="跳转" style="width: 37px"
                onclick="btnJumpClicked();" />&nbsp;
            <input type="button" class="button" id="btnFirst" value="首页" style="width: 50px"
                onclick="btnFirstClicked();" />
            <input type="button" class="button" id="btnPrevious" value="上一页" style="width: 50px"
                onclick="btnPreviousClicked();" />
            <input type="button" class="button" id="btnNext" value="下一页" style="width: 50px"
                onclick="btnNextClicked();" />
            <input type="button" class="button" id="btnLast" value="末页" style="width: 50px" onclick="btnLastClicked();" />
        </div>
        <div id="divStatusBar" class="statusBar">
            <%=WebConfigCache.Signature%>
        </div>
    </form>
</body>
</html>
