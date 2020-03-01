import * as express from 'express';
import User from '../database/models/user';
import Json from '../database/models/json';
import JsonUser from '../database/models/user-json';

export interface DBContext {
  User: typeof User;
  Json: typeof Json;
  JsonUser: typeof JsonUser;
}

export interface ServerContext {
  db: DBContext;
  JWT_SECRET: string;
}

export type Handler<Req = {}, Res = {}> = (
  req: express.Request & Req,
  res: express.Response & Res,
  next: express.NextFunction,
  ctx: ServerContext,
) => Promise<any> | any;

export type Route = {
  path: string | string[];
  method: 'get' | 'post' | 'put';
  handler: Handler[];
};
