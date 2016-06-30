import "babel-polyfill";
import vogels from "vogels";
import Joi from "joi";
import UAParser from "ua-parser-js";
import * as statistics from "./statistics";
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
export const statisticsTable = vogels.define("webgl_statistics_result", {
    hashKey: "name",
    timestamps: true,
    schema: {
        name: Joi.string(),
        platform_name: Joi.string(),
        platform_version: Joi.string(),
        browser_name: Joi.string(),
        browser_version: Joi.string(),
        domain: Joi.string(),
        data: Joi.object()
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
export const scanAll = () => {
    return new Promise((resolve, reject) => {
        table
            .scan()
            .loadAll()
            .exec((err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
    });
}
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
const scanName = async(name) => {
    const array = [];
    const scannedData = await scanAll();
    return new Promise((resolve, reject) => {
        for (var i = 0; i < scannedData.Items.length; i++) {
            if (!array.includes(scannedData.Items[i].attrs[name])) {
                array.push(scannedData.Items[i].attrs[name]);
            }
        }
        resolve(array);
    });
}
const scan = async(name, value) => {
    return new Promise((resolve, reject) => {
        table
            .scan()
            .where(name).equals(value)
            .exec((err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
    });
}
const scanVersion = async(name, value) => {
    const array = ["-"];
    const scannedData = await scan(name, value);
    const version = name.replace("_name", "_version")
    return new Promise((resolve, reject) => {
        for (var i = 0; i < scannedData.Items.length; i++) {
            if (!array.includes(scannedData.Items[i].attrs[version].replace(/\.(.*)/, ""))) {
                array.push(scannedData.Items[i].attrs[version].replace(/\.(.*)/, ""));
            }
        }
        resolve(array);
    });
}
const queryStatistics = async(bname, bversion, pname, pversion) => {
    return new Promise((resolve, reject) => {
        if (bname === "-" && pname === "-") {
            //none
            console.log(0);
            table.scan()
                .exec((err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
        } else if (bname !== "-" && pname === "-") {
            //bname
            if (bversion === "-") {
                console.log(1);
                table.scan()
                    .where("browser_name").contains(bname)
                    .exec((err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
            } else {
                console.log(2);
                table.scan()
                    .where("browser_name").contains(bname)
                    .where("browser_version").contains(bversion)
                    .exec((err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
            }
        } else if (bname === "-" && pname !== "-") {
            //pname
            if (pversion === "-") {
                console.log(3);
                table.scan()
                    .where("platform_name").contains(pname)
                    .exec((err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
            } else {
                console.log(4);
                table.scan()
                    .where("platform_name").contains(pname)
                    .where("platform_version").contains(pversion)
                    .exec((err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
            }
        } else {
            if (bversion === "-" && pversion === "-") {
                console.log(5);
                //name only
                table.scan()
                    .where("browser_name").contains(bname)
                    .where("platform_name").contains(pname)
                    .exec((err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
            } else if (bversion !== "-" && pversion === "-") {
                //name bversion
                console.log(6);
                table.scan()
                    .where("browser_name").contains(bname)
                    .where("browser_version").contains(bversion)
                    .where("platform_name").contains(pname)
                    .exec((err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
            } else if (bversion === "-" && pversion !== "-") {
                //name pversion
                console.log(7);
                table.scan()
                    .where("browser_name").contains(bname)
                    .where("platform_name").contains(pname)
                    .where("platform_version").contains(pversion)
                    .exec((err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
            } else {
                console.log(8);
                //name bversion and pversion
                table.scan()
                    .where("browser_name").contains(bname)
                    .where("browser_version").contains(bversion)
                    .where("platform_name").contains(pname)
                    .where("platform_version").contains(pversion)
                    .exec((err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
            }
        }

    });
}
const updateIndex = async() => {
    const result = {};
    result.browser = {
        "-": ["-"]
    };
    result.platform = {
        "-": ["-"]
    };

    const bname = await scanName("browser_name");
    const pname = await scanName("platform_name");
    for (var i = 0; i < bname.length; i++) {
        result.browser[bname[i]] = await scanVersion("browser_name", bname[i]);
    }
    for (var i = 0; i < pname.length; i++) {
        result.platform[pname[i]] = await scanVersion("platform_name", pname[i]);
    }
    return result;
}
export const updateStatistics = async() => {
    const index = await updateIndex();
    for (var bname in index.browser) {
        for (var i = 0; i < index.browser[bname].length; i++) {
            for (var pname in index.platform) {
                for (var j = 0; j < index.platform[pname].length; j++) {
                    console.log(bname, index.browser[bname][i], pname, index.platform[pname][j]);
                    const data = await queryStatistics(bname, index.browser[bname][i], pname, index.platform[pname][j]);
                    const result = {};
                    result.count = await statistics.extensions_count(data);
                    result.max = await statistics.parameters_max(data);
                    result.min = await statistics.parameters_min(data);
                    await statisticsTable.create({
                        name: bname + index.browser[bname][i] + pname + index.platform[pname][j],
                        platform_name: pname,
                        platform_version: index.platform[pname][j],
                        browser_name: bname,
                        browser_version: index.browser[bname][i],
                        data: result
                    }, function(err, acc) {
                        if (err) {
                            console.log("Unable to insert element.", err);
                        }
                    });
                }
            }
        }
    }
    await console.log("updated statistics!");
}
export const queryResult = async(key) => {
    return new Promise((resolve, reject) => {
        let a = "-";
        let b = "-";
        let c = "-";
        let d = "-";
        if (typeof key.browser_name !== "undefined") a = key.browser_name;
        if (typeof key.browser_version !== "undefined") b = key.browser_version;
        if (typeof key.platform_name !== "undefined") c = key.platform_name;
        if (typeof key.platform_version !== "undefined") d = key.platform_version;
        const hash = a + b + c + d;
        statisticsTable.query(hash)
            .exec((err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
    });
}
