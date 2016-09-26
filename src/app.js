import "babel-polyfill";
import Koa from 'koa';
import routerGenerator from "koa-router";
import bodyParser from "koa-bodyparser";
import * as db from "./db";
import {
    CronJob
} from "cron";
const app = new Koa();
const router = new routerGenerator();
router.post('/record', async function(ctx, next) {
    ctx.response.set("Access-Control-Allow-Origin", "*");
    await next();
    ctx.response.body = null;
    db.put(ctx.request.body);
});
router.options('/record', async function(ctx, next) {
    await next();
    ctx.response.set("Access-Control-Allow-Origin", "*");
    ctx.response.set("Access-Control-Allow-Headers", "Content-Type");
});
app.listen(3000, () => {
    console.log("listening on port 3000");
});
app.use(bodyParser()).use(router.routes()).use(router.allowedMethods());
db.createTables();