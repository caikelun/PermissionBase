var error = false;
var _oTree = null;
var _arrRoles = null;

function window.onload()
{
    if(error)
    {
        alert(Message.serverError);
        window.returnValue = {Succeed : false};
        window.close();
    }
    _oTree = document.all.tvRoles;
    _oTree.attachEvent("oncheck", tvRolesChecked);
    
    //修正ie web control treeview checkbox的bug。
    _build_arrRoles();
    //-----------
}

//
//	id:		tvRoles
//	event:	oncheck
//
function tvRolesChecked()
{
    var node = _oTree.getTreeNode(event.treeNodeIndex);
    
    //修正ie web control treeview checkbox的bug。
    if(_isInOriginalList(node.getAttribute("PKId")))
    {
        node.setAttribute("checked", !node.getAttribute("checked"));
    }
    //-----------
}

//
//	id:		btnSubmit
//	event:	onclick
//
function btnSubmitClicked()
{
    try
    {
        _build_arrRoles();
        var updateStr = "<Staff><StaffId>" + window.dialogArguments.id + "</StaffId><Roles>" + _arrRoles.join("|") + "</Roles></Staff>";
        var succeed = XmlHttpHelper.transmit(false, "post", "text", "RemoteHandlers/UpdateRoles.ashx", null, updateStr);
    	
	    if(succeed == "1")
        {
	        window.returnValue = {Succeed : true};
	        window.close();
        }
        else
        {
            alert(Message.serverError);
            window.returnValue = {Succeed : false};
            window.close();
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
//	根据用户选择的角色，构建_arrRoles全局数组。
//
function _build_arrRoles()
{
    _arrRoles = new Array();
    _add_roles(_oTree);
}
function _add_roles(parent)
{
    var children = parent.getChildren();
    for(var i = 0; i < children.length; i++)
    {
        var child = children[i];
        if(child.getAttribute("Type") == "roletype")
        {
            _add_roles(child);
        }
        else if(child.getAttribute("Type") == "role")
        {
            if(child.getAttribute("checked"))
            {
                _arrRoles.push(child.getAttribute("PKId"));
            }
        }
    }
}

//
//  判断节点是否在初始选中列表中。（修正ie web control treeview checkbox的bug。）
//
function _isInOriginalList(PKId)
{
    for(var i = 0; i < _arrRoles.length; i++)
    {
        if(PKId == _arrRoles[i])
            return true;
    }
    return false;
}