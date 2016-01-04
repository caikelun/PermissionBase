<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ShowHide.aspx.cs" Inherits="Admin_Frameset_ShowHide" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

    <script type="text/javascript" src="../../Admin_Scripts/killMouse.js"></script>
    
    <style type="text/css">
        *
        {
	        font-size:12px;
	        font-family:宋体;
        }
        body
        {
            margin:0px;
        }
        div.showhide
        {
            padding:2px;
            padding-right:0px;
            text-align:right;
            background-color: ThreeDFace;
            border-bottom:solid 1px #555555;
        }
        input.button
        {
            font-family:宋体;
            font-size:12px;
            padding:0px;
            cursor:hand;
            width:40px;
            height:18px;
        }
    </style>
    
</head>
<body>
    <form id="form1" runat="server">
        <div class="showhide">
            <input class="button" type="button" value="注销" runat="server" id="btnLogout" onserverclick="btnLogout_ServerClick" />&nbsp;&nbsp;<input
                class="button" type="button" value="隐藏" onclick="window.top.closeNavBar();" />
        </div>
    </form>
</body>
</html>
