import express from "express";
import config from "config";
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";
import { ApolloServer, gql } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolver/user.resolver";
import User from "./model/user.model";
import http from "http";

import "reflect-metadata";

const port = config.get("port") as number;
const host = config.get("host") as string;
const path = "/graphql";

export interface Context {
  user: User;
}

const app = express();

// Parses incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

void (async function bootstrap() {
  // build TypeGraphQL executable schema
  const schema = await buildSchema({
    resolvers: [UserResolver],
    //authChecker, // register auth checking function
  });

  // Create GraphQL server
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const context = {
        req,
        // user: req.user, // `req.user` comes from `express-jwt`
      };
      return context;
    },
  });

  // Apply the GraphQL server middleware
  server.applyMiddleware({ app, path });

  // Launch the express server
  app.listen(port, host, () => {
    log.info(`Server listing at http://${host}:${port}`);
    connect();
    routes(app);
  });
})();

///https://www.apollographql.com/docs/apollo-server/integrations/middleware/
//Start from Here
//https://typegraphql.com/docs/authorization.html