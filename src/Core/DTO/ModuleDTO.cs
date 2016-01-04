using System;
using System.Collections;

namespace PermissionBase.Core.DTO
{
    /// <summary>
    ///	模块。
    /// </summary>
    public class ModuleDTO
    {
        public string Id;
        public string Tag;
        public string Name;
        public string ModuleUrl;
        public string Remark;
        public int Disabled;
        public int OrderId;
        public string ModuleTypeId;
        public ArrayList ModuleRights;

        public ModuleDTO()
        {
            ModuleRights = new ArrayList();
        }
    }
}