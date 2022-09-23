using Grpc.Core;
using Microservice.UserManager.DAL;
using Microservice.UserManager.DAL.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Microservice.UserManager.Services
{
    public class UserManagerService : UserManager.UserManagerBase
    {
        public static string JWT_TOKEN_KEY = "SomeKey";
        public static int JWT_TOKEN_VALIDITY = 30;
        private int NumHashIterations { get; } = 3;
        private readonly ApplicationContext _dbContext;
        private readonly IConfiguration _configuration;
        public UserManagerService(ApplicationContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        #region gRPC service


        public override Task<Mate> CheckMate(Check request, ServerCallContext context)
        {
            return base.CheckMate(request, context);
        }

        public override Task<UserReply> Login(UserProto request, ServerCallContext context)
        {
            UserReply reply = new UserReply() { IsException = false };
            var user = _dbContext.Users.FirstOrDefault(x => x.Email == request.Email);
            if (user != null)
            {
                if (user.Password.Equals(HashLoop(NumHashIterations, request.Password)))
                {
                    //TODO Add token
                    reply = Authenticate(request);
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

        private UserReply Authenticate(UserProto user)
        {
            var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(JWT_TOKEN_KEY);
            var tokenExpireDateTime = DateTime.Now.AddMinutes(JWT_TOKEN_VALIDITY);
            var securityTokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new List<Claim>
                {
                    new Claim("email", user.Email),
                    new Claim(ClaimTypes.Role, "user")
                }),
                Expires = tokenExpireDateTime,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };

            var securityToken = jwtSecurityTokenHandler.CreateToken(securityTokenDescriptor);
            var token = jwtSecurityTokenHandler.WriteToken(securityToken);

            return new UserReply { Message = token, IsException = false, ExpiresIn = (int)tokenExpireDateTime.Subtract(DateTime.Now).TotalSeconds};
        }

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
