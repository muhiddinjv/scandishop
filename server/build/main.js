"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var express_1 = __importDefault(require("express"));
var schema_1 = __importDefault(require("./schema"));
var resolvers_1 = __importDefault(require("./resolvers"));
var path_1 = __importDefault(require("path"));
var server = new apollo_server_1.ApolloServer({
    typeDefs: schema_1.default,
    resolvers: resolvers_1.default
});
var app = express_1.default();
// server.applyMiddleware({
//     path: '/client',
//     app,
//   });
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.get('/', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
});
app.listen({ port: 3000 }, function () {
    console.log("\uD83D\uDE80  App ready at http://localhost:3000");
});
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80  Server ready at " + url);
});
