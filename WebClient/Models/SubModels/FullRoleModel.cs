using System.Collections.Generic;

namespace WebClient.Models.SubModels
{
    public class FullRoleModel
    {
        public ApplicationRole Role { get; set; }
        public IEnumerable<string> Functional { get; set; }
    }
}
