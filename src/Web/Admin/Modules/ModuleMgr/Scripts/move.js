﻿var error = false;
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
	    if(!_checkInputValue()) return;
    	
	    var newIndex = document.all.tvModules.selectedNodeIndex;
	    var newNode = document.all.tvModules.getTreeNode(newIndex);
	    var newPKId = newNode.getAttribute("PKId");
    	
	    var search = "?id=" + window.dialogArguments.id + "&newParentPKId=" + ((newPKId != null) ? newPKId : "");
    	
	    var succeed = "-1";
	    if(window.dialogArguments.moveWhat == "moduletype")
	    {
            succeed = XmlHttpHelper.transmit(false, "get", "text", "RemoteHandlers/MoveModuleType.ashx" + search, null, null);
	    }
	    else if(window.dialogArguments.moveWhat == "module")
	    {
            succeed = XmlHttpHelper.transmit(false, "get", "text", "RemoteHandlers/MoveModule.ashx" + search, null, null);
	    }
    	
	    if(succeed == "1")
        {
            window.returnValue = {Succeed : true, newParentIndex : newIndex, newParentPKId : newPKId};
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
//	检测选择的目标父节点的合法性。
//
function _checkInputValue()
{
    var oTree = document.all.tvModules;
    if(window.dialogArguments.moveWhat == "moduletype")
	{
	    if(oTree.selectedNodeIndex.indexOf(window.dialogArguments.index) == 0 || oTree.selectedNodeIndex == window.dialogArguments.pIndex)
	    {
	        document.all.divAlertMess.innerText = "您选择了无效的目标父节点。";
            return false;
        }
	}
	else if(window.dialogArguments.moveWhat == "module")
	{
        if(oTree.selectedNodeIndex == window.dialogArguments.pIndex || oTree.selectedNodeIndex == "0")
	    {
	        document.all.divAlertMess.innerText = "您选择了无效的目标父节点。";
            return false;
        }
	}
	return true;
}