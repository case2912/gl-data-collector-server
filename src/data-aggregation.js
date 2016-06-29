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
const isAggregated = (name) => {
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
const scan = () => {
    return new Promise((resolve, reject) => {
        statisticsTable
            .scan()
            .exec((err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
    });
}
const scanBrowserName = async() => {
    const array = [];
    const scannedData = await scan();
    return new Promise((resolve, reject) => {
        for (var i = 0; i < scannedData.Items.length; i++) {
            if (!array.includes(scannedData.Items[i].attrs.name)) {
                array.push(scannedData.Items[i].attrs.name);
            }
        }
        resolve(array);
    });
}
scanBrowserName().then(result => {
    console.log(result);
});
