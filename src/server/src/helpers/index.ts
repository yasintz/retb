import * as express from 'express';

export type Handler<Req = {}, Res = {}> = (
  req: express.Request & Req,
  res: express.Response & Res,
  next: express.NextFunction,
) => Promise<any> | any;

export type Middleware<Req = {}, Res = {}> = Handler<Req, Res>;

export type Route<Req = {}, Res = {}> = {
  path: string | string[];
  method: 'get' | 'post' | 'put';
  handlers: Handler<Req, Res>[];
};

export class Service<R> {
  protected Repository: R;

  constructor(repository: R) {
    this.Repository = repository;
  }
}

export class Repository<M> {
  protected Model: M;

  constructor(model: M) {
    this.Model = model;
  }
}
