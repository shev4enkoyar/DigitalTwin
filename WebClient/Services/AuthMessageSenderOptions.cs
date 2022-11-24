namespace WebClient.Services
{
    /// <summary>
    /// Mail Sending Authentication Parameters Class
    /// </summary>
    public class AuthMessageSenderOptions
    {
        public string Host { get; set; }
        public int IntPort { get; set; }
        public string Email_User { get; set; }
        public string Email_Passwort { get; set; }
        public string Display_From_Email_Address { get; set; }
        public string Display_From_Name { get; set; }
    }
}
