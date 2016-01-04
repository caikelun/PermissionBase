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
    	
	    //收集模块权限信息。
	    var arrModuleRight = new Array();
	    var oDivRights = document.all.divRights;
	    for(var i = 0; i < oDivRights.children.length; i++)
	    {
	        var oCheckBox = oDivRights.children[i].firstChild;
	        if(oCheckBox.checked)
	        {
	            arrModuleRight.push(oCheckBox.id);
	        }
	    }
    	
	    if(window.dialogArguments.mode == "new")
	    {
            var createStr = StringHelper.buildFlatXmlString(
				            "Module",
				            ["Tag", "Name", "OrderId", "Remark", "ModuleTypeId", "ModuleUrl", "Disabled", "ModuleRight"],
				            [document.all.txtModuleTag.value,
				             document.all.txtModuleName.value,
				             document.all.txtModuleOrderId.value,
				             document.all.txtaModuleRemark.value,
				             window.dialogArguments.pid,
				             document.all.txtModuleModuleUrl.value,
				             document.all.cbModuleDisabled.checked ? "1" : "0",
				             arrModuleRight.join("|")]);

            var id = XmlHttpHelper.transmit(false, "post", "text", "RemoteHandlers/InsertModule.ashx", null, createStr);

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
	            window.returnValue = {Succeed : true, Id : id, Name : document.all.txtModuleName.value, OrderId : document.all.txtModuleOrderId.value};
                window.close();
	        }
	    }
	    else if(window.dialogArguments.mode == "edit")
	    {
	        var updateStr = StringHelper.buildFlatXmlString(
				            "Module",
				            ["Id", "Tag", "Name", "OrderId", "Remark", "ModuleUrl", "Disabled", "ModuleRight"],
				            [window.dialogArguments.id,
				             document.all.txtModuleTag.value,
   				             document.all.txtModuleName.value,
				             document.all.txtModuleOrderId.value,
				             document.all.txtaModuleRemark.value,
				             document.all.txtModuleModuleUrl.value,
				             document.all.cbModuleDisabled.checked ? "1" : "0",
				             arrModuleRight.join("|")]);
            				
            var succeed = XmlHttpHelper.transmit(false, "post", "text", "RemoteHandlers/UpdateModule.ashx", null, updateStr);

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
	            window.returnValue = {Succeed : true, Name : document.all.txtModuleName.value, OrderId : document.all.txtModuleOrderId.value};
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
	document.all.txtModuleName.value = StringHelper.trim(document.all.txtModuleName.value);
	document.all.txtModuleOrderId.value = StringHelper.trim(document.all.txtModuleOrderId.value);
	document.all.txtModuleModuleUrl.value = StringHelper.trim(document.all.txtModuleModuleUrl.value);
}

//
//	检测输入项合法性。
//
function _checkInputValue()
{
    document.all.divAlertMess.innerText = "";
    
	if(StringHelper.isEmpty(document.all.txtModuleTag.value))
	{
		document.all.divAlertMess.innerText = "“标示”不能为空。";
		return false;
	}
	if(!StringHelper.isCleanString(document.all.txtModuleTag.value))
	{
		document.all.divAlertMess.innerText = "“标示”只能包含英文字母、数字和下划线。";
		return false;
	}
	if(StringHelper.isEmpty(document.all.txtModuleName.value))
	{
		document.all.divAlertMess.innerText = "“名称”不能为空。";
		return false;
	}
	if(StringHelper.isEmpty(document.all.txtModuleOrderId.value))
	{
		document.all.divAlertMess.innerText = "“排序ID”不能为空。";
		return false;
	}
	if(!StringHelper.isInt(document.all.txtModuleOrderId.value))
	{
		document.all.divAlertMess.innerText = "“排序ID”必须是非负整数。";
		return false;
	}
	if(document.all.txtaModuleRemark.value.length > 100)
	{
	    document.all.divAlertMess.innerText = "“备注”长度不能大于100个字符。";
		return false;
	}
	return true;
}