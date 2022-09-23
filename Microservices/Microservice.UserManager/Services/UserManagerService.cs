﻿using Grpc.Core;
using Microservice.UserManager.DAL;
using Microservice.UserManager.DAL.Models;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Microservice.UserManager.Services
{
    public class UserManagerService : UserManager.UserManagerBase
    {
        private int NumHashIterations { get; } = 3;
        private readonly ApplicationContext _dbContext;
        private readonly IConfiguration _configuration;
        public UserManagerService(ApplicationContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        #region gRPC service

        public override Task<UserReply> Login(UserProto request, ServerCallContext context)
        {
            UserReply reply = new UserReply() { IsException = false };
            var user = _dbContext.Users.FirstOrDefault(x => x.Email == request.Email);
            if (user != null)
            {
                if (user.Password.Equals(HashLoop(NumHashIterations, request.Password)))
                {
                    //TODO Add token
                    string token = "";
                    reply.Message = $"Bearer: {token}";
                }
                else
                {
                    reply.IsException = true;
                    reply.Message = "Wrong password!";
                }
            }
            else
            {
                reply.IsException = true;
                reply.Message = "User with this credentials not found!";
            }
            return base.Login(request, context);
        }

        public override Task<UserReply> Register(UserProto request, ServerCallContext context)
        {
            UserReply reply = new UserReply();
            if (request.Email != null && request.Password != null && request.Name != null)
            {
                if (_dbContext.Users.FirstOrDefault(x => x.Email.Equals(request.Email)) != null)
                {
                    reply.IsException = true;
                    reply.Message = "Email already exists!";
                }
                else
                {
                    CreateUser(request.Email, request.Password, request.Name);
                }
            }
            else
            {
                reply.IsException = true;
                reply.Message = "One or more fields are empty!";
            }
            return base.Register(request, context);
        }

        #endregion

        #region Password manipulations

        private string HashLoop(int numIterations, string password)
        {
            for (int i = 0; i < numIterations; i++)
            {
                password = HashPassword(password + _configuration["Salt"]);
            }
            return password;
        }

        private string HashPassword(string rawData)
        {
            SHA512 sha512 = SHA512.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(rawData);
            byte[] hash = sha512.ComputeHash(bytes);
            return GetStringFromHash(hash);
        }

        private string GetStringFromHash(byte[] hash)
        {
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                result.Append(hash[i].ToString("X2"));
            }
            return result.ToString();
        }

        #endregion

        #region Database manipulations

        private void CreateUser(string email, string password, string name)
        {
            _dbContext.Users.Add(new User()
            {
                Email = email,
                Password = HashLoop(NumHashIterations, password),
                Name = name
            });
            _dbContext.SaveChanges();
        }

        #endregion
    }
}