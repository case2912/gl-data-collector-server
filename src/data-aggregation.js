import "babel-polyfill";
import vogels from "vogels";
import Joi from "joi";
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
export const isAggregated = (name) => {
    return new Promise((resolve, reject) => {
        statisticsTable
            .scan()
            .where('name').equals(name)
            .select('COUNT')
            .exec((err, data) => {
                if (err) {
                    reject(err);
                } else {
                    if (data.Count === 0) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                }
            });
    });
}
