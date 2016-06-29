import "babel-polyfill";
import querystring from "querystring";
import Koa from 'koa';
import routerGenerator from "koa-router";
import bodyParser from "koa-bodyparser";
import * as db from "./db";
import * as statistics from "./statistics";
import React from "react";
const app = new Koa();
const router = new routerGenerator();
router.get('/', async function(ctx, next) {
    await next();
    console.log(querystring.parse(ctx.request.url.replace(/(.*)\?/, "")));
    ctx.body = await db.queryResult("all");
});
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
router.get('/list', async function(ctx, next) {
    await next();
    const result = await db.scan();
    ctx.response.body = result;
});
router.get('/list/browser', async function(ctx, next) {
    await next();
    const urlObject = new url();
    console.log(urlObject.query(x.request.url));
    ctx.body = "/list/browser";
});
router.get('/list/browser/:browser_name', async function(ctx, next) {
    await next();
    ctx.body = "list/browser/" + ctx.params.browser_name;
});
router.get('/list/browser/:browser_name/:browser_version', async function(ctx, next) {
    await next();
    ctx.body = "list/browser/" + ctx.params.browser_name + "/" + ctx.params.browser_version;
});
router.get('/list/browser/:browser_name/:browser_version/:os_name', async function(ctx, next) {
    await next();
    ctx.body = "list/browser/" + ctx.params.browser_name + "/" + ctx.params.browser_version + "/" + ctx.params.os_name;
});
router.get('/list/browser/:browser_name/:browser_version/:os_name/:os_version', async function(ctx, next) {
    await next();
    ctx.body = "list/browser/" + ctx.params.browser_name + "/" + ctx.params.browser_version + "/" + ctx.params.os_name + "/" + ctx.params.os_version;
});
router.get('/list/os', async function(ctx, next) {
    await next();
    ctx.body = "/list/os";
});
router.get('/list/os/:os_name', async function(ctx, next) {
    await next();
    ctx.body = "/list/os/" + ctx.params.os_name;
});
router.get('/list/os/:os_name/:os_version', async function(ctx, next) {
    await next();
    ctx.body = "/list/os/" + ctx.params.os_name + "/" + ctx.params.os_version;
});
app.listen(3000, () => {
    console.log("listening on port 3000");
});
app.use(bodyParser()).use(router.routes()).use(router.allowedMethods());
