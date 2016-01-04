var _oTree = null;
var _oNode = "";
var _sNodeType = "";
var _sNodePKId = "";

function window.onresize()
{
    try
    {
	    var h = document.documentElement.clientHeight - document.all.divToolBar.offsetHeight - document.all.divStatusBar.offsetHeight;
	    if(h > 0) document.all.divSysCodesTree.style.height = h;
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
	    _oTree = document.all.tvSysCodes;
	    _oTree.attachEvent("onselectedindexchange", tvSysCodesSelectedIndexChanged);
    	
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
//	id:		tvSysCodes
//	event:	onselectedindexchange
//
function tvSysCodesSelectedIndexChanged()
{
    try
    {
	    _oNode = _oTree.getTreeNode(event.newTreeNodeIndex);
	    _sNodeType = _oNode.getAttribute("Type");
	    _sNodePKId = _oNode.getAttribute("PKId");
    	
	    if(_sNodeType == "syscodetype") _load_SysCodeType(_sNodePKId);
	    else if(_sNodeType == "syscode") _load_SysCode(_sNodePKId);

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
        if(_sNodeType == "root")
        {
	        var returnVal = OpenDialogHelper.openModalDlg("SysCodeTypeInfo.aspx?mode=new", {mode : "new"}, 410, 290);
    	    
	        if(returnVal)
	        {
	            if(returnVal.Succeed) TreeviewHelper.insertTreeNode(_oTree, _oNode, ["syscodetype"], returnVal.Id, returnVal.Name, returnVal.OrderId, "syscodetype");
	            else location.reload(true);
	        }
	    }
	    else if(_sNodeType == "syscodetype")
	    {
	        var returnVal = OpenDialogHelper.openModalDlg("SysCodeInfo.aspx?mode=new", {mode : "new", pid : _sNodePKId}, 410, 290);
    	    
	        if(returnVal)
	        {
	            if(returnVal.Succeed) TreeviewHelper.insertTreeNode(_oTree, _oNode, ["syscode"], returnVal.Id, returnVal.Name, returnVal.OrderId, "syscode");
	            else location.reload(true);
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
//	id:		btnEdit
//	event:	onclick
//
function btnEditClicked()
{
    try
    {
        var returnVal = null;
        if(_sNodeType == "syscodetype")
	        returnVal = OpenDialogHelper.openModalDlg("SysCodeTypeInfo.aspx?mode=edit&id=" + _sNodePKId, {mode : "edit", id : _sNodePKId }, 410, 290);
	    else if(_sNodeType == "syscode")
	        returnVal = OpenDialogHelper.openModalDlg("SysCodeInfo.aspx?mode=edit&id=" + _sNodePKId, {mode : "edit", id : _sNodePKId }, 410, 290);
		
        if(returnVal)
        {
            if(returnVal.Succeed)
            {
                var oldNodeOrderId = _oNode.getAttribute("OrderId");
    	        
                _oNode.setAttribute("Text", returnVal.Name);
                _oNode.setAttribute("OrderId", returnVal.OrderId);
                
                if(oldNodeOrderId != returnVal.OrderId)
                {
                    TreeviewHelper.moveTreeNode(_oTree, _oNode.getParent(), ["syscodetype", "syscode"], _oNode);
                }
                else
                {
                    if(_sNodeType == "syscodetype") _load_SysCodeType(_sNodePKId);
                    else if(_sNodeType == "syscode") _load_SysCode(_sNodePKId);
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
        if(_sNodeType == "syscodetype")
	    {
	        if(_oNode.getChildren().length > 0)
	        {
	            alert("提示：当前系统代码分类包含系统代码，所以不能被删除。");
	            return;
	        }
	        if(confirm("您确实要删除当前系统代码分类吗？"))
	        {
	            var succeed = XmlHttpHelper.transmit(false, "get", "text", "RemoteHandlers/DeleteSysCodeType.ashx?id=" + _sNodePKId, null, null);
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
	    else if(_sNodeType == "syscode")
	    {
	        if(confirm("您确实要删除当前系统代码吗？"))
	        {
	            var succeed = XmlHttpHelper.transmit(false, "get", "text", "RemoteHandlers/DeleteSysCode.ashx?id=" + _sNodePKId, null, null);
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
	document.all.divSysCodeTypeInfo.style.display = (type == "syscodetype" ? "" : "none");
	document.all.divSysCodeInfo.style.display = (type == "syscode" ? "" : "none");
}

//
//	切换工具栏按钮的可用性。
//
function _disable_toolBtns(type)
{
	document.all.btnNew.disabled = (type == "syscode");
	document.all.btnEdit.disabled = (type == "root");
	document.all.btnDelete.disabled = (type == "root");
}

//
//	加载系统代码分类信息。
//
function _load_SysCodeType(id)
{
	var responseData = XmlHttpHelper.transmit(false, "get", "xml", "RemoteHandlers/GetSysCodeType.ashx?id=" + id, null, null);
	
	if(responseData.selectSingleNode("/SysCodeType/Succeed").text == "1")
	{
        document.all.txtSysCodeTypeTag.value = responseData.selectSingleNode("/SysCodeType/Tag").text;
        document.all.txtSysCodeTypeName.value = responseData.selectSingleNode("/SysCodeType/Name").text;
	    document.all.txtaSysCodeTypeRemark.value = responseData.selectSingleNode("/SysCodeType/Remark").text;
	    document.all.txtSysCodeTypeOrderId.value = responseData.selectSingleNode("/SysCodeType/OrderId").text;
	}
	else
	{
	    _oTree.selectedNodeIndex = "0";
	    alert(Message.serverError);
	    location.reload(true);
	}
}

//
//	加载系统代码信息。
//
function _load_SysCode(id)
{
	var responseData = XmlHttpHelper.transmit(false, "get", "xml", "RemoteHandlers/GetSysCode.ashx?id=" + id, null, null);
	
	if(responseData.selectSingleNode("/SysCode/Succeed").text == "1")
	{
        document.all.txtSysCodeTag.value = responseData.selectSingleNode("/SysCode/Tag").text;
        document.all.txtSysCodeName.value = responseData.selectSingleNode("/SysCode/Name").text;
	    document.all.txtaSysCodeRemark.value = responseData.selectSingleNode("/SysCode/Remark").text;
	    document.all.txtSysCodeOrderId.value = responseData.selectSingleNode("/SysCode/OrderId").text;
	}
	else
	{
	    _oTree.selectedNodeIndex = "0";
	    alert(Message.serverError);
	    location.reload(true);
	}
	
}