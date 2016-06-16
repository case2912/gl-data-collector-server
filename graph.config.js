export const config = {
    "chart": {
        "zoomType": "xy",
        "width": 500,
        "height": 500
    },
    "title": {
        "text": "社員の人数と平均年齢"
    },
    "subtitle": {
        "text": "このデータはフィクションです"
    },
    "xAxis": [{
        "categories": [2010, 2011, 2012, 2013, 2014, 2015, 2016],
        "crosshair": true,
        "labels": {
            "step": 2
        }
    }],
    "yAxis": [{
        "labels": {
            "format": "{value} [人]"
        },
        "title": {
            "text": "社員数"
        }
    }, {
        "labels": {
            "format": "{value} [歳]"
        },
        "title": {
            "text": "平均年齢"
        },
        "opposite": true,
        "min": 20
    }],
    "tooltip": {
        "shared": true
    },
    "series": [{
        "name": "社員数",
        "type": "column",
        "data": [300, 350, 400, 380, 360, 370, 1000],
        "tooltip": {
            "valueSuffix": " [人]"
        }
    }, {
        "yAxis": 1,
        "name": "平均年齢",
        "type": "spline",
        "dashStyle": "shortdot",
        "data": [29, 29, 30, 30.5, 31, 30.5, 30],
        "tooltip": {
            "valueSuffix": " [歳]"
        }
    }]
};
