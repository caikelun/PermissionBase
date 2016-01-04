<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="Admin_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>
        <%=WebConfigCache.AppName%>
    </title>
    
    <script type="text/javascript" src="../Admin_Scripts/killMouse.js"></script>

    <script type="text/javascript">
        //
        //防止frameset中的frame页面跳转到登录页面。
        //----------------------------------------------------------------
        if(window.top.length > 0)
        {
            window.top.location = "Default.aspx";
        }
        //----------------------------------------------------------------
        
        //
        //防止模态窗口跳转到登录页面。
        //----------------------------------------------------------------
        if(window.external.dialogTop != undefined)
        {
            alert("您的登录已超时，请注销后重新登录。");
            window.close();
        }
        //----------------------------------------------------------------
    </script>

    <style type="text/css">
        *
        {
            font-size:12px;
            font-family:宋体;
        }
        body
        {
            margin:0px;
            overflow:hidden;
            background-color:ThreeDFace;
        }
        div.frame
        {
            position:absolute;
            text-align:center;
	        top:50%;
	        left:50%;
	        height: 330px;
	        width: 700px;
	        margin-top:-165px;
	        margin-left:-350px;
        }
        div.title
        {
            text-align:center;
            font-family:Arial;
            font-size:30px;
            font-weight:bold;
            margin-bottom:10px;
        }
        div.login
        {
            text-align:center;
            padding:20px;
            background-color:#f8f8f8;
            border:#666666 1px solid;
	        width: 280px;
        }
        .textBox
        {
            padding:2px;
            border:#aaaaaa 1px solid;
            width:150px;
        }
        .dropDownList
        {
            height:24px;
            width:156px;
        }
        .button
        {
            border:#aaaaaa 1px solid;
            vertical-align:bottom;
            height:30px;
            width:100px;
            cursor:hand;
            filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr=#ffffff, EndColorStr=#dddddd);
        }
        div.alert
        {
            color:#990000;
            margin:0px;
            margin-left:10px;
            margin-right:10px;
            padding:5px;
            padding-bottom:3px;
            border:#999999 1px solid;
            background-color:#e2e2e2;
            height:25px;
            width: 240px;
            text-align:left;
            vertical-align:middle;
        }
	</style>
</head>
<body scroll="no">
    <form id="form1" runat="server">
        <div class="frame">
            <div class="title">
                <%=WebConfigCache.AppName%>
            </div>
            <div class="login">
                <table cellpadding="3px" cellspacing="0px" border="0px">
                    <colgroup>
                        <col align="left" width="55px" />
                        <col align="left" />
                    </colgroup>
                    <tr>
                        <td>
                            登录ID</td>
                        <td>
                            <asp:TextBox ID="tbLoginId" runat="server" CssClass="textBox" MaxLength="20"></asp:TextBox>
                            <asp:RequiredFieldValidator runat="server" ControlToValidate="tbLoginId" ErrorMessage='“登录ID”不能为空。'
                                Display="None" ID="rfvLoginId"></asp:RequiredFieldValidator>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            密码</td>
                        <td>
                            <asp:TextBox ID="tbPassword" runat="server" CssClass="textBox" MaxLength="20" TextMode="Password"></asp:TextBox>
                            <asp:RequiredFieldValidator runat="server" ControlToValidate="tbPassword" ErrorMessage='“密码”不能为空。'
                                Display="None" ID="rfvPassword"></asp:RequiredFieldValidator>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            验证码</td>
                        <td>
                            <asp:TextBox ID="tbValidCode" runat="server" CssClass="textBox" MaxLength="4"></asp:TextBox>
                            <asp:RequiredFieldValidator runat="server" ControlToValidate="tbValidCode" ErrorMessage='“验证码”不能为空。'
                                Display="None" ID="rfvValidCode"></asp:RequiredFieldValidator>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        </td>
                        <td>
                            <img src="../Admin_Others/ValidImage.ashx" /></td>
                    </tr>
                    <tr>
                        <td>
                            界面风格</td>
                        <td>
                            <asp:DropDownList ID="ddlInterfaceStyle" CssClass="dropDownList" runat="server"></asp:DropDownList></td>
                    </tr>
                    <tr>
                        <td>
                        </td>
                        <td>
                            <asp:Button ID="btnLogin" Text="登  录" runat="server" CssClass="button" OnClick="btnLogin_Click" /></td>
                    </tr>
                </table>
                <br />
                <div id="divAlertMess" class="alert">
                    <asp:Panel ID="panelErrorPassword" runat="server" Visible="False">
                        “登录ID”或“密码”错误。</asp:Panel>
                    <asp:Panel ID="panelStaffDisabled" runat="server" Visible="False">
                        此用户已被禁用。</asp:Panel>
                    <asp:Panel ID="panelErrorValidCode" runat="server" Visible="False">
                        “验证码”错误。</asp:Panel>
                    <asp:ValidationSummary DisplayMode="SingleParagraph" ForeColor="#990000" runat="server"
                        ID="vsAll"></asp:ValidationSummary>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
