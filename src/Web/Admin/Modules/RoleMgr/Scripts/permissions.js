var error = false;
var _oTree = null;
var _arrGrant = null;
var _arrDeny = null;

function window.onload()
{
    if(error)
    {
        alert(Message.serverError);
        window.returnValue = {Succeed : false};
        window.close();
    }
    _oTree = document.all.tvRights;
    _oTree.attachEvent("oncheck", tvRightsChecked);
    
    //修正ie web control treeview checkbox的bug。
    _build_arrPermissions();
    //-----------
}

//
//	id:		tvRights
//	event:	oncheck
//
function tvRightsChecked()
{
    var node = _oTree.getTreeNode(event.treeNodeIndex);
    
    //修正ie web control treeview checkbox的bug。
    if(_isInOriginalList(node.getAttribute("PKId"), node.getAttribute("Type")))
    {
        node.setAttribute("checked", !node.getAttribute("checked"));
    }
    //-----------
    
    var checked = node.getAttribute("checked");
    if(checked)
    {
        var parent = node.getParent();
        var brothers = parent.getChildren();
        for(var i = 0; i < brothers.length; i++)
        {
            var brother = brothers[i];
            if( brother.getAttribute("Type") != node.getAttribute("Type") &&
                brother.getAttribute("PKId") == node.getAttribute("PKId"))
            {
                if(brother.getAttribute("checked"))
                {
                    brother.setAttribute("checked", false);
                }
                break;
            }
        }
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
        _build_arrPermissions();
        var updateStr = "<Permissions><RoleId>" + window.dialogArguments.id + "</RoleId><Grant>" + _arrGrant.join("|") + "</Grant><Deny>" + _arrDeny.join("|") + "</Deny></Permissions>";
        var succeed = XmlHttpHelper.transmit(false, "post", "text", "RemoteHandlers/UpdatePermissions.ashx", null, updateStr);
    	
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
//	根据用户选择的授权，构建_arrGrant和_arrDeny全局数组。
//
function _build_arrPermissions()
{
    _arrGrant = new Array();
    _arrDeny = new Array();
    _add_permissions(_oTree);
}
function _add_permissions(parent)
{
    var children = parent.getChildren();
    for(var i = 0; i < children.length; i++)
    {
        var child = children[i];
        if(child.getAttribute("Type") == "moduletype")
        {
            _add_permissions(child);
        }
        else if(child.getAttribute("Type") == "module")
        {
            var permissions = child.getChildren();
            for(var j = 0; j < permissions.length; j++)
            {
                var permission = permissions[j];
                if(permission.getAttribute("checked"))
                {
                    if(permission.getAttribute("Type") == "grant")
                    {
                        _arrGrant.push(permission.getAttribute("PKId"));
                    }
                    else if(permission.getAttribute("Type") == "deny")
                    {
                        _arrDeny.push(permission.getAttribute("PKId"));
                    }
                }
            }
        }
    }
}

//
//  判断节点是否在初始选中列表中。（修正ie web control treeview checkbox的bug。）
//
function _isInOriginalList(PKId, Type)
{
    if(Type == "grant")
    {
        for(var i = 0; i < _arrGrant.length; i++)
        {
            if(PKId == _arrGrant[i])
                return true;
        }
    }
    else if(Type == "deny")
    {
        for(var i = 0; i < _arrDeny.length; i++)
        {
            if(PKId == _arrDeny[i])
                return true;
        }
    }
    return false;
}