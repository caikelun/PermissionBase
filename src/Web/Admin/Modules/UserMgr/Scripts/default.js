var _total_count = 0;           //总记录条数
var _current_page_count = 0;    //当前页中的记录条数。
var _max_page_number = 0;       //总页数。（0为基数）
var _current_page_number = 0;   //当前页的页码。（0为基数）

function window.onresize()
{
    var h = document.body.clientHeight
          - document.all.divToolBar.offsetHeight
          - document.all.divStatusBar.offsetHeight
          - document.all.divGridNavbar.offsetHeight;
    if(h > 0) document.all.divMain.style.height = h;
}

function window.onload()
{
    _current_page_count = _grid.getDataProperty("count");
    
    window.onresize();
    _get_totalCount();
    _show_spanMaxPageNum();
    _show_spanCurrentPageNum();
    _disable_gridNavBtns();
    _disable_toolBtns();
}

//
//	id:		btnBrowse
//	event:	onclick
//
function btnBrowseClicked()
{
    var id = _data.getText(_grid.getSelectionProperty("index"), 0);
    var returnVal = OpenDialogHelper.openModalDlg("UserInfoViewer.aspx?id=" + id, null, 430, 335);
    if(!returnVal)
    {
	    alert(Message.serverError);
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
	    var returnVal = OpenDialogHelper.openModalDlg("UserInfo.aspx?mode=new", {mode : "new"}, 430, 364);
	    if(returnVal)
	    {
	        if(returnVal.Succeed)
	        {
	            //重新获取_total_count和_max_page_number。
	            _get_totalCount();
    	        
	            //刷新导航到首页。
	            //加载首页的数据。
                _current_page_number = 0;
                _load_gridData();
                    
                //设置界面其他元素的属性。
                _show_spanMaxPageNum();
                _show_spanCurrentPageNum();
                _disable_gridNavBtns();
                _disable_toolBtns();
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
//	id:		btnEdit
//	event:	onclick
//
function btnEditClicked()
{
    try
    {
        var index = _grid.getSelectionProperty("index");
        var id = _data.getText(index, 0);
	    var returnVal = OpenDialogHelper.openModalDlg("UserInfo.aspx?mode=edit&id=" + id, {mode : "edit"}, 430, 364);
	    if(returnVal)
	    {
	        if(returnVal.Succeed)
	        {
	            //重新加载当前页数据。
	            _load_gridData();
    	        
	            //重新选中该行。
	            _grid.setSelectionProperty("index", index);
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
        var id = _data.getText(_grid.getSelectionProperty("index"), 0);
        returnVal = OpenDialogHelper.openModalDlg("UpdatePassword.aspx", {id : id}, 410, 195);
        
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
        if(confirm("您确实要删除当前用户吗？"))
        {
            //原页码。
            var old_current_page_number = _current_page_number;
            
            var old_index = _grid.getSelectionProperty("index");
            var id = _data.getText(old_index, 0);
            
            var succeed = XmlHttpHelper.transmit(false, "get", "text", "RemoteHandlers/DeleteUser.ashx?id=" + id, null, null);
            if(succeed == "1")
            {
                //重新获取_total_count和_max_page_number。
                _get_totalCount();
                
                //加载适当页的数据。
                _current_page_number = Math.min(old_current_page_number, _max_page_number);
                _load_gridData();
                
                //选中适当数据行。
                var new_index = Math.min(old_index, _current_page_count - 1);
                _grid.setSelectionProperty("index", new_index);
                
                //设置界面其他元素的属性。
                _show_spanMaxPageNum();
                _show_spanCurrentPageNum();
                _disable_gridNavBtns();
                _disable_toolBtns();
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
//	id:		btnFirst
//	event:	onclick
//
function btnFirstClicked()
{
    _current_page_number = 0;
    _load_gridData();
    _show_spanCurrentPageNum();
    _disable_gridNavBtns();
}

//
//	id:		btnPrevious
//	event:	onclick
//
function btnPreviousClicked()
{
    _current_page_number--;
    _load_gridData();
    _show_spanCurrentPageNum();
    _disable_gridNavBtns();
}

//
//	id:		btnNext
//	event:	onclick
//
function btnNextClicked()
{
    _current_page_number++;
    _load_gridData();
    _show_spanCurrentPageNum();
    _disable_gridNavBtns();
}

//
//	id:		btnLast
//	event:	onclick
//
function btnLastClicked()
{
    _current_page_number = _max_page_number;
    _load_gridData();
    _show_spanCurrentPageNum();
    _disable_gridNavBtns();
}

//
//	id:		btnJump
//	event:	onclick
//
function btnJumpClicked()
{
    _current_page_number = document.all.selPageNum.selectedIndex;
    _load_gridData();
    _show_spanCurrentPageNum();
    _disable_gridNavBtns();
}

//
//	id:		selPageNum
//	event:	onchange
//
function selPageNumChanged()
{
    document.all.btnJump.disabled = (document.all.selPageNum.selectedIndex == _current_page_number);
}

//
//  获取表格数据总条数。
//
function _get_totalCount()
{
    try
    {
        _total_count = XmlHttpHelper.transmit(false, "get", "text", "RemoteHandlers/GetUsersCount.ashx", null, null);
        _total_count = _total_count * 1;
        if(_total_count == -1)
        {
            alert(Message.serverError);
            window.location.href = "../../Frameset/Welcome.aspx";
        }
        else
        {
            _max_page_number = parseInt(_total_count / _count_of_page);
            if(_total_count % _count_of_page != 0) _max_page_number++;
            if(_max_page_number > 0) _max_page_number--;
            
            //选中第一行
            if(_total_count > 0) _grid.setSelectionProperty("index", 0);
        }
    }
	catch(e)
	{
	    alert(Message.clientError);
	    window.location.href = "../../Frameset/Welcome.aspx";
	}
}

//
//  加载表格中的数据。
//
function _load_gridData()
{
    try
    {
        _data.setParameter("firstResult", _current_page_number * _count_of_page);
        _data.request();
        _current_page_count = _grid.getDataProperty("count");
        
        //选中第一行
        _grid.setSelectionProperty("index", 0);
    }
	catch(e)
	{
	    alert(Message.clientError);
	    window.location.href = "../../Frameset/Welcome.aspx";
	}
}

//
//  切换表格导航按钮的可用性。
//
function _disable_gridNavBtns()
{
    document.all.btnFirst.disabled = document.all.btnPrevious.disabled = (_current_page_number == 0);
    document.all.btnNext.disabled = document.all.btnLast.disabled = (_current_page_number == _max_page_number);
    document.all.btnJump.disabled = (document.all.selPageNum.selectedIndex == _current_page_number);
}

//
//  显示当前页码。
//
function _show_spanCurrentPageNum()
{
    document.all.spanCurrentPageNum.innerText = _current_page_number + 1;
}

//
//  显示总页码。
//
function _show_spanMaxPageNum()
{
    document.all.spanMaxPageNum.innerText = _max_page_number + 1;
    document.all.spanCountOfPage.innerText = _count_of_page;
    
    var sel = document.all.selPageNum;
    var length = sel.options.length;
    for(var i = 0; i < length; i++)
    {
        sel.options.remove(0);
    }
    for(var i = 1; i <= _max_page_number + 1; i++)
    {
        var oOption = document.createElement("OPTION");
        sel.options.add(oOption);
        oOption.innerText = i;
        oOption.value = i;
    }
}

//
//	切换工具栏按钮的可用性。
//
function _disable_toolBtns()
{
	document.all.btnBrowse.disabled
	= document.all.btnEdit.disabled
	= document.all.btnEditPassword.disabled
	= document.all.btnDelete.disabled
	= (_total_count == 0);
}