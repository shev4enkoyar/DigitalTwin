using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace UserManager.Microservice.Logic
{
    public class PasswordOperation : IPasswordOperation
    {
        /// <summary>
        /// Number of hash operations on the user's password
        /// </summary>
        private const int numHashIterations = 3;
        private const string salt = "R1JXoq3Ry5";
        private int minPassLength = 8;

        /// <summary>
        /// Method for getting the hash of the user's password.
        /// </summary>
        /// <param name="password">Password entered by the user</param>
        /// <returns>Collected hash from the user's password</returns>
        public string GetHash(string password)
        {
            StringBuilder returnHash = new StringBuilder();
            password = password + salt + password[2] + password[1] + password[5];
            foreach (byte item in GetByteHash(Encoding.UTF8.GetBytes(password)))
            {
                returnHash.Append(item.ToString("x2"));
            }
            return returnHash.ToString();
        }

        private byte[] GetByteHash(byte[] byteString)
        {
            byte[] hash = null;
            for (int i = 0; i < numHashIterations; i++)
            {
                using SHA512 sha256 = SHA512.Create();
                hash = sha256.ComputeHash(byteString);
            }
            return hash;
        }

        public bool IsStrong(string password)
        {
            if (password.Length < minPassLength)
                return false;

            if (!Regex.IsMatch(password, @"[A-z]"))
                return false;

            //TODO Дописать проверки

            return true;
        }
    }
}
