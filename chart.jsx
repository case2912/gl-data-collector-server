import React from "react";
import ReactDOM from 'react-dom';
import Highcharts from 'react-highcharts';

export default class SimpleGraph extends React.Component {

    render() {
        const config = {
            "chart": {
                "zoomType": "xy", // ズームタイプ。 x: x軸のみ / y: y軸のみ / xy: xy軸,
                "width": 500, // グラフの高さ。指定しないとデフォルト値400になる
                "height": 500 // グラフの高さ。指定しないとデフォルト値400になる
            },
            "title": {
                "text": "社員の人数と平均年齢" // グラフのタイトル
            },
            "subtitle": {
                "text": "このデータはフィクションです" // グラフのサブタイトル
            },
            "xAxis": [{
                "categories": [2010, 2011, 2012, 2013, 2014, 2015], // x軸の値を具体的に指定
                "crosshair": true, // 選択箇所の縦横を強調するか
                "labels": {
                    "step": 2 // x軸のメモリ表示間隔。指定しないと自動判定される。
                }
            }],
            "yAxis": [ // 2つ以上の縦軸を用意する場合は複数の要素を定義する
                {
                    "labels": {
                        "format": "{value} [人]" // 縦軸パラメータ表示フォーマット
                    },
                    "title": {
                        "text": "社員数" // 縦軸の名前
                    }
                },
                {
                    "labels": {
                        "format": "{value} [歳]" // 縦軸パラメータ表示フォーマット
                    },
                    "title": {
                        "text": "平均年齢" // 縦軸の名前
                    },
                    "opposite": true, // 縦軸の表示が反対側になる
                    "min": 20 // 本y軸の最小値
                }
            ],
            "tooltip": {
                "shared": true // 複数の値を同じtooltipに表示するか
            },
            "series": [
                {
                    "name": "社員数", // 連続値の名前
                    "type": "column", // グラフタイプ
                    "data": [300, 350, 400, 380, 360, 370], // データの配列
                    "tooltip": {
                        "valueSuffix": " [人]" // tooltip内で表示する値のsuffix
                    }
                },
                {
                    "yAxis": 1, // yAxisで定義したArrayのindexを指定
                    "name": "平均年齢",
                    "type": "spline", // ※1
                    "dashStyle": "shortdot", // spline型特有のプロパティ。線のタイプ。
                    "data": [29, 29, 30, 30.5, 31, 30.5], // データの配列
                    "tooltip": {
                        "valueSuffix": " [歳]" // tooltip内で表示する値のsuffix
                    }
                }
            ]
        };
        return (
            <Highcharts config={config} ref="chart"></Highcharts>
        );
    }

}

ReactDOM.render(
    <SimpleGraph />,
    document.getElementById('container')
);
