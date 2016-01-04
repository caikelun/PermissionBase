var error = false;
function window.onload()
{
    if(error)
    {
        alert(Message.serverError);
        window.returnValue = {Succeed : false};
        window.close();
    }
}

//
//	id:		btnSubmit
//	event:	onclick
//
function btnSubmitClicked()
{
    try
    {
	    _trimAll();
	    if(!_checkInputValue()) return;
    	
	    if(window.dialogArguments.mode == "new")
	    {
            var createStr = StringHelper.buildFlatXmlString(
				            "SysCode",
				            ["Tag", "Name", "OrderId", "Remark", "SysCodeTypeId"],
				            [document.all.txtSysCodeTag.value,
				             document.all.txtSysCodeName.value,
				             document.all.txtSysCodeOrderId.value,
				             document.all.txtaSysCodeRemark.value,
				             window.dialogArguments.pid]);
            				
            var id = XmlHttpHelper.transmit(false, "post", "text", "RemoteHandlers/InsertSysCode.ashx", null, createStr);

            if(id == "-1")
            {
	            alert(Message.serverError);
	            window.returnValue = {Succeed : false};
	            window.close();
            }
	        else if(id == "-2")
	        {
	            document.all.divAlertMess.innerText = "“标示”不能重复。";
	        }
	        else
	        {
	            window.returnValue = {Succeed : true, Id : id, Name : document.all.txtSysCodeName.value, OrderId : document.all.txtSysCodeOrderId.value};
                window.close();
	        }
	    }
	    else if(window.dialogArguments.mode == "edit")
	    {
	        var updateStr = StringHelper.buildFlatXmlString(
				            "SysCode",
				            ["Tag", "Name", "OrderId", "Remark", "Id"],
				            [document.all.txtSysCodeTag.value,
				             document.all.txtSysCodeName.value,
				             document.all.txtSysCodeOrderId.value,
				             document.all.txtaSysCodeRemark.value,
				             window.dialogArguments.id]);
            				
            var succeed = XmlHttpHelper.transmit(false, "post", "text", "RemoteHandlers/UpdateSysCode.ashx", null, updateStr);

            if(succeed == "-1")
            {
	            alert(Message.serverError);
	            window.returnValue = {Succeed : false};
	            window.close();
            }
	        else if(succeed == "-2")
	        {
	            document.all.divAlertMess.innerText = "“标示”不能重复。";
	        }
	        else
	        {
	            window.returnValue = {Succeed : true, Name : document.all.txtSysCodeName.value, OrderId : document.all.txtSysCodeOrderId.value};
                window.close();
	        }
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
//	去掉头尾的空格。
//
function _trimAll()
{
	document.all.txtSysCodeName.value = StringHelper.trim(document.all.txtSysCodeName.value);
	document.all.txtSysCodeOrderId.value = StringHelper.trim(document.all.txtSysCodeOrderId.value);
}

//
//	检测输入项合法性。
//
function _checkInputValue()
{
    document.all.divAlertMess.innerText = "";
    
	if(StringHelper.isEmpty(document.all.txtSysCodeTag.value))
	{
		document.all.divAlertMess.innerText = "“标示”不能为空。";
		return false;
	}
	if(!StringHelper.isCleanString(document.all.txtSysCodeTag.value))
	{
		document.all.divAlertMess.innerText = "“标示”只能包含英文字母、数字和下划线。";
		return false;
	}
	if(StringHelper.isEmpty(document.all.txtSysCodeName.value))
	{
		document.all.divAlertMess.innerText = "“名称”不能为空。";
		return false;
	}
	if(StringHelper.isEmpty(document.all.txtSysCodeOrderId.value))
	{
		document.all.divAlertMess.innerText = "“排序ID”不能为空。";
		return false;
	}
	if(!StringHelper.isInt(document.all.txtSysCodeOrderId.value))
	{
		document.all.divAlertMess.innerText = "“排序ID”必须是非负整数。";
		return false;
	}
	if(document.all.txtaSysCodeRemark.value.length > 100)
	{
	    document.all.divAlertMess.innerText = "“备注”长度不能大于100个字符。";
		return false;
	}
	return true;
}