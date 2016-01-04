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
        document.all.txtStaffLoginId.readOnly = true;
        document.all.txtStaffLoginId.style.backgroundColor = "#f2f2f2";
        
        //密码输入项不显示。
        document.all.spanPassword.style.display = "none";
        document.all.txtStaffPassword.style.display = "none";
        
        //输入焦点。
        document.all.txtStaffName.focus();
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
	            "Staff",
	            ["LoginId", "Password", "Name", "Disabled", "OrderId", "IdCard", "Code",
	             "Degree", "Sex", "Political", "Married", "Birthday", "Country", "EntersDay",
	             "Nation", "LeavesDay", "Position", "OfficePhone", "Title", "ExtNumber",
	             "CellPhone", "FamilyPhone", "Email", "ZipCode", "Remark", "Address", "DepartmentId"],
	            [document.all.txtStaffLoginId.value,
	             document.all.txtStaffPassword.value,
	             document.all.txtStaffName.value,
	             document.all.cbStaffDisabled.checked ? "1" : "0",
	             document.all.txtStaffOrderId.value,
	             document.all.txtStaffIdCard.value,
	             document.all.txtStaffCode.value,
	             document.all.selectStaffDegree.options[document.all.selectStaffDegree.selectedIndex].value,
	             document.all.selectStaffSex.options[document.all.selectStaffSex.selectedIndex].value,
	             document.all.selectStaffPolitical.options[document.all.selectStaffPolitical.selectedIndex].value,
	             document.all.selectStaffMarried.options[document.all.selectStaffMarried.selectedIndex].value,
	             document.all.txtStaffBirthday.value,
	             document.all.selectStaffCountry.options[document.all.selectStaffCountry.selectedIndex].value,
	             document.all.txtStaffEntersDay.value,
	             document.all.selectStaffNation.options[document.all.selectStaffNation.selectedIndex].value,
	             document.all.txtStaffLeavesDay.value,
	             document.all.selectStaffPosition.options[document.all.selectStaffPosition.selectedIndex].value,
	             document.all.txtStaffOfficePhone.value,
	             document.all.selectStaffTitle.options[document.all.selectStaffTitle.selectedIndex].value,
	             document.all.txtStaffExtNumber.value,
	             document.all.txtStaffCellPhone.value,
	             document.all.txtStaffFamilyPhone.value,
	             document.all.txtStaffEmail.value,
	             document.all.txtStaffZipCode.value,
	             document.all.txtaStaffRemark.value,
	             document.all.txtaStaffAddress.value,
	             window.dialogArguments.pid]);
            				
            var succeed = XmlHttpHelper.transmit(false, "post", "text", "RemoteHandlers/InsertStaff.ashx", null, createStr);

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
	            window.returnValue = {Succeed : true, Id : document.all.txtStaffLoginId.value,
	                Name : document.all.txtStaffName.value, OrderId : document.all.txtStaffOrderId.value,
	                StaffType : document.all.cbStaffDisabled.checked ? "staffdisabled" : "staff"};
                window.close();
	        }
	    }
	    else if(window.dialogArguments.mode == "edit")
	    {
	        var updateStr = StringHelper.buildFlatXmlString(
				"Staff",
	            ["LoginId", "Name", "Disabled", "OrderId", "IdCard", "Code",
	             "Degree", "Sex", "Political", "Married", "Birthday", "Country", "EntersDay",
	             "Nation", "LeavesDay", "Position", "OfficePhone", "Title", "ExtNumber",
	             "CellPhone", "FamilyPhone", "Email", "ZipCode", "Remark", "Address"],
	            [document.all.txtStaffLoginId.value,
	             document.all.txtStaffName.value,
	             document.all.cbStaffDisabled.checked ? "1" : "0",
	             document.all.txtStaffOrderId.value,
	             document.all.txtStaffIdCard.value,
	             document.all.txtStaffCode.value,
	             document.all.selectStaffDegree.options[document.all.selectStaffDegree.selectedIndex].value,
	             document.all.selectStaffSex.options[document.all.selectStaffSex.selectedIndex].value,
	             document.all.selectStaffPolitical.options[document.all.selectStaffPolitical.selectedIndex].value,
	             document.all.selectStaffMarried.options[document.all.selectStaffMarried.selectedIndex].value,
	             document.all.txtStaffBirthday.value,
	             document.all.selectStaffCountry.options[document.all.selectStaffCountry.selectedIndex].value,
	             document.all.txtStaffEntersDay.value,
	             document.all.selectStaffNation.options[document.all.selectStaffNation.selectedIndex].value,
	             document.all.txtStaffLeavesDay.value,
	             document.all.selectStaffPosition.options[document.all.selectStaffPosition.selectedIndex].value,
	             document.all.txtStaffOfficePhone.value,
	             document.all.selectStaffTitle.options[document.all.selectStaffTitle.selectedIndex].value,
	             document.all.txtStaffExtNumber.value,
	             document.all.txtStaffCellPhone.value,
	             document.all.txtStaffFamilyPhone.value,
	             document.all.txtStaffEmail.value,
	             document.all.txtStaffZipCode.value,
	             document.all.txtaStaffRemark.value,
	             document.all.txtaStaffAddress.value]);
            				
            var succeed = XmlHttpHelper.transmit(false, "post", "text", "RemoteHandlers/UpdateStaff.ashx", null, updateStr);

            if(succeed == "-1")
            {
	            alert(Message.serverError);
	            window.returnValue = {Succeed : false};
	            window.close();
            }
	        else
	        {
	            window.returnValue = {Succeed : true, Name : document.all.txtStaffName.value, OrderId : document.all.txtStaffOrderId.value,
	                StaffType : document.all.cbStaffDisabled.checked ? "staffdisabled" : "staff"};
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
	document.all.txtStaffLoginId.value = StringHelper.trim(document.all.txtStaffLoginId.value);
	document.all.txtStaffName.value = StringHelper.trim(document.all.txtStaffName.value);
	document.all.txtStaffOrderId.value = StringHelper.trim(document.all.txtStaffOrderId.value);
	document.all.txtStaffIdCard.value = StringHelper.trim(document.all.txtStaffIdCard.value);
	document.all.txtStaffCode.value = StringHelper.trim(document.all.txtStaffCode.value);
	document.all.txtStaffOfficePhone.value = StringHelper.trim(document.all.txtStaffOfficePhone.value);
	document.all.txtStaffExtNumber.value = StringHelper.trim(document.all.txtStaffExtNumber.value);
	document.all.txtStaffCellPhone.value = StringHelper.trim(document.all.txtStaffCellPhone.value);
	document.all.txtStaffFamilyPhone.value = StringHelper.trim(document.all.txtStaffFamilyPhone.value);
	document.all.txtStaffEmail.value = StringHelper.trim(document.all.txtStaffEmail.value);
	document.all.txtStaffZipCode.value = StringHelper.trim(document.all.txtStaffZipCode.value);
}

//
//	检测输入项合法性。
//
function _checkInputValue()
{
    document.all.divAlertMess.innerText = "";
    
	if((window.dialogArguments.mode == "new") && document.all.txtStaffLoginId.value.length < 2)
	{
		document.all.divAlertMess.innerText = "“登录ID”长度必须大于等于 2 位。";
		return false;
	}
	if((window.dialogArguments.mode == "new") && !StringHelper.isCleanString(document.all.txtStaffLoginId.value))
	{
		document.all.divAlertMess.innerText = "“登录ID”只能包含英文大小写字母、数字和下划线。";
		return false;
	}
	if((window.dialogArguments.mode == "new") && document.all.txtStaffPassword.value.length < 6)
	{
		document.all.divAlertMess.innerText = "“密码”长度必须大于等于 6 位。";
		return false;
	}
	if(StringHelper.isEmpty(document.all.txtStaffName.value))
	{
		document.all.divAlertMess.innerText = "“姓名”不能为空。";
		return false;
	}
	if(StringHelper.isEmpty(document.all.txtStaffOrderId.value))
	{
		document.all.divAlertMess.innerText = "“排序ID”不能为空。";
		return false;
	}
	if(!StringHelper.isInt(document.all.txtStaffOrderId.value))
	{
		document.all.divAlertMess.innerText = "“排序ID”必须是非负整数。";
		return false;
	}
	if(document.all.txtStaffEmail.value.length > 0 && !StringHelper.isEmail(document.all.txtStaffEmail.value))
	{
		document.all.divAlertMess.innerText = "“Email”格式不正确。";
		return false;
	}
	if(document.all.txtaStaffRemark.value.length > 100)
	{
	    document.all.divAlertMess.innerText = "“备注”长度不能大于100个字符。";
		return false;
	}
	if(document.all.txtaStaffAddress.value.length > 100)
	{
	    document.all.divAlertMess.innerText = "“家庭住址”长度不能大于100个字符。";
		return false;
	}
	return true;
}