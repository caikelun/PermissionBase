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
				            "Department",
				            ["Name", "OrderId", "Phone", "ExtNumber", "Fax", "Remark", "ParentDepartmentId"],
				            [document.all.txtName.value,
				             document.all.txtOrderId.value,
				             document.all.txtPhone.value,
				             document.all.txtExtNumber.value,
				             document.all.txtFax.value,
				             document.all.txtaRemark.value,
				             window.dialogArguments.pid]);
            				
            var id = XmlHttpHelper.transmit(false, "post", "text", "RemoteHandlers/InsertDepartment.ashx", null, createStr);

            if(id != "-1")
            {
	            window.returnValue = {Succeed : true, Id : id, Name : document.all.txtName.value, OrderId : document.all.txtOrderId.value};
                window.close();
            }
	        else
	        {
	            alert(Message.serverError);
	            window.returnValue = {Succeed : false};
	            window.close();
	        }
	    }
	    else if(window.dialogArguments.mode == "edit")
	    {
	        var updateStr = StringHelper.buildFlatXmlString(
				            "Department",
				            ["Name", "OrderId", "Phone", "ExtNumber", "Fax", "Remark", "Id"],
				            [document.all.txtName.value,
				             document.all.txtOrderId.value,
				             document.all.txtPhone.value,
				             document.all.txtExtNumber.value,
				             document.all.txtFax.value,
				             document.all.txtaRemark.value,
				             window.dialogArguments.id]);
            				
            var succeed = XmlHttpHelper.transmit(false, "post", "text", "RemoteHandlers/UpdateDepartment.ashx", null, updateStr);

            if(succeed == "1")
            {
	            window.returnValue = {Succeed : true, Name : document.all.txtName.value, OrderId : document.all.txtOrderId.value};
                window.close();
	        }
	        else
	        {
	            alert(Message.serverError);
	            window.returnValue = {Succeed : false};
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
	document.all.txtName.value = StringHelper.trim(document.all.txtName.value);
	document.all.txtOrderId.value = StringHelper.trim(document.all.txtOrderId.value);
	document.all.txtPhone.value = StringHelper.trim(document.all.txtPhone.value);
	document.all.txtExtNumber.value = StringHelper.trim(document.all.txtExtNumber.value);
	document.all.txtFax.value = StringHelper.trim(document.all.txtFax.value);
}

//
//	检测输入项合法性。
//
function _checkInputValue()
{
    document.all.divAlertMess.innerText = "";
    
	if(StringHelper.isEmpty(document.all.txtName.value))
	{
		document.all.divAlertMess.innerText = "“名称”不能为空。";
		return false;
	}
	if(StringHelper.isEmpty(document.all.txtOrderId.value))
	{
		document.all.divAlertMess.innerText = "“排序ID”不能为空。";
		return false;
	}
	if(!StringHelper.isInt(document.all.txtOrderId.value))
	{
		document.all.divAlertMess.innerText = "“排序ID”必须是非负整数。";
		return false;
	}
	if(document.all.txtaRemark.value.length > 100)
	{
	    document.all.divAlertMess.innerText = "“备注”长度不能大于100个字符。";
		return false;
	}
	return true;
}