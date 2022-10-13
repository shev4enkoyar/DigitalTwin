// source: figureCategoryProto.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() {
  if (this) { return this; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  if (typeof self !== 'undefined') { return self; }
  return Function('return this')();
}.call(null));

goog.exportSymbol('proto.figureCategoryProto.FigureCategoryProto', null, global);
goog.exportSymbol('proto.figureCategoryProto.FigureCategoryReply', null, global);
goog.exportSymbol('proto.figureCategoryProto.FigureCategoryRequest', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.figureCategoryProto.FigureCategoryRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.figureCategoryProto.FigureCategoryRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.figureCategoryProto.FigureCategoryRequest.displayName = 'proto.figureCategoryProto.FigureCategoryRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.figureCategoryProto.FigureCategoryReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.figureCategoryProto.FigureCategoryReply.repeatedFields_, null);
};
goog.inherits(proto.figureCategoryProto.FigureCategoryReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.figureCategoryProto.FigureCategoryReply.displayName = 'proto.figureCategoryProto.FigureCategoryReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.figureCategoryProto.FigureCategoryProto = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.figureCategoryProto.FigureCategoryProto, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.figureCategoryProto.FigureCategoryProto.displayName = 'proto.figureCategoryProto.FigureCategoryProto';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.figureCategoryProto.FigureCategoryRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.figureCategoryProto.FigureCategoryRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.figureCategoryProto.FigureCategoryRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.figureCategoryProto.FigureCategoryRequest.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.figureCategoryProto.FigureCategoryRequest}
 */
proto.figureCategoryProto.FigureCategoryRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.figureCategoryProto.FigureCategoryRequest;
  return proto.figureCategoryProto.FigureCategoryRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.figureCategoryProto.FigureCategoryRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.figureCategoryProto.FigureCategoryRequest}
 */
proto.figureCategoryProto.FigureCategoryRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.figureCategoryProto.FigureCategoryRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.figureCategoryProto.FigureCategoryRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.figureCategoryProto.FigureCategoryRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.figureCategoryProto.FigureCategoryRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.figureCategoryProto.FigureCategoryReply.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.figureCategoryProto.FigureCategoryReply.prototype.toObject = function(opt_includeInstance) {
  return proto.figureCategoryProto.FigureCategoryReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.figureCategoryProto.FigureCategoryReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.figureCategoryProto.FigureCategoryReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    figurecategoriesList: jspb.Message.toObjectList(msg.getFigurecategoriesList(),
    proto.figureCategoryProto.FigureCategoryProto.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.figureCategoryProto.FigureCategoryReply}
 */
proto.figureCategoryProto.FigureCategoryReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.figureCategoryProto.FigureCategoryReply;
  return proto.figureCategoryProto.FigureCategoryReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.figureCategoryProto.FigureCategoryReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.figureCategoryProto.FigureCategoryReply}
 */
proto.figureCategoryProto.FigureCategoryReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.figureCategoryProto.FigureCategoryProto;
      reader.readMessage(value,proto.figureCategoryProto.FigureCategoryProto.deserializeBinaryFromReader);
      msg.addFigurecategories(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.figureCategoryProto.FigureCategoryReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.figureCategoryProto.FigureCategoryReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.figureCategoryProto.FigureCategoryReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.figureCategoryProto.FigureCategoryReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFigurecategoriesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.figureCategoryProto.FigureCategoryProto.serializeBinaryToWriter
    );
  }
};


/**
 * repeated FigureCategoryProto figureCategories = 1;
 * @return {!Array<!proto.figureCategoryProto.FigureCategoryProto>}
 */
proto.figureCategoryProto.FigureCategoryReply.prototype.getFigurecategoriesList = function() {
  return /** @type{!Array<!proto.figureCategoryProto.FigureCategoryProto>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.figureCategoryProto.FigureCategoryProto, 1));
};


/**
 * @param {!Array<!proto.figureCategoryProto.FigureCategoryProto>} value
 * @return {!proto.figureCategoryProto.FigureCategoryReply} returns this
*/
proto.figureCategoryProto.FigureCategoryReply.prototype.setFigurecategoriesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.figureCategoryProto.FigureCategoryProto=} opt_value
 * @param {number=} opt_index
 * @return {!proto.figureCategoryProto.FigureCategoryProto}
 */
proto.figureCategoryProto.FigureCategoryReply.prototype.addFigurecategories = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.figureCategoryProto.FigureCategoryProto, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.figureCategoryProto.FigureCategoryReply} returns this
 */
proto.figureCategoryProto.FigureCategoryReply.prototype.clearFigurecategoriesList = function() {
  return this.setFigurecategoriesList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.figureCategoryProto.FigureCategoryProto.prototype.toObject = function(opt_includeInstance) {
  return proto.figureCategoryProto.FigureCategoryProto.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.figureCategoryProto.FigureCategoryProto} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.figureCategoryProto.FigureCategoryProto.toObject = function(includeInstance, msg) {
  var f, obj = {
    icon: jspb.Message.getFieldWithDefault(msg, 1, ""),
    color: jspb.Message.getFieldWithDefault(msg, 2, ""),
    type: jspb.Message.getFieldWithDefault(msg, 3, ""),
    isunique: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    id: jspb.Message.getFieldWithDefault(msg, 5, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.figureCategoryProto.FigureCategoryProto}
 */
proto.figureCategoryProto.FigureCategoryProto.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.figureCategoryProto.FigureCategoryProto;
  return proto.figureCategoryProto.FigureCategoryProto.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.figureCategoryProto.FigureCategoryProto} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.figureCategoryProto.FigureCategoryProto}
 */
proto.figureCategoryProto.FigureCategoryProto.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setIcon(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setColor(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setType(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsunique(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.figureCategoryProto.FigureCategoryProto.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.figureCategoryProto.FigureCategoryProto.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.figureCategoryProto.FigureCategoryProto} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.figureCategoryProto.FigureCategoryProto.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIcon();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getColor();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getType();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getIsunique();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getId();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
};


/**
 * optional string icon = 1;
 * @return {string}
 */
proto.figureCategoryProto.FigureCategoryProto.prototype.getIcon = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.figureCategoryProto.FigureCategoryProto} returns this
 */
proto.figureCategoryProto.FigureCategoryProto.prototype.setIcon = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string color = 2;
 * @return {string}
 */
proto.figureCategoryProto.FigureCategoryProto.prototype.getColor = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.figureCategoryProto.FigureCategoryProto} returns this
 */
proto.figureCategoryProto.FigureCategoryProto.prototype.setColor = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string type = 3;
 * @return {string}
 */
proto.figureCategoryProto.FigureCategoryProto.prototype.getType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.figureCategoryProto.FigureCategoryProto} returns this
 */
proto.figureCategoryProto.FigureCategoryProto.prototype.setType = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional bool isUnique = 4;
 * @return {boolean}
 */
proto.figureCategoryProto.FigureCategoryProto.prototype.getIsunique = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.figureCategoryProto.FigureCategoryProto} returns this
 */
proto.figureCategoryProto.FigureCategoryProto.prototype.setIsunique = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional int32 id = 5;
 * @return {number}
 */
proto.figureCategoryProto.FigureCategoryProto.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.figureCategoryProto.FigureCategoryProto} returns this
 */
proto.figureCategoryProto.FigureCategoryProto.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


goog.object.extend(exports, proto.figureCategoryProto);