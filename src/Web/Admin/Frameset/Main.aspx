<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Main.aspx.cs" Inherits="Admin_Frameset_Main" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>
        <%=WebConfigCache.AppName%>
    </title>

    <script type="text/javascript" src="../../Admin_Scripts/killMouse.js"></script>

    <script type="text/javascript">
		function closeNavBar()
		{
			document.all.tags("frameset")[0].cols = "0,*";
		}
		
        function window.onresize()
        {
            var doc = document.all.tags("frame")["fmNavBar"].contentWindow.document;
            var tree = doc.all.divTree;
            tree.style.height = doc.documentElement.clientHeight;
            tree.style.width = doc.documentElement.clientWidth;
	    }
        function window.onload()
        {
	        window.onresize();
        }
    </script>

</head>
<frameset cols="180,*" border="1" frameborder="1" framespacing="5">
    <frameset rows="23,*" border="0" frameborder="0" framespacing="0">
        <frame scrolling="no" src="ShowHide.aspx" />
        <frame name="fmNavBar" scrolling="auto" src="NavBar.aspx" />
    </frameset>
    <frame scrolling="no" src="Welcome.aspx" name="modulePanel" />
</frameset>
</html>
