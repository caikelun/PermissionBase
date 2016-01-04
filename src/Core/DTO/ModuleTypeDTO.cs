using System;

namespace PermissionBase.Core.DTO
{
    /// <summary>
    ///	模块分类。
    /// </summary>
    public class ModuleTypeDTO
    {
        public string Id;
        public string Name;
        public string Remark;
        public int OrderId;
        public string ParentModuleTypeId;
    }
}
