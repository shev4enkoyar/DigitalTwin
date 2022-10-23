using System.Collections.Generic;
using WebClient.Models;

namespace WebClient.Util
{
    public class FullRoleModel
    {
        public ApplicationRole Role { get; set; }
        public IEnumerable<string> Functional { get; set; }
    }
}
