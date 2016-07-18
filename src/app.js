import "babel-polyfill";
import querystring from "querystring";
import Koa from 'koa';
import routerGenerator from "koa-router";
import bodyParser from "koa-bodyparser";
import * as db from "./db";
import * as statistics from "./statistics";
import React from "react";
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
router.get("/", async(ctx, next) => {
    await next();
    ctx.response.set("Access-Control-Allow-Origin", "*");
    ctx.body = "/list?browser_name=chrome&browser_version=51&platform_name=macos&platform_version=10&domain=10.32.218.191";
});
router.get('/list', async function(ctx, next) {
    await next();
    ctx.response.set("Access-Control-Allow-Origin", "*");
    let key = await querystring.parse(ctx.request.url.replace(/(.*)\?/, ""));
    const result = await db.queryResult(key);
    if (result.Count === 0) {
        ctx.status = 404;
    } else {
        ctx.body = result;
    }
});
router.get("/list/index", async(ctx, next) => {
    const result = await db.getIndex();
    ctx.body = result.Items[0];
});
app.listen(3000, () => {
    console.log("listening on port 3000");
});
app.use(bodyParser()).use(router.routes()).use(router.allowedMethods());
const dbInit = async() => {
    await db.createTables();
    await console.log('cron start!');
    await new CronJob('00 30 11 * * 1-5', async function() {
        await db.updateStatistics();
    }, null, true, 'America/Los_Angeles');
}
dbInit();
