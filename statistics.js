import * as Targets from "./statistics-target";

export const extensions_count = (result) => {
    const count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < result.Count; i++) {
        for (var j = 0; j < Targets.extensions.length; j++) {
            result.Items[i].attrs.extensions[Targets.extensions[j]] && count[j]++;
        }
    }
    return count;
}
export const parameters_min = (result) => {
    const min = [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity];
    for (let i = 0; i < result.Count; i++) {
        for (var j = 0; j < Targets.parameters.length; j++) {
            min[j] > result.Items[i].attrs.parameters[Targets.parameters[j]] && (min[j] = result.Items[i].attrs.parameters[Targets.parameters[j]]);
        }
    }
    return min;
}
export const parameters_max = (result) => {
    const max = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < result.Count; i++) {
        for (var j = 0; j < Targets.parameters.length; j++) {
            max[j] < result.Items[i].attrs.parameters[Targets.parameters[j]] && (max[j] = result.Items[i].attrs.parameters[Targets.parameters[j]]);
        }
    }
    return max;
}
export const parameters_average = (result) => {
    var average = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var total = 0;
    for (let i = 0; i < result.Count; i++) {
        for (var j = 0; j < Targets.parameters.length; j++) {
            average[j] += (result.Items[i].attrs.parameters[Targets.parameters[j]] - average[j]) / (total + 1);
        }
        total = total + 1;
    }
    return average;
}
