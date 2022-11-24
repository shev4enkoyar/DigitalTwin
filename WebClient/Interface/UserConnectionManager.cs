using System.Collections.Generic;

namespace WebClient.Interface
{
    /// <summary>
    /// A class that implements IUserConnectionManager for interacting with user connections via SignalR
    /// </summary>
    public class UserConnectionManager : IUserConnectionManager
    {
        /// <summary>
        /// User connection map
        /// </summary>
        private static Dictionary<string, List<string>> UserConnectionMap { get; set; } = new Dictionary<string, List<string>>();

        /// <summary>
        /// Map of locked user connections
        /// </summary>
        private static string UserConnectionMapLocker { get; set; } = string.Empty;

        /// <summary>
        /// Method for getting user connections
        /// </summary>
        /// <param name="userId">User ID</param>
        /// <returns>List of user connections</returns>
        public List<string> GetUserConnections(string userId)
        {
            List<string> connection;
            lock (UserConnectionMapLocker)
            {
                connection = UserConnectionMap[userId];
            }
            return connection;
        }

        /// <summary>
        /// Keeping a user connection
        /// </summary>
        /// <param name="userId">User ID</param>
        /// <param name="connectionId">User Connection ID</param>
        public void KeepUserConnection(string userId, string connectionId)
        {
            lock (UserConnectionMapLocker)
            {
                if (!UserConnectionMap.ContainsKey(userId))
                {
                    UserConnectionMap[userId] = new List<string>();
                }
                UserConnectionMap[userId].Add(connectionId);
            }
        }

        /// <summary>
        /// Delete user connection
        /// </summary>
        /// <param name="connectionId">User Connection ID</param>
        public void RemoveUserConnection(string connectionId)
        {
            lock (UserConnectionMapLocker)
            {
                foreach (var userId in UserConnectionMap.Keys)
                {
                    if (!UserConnectionMap.ContainsKey(userId))
                        continue;
                    if (!UserConnectionMap[userId].Contains(connectionId))
                        continue;
                    UserConnectionMap[userId].Remove(connectionId);
                    break;
                }
            }
        }
    }
}
