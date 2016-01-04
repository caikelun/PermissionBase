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
			            ["LoginId", "Password"],
			            [window.dialogArguments.id,
			             document.all.txtPassword.value]);
        				
        var id = XmlHttpHelper.transmit(false, "post", "text", "RemoteHandlers/UpdatePassword.ashx", null, updateStr);

        if(id != "-1")
        {
            window.returnValue = {Succeed : true};
            window.close();
        }
        else
        {
            alert(Message.serverError);
            window.returnValue = {Succeed : false};
            window.close();
        }
	}
	catch(e)
	{
	    alert(Message.clientError);
	    window.returnValue = {Succeed : false};
	    window.close();
	}
}

//
//	检测输入项合法性。
//
function _checkInputValue()
{
    document.all.divAlertMess.innerText = "";
    
	if(document.all.txtPassword.value.length < 6)
	{
		document.all.divAlertMess.innerText = "“密码”长度必须大于等于 6 位。";
		return false;
	}
	if(document.all.txtPassword.value != document.all.txtRePassword.value)
	{
		document.all.divAlertMess.innerText = "“密码”和“密码确认”不一致。";
		return false;
	}
	return true;
}