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
				            "SysCodeType",
				            ["Tag", "Name", "OrderId", "Remark"],
				            [document.all.txtSysCodeTypeTag.value,
				             document.all.txtSysCodeTypeName.value,
				             document.all.txtSysCodeTypeOrderId.value,
				             document.all.txtaSysCodeTypeRemark.value]);
            				
            var id = XmlHttpHelper.transmit(false, "post", "text", "RemoteHandlers/InsertSysCodeType.ashx", null, createStr);

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
	            window.returnValue = {Succeed : true, Id : id, Name : document.all.txtSysCodeTypeName.value, OrderId : document.all.txtSysCodeTypeOrderId.value};
                window.close();
	        }
	    }
	    else if(window.dialogArguments.mode == "edit")
	    {
	        var updateStr = StringHelper.buildFlatXmlString(
				            "SysCodeType",
				            ["Tag", "Name", "OrderId", "Remark", "Id"],
				            [document.all.txtSysCodeTypeTag.value,
				             document.all.txtSysCodeTypeName.value,
				             document.all.txtSysCodeTypeOrderId.value,
				             document.all.txtaSysCodeTypeRemark.value,
				             window.dialogArguments.id]);
            				
            var succeed = XmlHttpHelper.transmit(false, "post", "text", "RemoteHandlers/UpdateSysCodeType.ashx", null, updateStr);

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
	            window.returnValue = {Succeed : true, Name : document.all.txtSysCodeTypeName.value, OrderId : document.all.txtSysCodeTypeOrderId.value};
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
	document.all.txtSysCodeTypeName.value = StringHelper.trim(document.all.txtSysCodeTypeName.value);
	document.all.txtSysCodeTypeOrderId.value = StringHelper.trim(document.all.txtSysCodeTypeOrderId.value);
}

//
//	检测输入项合法性。
//
function _checkInputValue()
{
    document.all.divAlertMess.innerText = "";
    
	if(StringHelper.isEmpty(document.all.txtSysCodeTypeTag.value))
	{
		document.all.divAlertMess.innerText = "“标示”不能为空。";
		return false;
	}
	if(!StringHelper.isCleanString(document.all.txtSysCodeTypeTag.value))
	{
		document.all.divAlertMess.innerText = "“标示”只能包含英文字母、数字和下划线。";
		return false;
	}
	if(StringHelper.isEmpty(document.all.txtSysCodeTypeName.value))
	{
		document.all.divAlertMess.innerText = "“名称”不能为空。";
		return false;
	}
	if(StringHelper.isEmpty(document.all.txtSysCodeTypeOrderId.value))
	{
		document.all.divAlertMess.innerText = "“排序ID”不能为空。";
		return false;
	}
	if(!StringHelper.isInt(document.all.txtSysCodeTypeOrderId.value))
	{
		document.all.divAlertMess.innerText = "“排序ID”必须是非负整数。";
		return false;
	}
	if(document.all.txtaSysCodeTypeRemark.value.length > 100)
	{
	    document.all.divAlertMess.innerText = "“备注”长度不能大于100个字符。";
		return false;
	}
	return true;
}