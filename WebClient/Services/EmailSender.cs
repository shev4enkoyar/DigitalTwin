using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Configuration;
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
        public IConfiguration Configuration { get; }
        public EmailSender(IOptions<AuthMessageSenderOptions> optionsAccessor, IConfiguration configuration)
        {
            SenderConfig = optionsAccessor.Value;
            Configuration = configuration;
        }

        public Task SendEmailAsync(string email, string subject, string message)
        {
            return Execute(subject, message, email);
        }

        public Task Execute(string subject, string message, string emailTo)
        {
            if (emailTo == null) return Task.FromException(null!);
            try
            {
                var smtp = new SmtpClient
                {
                    Host = Configuration.GetSection("Email").GetValue<string>("Host"),
                    Port = Configuration.GetSection("Email").GetValue<int>("Port"),
                    Credentials = new NetworkCredential(Configuration.GetSection("Email").GetValue<string>("Email"), Configuration.GetSection("Email").GetValue<string>("Token")),
                    EnableSsl = true
                };
                var emailMessage = new MailMessage();
                emailMessage.To.Add(new MailAddress(emailTo));
                emailMessage.From = new MailAddress(Configuration.GetSection("Email").GetValue<string>("DisplayFromEmail"), Configuration.GetSection("Email").GetValue<string>("DisplayFromName"));
                emailMessage.Subject = subject;
                emailMessage.Body = message;
                emailMessage.IsBodyHtml = true;
                return smtp.SendMailAsync(emailMessage);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error EmailSender.cs error:{ex.InnerException}\n{SenderConfig.Host}\n{SenderConfig.IntPort}\n{SenderConfig.Email_User}\n");
                return Task.FromException(ex);
            }
        }
    }
}
