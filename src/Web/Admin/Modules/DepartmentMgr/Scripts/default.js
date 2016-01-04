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
	    var returnVal = OpenDialogHelper.openModalDlg("DepartmentInfo.aspx?mode=new", {mode : "new", pid : _sNodePKId }, 410, 337);
	    
	    if(returnVal)
	    {
	        if(returnVal.Succeed) TreeviewHelper.insertTreeNode(_oTree, _oNode, ["department"], returnVal.Id, returnVal.Name, returnVal.OrderId, "department");
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
	    var returnVal = OpenDialogHelper.openModalDlg("DepartmentInfo.aspx?mode=edit&id=" + _sNodePKId, {mode : "edit", id : _sNodePKId }, 410, 337);
		
        if(returnVal)
        {
            if(returnVal.Succeed)
            {
                var oldNodeOrderId = _oNode.getAttribute("OrderId");
    	        
                _oNode.setAttribute("Text", returnVal.Name);
                _oNode.setAttribute("OrderId", returnVal.OrderId);
                
                if(oldNodeOrderId != returnVal.OrderId)
                {
                    TreeviewHelper.moveTreeNode(_oTree, _oNode.getParent(), ["department"], _oNode);
                }
                else
                {
                    _load_Department(_sNodePKId);
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
                    TreeviewHelper.moveTreeNode(_oTree, newParentNode, ["department"], _oNode);
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
//	id:		btnDelete
//	event:	onclick
//
function btnDeleteClicked()
{
    try
    {
        if(_oNode.getChildren().length > 0)
        {
            alert("提示：当前部门包含子部门，所以不能被删除。");
            return;
        }
        if(confirm("您确实要删除当前部门吗？"))
        {
            var succeed = XmlHttpHelper.transmit(false, "get", "text", "RemoteHandlers/DeleteDepartment.ashx?id=" + _sNodePKId, null, null);
            if(succeed == "1")
            {
                TreeviewHelper.deleteTreeNode(_oTree, _oNode);
            }
            if(succeed == "-2")
            {
                alert("提示：当前部门包含职员，所以不能被删除。");
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
}

//
//	切换工具栏按钮的可用性。
//
function _disable_toolBtns(type)
{
	document.all.btnEdit.disabled = (type == "root");
	document.all.btnMove.disabled = (type == "root");
	document.all.btnDelete.disabled = (type == "root");
}

//
//	加载部门信息。
//
function _load_Department(id)
{
	var responseData = XmlHttpHelper.transmit(false, "get", "xml", "RemoteHandlers/GetDepartment.ashx?id=" + id, null, null);
	
	if(responseData.selectSingleNode("/Department/Succeed").text == "1")
	{
        document.all.txtName.value = responseData.selectSingleNode("/Department/Name").text;
        document.all.txtPhone.value = responseData.selectSingleNode("/Department/Phone").text;
        document.all.txtExtNumber.value = responseData.selectSingleNode("/Department/ExtNumber").text;
        document.all.txtFax.value = responseData.selectSingleNode("/Department/Fax").text;
	    document.all.txtaRemark.value = responseData.selectSingleNode("/Department/Remark").text;
	    document.all.txtOrderId.value = responseData.selectSingleNode("/Department/OrderId").text;
	}
	else
	{
	    _oTree.selectedNodeIndex = "0";
	    alert(Message.serverError);
	    location.reload(true);
	}
}
