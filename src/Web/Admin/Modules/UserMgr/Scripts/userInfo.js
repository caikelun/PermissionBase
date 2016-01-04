var error = false;
function window.onload()
{
    if(error)
    {
        alert(Message.serverError);
        window.returnValue = {Succeed : false};
        window.close();
    }
    
    //编辑时。
    if(window.dialogArguments.mode == "edit")
    {
        //登录ID为只读。
        document.all.txtUserLoginId.readOnly = true;
        document.all.txtUserLoginId.style.backgroundColor = "#f2f2f2";
        
        //密码输入项不显示。
        document.all.spanPassword.style.display = "none";
        document.all.txtUserPassword.style.display = "none";
        
        //输入焦点。
        document.all.txtUserName.focus();
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
                "User",
                ["LoginId", "Password", "Name", "Disabled", "IdCard", "Sex", "Birthday", "OfficePhone",
                 "CellPhone", "FamilyPhone", "Email", "ZipCode", "Remark", "Address"],
                [document.all.txtUserLoginId.value,
                 document.all.txtUserPassword.value,
                 document.all.txtUserName.value,
	             document.all.cbUserDisabled.checked ? "1" : "0",
                 document.all.txtUserIdCard.value,
                 document.all.selectUserSex.options[document.all.selectUserSex.selectedIndex].value,
                 document.all.txtUserBirthday.value,
                 document.all.txtUserOfficePhone.value,
                 document.all.txtUserCellPhone.value,
                 document.all.txtUserFamilyPhone.value,
                 document.all.txtUserEmail.value,
                 document.all.txtUserZipCode.value,
                 document.all.txtaUserRemark.value,
                 document.all.txtaUserAddress.value]);
                 
            var succeed = XmlHttpHelper.transmit(false, "post", "text", "RemoteHandlers/InsertUser.ashx", null, createStr);

            if(succeed == "-1")
            {
	            alert(Message.serverError);
	            window.returnValue = {Succeed : false};
	            window.close();
            }
	        else if(succeed == "-2")
	        {
	            document.all.divAlertMess.innerText = "“登录ID”不能重复。";
	        }
	        else if(succeed == "1")
	        {
	            window.returnValue = {Succeed : true};
                window.close();
	        }
	    }
	    else if(window.dialogArguments.mode == "edit")
	    {
	        var updateStr = StringHelper.buildFlatXmlString(
                "User",
                ["LoginId", "Name", "Disabled", "IdCard", "Sex", "Birthday", "OfficePhone",
                 "CellPhone", "FamilyPhone", "Email", "ZipCode", "Remark", "Address"],
                [document.all.txtUserLoginId.value,
                 document.all.txtUserName.value,
	             document.all.cbUserDisabled.checked ? "1" : "0",
                 document.all.txtUserIdCard.value,
                 document.all.selectUserSex.options[document.all.selectUserSex.selectedIndex].value,
                 document.all.txtUserBirthday.value,
                 document.all.txtUserOfficePhone.value,
                 document.all.txtUserCellPhone.value,
                 document.all.txtUserFamilyPhone.value,
                 document.all.txtUserEmail.value,
                 document.all.txtUserZipCode.value,
                 document.all.txtaUserRemark.value,
                 document.all.txtaUserAddress.value]);
                 
            var succeed = XmlHttpHelper.transmit(false, "post", "text", "RemoteHandlers/UpdateUser.ashx", null, updateStr);

            if(succeed == "-1")
            {
	            alert(Message.serverError);
	            window.returnValue = {Succeed : false};
	            window.close();
            }
	        else
	        {
	            window.returnValue = {Succeed : true};
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
	document.all.txtUserLoginId.value = StringHelper.trim(document.all.txtUserLoginId.value);
	document.all.txtUserName.value = StringHelper.trim(document.all.txtUserName.value);
	document.all.txtUserIdCard.value = StringHelper.trim(document.all.txtUserIdCard.value);
	document.all.txtUserOfficePhone.value = StringHelper.trim(document.all.txtUserOfficePhone.value);
	document.all.txtUserCellPhone.value = StringHelper.trim(document.all.txtUserCellPhone.value);
	document.all.txtUserFamilyPhone.value = StringHelper.trim(document.all.txtUserFamilyPhone.value);
	document.all.txtUserEmail.value = StringHelper.trim(document.all.txtUserEmail.value);
	document.all.txtUserZipCode.value = StringHelper.trim(document.all.txtUserZipCode.value);
}

//
//	检测输入项合法性。
//
function _checkInputValue()
{
    document.all.divAlertMess.innerText = "";
    
	if((window.dialogArguments.mode == "new") && document.all.txtUserLoginId.value.length < 2)
	{
		document.all.divAlertMess.innerText = "“登录ID”长度必须大于等于 2 位。";
		return false;
	}
	if((window.dialogArguments.mode == "new") && !StringHelper.isCleanString(document.all.txtUserLoginId.value))
	{
		document.all.divAlertMess.innerText = "“登录ID”只能包含英文大小写字母、数字和下划线。";
		return false;
	}
	if((window.dialogArguments.mode == "new") && document.all.txtUserPassword.value.length < 6)
	{
		document.all.divAlertMess.innerText = "“密码”长度必须大于等于 6 位。";
		return false;
	}
	if(document.all.txtUserEmail.value.length > 0 && !StringHelper.isEmail(document.all.txtUserEmail.value))
	{
		document.all.divAlertMess.innerText = "“Email”格式不正确。";
		return false;
	}
	if(document.all.txtaUserRemark.value.length > 100)
	{
	    document.all.divAlertMess.innerText = "“备注”长度不能大于100个字符。";
		return false;
	}
	if(document.all.txtaUserAddress.value.length > 100)
	{
	    document.all.divAlertMess.innerText = "“通讯住址”长度不能大于100个字符。";
		return false;
	}
	return true;
}