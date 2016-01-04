function __TreeViewNode()
{
    this.PKId = null;
    this.OrderId = null;
    this.Text = null;
    this.Type = null;
    this.expanded = null;
	this.Children = [];
}

function TreeviewHelper(){}

TreeviewHelper.__cacheNodeData = function(oNodeCache, oNode)
{
    oNodeCache.PKId = oNode.getAttribute("PKId");
    oNodeCache.OrderId = oNode.getAttribute("OrderId");
    oNodeCache.Text = oNode.getAttribute("Text");
    oNodeCache.Type = oNode.getAttribute("Type");
    oNodeCache.expanded = oNode.getAttribute("expanded");
    
    var oChildren = oNode.getChildren();
    for(var i = 0; i < oChildren.length; i++)
    {
        oNodeCache.Children[i] = new __TreeViewNode();
        this.__cacheNodeData(oNodeCache.Children[i], oChildren[i]);
    }
};

TreeviewHelper.__addNode = function(oTreeView, oParentNode, iPos, oNodeCache)
{
    var newNode = oTreeView.createTreeNode();
	oParentNode.addAt(iPos, newNode);
	newNode.setAttribute("PKId", oNodeCache.PKId);
	newNode.setAttribute("OrderId", oNodeCache.OrderId);
	newNode.setAttribute("Text", oNodeCache.Text);
	newNode.setAttribute("Type", oNodeCache.Type);
	
	for(var i = 0; i < oNodeCache.Children.length; i++)
	{
	    this.__addNode(oTreeView, newNode, i, oNodeCache.Children[i]);
	}
	
	newNode.setAttribute("expanded", oNodeCache.expanded);
	
	return newNode.getNodeIndex();
};

TreeviewHelper.__findInsertPos = function(oTargetParentNode, arrNodeTypeOrder, sOrderId, sType)
{
    var oChildNodes = oTargetParentNode.getChildren();
    
    //获取每一种节点类型已经存在的对应节点数量。
    var arrNodeTypeNum = new Array(arrNodeTypeOrder.length);
    for(var i = 0; i < arrNodeTypeOrder.length; i++)
    {
        var currentTypeCount = 0;
        for(var j = 0; j < oChildNodes.length; j++)
        {
            if(oChildNodes[j].getAttribute("Type") == arrNodeTypeOrder[i])
            {
                currentTypeCount++;
            }
        }
        arrNodeTypeNum[i] = currentTypeCount;
    }
    
    //计算插入区域。
    var iStart = 0;
    var iEnd = 0;
    for(var i = 0; i < arrNodeTypeOrder.length; i++)
    {
        if(arrNodeTypeOrder[i] != sType)
        {
            iStart += arrNodeTypeNum[i];
        }
        else
        {
            iEnd = iStart + arrNodeTypeNum[i];
            break;
        }
    }
    
    //在区域中寻找插入位置。
    var iInsertPos = iStart;
	for(; iInsertPos < iEnd; iInsertPos++)
	{
		if(parseInt(oChildNodes[iInsertPos].getAttribute("OrderId")) > parseInt(sOrderId))
			break;
	}
	
	return iInsertPos;
};


//
//  移动树节点。
//
//  oTreeView:          树对象。
//  oTargetParentNode:  要移动到的目标位置的父节点。
//  arrNodeTypeOrder:   当前待移动节点的所有兄弟中，可能出现的所有节点类型的排序顺序。
//  oCurrentNode:       当前待移动的节点。
//  返回值:             无。
//
TreeviewHelper.moveTreeNode = function(oTreeView, oTargetParentNode, arrNodeTypeOrder, oCurrentNode)
{
    //缓存待移动节点的信息。
    var oNodeCache = new __TreeViewNode();
    this.__cacheNodeData(oNodeCache, oCurrentNode);
    
    //删除待移动节点。
    oTreeView.selectedNodeIndex = "0";
    var oCurrentParentNode = oCurrentNode.getParent();
	if(oCurrentParentNode.getChildren().length == 1)
		oCurrentParentNode.setAttribute('expanded', 'false');
    oCurrentNode.remove();
    
    //在目标父节点下寻找到正确的插入位置。
	var iInsertPos = this.__findInsertPos(oTargetParentNode, arrNodeTypeOrder, oNodeCache.OrderId, oNodeCache.Type);
    
	//插入节点。
	var newNodeIndex = this.__addNode(oTreeView, oTargetParentNode, iInsertPos, oNodeCache);
	
	//展开父节点。
	oTargetParentNode.setAttribute('expanded', 'true');
	
	//选中新节点。
	oTreeView.selectedNodeIndex = newNodeIndex;
};


//
//  插入树节点。
//
//  oTreeView:          树对象。
//  oTargetParentNode:  要插入到的目标位置的父节点。
//  arrNodeTypeOrder:   当前待插入节点的所有兄弟中，可能出现的所有节点类型的排序顺序。
//  sPKId:              待插入节点的PKId属性。
//  sText:              待插入节点的Text属性。
//  sOrderId:           待插入节点的OrderId属性。
//  sType:              待插入节点的Type属性。
//  返回值:             无。
//
TreeviewHelper.insertTreeNode = function(oTreeView, oTargetParentNode, arrNodeTypeOrder, sPKId, sText, sOrderId, sType)
{
    //在目标父节点下寻找到正确的插入位置。
	var iInsertPos = this.__findInsertPos(oTargetParentNode, arrNodeTypeOrder, sOrderId, sType);
	
	//插入新节点。
    var newNode = oTreeView.createTreeNode();
	oTargetParentNode.addAt(iInsertPos, newNode);
	newNode.setAttribute("PKId", sPKId);
	newNode.setAttribute("OrderId", sOrderId);
	newNode.setAttribute("Text", sText);
	newNode.setAttribute("Type", sType);
	
	//展开父节点。
	oTargetParentNode.setAttribute('expanded', 'true');
	
	//选中新节点。
	oTreeView.selectedNodeIndex = newNode.getNodeIndex();
};


//
//  删除树节点。
//
//  oTreeView:          树对象。
//  oNode:              待删除的树节点对象。
//  返回值:             无。
//
TreeviewHelper.deleteTreeNode = function(oTreeView, oNode)
{
    var oParentNode = oNode.getParent();
	var parentNodeIndex = oParentNode.getNodeIndex();
	oTreeView.selectedNodeIndex = parentNodeIndex;
	
	if(oParentNode.getChildren().length == 1)
		oParentNode.setAttribute('expanded', 'false');

	oNode.remove();
};