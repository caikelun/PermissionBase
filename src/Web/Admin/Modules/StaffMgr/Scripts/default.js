var _oTree = null;
var _oNode = "";
var _sNodeType = "";
var _sNodePKId = "";

function window.onresize()
{
    try
    {
	    var h = document.documentElement.clientHeight - document.all.divToolBar.offsetHeight - document.all.divStatusBar.offsetHeight;
	    if(h > 0) document.all.divDepartmentsTree.style.height = h;
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
    	
    try
    {
	    _oTree = document.all.tvDepartments;
	    _oTree.attachEvent("onselectedindexchange", tvDepartmentsSelectedIndexChanged);
    	
	    _oNode = _oTree.getTreeNode(_oTree.selectedNodeIndex);
	    _sNodeType = _oNode.getAttribute("Type");
	    _sNodePKId = _oNode.getAttribute("PKId");
    	
	    _disable_toolBtns("root");
	    _switch_mainDiv("root");
	}
	catch(e)
	{
	    alert(Message.clientError);
	    window.location.href = "../../Frameset/Welcome.aspx";
	}
}

//
//	id:		tvDepartments
//	event:	onselectedindexchange
//
function tvDepartmentsSelectedIndexChanged()
{
    try
    {
	    _oNode = _oTree.getTreeNode(event.newTreeNodeIndex);
	    _sNodeType = _oNode.getAttribute("Type");
	    _sNodePKId = _oNode.getAttribute("PKId");
    	
	    if(_sNodeType == "department") _load_Department(_sNodePKId);
	    else if(_sNodeType == "staff" || _sNodeType == "staffdisabled") _load_Staff(_sNodePKId);

	    _disable_toolBtns(_sNodeType);
	    _switch_mainDiv(_sNodeType);
	}
	catch(e)
	{
	    alert(Message.clientError);
	    location.reload(true);
	}
}

//
//	id:		btnNew
//	event:	onclick
//
function btnNewClicked()
{
    try
    {
	    var returnVal = OpenDialogHelper.openModalDlg("StaffInfo.aspx?mode=new", {mode : "new", pid : _sNodePKId }, 420, 487);
	    
	    if(returnVal)
	    {
	        if(returnVal.Succeed) TreeviewHelper.insertTreeNode(_oTree, _oNode, ["department", "staff", "staffdisabled"], returnVal.Id, returnVal.Name, returnVal.OrderId, returnVal.StaffType);
	        else location.reload(true);
	    }
	}
	catch(e)
	{
	    alert(Message.clientError);
	    location.reload(true);
	}
}

//
//	id:		btnEdit
//	event:	onclick
//
function btnEditClicked()
{
    try
    {
	    var returnVal = OpenDialogHelper.openModalDlg("StaffInfo.aspx?mode=edit&id=" + _sNodePKId, {mode : "edit", id : _sNodePKId }, 420, 487);
		
        if(returnVal)
        {
            if(returnVal.Succeed)
            {
                var oldNodeOrderId = _oNode.getAttribute("OrderId");
                var oldNodeType = _oNode.getAttribute("Type");
    	        
                _oNode.setAttribute("Text", returnVal.Name);
                _oNode.setAttribute("OrderId", returnVal.OrderId);
                _oNode.setAttribute("Type", returnVal.StaffType);
                
                if(oldNodeOrderId != returnVal.OrderId || oldNodeType != returnVal.StaffType)
                {
                    TreeviewHelper.moveTreeNode(_oTree, _oNode.getParent(), ["department", "staff", "staffdisabled"], _oNode);
                }
                else
                {
                    _load_Staff(_sNodePKId);
                }
            }
            else
            {
                location.reload(true);
            }
        }
	}
	catch(e)
	{
	    alert(Message.clientError);
	    location.reload(true);
	}
}

//
//	id:		btnEditPassword
//	event:	onclick
//
function btnEditPasswordClicked()
{
    try
    {
        returnVal = OpenDialogHelper.openModalDlg("UpdatePassword.aspx", {id : _sNodePKId}, 410, 195);
        
		if(returnVal)
        {
            if(!returnVal.Succeed)
            {
                location.reload(true);
            }
        }
	}
	catch(e)
	{
	    alert(Message.clientError);
	    location.reload(true);
	}
}

//
//	id:		btnMove
//	event:	onclick
//
function btnMoveClicked()
{
    try
    {
        returnVal = OpenDialogHelper.openModalDlg("Move.aspx", {id : _sNodePKId, index : _oNode.getNodeIndex(), pIndex : _oNode.getParent().getNodeIndex() }, 350, 505);
        
		if(returnVal)
        {
            if(returnVal.Succeed)
            {
                var newParentNode = _oTree.getTreeNode(returnVal.newParentIndex);
                if(newParentNode && newParentNode.getAttribute("PKId") == returnVal.newParentPKId)
                {
                    TreeviewHelper.moveTreeNode(_oTree, newParentNode, ["department", "staff", "staffdisabled"], _oNode);
                }
            }
            else
            {
                location.reload(true);
            }
        }
	}
	catch(e)
	{
	    alert(Message.clientError);
	    location.reload(true);
	}
}

//
//	id:		btnRole
//	event:	onclick
//
function btnRoleClicked()
{
    try
    {
        returnVal = OpenDialogHelper.openModalDlg("Roles.aspx?id=" + _sNodePKId, {id : _sNodePKId}, 380, 505);
        
		if(returnVal)
        {
            if(!returnVal.Succeed)
            {
                location.reload(true);
            }
        }
	}
	catch(e)
	{
	    alert(Message.clientError);
	    location.reload(true);
	}
}

//
//	id:		btnPermission
//	event:	onclick
//
function btnPermissionClicked()
{
    try
    {
        returnVal = OpenDialogHelper.openModalDlg("Permissions.aspx?id=" + _sNodePKId, {id : _sNodePKId}, 380, 505);
        
		if(returnVal)
        {
            if(!returnVal.Succeed)
            {
                location.reload(true);
            }
        }
	}
	catch(e)
	{
	    alert(Message.clientError);
	    location.reload(true);
	}
}

//
//	id:		btnDelete
//	event:	onclick
//
function btnDeleteClicked()
{
    try
    {
        if(confirm("您确实要删除当前职员吗？"))
        {
            var succeed = XmlHttpHelper.transmit(false, "get", "text", "RemoteHandlers/DeleteStaff.ashx?id=" + _sNodePKId, null, null);
            if(succeed == "1")
            {
                TreeviewHelper.deleteTreeNode(_oTree, _oNode);
            }
            else if(succeed == "-1")
            {
                alert(Message.serverError);
                location.reload(true);
            }
        }
	}
	catch(e)
	{
	    alert(Message.clientError);
	    location.reload(true);
	}
}


//
//	切换右侧的主显示区。
//
function _switch_mainDiv(type)
{
	document.all.divRoot.style.display = (type == "root" ? "" : "none");
	document.all.divDepartmentInfo.style.display = (type == "department" ? "" : "none");
	document.all.divStaff.style.display = ((type == "staff" || type == "staffdisabled") ? "" : "none");
}

//
//	切换工具栏按钮的可用性。
//
function _disable_toolBtns(type)
{
    document.all.btnNew.disabled = (type != "department");
	document.all.btnEdit.disabled =
	document.all.btnEditPassword.disabled =
	document.all.btnMove.disabled =
	document.all.btnRole.disabled =
	document.all.btnPermission.disabled =
	document.all.btnDelete.disabled = (type == "root" || type == "department");
}

//
//	加载部门信息。
//
function _load_Department(id)
{
	var responseData = XmlHttpHelper.transmit(false, "get", "xml", "RemoteHandlers/GetDepartment.ashx?id=" + id, null, null);
	
	if(responseData.selectSingleNode("/Department/Succeed").text == "1")
	{
        document.all.txtDepartmentName.value = responseData.selectSingleNode("/Department/Name").text;
        document.all.txtDepartmentPhone.value = responseData.selectSingleNode("/Department/Phone").text;
        document.all.txtDepartmentExtNumber.value = responseData.selectSingleNode("/Department/ExtNumber").text;
        document.all.txtDepartmentFax.value = responseData.selectSingleNode("/Department/Fax").text;
	    document.all.txtaDepartmentRemark.value = responseData.selectSingleNode("/Department/Remark").text;
	    document.all.txtDepartmentOrderId.value = responseData.selectSingleNode("/Department/OrderId").text;
	}
	else
	{
	    _oTree.selectedNodeIndex = "0";
	    alert(Message.serverError);
	    location.reload(true);
	}
}

//
//	加载职员信息。
//
function _load_Staff(id)
{
    var responseData = XmlHttpHelper.transmit(false, "get", "xml", "RemoteHandlers/GetStaff.ashx?id=" + id, null, null);
	
	if(responseData.selectSingleNode("/Staff/Succeed").text == "1")
	{
        document.all.txtStaffLoginId.value = responseData.selectSingleNode("/Staff/LoginId").text;
        document.all.txtStaffCode.value = responseData.selectSingleNode("/Staff/Code").text;
        document.all.txtStaffName.value = responseData.selectSingleNode("/Staff/Name").text;
        document.all.txtStaffSex.value = responseData.selectSingleNode("/Staff/Sex").text;
        document.all.txtStaffMarried.value = responseData.selectSingleNode("/Staff/Married").text;
        document.all.txtStaffIdCard.value = responseData.selectSingleNode("/Staff/IdCard").text;
        document.all.txtStaffCountry.value = responseData.selectSingleNode("/Staff/Country").text;
        document.all.txtStaffNation.value = responseData.selectSingleNode("/Staff/Nation").text;
        document.all.txtStaffPosition.value = responseData.selectSingleNode("/Staff/Position").text;
        document.all.txtStaffTitle.value = responseData.selectSingleNode("/Staff/Title").text;
        document.all.txtStaffPolitical.value = responseData.selectSingleNode("/Staff/Political").text;
        document.all.txtStaffDegree.value = responseData.selectSingleNode("/Staff/Degree").text;
        document.all.txtStaffBirthday.value = responseData.selectSingleNode("/Staff/Birthday").text;
        document.all.txtStaffEntersDay.value = responseData.selectSingleNode("/Staff/EntersDay").text;
        document.all.txtStaffLeavesDay.value = responseData.selectSingleNode("/Staff/LeavesDay").text;
        document.all.txtStaffOfficePhone.value = responseData.selectSingleNode("/Staff/OfficePhone").text;
        document.all.txtStaffExtNumber.value = responseData.selectSingleNode("/Staff/ExtNumber").text;
        document.all.txtStaffFamilyPhone.value = responseData.selectSingleNode("/Staff/FamilyPhone").text;
        document.all.txtStaffCellPhone.value = responseData.selectSingleNode("/Staff/CellPhone").text;
        document.all.txtStaffEmail.value = responseData.selectSingleNode("/Staff/Email").text;
        document.all.txtaStaffAddress.value = responseData.selectSingleNode("/Staff/Address").text;
        document.all.txtStaffZipCode.value = responseData.selectSingleNode("/Staff/ZipCode").text;
        document.all.txtaStaffRemark.value = responseData.selectSingleNode("/Staff/Remark").text;
        document.all.txtStaffDisabled.value = responseData.selectSingleNode("/Staff/Disabled").text;
        document.all.txtStaffOrderId.value = responseData.selectSingleNode("/Staff/OrderId").text;
	}
	else
	{
	    _oTree.selectedNodeIndex = "0";
	    alert(Message.serverError);
	    location.reload(true);
	}
}
