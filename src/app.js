import "babel-polyfill";
import querystring from "querystring";
import Koa from 'koa';
import routerGenerator from "koa-router";
import bodyParser from "koa-bodyparser";
import * as db from "./db";
import * as statistics from "./statistics";
import React from "react";
import {CronJob} from "cron";
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
router.get("/", async(ctx, next) => {
    await next();
    ctx.body = "/list ?browser_name=value &browser_version=value &platform_name=value &platform_version=value";
});
router.get('/list', async function(ctx, next) {
    await next();
    let key = await querystring.parse(ctx.request.url.replace(/(.*)\?/, ""));
    const result = await db.queryResult(key);
    if (result.Count === 0) {
        ctx.status = 404;
    } else {
        ctx.body = result;
    }
});
app.listen(3000, () => {
    console.log("listening on port 3000");
});
app.use(bodyParser()).use(router.routes()).use(router.allowedMethods());
const dbInit = async() => {
    await db.createTables();
    await db.updateStatistics();
    // await new CronJob('*/10 * * * *', function() {
    //     console.log('You will see this message every second');
    // }, null, true, 'America/Los_Angeles');
}
dbInit();
