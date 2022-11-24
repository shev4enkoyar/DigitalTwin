﻿using Grpc.Core;
using Microservice.DashboardManager.DAL;
using Microservice.DashboardManager.DAL.Models;
using Microservice.DashboardManager.Protos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Microservice.DashboardManager.Services
{
    public class DigitalModelProtoService : DigitalModelService.DigitalModelServiceBase
    {
        private ApplicationContext DbContext { get; }

        public DigitalModelProtoService(ApplicationContext dbContext)
        {
            DbContext = dbContext;
        }

        public override Task<ModelReply> PushDigitalModels(ModelRequest request, ServerCallContext context)
        {
            var model = new DigitalModel
            {
                Name = request.Name,
                CompanyId = Guid.Parse(request.CompanyId),
                ProductId = request.ProductId
            };

            DbContext.DigitalModels.Add(model);
            DbContext.SaveChanges();

            return Task.FromResult(new ModelReply { Status = "ok", ModelId = model.Id });
        }

        public override Task<ModelReply> UpdateMapDigitalModel(UpdateModelRequest request, ServerCallContext context)
        {
            var model = DbContext.DigitalModels.FirstOrDefault(x => x.Id == request.ModelId);
            model.MapId = request.MapId;

            DbContext.Update(model);
            DbContext.SaveChanges();

            return Task.FromResult(new ModelReply { Status = "ok", ModelId = model.Id });
        }

        public override async Task GetDigitalModels(GetModelsRequest request, IServerStreamWriter<GetModelsReply> responseStream, ServerCallContext context)
        {
            var modelsReply = new GetModelsReply();
            modelsReply.Models.AddRange(GetProtoModels(request.CompanyId));

            await responseStream.WriteAsync(modelsReply);
            await Task.FromResult(modelsReply);
        }

        private IEnumerable<ModelProto> GetProtoModels(string userId)
        {
            return DbContext.DigitalModels
                .Include(x => x.Product)
                .Where(x => x.CompanyId.ToString().Equals(userId))
                .Select(x => new ModelProto 
                {
                    Id = x.Id,
                    Name = x.Name,
                    CompanyId = x.CompanyId.ToString(),
                    ProductName = x.Product.Name,
                    ProductCode = x.Product.Code,
                    ProductCurrentPrice = x.Product.CurrentPrice.ToString(),
                    MapId = x.MapId.Value
                }).ToList();
        }
    }
}
