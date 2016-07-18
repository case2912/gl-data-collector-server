import React from 'react';
import ReactDOM from 'react-dom';
import request from "request";
const ditems = [];
request.get("http://wglstat.grimoire.gl/list?browser_name=i&browser_version=n&platform_name=d&platform_version=e&domain=x", function(err, res, body) {
    for (var i = 0; i < JSON.parse(body).Items[0].index.domain.length; i++) {
        let s = JSON.parse(body).Items[0].index.domain[i];
        console.log(s);
        ditems.push(
            <a>{s}</a>
        );
    }
    console.log(ditems);
});
export const Hooter = () => (
    <div>
    </div>
);
