using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace WebClient.Services
{
    public class EmailSender : IEmailSender
    {
        public AuthMessageSenderOptions SenderConfig { get; }
        public EmailSender(IOptions<AuthMessageSenderOptions> optionsAccessor)
        {
            SenderConfig = optionsAccessor.Value;
        }

        public Task SendEmailAsync(string email, string subject, string message)
        {
            return Execute(subject, message, email);
        }

        public Task Execute(string subject, string message, string email_to)
        {
            if (email_to == null) return Task.FromException(null);  //todo <bool>=false
            try
            {
                SmtpClient smtp = new SmtpClient
                {
                    Host = SenderConfig.Host,
                    Port = SenderConfig.IntPort,
                    Credentials = new NetworkCredential(SenderConfig.Email_User, SenderConfig.Email_Passwort),
                    EnableSsl = true
                };
                MailMessage email_Message = new MailMessage();
                email_Message.To.Add(new MailAddress(email_to));
                email_Message.From = new MailAddress(SenderConfig.Display_From_Email_Address, SenderConfig.Display_From_Name);
                email_Message.Subject = subject;
                email_Message.Body = message;
                email_Message.IsBodyHtml = true;
                return smtp.SendMailAsync(email_Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error EmailSender.cs error:" + ex.InnerException);
                return Task.FromException(ex);
            }
        }

        /*public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            SmtpClient client = new SmtpClient
            {
                Port = int.Parse(Configuration.GetSection("Email")["Port"]),
                Host = Configuration.GetSection("Email")["Host"],
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(Configuration.GetSection("Email")["Sender"], Configuration.GetSection("Email")["Token"])
            };

            return client.SendMailAsync(Configuration.GetSection("Email")["Sender"], email, subject, htmlMessage);
        }*/
    }
}
