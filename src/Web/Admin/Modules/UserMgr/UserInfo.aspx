<%@ Page Language="C#" AutoEventWireup="true" CodeFile="UserInfo.aspx.cs" Inherits="Admin_Modules_UserMgr_UserInfo" EnableViewState="false" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>用户信息管理</title>
    <link rel="stylesheet" href="../../../Admin_Styles/<%=Request.Cookies["InterfaceStyle"].Value%>/dialog.css" />

    <script type="text/javascript" src="../../../Admin_Scripts/xmlHttpHelper.js"></script>

    <script type="text/javascript" src="../../../Admin_Scripts/stringHelper.js"></script>

    <script type="text/javascript" src="../../../Admin_Scripts/message.js"></script>

    <script type="text/javascript" src="../../../Supports/MeizzCalendar3/calendar.js"></script>

    <script type="text/javascript" src="Scripts/userInfo.js"></script>

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
                    <col align="left" valign="top" width="145px" />
                    <col align="left" valign="baseline" width="50px" />
                    <col align="left" valign="top" />
                </colgroup>
                <tr>
                    <td>
                        登录ID</td>
                    <td>
                        <input runat="server" maxlength="20" type="text" id="txtUserLoginId" class="textBoxRed"
                            style="width: 120px" /></td>
                    <td>
                        <span id="spanPassword">密码</span></td>
                    <td>
                        <input runat="server" maxlength="20" type="password" id="txtUserPassword" class="textBoxRed"
                            style="width: 120px" /></td>
                </tr>
                <tr>
                    <td>
                        姓名</td>
                    <td>
                        <input runat="server" maxlength="20" type="text" id="txtUserName" class="textBox"
                            style="width: 120px" /></td>
                    <td>
                        办公电话</td>
                    <td>
                        <input runat="server" maxlength="20" type="text" id="txtUserOfficePhone" class="textBox"
                            style="width: 120px" /></td>
                </tr>
                <tr>
                    <td>
                        性别</td>
                    <td>
                        <select id="selectUserSex" runat="server" class="textBox" style="width: 125px">
                        </select>
                    </td>
                    <td>
                        家庭电话</td>
                    <td>
                        <input runat="server" maxlength="20" type="text" id="txtUserFamilyPhone" class="textBox"
                            style="width: 120px" /></td>
                </tr>
                <tr>
                    <td>
                        出生日期</td>
                    <td>
                        <input runat="server" readonly type="text" id="txtUserBirthday" class="textBox" style="width: 103px" />
                        <button class="calendarButton" onclick="meizz_calendar(document.all.txtUserBirthday)">
                        <img src="../../../Admin_Images/calendar.gif" /></button></td>
                    <td>
                        手机</td>
                    <td>
                        <input runat="server" maxlength="20" type="text" id="txtUserCellPhone" class="textBox"
                            style="width: 120px" /></td>
                </tr>
                <tr>
                    <td>
                        身份证号</td>
                    <td>
                        <input runat="server" maxlength="18" type="text" id="txtUserIdCard" class="textBox"
                            style="width: 120px" /></td>
                    <td>
                        Email</td>
                    <td>
                        <input runat="server" maxlength="50" type="text" id="txtUserEmail" class="textBox"
                            style="width: 120px" /></td>
                </tr>
                <tr>
                    <td valign="middle">
                        已禁用</td>
                    <td>
                        <input runat="server" type="checkbox" id="cbUserDisabled" /></td>
                    <td valign="middle">
                        邮政编码</td>
                    <td>
                        <input runat="server" maxlength="10" type="text" id="txtUserZipCode" class="textBox"
                            style="width: 120px" /></td>
                </tr>
                <tr>
                    <td valign="top">
                        备注</td>
                    <td>
                        <textarea runat="server" id="txtaUserRemark" class="textBox" style="width: 120px;
                            height: 60px"></textarea></td>
                    <td valign="top">
                        通讯住址</td>
                    <td>
                        <textarea runat="server" id="txtaUserAddress" class="textBox" style="width: 120px;
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
