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
using Microsoft.Web.UI.WebControls;
using PermissionBase.Core.Domain;
using PermissionBase.Core.Service;

public partial class Admin_Frameset_NavBar : System.Web.UI.Page
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(Admin_Frameset_NavBar));

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                LoadModuleTree();
            }
        }
        catch(MissSessionException)
        {
            ClientScript.RegisterClientScriptBlock(this.GetType(), "reload",
                "<script type=\"text/javascript\">parent.location='../Default.aspx';</script>");
        }
        catch (Exception ex)
        {
            log.Error(null, ex);
            tvModules.Nodes.Clear();
        }
    }

    #region private void LoadModuleTree()
    private void LoadModuleTree()
    {
        //获取当前登录的职员信息。
        StaffSession ss = SessionUtil.GetStaffSession();
        Staff s = CommonSrv.LoadObjectById(typeof(Staff), ss.LoginId) as Staff;

        //获取所有顶层模块。
        IList ilModuleType = ModuleTypeSrv.GetAllTopModuleType();

        //增加模块分类和模块。
        foreach (ModuleType mt in ilModuleType)
        {
            Microsoft.Web.UI.WebControls.TreeNode node = new Microsoft.Web.UI.WebControls.TreeNode();
            tvModules.Nodes.Add(node);
            node.Type = "moduletype";
            node.Text = mt.Name;
            AddSubNodes(node, mt, s);
            node.Expanded = true;
        }

        //删除不必要的模块分类节点。
        RemoveNeedlessModuleType(null);
    }
    #endregion

    #region private void AddSubNodes(Microsoft.Web.UI.WebControls.TreeNode currentNode, ModuleType currentModuleType, Staff staff)
    private void AddSubNodes(Microsoft.Web.UI.WebControls.TreeNode currentNode, ModuleType currentModuleType, Staff staff)
    {
        //增加子模块分类
        foreach (ModuleType mt in currentModuleType.SubModuleTypes)
        {
            Microsoft.Web.UI.WebControls.TreeNode node = new Microsoft.Web.UI.WebControls.TreeNode();
            currentNode.Nodes.Add(node);
            node.Type = "moduletype";
            node.Text = mt.Name;
            AddSubNodes(node, mt, staff);
            node.Expanded = true;
        }

        //增加模块
        foreach (Module m in currentModuleType.Modules)
        {
            if (staff.IsInnerUser == 1 || 
                ((m.Disabled == 0) && staff.HasGrantPermission(ModuleRightSrv.GetModuleRight(m, "rights_browse"))))
            {
                Microsoft.Web.UI.WebControls.TreeNode node = new Microsoft.Web.UI.WebControls.TreeNode();
                currentNode.Nodes.Add(node);
                node.Type = "module";
                node.Text = m.Name;
                node.Target = "modulePanel";
                if(m.ModuleUrl != null && m.ModuleUrl.Length > 0)
                {
                    node.NavigateUrl = m.ModuleUrl;
                }
                else
                {
                    node.NavigateUrl = "Welcome.aspx";
                }
            }
        }
    }
    #endregion

    #region private void RemoveNeedlessModuleType(Microsoft.Web.UI.WebControls.TreeNode parentNode)
    private void RemoveNeedlessModuleType(Microsoft.Web.UI.WebControls.TreeNode parentNode)
    {
        Microsoft.Web.UI.WebControls.TreeNodeCollection childNodes =
            (parentNode == null ? tvModules.Nodes : parentNode.Nodes);

        ArrayList tobeRemoved = new ArrayList();
        foreach(Microsoft.Web.UI.WebControls.TreeNode childNode in childNodes)
        {
            if(childNode.Type == "moduletype")
            {
                if(childNode.Nodes.Count > 0)
                    RemoveNeedlessModuleType(childNode);

                if(childNode.Nodes.Count == 0)
                    tobeRemoved.Add(childNode);
            }
        }
        foreach (object childNode in tobeRemoved)
        {
            (childNode as Microsoft.Web.UI.WebControls.TreeNode).Remove();
        }
    }
    #endregion

}
