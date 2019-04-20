import Zineful, { ZinefulConfig } from "./zineful";

const config = new ZinefulConfig({
    port: 3000
});

const zine = new Zineful(config);

zine.use(async (ctx) => {
    console.log(`${ctx.method} Request from ${ctx.hostname}!`);
});

zine.start();
