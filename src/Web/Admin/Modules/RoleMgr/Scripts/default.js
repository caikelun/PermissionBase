var _oTree = null;
var _oNode = "";
var _sNodeType = "";
var _sNodePKId = "";

function window.onresize()
{
    try
    {
	    var h = document.documentElement.clientHeight - document.all.divToolBar.offsetHeight - document.all.divStatusBar.offsetHeight;
	    if(h > 0) document.all.divRolesTree.style.height = h;
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
	    _oTree = document.all.tvRoles;
	    _oTree.attachEvent("onselectedindexchange", tvRolesSelectedIndexChanged);
    	
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
//	id:		tvRoles
//	event:	onselectedindexchange
//
function tvRolesSelectedIndexChanged()
{
    try
    {
	    _oNode = _oTree.getTreeNode(event.newTreeNodeIndex);
	    _sNodeType = _oNode.getAttribute("Type");
	    _sNodePKId = _oNode.getAttribute("PKId");
    	
	    if(_sNodeType == "roletype") _load_RoleType(_sNodePKId);
	    else if(_sNodeType == "role") _load_Role(_sNodePKId);

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
//	id:		btnNewRoleType
//	event:	onclick
//
function btnNewRoleTypeClicked()
{
    try
    {
	    var returnVal = OpenDialogHelper.openModalDlg("RoleTypeInfo.aspx?mode=new", {mode : "new", pid : _sNodePKId }, 410, 265);
	    
	    if(returnVal)
	    {
	        if(returnVal.Succeed) TreeviewHelper.insertTreeNode(_oTree, _oNode, ["roletype", "role"], returnVal.Id, returnVal.Name, returnVal.OrderId, "roletype");
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
//	id:		btnNewRole
//	event:	onclick
//
function btnNewRoleClicked()
{
    try
    {
	    var returnVal = OpenDialogHelper.openModalDlg("RoleInfo.aspx?mode=new", {mode : "new", pid : _sNodePKId }, 410, 265);
	    
	    if(returnVal)
	    {
	        if(returnVal.Succeed) TreeviewHelper.insertTreeNode(_oTree, _oNode, ["roletype", "role"], returnVal.Id, returnVal.Name, returnVal.OrderId, "role");
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
        var returnVal = null;
        if(_sNodeType == "roletype")
	        returnVal = OpenDialogHelper.openModalDlg("RoleTypeInfo.aspx?mode=edit&id=" + _sNodePKId, {mode : "edit", id : _sNodePKId }, 410, 265);
	    else if(_sNodeType == "role")
	        returnVal = OpenDialogHelper.openModalDlg("RoleInfo.aspx?mode=edit&id=" + _sNodePKId, {mode : "edit", id : _sNodePKId }, 410, 265);
		
        if(returnVal)
        {
            if(returnVal.Succeed)
            {
                var oldNodeOrderId = _oNode.getAttribute("OrderId");
    	        
                _oNode.setAttribute("Text", returnVal.Name);
                _oNode.setAttribute("OrderId", returnVal.OrderId);
                
                if(oldNodeOrderId != returnVal.OrderId)
                {
                    TreeviewHelper.moveTreeNode(_oTree, _oNode.getParent(), ["roletype", "role"], _oNode);
                }
                else
                {
                    if(_sNodeType == "roletype") _load_RoleType(_sNodePKId);
                    else if(_sNodeType == "role") _load_Role(_sNodePKId);
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
        returnVal = OpenDialogHelper.openModalDlg("Move.aspx?moveWhat=" + _sNodeType, {moveWhat : _sNodeType, id : _sNodePKId, index : _oNode.getNodeIndex(), pIndex : _oNode.getParent().getNodeIndex() }, 350, 505);
        
		if(returnVal)
        {
            if(returnVal.Succeed)
            {
                var newParentNode = _oTree.getTreeNode(returnVal.newParentIndex);
                if(newParentNode && newParentNode.getAttribute("PKId") == returnVal.newParentPKId)
                {
                    TreeviewHelper.moveTreeNode(_oTree, newParentNode, ["roletype", "role"], _oNode);
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
        if(_sNodeType == "roletype")
	    {
	        if(_oNode.getChildren().length > 0)
	        {
	            alert("提示：当前角色分类包含子角色分类或角色，所以不能被删除。");
	            return;
	        }
	        if(confirm("您确实要删除当前角色分类吗？"))
	        {
	            var succeed = XmlHttpHelper.transmit(false, "get", "text", "RemoteHandlers/DeleteRoleType.ashx?id=" + _sNodePKId, null, null);
	            if(succeed == "1")
	            {
	                TreeviewHelper.deleteTreeNode(_oTree, _oNode);
	            }
	            else
	            {
	                alert(Message.serverError);
	                location.reload(true);
	            }
	        }
	    }
	    else if(_sNodeType == "role")
	    {
	        if(confirm("您确实要删除当前角色吗？"))
	        {
	            var succeed = XmlHttpHelper.transmit(false, "get", "text", "RemoteHandlers/DeleteRole.ashx?id=" + _sNodePKId, null, null);
	            if(succeed == "1")
	            {
	                TreeviewHelper.deleteTreeNode(_oTree, _oNode);
	            }
	            else
	            {
	                alert(Message.serverError);
	                location.reload(true);
	            }
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
	document.all.divRoleTypeInfo.style.display = (type == "roletype" ? "" : "none");
	document.all.divRoleInfo.style.display = (type == "role" ? "" : "none");
}

//
//	切换工具栏按钮的可用性。
//
function _disable_toolBtns(type)
{
	document.all.btnNewRoleType.disabled = (type == "role");
	document.all.btnNewRole.disabled = (type != "roletype");
	document.all.btnEdit.disabled = (type == "root");
	document.all.btnMove.disabled = (type == "root");
	document.all.btnPermission.disabled = (type != "role");
	document.all.btnDelete.disabled = (type == "root");
}

//
//	加载角色分类信息。
//
function _load_RoleType(id)
{
    var responseData = XmlHttpHelper.transmit(false, "get", "xml", "RemoteHandlers/GetRoleType.ashx?id=" + id, null, null);
	
	if(responseData.selectSingleNode("/RoleType/Succeed").text == "1")
	{
        document.all.txtRoleTypeName.value = responseData.selectSingleNode("/RoleType/Name").text;
	    document.all.txtaRoleTypeRemark.value = responseData.selectSingleNode("/RoleType/Remark").text;
	    document.all.txtRoleTypeOrderId.value = responseData.selectSingleNode("/RoleType/OrderId").text;
	}
	else
	{
	    _oTree.selectedNodeIndex = "0";
	    alert(Message.serverError);
	    location.reload(true);
	}
}

//
//	加载角色信息。
//
function _load_Role(id)
{
    var responseData = XmlHttpHelper.transmit(false, "get", "xml", "RemoteHandlers/GetRole.ashx?id=" + id, null, null);
	
	if(responseData.selectSingleNode("/Role/Succeed").text == "1")
	{
        document.all.txtRoleName.value = responseData.selectSingleNode("/Role/Name").text;
	    document.all.txtaRoleRemark.value = responseData.selectSingleNode("/Role/Remark").text;
	    document.all.txtRoleOrderId.value = responseData.selectSingleNode("/Role/OrderId").text;
	}
	else
	{
	    _oTree.selectedNodeIndex = "0";
	    alert(Message.serverError);
	    location.reload(true);
	}
}