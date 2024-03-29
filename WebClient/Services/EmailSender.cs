﻿using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace WebClient.Services
{
    /// <summary>
    /// A class that implements the IEmailSender interface for sending emails
    /// </summary>
    public class EmailSender : IEmailSender
    {
        /// <summary>
        /// Mail Sending Authentication Settings Property
        /// </summary>
        public AuthMessageSenderOptions SenderConfig { get; }

        /// <summary>
        /// Property for getting data from a configuration file
        /// </summary>
        public IConfiguration Configuration { get; }

        /// <summary>
        /// Dependency injection constructor
        /// </summary>
        public EmailSender(IOptions<AuthMessageSenderOptions> optionsAccessor, IConfiguration configuration)
        {
            SenderConfig = optionsAccessor.Value;
            Configuration = configuration;
        }

        /// <summary>
        /// Method for sending mail
        /// </summary>
        /// <param name="email">Email address where the mail will be sent</param>
        /// <param name="subject">Email subject</param>
        /// <param name="message">The content that will be in the mail</param>
        /// <returns>The task of sending an email</returns>
        public Task SendEmailAsync(string email, string subject, string message)
        {
            return Execute(subject, message, email);
        }

        /// <summary>
        /// Private method for sending mail
        /// </summary>
        /// <param name="subject">Email subject</param>
        /// <param name="message">The content that will be in the mail</param>
        /// <param name="emailTo">Email address where the mail will be sent</param>
        /// <returns>The task of sending an email</returns>
        private Task Execute(string subject, string message, string emailTo)
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
