var _oTree = null;
var _oNode = "";
var _sNodeType = "";
var _sNodePKId = "";

function window.onresize()
{
    try
    {
	    var h = document.documentElement.clientHeight - document.all.divToolBar.offsetHeight - document.all.divStatusBar.offsetHeight;
	    if(h > 0) document.all.divModulesTree.style.height = h;
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
	    _oTree = document.all.tvModules;
	    _oTree.attachEvent("onselectedindexchange", tvModulesSelectedIndexChanged);
    	
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
//	id:		tvModules
//	event:	onselectedindexchange
//
function tvModulesSelectedIndexChanged()
{
    try
    {
	    _oNode = _oTree.getTreeNode(event.newTreeNodeIndex);
	    _sNodeType = _oNode.getAttribute("Type");
	    _sNodePKId = _oNode.getAttribute("PKId");
    	
	    if(_sNodeType == "moduletype") _load_ModuleType(_sNodePKId);
	    else if(_sNodeType == "module") _load_Module(_sNodePKId);

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
//	id:		btnNewModuleType
//	event:	onclick
//
function btnNewModuleTypeClicked()
{
    try
    {
	    var returnVal = OpenDialogHelper.openModalDlg("ModuleTypeInfo.aspx?mode=new", {mode : "new", pid : _sNodePKId }, 410, 265);
	    
	    if(returnVal)
	    {
	        if(returnVal.Succeed) TreeviewHelper.insertTreeNode(_oTree, _oNode, ["moduletype", "module"], returnVal.Id, returnVal.Name, returnVal.OrderId, "moduletype");
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
//	id:		btnNewModule
//	event:	onclick
//
function btnNewModuleClicked()
{
    try
    {
	    var returnVal = OpenDialogHelper.openModalDlg("ModuleInfo.aspx?mode=new", {mode : "new", pid : _sNodePKId }, 410, 505);
	    
	    if(returnVal)
	    {
	        if(returnVal.Succeed) TreeviewHelper.insertTreeNode(_oTree, _oNode, ["moduletype", "module"], returnVal.Id, returnVal.Name, returnVal.OrderId, "module");
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
        if(_sNodeType == "moduletype")
	        returnVal = OpenDialogHelper.openModalDlg("ModuleTypeInfo.aspx?mode=edit&id=" + _sNodePKId, {mode : "edit", id : _sNodePKId }, 410, 265);
	    else if(_sNodeType == "module")
	        returnVal = OpenDialogHelper.openModalDlg("ModuleInfo.aspx?mode=edit&id=" + _sNodePKId, {mode : "edit", id : _sNodePKId }, 410, 505);
		
        if(returnVal)
        {
            if(returnVal.Succeed)
            {
                var oldNodeOrderId = _oNode.getAttribute("OrderId");
    	        
                _oNode.setAttribute("Text", returnVal.Name);
                _oNode.setAttribute("OrderId", returnVal.OrderId);
                
                if(oldNodeOrderId != returnVal.OrderId)
                {
                    TreeviewHelper.moveTreeNode(_oTree, _oNode.getParent(), ["moduletype", "module"], _oNode);
                }
                else
                {
                    if(_sNodeType == "moduletype") _load_ModuleType(_sNodePKId);
                    else if(_sNodeType == "module") _load_Module(_sNodePKId);
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
                    TreeviewHelper.moveTreeNode(_oTree, newParentNode, ["moduletype", "module"], _oNode);
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
        if(_sNodeType == "moduletype")
	    {
	        if(_oNode.getChildren().length > 0)
	        {
	            alert("提示：当前模块分类包含子模块分类或模块，所以不能被删除。");
	            return;
	        }
	        if(confirm("您确实要删除当前模块分类吗？"))
	        {
	            var succeed = XmlHttpHelper.transmit(false, "get", "text", "RemoteHandlers/DeleteModuleType.ashx?id=" + _sNodePKId, null, null);
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
	    else if(_sNodeType == "module")
	    {
	        var oDivRights = document.all.divRights;
	        for(var i = 0; i < oDivRights.children.length; i++)
	        {
	            if(oDivRights.children[i].firstChild.innerText == "√")
	            {
	                alert("提示：当前模块包含权限，所以不能被删除。");
	                return;
	            }
	        }
	        if(confirm("您确实要删除当前模块吗？"))
	        {
	            var succeed = XmlHttpHelper.transmit(false, "get", "text", "RemoteHandlers/DeleteModule.ashx?id=" + _sNodePKId, null, null);
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
	document.all.divModuleTypeInfo.style.display = (type == "moduletype" ? "" : "none");
	document.all.divModuleInfo.style.display = (type == "module" ? "" : "none");
}

//
//	切换工具栏按钮的可用性。
//
function _disable_toolBtns(type)
{
	document.all.btnNewModuleType.disabled = (type == "module");
	document.all.btnNewModule.disabled = (type != "moduletype");
	document.all.btnEdit.disabled = (type == "root");
	document.all.btnMove.disabled = (type == "root");
	document.all.btnDelete.disabled = (type == "root");
}

//
//	加载模块分类信息。
//
function _load_ModuleType(id)
{
	var responseData = XmlHttpHelper.transmit(false, "get", "xml", "RemoteHandlers/GetModuleType.ashx?id=" + id, null, null);
	
	if(responseData.selectSingleNode("/ModuleType/Succeed").text == "1")
	{
        document.all.txtModuleTypeName.value = responseData.selectSingleNode("/ModuleType/Name").text;
	    document.all.txtaModuleTypeRemark.value = responseData.selectSingleNode("/ModuleType/Remark").text;
	    document.all.txtModuleTypeOrderId.value = responseData.selectSingleNode("/ModuleType/OrderId").text;
	}
	else
	{
	    _oTree.selectedNodeIndex = "0";
	    alert(Message.serverError);
	    location.reload(true);
	}
}

//
//	加载模块信息。
//
function _load_Module(id)
{
	var responseData = XmlHttpHelper.transmit(false, "get", "xml", "RemoteHandlers/GetModule.ashx?id=" + id, null, null);
	
	if(responseData.selectSingleNode("/Module/Succeed").text == "1")
	{
	    document.all.txtModuleTag.value = responseData.selectSingleNode("/Module/Tag").text;
	    document.all.txtModuleName.value = responseData.selectSingleNode("/Module/Name").text;
	    document.all.txtaModuleRemark.value = responseData.selectSingleNode("/Module/Remark").text;
	    document.all.txtModuleOrderId.value = responseData.selectSingleNode("/Module/OrderId").text;
	    document.all.txtModuleModuleUrl.value = responseData.selectSingleNode("/Module/ModuleUrl").text;
	    document.all.txtModuleDisabled.value = (responseData.selectSingleNode("/Module/Disabled").text == "1" ? "√" : "");
    	
	    //删除原来所有的"√"标记。
	    var oDivRights = document.all.divRights;
	    for(var i = 0; i < oDivRights.children.length; i++)
	    {
	        oDivRights.children[i].firstChild.innerText = "　";
	    }
    	
	    //显示新的标记。
	    var sRights = responseData.selectSingleNode("/Module/ModuleRightList").text;
	    if(sRights.length > 0)
	    {
	        var arrRights = sRights.split("|");
	        for(var i = 0; i < arrRights.length; i++)
	        {
	            if(arrRights[i].length > 0)
                {
	                var spanRight = document.getElementById(arrRights[i]);
	                if(spanRight) spanRight.innerText = "√";
	            }
	        }
	    }
	}
	else
	{
	    _oTree.selectedNodeIndex = "0";
	    alert(Message.serverError);
	    location.reload(true);
	}
}