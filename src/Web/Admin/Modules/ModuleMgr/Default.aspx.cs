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
using System.Text;
using Microsoft.Web.UI.WebControls;
using PermissionBase.Core.Domain;
using PermissionBase.Core.Service;

public partial class Admin_Modules_ModuleMgr_Default : System.Web.UI.Page
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(Admin_Modules_ModuleMgr_Default));

    protected void Page_Load(object sender, EventArgs e)
    {
        Response.Cache.SetCacheability(HttpCacheability.NoCache);

        try
        {
            SessionUtil.SavaModuleTag("ModuleMgr");
            if (SessionUtil.GetStaffSession().IsInnerUser == 0)
            {
                PermissionUtil.SaveGrantPermissionsToSession();
                if (!PermissionUtil.HasGrantPermission("rights_browse")) throw new ModuleSecurityException("无权限访问此模块。");
                if (!PermissionUtil.HasGrantPermission("rights_add"))
                {
                    btnNewModuleType.Style.Add("display", "none");
                    btnNewModule.Style.Add("display", "none");
                }
                if (!PermissionUtil.HasGrantPermission("rights_edit")) btnEdit.Style.Add("display", "none");
                if (!PermissionUtil.HasGrantPermission("rights_move")) btnMove.Style.Add("display", "none");
                if (!PermissionUtil.HasGrantPermission("rights_delete")) btnDelete.Style.Add("display", "none");
            }

            LoadModuleTree();
            InitModuleRights();
        }
        catch(MissSessionException)
        {
            ClientScript.RegisterClientScriptBlock(this.GetType(), "reload",
                "<script type=\"text/javascript\">parent.location='../../Default.aspx';</script>");
        }
        catch(ModuleSecurityException)
        {
            Response.Redirect("../../Frameset/Welcome.aspx");
        }
        catch (Exception ex)
        {
            log.Error(null, ex);
            throw;
        }
    }

    #region private void LoadModuleTree()
    private void LoadModuleTree()
    {
        IList ilModuleType = ModuleTypeSrv.GetAllTopModuleType();

        //增加模块
        foreach (ModuleType mt in ilModuleType)
        {
            Microsoft.Web.UI.WebControls.TreeNode node = new Microsoft.Web.UI.WebControls.TreeNode();
            tvModules.Nodes[0].Nodes.Add(node);
            node.Type = "moduletype";
            node.Text = mt.Name;
            node.PKId = mt.Id;
            node.OrderId = mt.OrderId.ToString();

            AddSubNodes(node, mt);

            node.Expanded = true;
        }

        tvModules.Nodes[0].Expanded = true;
    }
    #endregion

    #region private void AddSubNodes(Microsoft.Web.UI.WebControls.TreeNode currentNode, ModuleType currentModuleType)
    private void AddSubNodes(Microsoft.Web.UI.WebControls.TreeNode currentNode, ModuleType currentModuleType)
    {
        //增加子模块分类
        foreach (ModuleType mt in currentModuleType.SubModuleTypes)
        {
            Microsoft.Web.UI.WebControls.TreeNode node = new Microsoft.Web.UI.WebControls.TreeNode();
            currentNode.Nodes.Add(node);
            node.Type = "moduletype";
            node.Text = mt.Name;
            node.PKId = mt.Id;
            node.OrderId = mt.OrderId.ToString();

            AddSubNodes(node, mt);

            node.Expanded = true;
        }

        //增加模块
        foreach (Module m in currentModuleType.Modules)
        {
            Microsoft.Web.UI.WebControls.TreeNode node = new Microsoft.Web.UI.WebControls.TreeNode();
            currentNode.Nodes.Add(node);
            node.Type = "module";
            node.Text = m.Name;
            node.PKId = m.Id;
            node.OrderId = m.OrderId.ToString();
        }
    }
    #endregion

    #region private void InitModuleRights()
    private void InitModuleRights()
    {
        SysCodeType sct = SysCodeTypeSrv.GetSysCodeTypeByTag("rights");
        if (sct != null)
        {
            StringBuilder sb = new StringBuilder();
            foreach(SysCode sc in sct.SysCodes)
            {
                sb.Append("<div><span id='" + sc.Tag + "' class='redSpanCheck'></span>" + sc.Name + "</div>");
            }
            divRights.InnerHtml = sb.ToString();
        }
    }
    #endregion

}
