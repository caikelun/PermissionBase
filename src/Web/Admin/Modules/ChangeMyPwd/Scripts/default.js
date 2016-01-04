function window.onresize()
{
    try
    {
	    var h = document.documentElement.clientHeight - document.all.divToolBar.offsetHeight - document.all.divStatusBar.offsetHeight;
	    if(h > 0) document.all.divMain.style.height = h;
	}
	catch(e)
	{
	    alert(Message.clientError);
	    window.location.href = "../../Frameset/Welcome.aspx";
	}
}

function window.onload()
{
    window.onresize();
    document.all.txtOldPassword.focus();
}

//
//	id:		btnSubmit
//	event:	onclick
//
function btnSubmitClicked()
{
    try
    {
	    if(!_checkInputValue()) return;
    	
        var updateStr = StringHelper.buildFlatXmlString(
			            "Staff",
			            ["OldPassword", "NewPassword"],
			            [document.all.txtOldPassword.value,
			             document.all.txtNewPassword.value]);

        var sSucceed = XmlHttpHelper.transmit(false, "post", "text", "RemoteHandlers/UpdatePassword.ashx", null, updateStr);

        if(sSucceed == "1")
        {
            alert("修改密码成功。");
        }
        else if(sSucceed == "0")
        {
            document.all.divAlertMess.innerText = "“原密码”错误。";
        }
        else
        {
            alert(Message.serverError);
            location.reload(true);
        }
        
        document.all.txtOldPassword.value = "";
        document.all.txtNewPassword.value = "";
        document.all.txtReNewPassword.value = "";
	}
	catch(e)
	{
	    alert(Message.clientError);
	    location.reload(true);
	}
}

//
//	检测输入项合法性。
//
function _checkInputValue()
{
    document.all.divAlertMess.innerText = "";
    
	if(document.all.txtOldPassword.value.length < 6)
	{
		document.all.divAlertMess.innerText = "“原密码”长度必须大于等于 6 位。";
		return false;
	}
	if(document.all.txtNewPassword.value.length < 6)
	{
		document.all.divAlertMess.innerText = "“新密码”长度必须大于等于 6 位。";
		return false;
	}
	if(document.all.txtNewPassword.value != document.all.txtReNewPassword.value)
	{
		document.all.divAlertMess.innerText = "“新密码”和“新密码确认”不一致。";
		return false;
	}
	return true;
}