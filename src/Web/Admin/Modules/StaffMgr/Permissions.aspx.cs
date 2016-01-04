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

public partial class Admin_Modules_StaffMgr_Permissions : System.Web.UI.Page
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(Admin_Modules_StaffMgr_Permissions));

    protected void Page_Load(object sender, EventArgs e)
    {
        Response.Cache.SetCacheability(HttpCacheability.NoCache);

        try
        {
            //当前职员。
            string staffId = Request.QueryString["id"];
            Staff staff = CommonSrv.LoadObjectById(typeof(Staff), staffId) as Staff;

            //权限。
            SysCodeType sct = SysCodeTypeSrv.GetSysCodeTypeByTag("rights");

            //生成树节点。
            IList topModuleTypes = ModuleTypeSrv.GetAllTopModuleType();
            foreach (ModuleType mt in topModuleTypes)
            {
                Microsoft.Web.UI.WebControls.TreeNode node = new Microsoft.Web.UI.WebControls.TreeNode();
                tvRights.Nodes.Add(node);
                node.Type = "moduletype";
                node.Text = mt.Name;

                AddSubNodes(node, mt, staff, sct);

                node.Expanded = true;
            }
        }
        catch (Exception ex)
        {
            ClientScript.RegisterClientScriptBlock(this.GetType(), "error", "<script type=\"text/javascript\">error=true;</script>");
            log.Error(null, ex);
        }
    }

    #region private void AddSubNodes(Microsoft.Web.UI.WebControls.TreeNode currentNode, ModuleType currentModuleType, Staff staff, SysCodeType sct)
    private void AddSubNodes(Microsoft.Web.UI.WebControls.TreeNode currentNode, ModuleType currentModuleType, Staff staff, SysCodeType sct)
    {
        //增加子模块分类
        foreach (ModuleType mt in currentModuleType.SubModuleTypes)
        {
            Microsoft.Web.UI.WebControls.TreeNode node = new Microsoft.Web.UI.WebControls.TreeNode();
            currentNode.Nodes.Add(node);
            node.Type = "moduletype";
            node.Text = mt.Name;

            AddSubNodes(node, mt, staff, sct);

            node.Expanded = true;
        }

        //增加模块
        foreach (Module m in currentModuleType.Modules)
        {
            Microsoft.Web.UI.WebControls.TreeNode node = new Microsoft.Web.UI.WebControls.TreeNode();
            currentNode.Nodes.Add(node);
            node.Type = "module";
            node.Text = m.Name;

            //增加肯定权限。
            foreach (SysCode sc in sct.SysCodes)
            {
                if (m.ModuleRights.Contains(sc.Tag))
                {
                    ModuleRight mr = m.ModuleRights[sc.Tag] as ModuleRight;
                    Microsoft.Web.UI.WebControls.TreeNode rightsNode = new Microsoft.Web.UI.WebControls.TreeNode();
                    node.Nodes.Add(rightsNode);
                    rightsNode.Type = "grant";
                    rightsNode.Text = sc.Name;
                    rightsNode.PKId = mr.Id;
                    rightsNode.CheckBox = true;
                    rightsNode.Checked = staff.ModuleRightsGrant.Contains(mr);
                }
            }

            //增加否定权限。
            foreach (SysCode sc in sct.SysCodes)
            {
                if (m.ModuleRights.Contains(sc.Tag))
                {
                    ModuleRight mr = m.ModuleRights[sc.Tag] as ModuleRight;
                    Microsoft.Web.UI.WebControls.TreeNode rightsNode = new Microsoft.Web.UI.WebControls.TreeNode();
                    node.Nodes.Add(rightsNode);
                    rightsNode.Type = "deny";
                    rightsNode.Text = sc.Name;
                    rightsNode.PKId = mr.Id;
                    rightsNode.CheckBox = true;
                    rightsNode.Checked = staff.ModuleRightsDeny.Contains(mr);
                }
            }
        }
    }
    #endregion

}
