import * as express from 'express';

export type Handler<Req = {}, Res = {}> = (
  req: express.Request & Req,
  res: express.Response & Res,
  next: express.NextFunction,
) => Promise<any> | any;

export type Route = {
  path: string | string[];
  method: 'get' | 'post' | 'put';
  handler: Handler[];
};
