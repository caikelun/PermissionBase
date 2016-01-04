using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using PermissionBase.Core.Domain;
using PermissionBase.Core.Service;

public partial class Admin_Modules_ModuleMgr_Move : System.Web.UI.Page
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(Admin_Modules_ModuleMgr_Move));

    protected void Page_Load(object sender, EventArgs e)
    {
        Response.Cache.SetCacheability(HttpCacheability.NoCache);

        try
        {
            if(Request.QueryString["moveWhat"] == "moduletype")
            {
                divTitleMess.InnerText = "移动模块分类";
            }
            else if(Request.QueryString["moveWhat"] == "module")
            {
                divTitleMess.InnerText = "移动模块";
            }

            LoadModuleTree(tvModules.Nodes[0], null);
        }
        catch (Exception ex)
        {
            ClientScript.RegisterClientScriptBlock(this.GetType(), "error", "<script type=\"text/javascript\">error=true;</script>");
            log.Error(null, ex);
        }
    }

    #region private void LoadModuleTree(Microsoft.Web.UI.WebControls.TreeNode currentNode, ModuleType currentModuleType)
    private void LoadModuleTree(Microsoft.Web.UI.WebControls.TreeNode currentNode, ModuleType currentModuleType)
    {
        IList subModuleType = null;
        if (currentModuleType != null)
            subModuleType = currentModuleType.SubModuleTypes;
        else
            subModuleType = ModuleTypeSrv.GetAllTopModuleType();

        //增加模块分类
        foreach (ModuleType mt in subModuleType)
        {
            Microsoft.Web.UI.WebControls.TreeNode node = new Microsoft.Web.UI.WebControls.TreeNode();
            currentNode.Nodes.Add(node);
            node.Type = "moduletype";
            node.Text = mt.Name;
            node.PKId = mt.Id;
            node.OrderId = mt.OrderId.ToString();

            LoadModuleTree(node, mt);

            node.Expanded = true;
        }

        currentNode.Expanded = true;
    }
    #endregion

}
