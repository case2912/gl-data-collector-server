import "babel-polyfill";
import vogels from "vogels";
import Joi from "joi";
import db from "./db";
import statistics from "./statistics";
vogels.AWS.config.loadFromPath("credentials.json");

const statisticsTable = vogels.define("webgl_statistics_result", {
    hashKey: "name",
    timestamps: true,
    schema: {
        name: Joi.string(),
        max: Joi.object(),
        min: Joi.object(),
    }
});
vogels.createTables(err => {
    if (err) {
        console.log("Initializing DynamoDB tables was failed", err);
    } else {
        console.log("DynamoDB tables was initialized without any error");
    }
});
