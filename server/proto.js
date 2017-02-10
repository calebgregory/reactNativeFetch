/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobuf"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader,
        $Writer = $protobuf.Writer,
        $util   = $protobuf.util;
    
    // Lazily resolved type references
    var $lazyTypes = [];
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.data = (function() {
    
        /**
         * Namespace data.
         * @exports data
         * @namespace
         */
        var data = {};
    
        data.Messager = (function() {
    
            /**
             * Constructs a new Messager service.
             * @exports data.Messager
             * @extends $protobuf.rpc.Service
             * @constructor
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             */
            function Messager(rpcImpl, requestDelimited, responseDelimited) {
                $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
            }
    
            (Messager.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = Messager;
    
            /**
             * Creates new Messager service using the specified rpc implementation.
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             * @returns {Messager} RPC service. Useful where requests and/or responses are streamed.
             */
            Messager.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                return new this(rpcImpl, requestDelimited, responseDelimited);
            };
    
            /**
             * Callback as used by {@link Messager#sendMsg}.
             * @typedef Messager_sendMsg_Callback
             * @type {function}
             * @param {?Error} error Error, if any
             * @param {data.MsgReply} [response] MsgReply
             */
    
            /**
             * Calls SendMsg.
             * @param {data.MsgRequest|Object} request MsgRequest message or plain object
             * @param {Messager_sendMsg_Callback} callback Node-style callback called with the error, if any, and MsgReply
             * @returns {undefined}
             */
            Messager.prototype.sendMsg = function sendMsg(request, callback) {
                return this.rpcCall("SendMsg", $root.data.MsgRequest, $root.data.MsgReply, request, callback);
            };
    
            /**
             * Calls SendMsg.
             * @name Messager#sendMsg
             * @function
             * @param {data.MsgRequest|Object} request MsgRequest message or plain object
             * @returns {Promise<data.MsgReply>} Promise
             * @variation 2
             */
    
            return Messager;
        })();
    
        data.MessagerServer = (function() {
    
            /**
             * Constructs a new Messager server.
             * @exports data.MessagerServer
             * @extends $protobuf.rpc.Server
             * @constructor
             * @param {$protobuf.RPCServerImpl} rpcServerImpl RPC implementation
             */
            function MessagerServer(rpcServerImpl) {
                $protobuf.rpc.Server.call(this, rpcServerImpl);
            }
    
            (MessagerServer.prototype = Object.create($protobuf.rpc.Server.prototype)).constructor = MessagerServer;
    
            /**
             * Creates new MessagerServer server using the specified rpc implementation.
             * @param {$protobuf.RPCImpl} rpcServerImpl RPC implementation
             * @returns {MessagerServer} RPC server.
             */
            MessagerServer.create = function create(rpcServerImpl) {
                return new this(rpcServerImpl);
            };
    
            /**
             * Callback as used by {@link MessagerServer#SendMsg}.
             * @typedef MessagerServer_SendMsg_Callback
             * @type {function}
             * @param {?Error} error Error, if any
             * @param {data.MsgReply} [response] MsgReply
             */
    
            /**
             * Calls SendMsg.
             * @param {Object} ctx Object containing request-scoped data
             * @param {data.MsgRequest|Object} request MsgRequest message or plain object
             * @param {MessagerServer_SendMsg_Callback} callback Node-style callback called with the error, if any, and MsgReply
             * @returns {undefined}
             */
            MessagerServer.prototype.SendMsg = function SendMsg(ctx, request, callback) {
                return this.rpcCall({ctx: ctx, method: "SendMsg"}, $root.data.MsgRequest, $root.data.MsgReply, request, callback);
            };
    
            /**
             * Calls SendMsg.
             * @name Messager#SendMsg
             * @function
             * @param {Object} ctx Object containing request-scoped data
             * @param {data.MsgRequest|Object} request MsgRequest message or plain object
             * @returns {Promise<data.MsgReply>} Promise
             * @variation 2
             */
    
            return MessagerServer;
        })();
    
        data.MsgRequest = (function() {
    
            /**
             * Constructs a new MsgRequest.
             * @exports data.MsgRequest
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function MsgRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * MsgRequest caller.
             * @type {string}
             */
            MsgRequest.prototype.caller = "";
    
            /**
             * MsgRequest text.
             * @type {string}
             */
            MsgRequest.prototype.text = "";
    
            /**
             * Creates a new MsgRequest instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {data.MsgRequest} MsgRequest instance
             */
            MsgRequest.create = function create(properties) {
                return new MsgRequest(properties);
            };
    
            /**
             * Encodes the specified MsgRequest message.
             * @param {data.MsgRequest|Object} message MsgRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgRequest.encode = function encode(message, writer) {    
                if (!writer)
                    writer = $Writer.create();
                if (message.caller !== undefined && message.hasOwnProperty("caller"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.caller);
                if (message.text !== undefined && message.hasOwnProperty("text"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.text);
                return writer;
            };
    
            /**
             * Encodes the specified MsgRequest message, length delimited.
             * @param {data.MsgRequest|Object} message MsgRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a MsgRequest message from the specified reader or buffer.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {data.MsgRequest} MsgRequest
             */
            MsgRequest.decode = function decode(reader, length) {    
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.data.MsgRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.caller = reader.string();
                        break;
                    case 2:
                        message.text = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a MsgRequest message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {data.MsgRequest} MsgRequest
             */
            MsgRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a MsgRequest message.
             * @param {data.MsgRequest|Object} message MsgRequest message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            MsgRequest.verify = function verify(message) {    
                if (message.caller !== undefined)
                    if (!$util.isString(message.caller))
                        return "caller: string expected";
                if (message.text !== undefined)
                    if (!$util.isString(message.text))
                        return "text: string expected";
                return null;
            };
    
            /**
             * Creates a MsgRequest message from a plain object. Also converts values to their respective internal types.
             * @param {Object.<string,*>} object Plain object
             * @returns {data.MsgRequest} MsgRequest
             */
            MsgRequest.fromObject = function fromObject(object) {    
                if (object instanceof $root.data.MsgRequest)
                    return object;
                var message = new $root.data.MsgRequest();
                if (object.caller !== undefined && object.caller !== null)
                    message.caller = String(object.caller);
                if (object.text !== undefined && object.text !== null)
                    message.text = String(object.text);
                return message;
            };
    
            /**
             * Creates a MsgRequest message from a plain object. Also converts values to their respective internal types.
             * This is an alias of {@link data.MsgRequest.fromObject}.
             * @function
             * @param {Object.<string,*>} object Plain object
             * @returns {data.MsgRequest} MsgRequest
             */
            MsgRequest.from = MsgRequest.fromObject;
    
            /**
             * Creates a plain object from a MsgRequest message. Also converts values to other types if specified.
             * @param {data.MsgRequest} message MsgRequest
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MsgRequest.toObject = function toObject(message, options) {    
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.caller = "";
                    object.text = "";
                }
                if (message.caller !== undefined && message.caller !== null && message.hasOwnProperty("caller"))
                    object.caller = message.caller;
                if (message.text !== undefined && message.text !== null && message.hasOwnProperty("text"))
                    object.text = message.text;
                return object;
            };
    
            /**
             * Creates a plain object from this MsgRequest message. Also converts values to other types if specified.
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MsgRequest.prototype.toObject = function toObject(options) {
                return this.constructor.toObject(this, options);
            };
    
            /**
             * Converts this MsgRequest to JSON.
             * @returns {Object.<string,*>} JSON object
             */
            MsgRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return MsgRequest;
        })();
    
        data.MsgReply = (function() {
    
            /**
             * Constructs a new MsgReply.
             * @exports data.MsgReply
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function MsgReply(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * MsgReply caller.
             * @type {string}
             */
            MsgReply.prototype.caller = "";
    
            /**
             * MsgReply response.
             * @type {string}
             */
            MsgReply.prototype.response = "";
    
            /**
             * MsgReply request.
             * @type {data.MsgRequest}
             */
            MsgReply.prototype.request = null;
    
            // Lazily resolved type references
            var $types = {
                2: "data.MsgRequest"
            }; $lazyTypes.push($types);
    
            /**
             * Creates a new MsgReply instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {data.MsgReply} MsgReply instance
             */
            MsgReply.create = function create(properties) {
                return new MsgReply(properties);
            };
    
            /**
             * Encodes the specified MsgReply message.
             * @param {data.MsgReply|Object} message MsgReply message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgReply.encode = function encode(message, writer) {    
                if (!writer)
                    writer = $Writer.create();
                if (message.caller !== undefined && message.hasOwnProperty("caller"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.caller);
                if (message.response !== undefined && message.hasOwnProperty("response"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.response);
                if (message.request && message.hasOwnProperty("request"))
                    $types[2].encode(message.request, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified MsgReply message, length delimited.
             * @param {data.MsgReply|Object} message MsgReply message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgReply.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a MsgReply message from the specified reader or buffer.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {data.MsgReply} MsgReply
             */
            MsgReply.decode = function decode(reader, length) {    
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.data.MsgReply();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.caller = reader.string();
                        break;
                    case 2:
                        message.response = reader.string();
                        break;
                    case 3:
                        message.request = $types[2].decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a MsgReply message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {data.MsgReply} MsgReply
             */
            MsgReply.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a MsgReply message.
             * @param {data.MsgReply|Object} message MsgReply message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            MsgReply.verify = function verify(message) {    
                if (message.caller !== undefined)
                    if (!$util.isString(message.caller))
                        return "caller: string expected";
                if (message.response !== undefined)
                    if (!$util.isString(message.response))
                        return "response: string expected";
                if (message.request !== undefined && message.request !== null) {
                    var error = $types[2].verify(message.request);
                    if (error)
                        return "request." + error;
                }
                return null;
            };
    
            /**
             * Creates a MsgReply message from a plain object. Also converts values to their respective internal types.
             * @param {Object.<string,*>} object Plain object
             * @returns {data.MsgReply} MsgReply
             */
            MsgReply.fromObject = function fromObject(object) {    
                if (object instanceof $root.data.MsgReply)
                    return object;
                var message = new $root.data.MsgReply();
                if (object.caller !== undefined && object.caller !== null)
                    message.caller = String(object.caller);
                if (object.response !== undefined && object.response !== null)
                    message.response = String(object.response);
                if (object.request !== undefined && object.request !== null) {
                    if (typeof object.request !== "object")
                        throw TypeError(".data.MsgReply.request: object expected");
                    message.request = $types[2].fromObject(object.request);
                }
                return message;
            };
    
            /**
             * Creates a MsgReply message from a plain object. Also converts values to their respective internal types.
             * This is an alias of {@link data.MsgReply.fromObject}.
             * @function
             * @param {Object.<string,*>} object Plain object
             * @returns {data.MsgReply} MsgReply
             */
            MsgReply.from = MsgReply.fromObject;
    
            /**
             * Creates a plain object from a MsgReply message. Also converts values to other types if specified.
             * @param {data.MsgReply} message MsgReply
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MsgReply.toObject = function toObject(message, options) {    
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.caller = "";
                    object.response = "";
                    object.request = null;
                }
                if (message.caller !== undefined && message.caller !== null && message.hasOwnProperty("caller"))
                    object.caller = message.caller;
                if (message.response !== undefined && message.response !== null && message.hasOwnProperty("response"))
                    object.response = message.response;
                if (message.request !== undefined && message.request !== null && message.hasOwnProperty("request"))
                    object.request = $types[2].toObject(message.request, options);
                return object;
            };
    
            /**
             * Creates a plain object from this MsgReply message. Also converts values to other types if specified.
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MsgReply.prototype.toObject = function toObject(options) {
                return this.constructor.toObject(this, options);
            };
    
            /**
             * Converts this MsgReply to JSON.
             * @returns {Object.<string,*>} JSON object
             */
            MsgReply.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return MsgReply;
        })();
    
        return data;
    })();
    
    // Resolve lazy type references to actual types
    $util.lazyResolve($root, $lazyTypes);

    return $root;
});
