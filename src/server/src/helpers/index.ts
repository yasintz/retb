import * as express from 'express';

export type Handler = (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<any> | any;

export type Middleware = Handler;

export type ParentRoute = {
  path?: string | string[];
  middlewares?: Middleware[];
  routes: Route[];
};

export type HandlerRoute = {
  path: string | string[];
  method: 'get' | 'post' | 'put' | 'delete';
  middlewares?: Middleware[];
  handler: Handler;
};

export type Route = HandlerRoute | ParentRoute;

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
