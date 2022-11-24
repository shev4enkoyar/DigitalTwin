using System.Collections.Generic;

namespace WebClient.Interface
{
    /// <summary>
    /// Interface for interacting with user connections through SignalR
    /// </summary>
    public interface IUserConnectionManager
    {
        /// <summary>
        /// Keeping a user connection
        /// </summary>
        /// <param name="userId">User ID</param>
        /// <param name="connectionId">User Connection ID</param>
        void KeepUserConnection(string userId, string connectionId);

        /// <summary>
        /// Delete user connection
        /// </summary>
        /// <param name="connectionId">User Connection ID</param>
        void RemoveUserConnection(string connectionId);

        /// <summary>
        /// Method for getting user connections
        /// </summary>
        /// <param name="userId">User ID</param>
        /// <returns>List of user connections</returns>
        List<string> GetUserConnections(string userId);
    }
}
