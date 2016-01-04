<%@ Page Language="C#" AutoEventWireup="true" CodeFile="StaffInfo.aspx.cs" Inherits="Admin_Modules_StaffMgr_StaffInfo" EnableViewState="false" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>职员管理</title>
    <link rel="stylesheet" href="../../../Admin_Styles/<%=Request.Cookies["InterfaceStyle"].Value%>/dialog.css" />

    <script type="text/javascript" src="../../../Admin_Scripts/xmlHttpHelper.js"></script>

    <script type="text/javascript" src="../../../Admin_Scripts/stringHelper.js"></script>

    <script type="text/javascript" src="../../../Admin_Scripts/message.js"></script>

    <script type="text/javascript" src="../../../Supports/MeizzCalendar3/calendar.js"></script>

    <script type="text/javascript" src="Scripts/staffInfo.js"></script>

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
                    <col align="left" valign="baseline" width="37px" />
                    <col align="left" valign="top" width="145px" />
                    <col align="left" valign="baseline" width="50px" />
                    <col align="left" valign="top" />
                </colgroup>
                <tr>
                    <td>
                        登录ID</td>
                    <td>
                        <input runat="server" maxlength="20" type="text" id="txtStaffLoginId" class="textBoxRed"
                            style="width: 120px" /></td>
                    <td>
                        <span id="spanPassword">密码</span></td>
                    <td>
                        <input runat="server" maxlength="20" type="password" id="txtStaffPassword" class="textBoxRed"
                            style="width: 120px" /></td>
                </tr>
                <tr>
                    <td valign="middle">
                        姓名</td>
                    <td>
                        <input runat="server" maxlength="20" type="text" id="txtStaffName" class="textBoxRed"
                            style="width: 120px" /></td>
                    <td valign="middle">
                        已禁用</td>
                    <td>
                        <input runat="server" type="checkbox" id="cbStaffDisabled" /></td>
                </tr>
                <tr>
                    <td>
                        排序ID</td>
                    <td>
                        <input runat="server" maxlength="9" type="text" id="txtStaffOrderId" class="textBoxRed"
                            style="width: 120px" /></td>
                    <td>
                        身份证号</td>
                    <td>
                        <input runat="server" maxlength="18" type="text" id="txtStaffIdCard" class="textBox"
                            style="width: 120px" /></td>
                </tr>
                <tr>
                    <td>
                        编号</td>
                    <td>
                        <input runat="server" maxlength="20" type="text" id="txtStaffCode" class="textBox"
                            style="width: 120px" /></td>
                    <td>
                        最高学历</td>
                    <td>
                        <select id="selectStaffDegree" runat="server" class="textBox" style="width: 125px">
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        性别</td>
                    <td>
                        <select id="selectStaffSex" runat="server" class="textBox" style="width: 125px"></select>
                    </td>
                    <td>
                        政治面貌</td>
                    <td>
                        <select id="selectStaffPolitical" runat="server" class="textBox" style="width: 125px">
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        婚否</td>
                    <td>
                        <select id="selectStaffMarried" runat="server" class="textBox" style="width: 125px"></select>
                    </td>
                    <td>
                        出生日期</td>
                    <td>
                        <input runat="server" readonly type="text" id="txtStaffBirthday" class="textBox" style="width: 103px" />
                        <button class="calendarButton" onclick="meizz_calendar(document.all.txtStaffBirthday)">
                        <img src="../../../Admin_Images/calendar.gif" /></button></td>
                </tr>
                <tr>
                    <td>
                        国籍</td>
                    <td>
                        <select id="selectStaffCountry" runat="server" class="textBox" style="width: 125px">
                        </select>
                    </td>
                    <td>
                        入职日期</td>
                    <td>
                        <input runat="server" readonly type="text" id="txtStaffEntersDay" class="textBox" style="width: 103px" />
                        <button class="calendarButton" onclick="meizz_calendar(document.all.txtStaffEntersDay)">
                        <img src="../../../Admin_Images/calendar.gif" /></button></td>
                </tr>
                <tr>
                    <td>
                        民族</td>
                    <td>
                        <select id="selectStaffNation" runat="server" class="textBox" style="width: 125px">
                        </select>
                    </td>
                    <td>
                        离职日期</td>
                    <td>
                        <input runat="server" readonly type="text" id="txtStaffLeavesDay" class="textBox" style="width: 103px" />
                        <button class="calendarButton" onclick="meizz_calendar(document.all.txtStaffLeavesDay)">
                        <img src="../../../Admin_Images/calendar.gif" /></button></td>
                </tr>
                <tr>
                    <td>
                        职位</td>
                    <td>
                        <select id="selectStaffPosition" runat="server" class="textBox" style="width: 125px">
                        </select>
                    </td>
                    <td>
                        办公电话</td>
                    <td>
                        <input runat="server" maxlength="20" type="text" id="txtStaffOfficePhone" class="textBox"
                            style="width: 120px" /></td>
                </tr>
                <tr>
                    <td>
                        职称</td>
                    <td>
                        <select id="selectStaffTitle" runat="server" class="textBox" style="width: 125px">
                        </select>
                    </td>
                    <td>
                        分机号码</td>
                    <td>
                        <input runat="server" maxlength="10" type="text" id="txtStaffExtNumber" class="textBox"
                            style="width: 120px" /></td>
                </tr>
                <tr>
                    <td>
                        手机</td>
                    <td>
                        <input runat="server" maxlength="20" type="text" id="txtStaffCellPhone" class="textBox"
                            style="width: 120px" /></td>
                    <td>
                        家庭电话</td>
                    <td>
                        <input runat="server" maxlength="20" type="text" id="txtStaffFamilyPhone" class="textBox"
                            style="width: 120px" /></td>
                </tr>
                <tr>
                    <td>
                        Email</td>
                    <td>
                        <input runat="server" maxlength="50" type="text" id="txtStaffEmail" class="textBox"
                            style="width: 120px" /></td>
                    <td>
                        邮政编码</td>
                    <td>
                        <input runat="server" maxlength="10" type="text" id="txtStaffZipCode" class="textBox"
                            style="width: 120px" /></td>
                </tr>
                <tr>
                    <td valign="top">
                        备注</td>
                    <td rowspan="2">
                        <textarea runat="server" id="txtaStaffRemark" class="textBox" style="width: 120px;
                            height: 40px"></textarea></td>
                    <td valign="top">
                        家庭住址</td>
                    <td>
                        <textarea runat="server" id="txtaStaffAddress" class="textBox" style="width: 120px;
                            height: 40px"></textarea></td>
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
