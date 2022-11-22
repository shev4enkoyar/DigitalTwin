﻿using System.Collections.Generic;

namespace WebClient.Interface
{
    public class UserConnectionManager : IUserConnectionManager
    {
        private static Dictionary<string, List<string>> UserConnectionMap { get; set; } = new Dictionary<string, List<string>>();
        private static string UserConnectionMapLocker { get; set; } = string.Empty;

        public List<string> GetUserConnections(string userId)
        {
            List<string> connection;
            lock (UserConnectionMapLocker)
            {
                connection = UserConnectionMap[userId];
            }
            return connection;
        }

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
