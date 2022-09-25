/**
 * @fileoverview gRPC-Web generated client stub for userManager
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.userManager = require('./userManager_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.userManager.UserManagerClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.userManager.UserManagerPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.userManager.UserProto,
 *   !proto.userManager.UserReply>}
 */
const methodDescriptor_UserManager_Register = new grpc.web.MethodDescriptor(
  '/userManager.UserManager/Register',
  grpc.web.MethodType.UNARY,
  proto.userManager.UserProto,
  proto.userManager.UserReply,
  /**
   * @param {!proto.userManager.UserProto} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.userManager.UserReply.deserializeBinary
);


/**
 * @param {!proto.userManager.UserProto} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.userManager.UserReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.userManager.UserReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.userManager.UserManagerClient.prototype.register =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/userManager.UserManager/Register',
      request,
      metadata || {},
      methodDescriptor_UserManager_Register,
      callback);
};


/**
 * @param {!proto.userManager.UserProto} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.userManager.UserReply>}
 *     Promise that resolves to the response
 */
proto.userManager.UserManagerPromiseClient.prototype.register =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/userManager.UserManager/Register',
      request,
      metadata || {},
      methodDescriptor_UserManager_Register);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.userManager.UserProto,
 *   !proto.userManager.UserReply>}
 */
const methodDescriptor_UserManager_Login = new grpc.web.MethodDescriptor(
  '/userManager.UserManager/Login',
  grpc.web.MethodType.UNARY,
  proto.userManager.UserProto,
  proto.userManager.UserReply,
  /**
   * @param {!proto.userManager.UserProto} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.userManager.UserReply.deserializeBinary
);


/**
 * @param {!proto.userManager.UserProto} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.userManager.UserReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.userManager.UserReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.userManager.UserManagerClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/userManager.UserManager/Login',
      request,
      metadata || {},
      methodDescriptor_UserManager_Login,
      callback);
};


/**
 * @param {!proto.userManager.UserProto} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.userManager.UserReply>}
 *     Promise that resolves to the response
 */
proto.userManager.UserManagerPromiseClient.prototype.login =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/userManager.UserManager/Login',
      request,
      metadata || {},
      methodDescriptor_UserManager_Login);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.userManager.Check,
 *   !proto.userManager.Mate>}
 */
const methodDescriptor_UserManager_CheckMate = new grpc.web.MethodDescriptor(
  '/userManager.UserManager/CheckMate',
  grpc.web.MethodType.UNARY,
  proto.userManager.Check,
  proto.userManager.Mate,
  /**
   * @param {!proto.userManager.Check} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.userManager.Mate.deserializeBinary
);


/**
 * @param {!proto.userManager.Check} request The
 *     request proto
 * @param {{Authorization: string}} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.userManager.Mate)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.userManager.Mate>|undefined}
 *     The XHR Node Readable Stream
 */
proto.userManager.UserManagerClient.prototype.checkMate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/userManager.UserManager/CheckMate',
      request,
      metadata || {},
      methodDescriptor_UserManager_CheckMate,
      callback);
};


/**
 * @param {!proto.userManager.Check} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.userManager.Mate>}
 *     Promise that resolves to the response
 */
proto.userManager.UserManagerPromiseClient.prototype.checkMate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/userManager.UserManager/CheckMate',
      request,
      metadata || {},
      methodDescriptor_UserManager_CheckMate);
};


module.exports = proto.userManager;

