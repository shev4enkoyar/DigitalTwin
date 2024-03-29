﻿using Grpc.Core;
using Microservice.DashboardManager.DAL;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Microservice.DashboardManager.Services
{
    /// <summary>
    /// gRPC transport service
    /// </summary>
    public class TransportProtoService : TransportService.TransportServiceBase
    {
        /// <summary>
        /// Database access property
        /// </summary>
        private ApplicationContext DbContext { get; }

        /// <summary>
        /// Dependency injection constructor
        /// </summary>
        public TransportProtoService(ApplicationContext dbContext)
        {
            DbContext = dbContext;
        }

        /// <summary>
        /// Method for getting all transport
        /// </summary>
        /// <returns>Enumeration of transport objects</returns>
        public override async Task GetAllTransport(GetAllTransportRequest request, IServerStreamWriter<GetAllTransportReply> responseStream, ServerCallContext context)
        {
            var transportReply = new GetAllTransportReply();
            transportReply.Transports.AddRange(GetProtoTransport());

            await responseStream.WriteAsync(transportReply);
            await Task.FromResult(transportReply);
        }

        /// <summary>
        /// Method for obtaining a transport object by its Id
        /// </summary>
        /// <returns>Transport object</returns>
        public override Task<GetTransportByIdReply> GetTransportById(GetTransportByIdRequest request, ServerCallContext context)
        {
            var transport = DbContext.Transports.FirstOrDefault(x => x.Id == request.Id);
            if (transport == null)
                return null;
            var staffNames = transport.StaffName;
            var staffNums = transport.StaffNum;
            var staff = $"{staffNames} - {staffNums}";
            var transportProto = new TransportProto()
            {
                Id = transport.Id,
                Brand = transport.Brand,
                Name = transport.Name,
                Staff = staff
            };
            return Task.FromResult(new GetTransportByIdReply() { Transport = transportProto });
        }

        private IEnumerable<TransportProto> GetProtoTransport()
        {
            return DbContext.Transports
                .Select(x => new TransportProto()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Brand = x.Brand,
                    Staff = $"{x.StaffName}/{x.StaffNum}"
                });
        }
    }
}
