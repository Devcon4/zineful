import * as Koa from 'koa';
import * as middleware from './middleware/index';
import { Middleware } from 'koa-compose';

export class ZinefulConfig {
    port: number = 3000;
    host: string = 'localhost';

    constructor(params: Partial<ZinefulConfig>) {
        Object.assign(this, params);
    }
}

export default class Zineful {

    public middleware: Middleware<Koa.ParameterizedContext<any, {}>>[] = [];
    config: ZinefulConfig;
    
    private _app: Koa;

    get app() { return this._app; }
    set app(val) { this._app = val}
    
    constructor(config: ZinefulConfig) {
        this.config = config;
    }

    start() {
        this.app = new Koa();
        this.middleware.forEach(this.app.use.bind(this));

        console.log(`Starting app on ${this.config.host}:${this.config.port} 🚀`);
        this.app.listen(this.config.port);
    }

    public use(middleware: Middleware<Koa.ParameterizedContext<any, {}>>) {
        this.middleware.push(middleware);
    };
}