import "babel-polyfill";
import vogels from "vogels";
import Joi from "joi";
import UAParser from "ua-parser-js";
vogels.AWS.config.loadFromPath("credentials.json");
export const table = vogels.define("webgl_statistic", {
    hashKey: "id",
    timestamps: true,
    schema: {
        id: Joi.string(),
        extensions: Joi.object(),
        parameters: Joi.object(),
        platform_name: Joi.string(),
        platform_version: Joi.string(),
        browser_name: Joi.string(),
        browser_version: Joi.string(),
        domain: Joi.string()
    }
});
export const createTables = () => {
    return new Promise((resolve, reject) => {
        vogels.createTables(err => {
            if (err) {
                reject("Initializing DynamoDB tables was failed", err);
            } else {
                console.log("DynamoDB tables was initialized without any error");
                resolve();
            }
        });
    });
}

export const put = (data) => {
    const parser = new UAParser();
    parser.setUA(data.user);
    const ua = parser.getResult();
    table.create({
        id: data.id,
        extensions: data.extensions,
        parameters: data.parameters,
        platform_name: ua.os.name.toLowerCase().replace(/ /g, ""),
        platform_version: ua.os.version,
        browser_name: ua.browser.name.toLowerCase().replace(/ /g, ""),
        browser_version: ua.browser.version,
        domain: data.domain
    }, function(err, acc) {
        if (err) {
            console.log("Unable to insert element.", err);
        } else {
            console.log("Inserted element successfully.");
        }
    });
}