import { Chart } from "chart.js";
import { useEffect, useState } from "react"

let myChart;

export const CheckBoxs = (props) =>{
    const {END_POINT, API_KEY} = props;

    const [prefs, setPrefs] = useState([]);
    const [populations, setPopulations] = useState({});

    //ヘッダ設定
    const setHeader = key => {
        const headers = new Headers();
        headers.set("X-API-KEY", key);
        return headers;
    }

    //グラフ描画処理
    const showGraph = (code, prefName) => {
        const headers = setHeader(API_KEY);
        const URL = `${END_POINT}/api/v1/population/composition/perYear?prefCode=${code}`;

        fetch(URL, {headers: headers}).then(res => {
            return res.json();
        })
        .then(json => {
            const thePref = json.result.data[0].data;
            let newPopulations;

            //チェックをしたのか外したのかを判定
            if(code in populations){
                //消す処理
                newPopulations = Object.assign(populations);
                delete newPopulations[code.toString()];
            }
            else{
                //追加処理
                newPopulations = Object.assign(populations);
                newPopulations[code.toString()] = {pref: prefName ,data: thePref};
            }

            const graph = document.querySelector("#drawGraph").getContext("2d");

            try{
                myChart.destroy();
            }
            catch{
                ;
            }

            const showGraphData = [];
            
            //chart.jsのグラフに入れるために情報を整形
            for(const one in newPopulations){
                const onePrefData = newPopulations[one];
                const onePrefValueData = onePrefData.data.map(name => {return name.value});
                showGraphData.push(
                    {
                        label: onePrefData.pref,
                        type: "line",
                        fill: false,
                        data: onePrefValueData,
                        borderColor: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
                        yAxisID: "y-axis-1",
                    }
                )
            }
            
            myChart = new Chart(graph, {
                type: "line",
                data: {
                    labels: thePref.map(name => {return name.year}),
                    datasets: showGraphData
                },
                options: {
                    scales: {
                        yAxes: [{
                            id: "y-axis-1",
                            type: "linear",
                            position: "left",
                            scaleLabel: {
                                display: true,
                                labelString: "人口"
                            },
                            ticks: {
                                min: 0,
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "年代"
                            },
                            ticks: {
                                min: 0,
                            }
                        }],
                    },
                }
            });

            setPopulations(newPopulations);
        });
    }
    
    //都道府県一覧のチェックボックスを生成する配列を作るための処理
    useEffect(() => {
        const headers = setHeader(API_KEY);
        const URL = `${END_POINT}/api/v1/prefectures`;

        fetch(URL, {headers: headers}).then(res => {
            return res.json();
        })
        .then(json => {
            setPrefs(json.result);
        });

        //Chart.jsの初期処理だけしておくためにURLからlabelsを取得
        const URL2 = `${END_POINT}/api/v1/population/composition/perYear?prefCode=1`;
        fetch(URL2, {headers: headers}).then(res => {
            return res.json();
        })
        .then(json => {
            const thePref = json.result.data[0].data;
            const graph = document.querySelector("#drawGraph").getContext("2d");

            try{
                myChart.destroy();
            }
            catch{
                ;
            }
            
            myChart = new Chart(graph, {
                type: "line",
                data: {
                    labels: thePref.map(name => {return name.year})
                },
                options: {
                    scales: {
                        yAxes: [
                            {
                                id: "y-axis-1",
                                type: "linear",
                                position: "left",
                                scaleLabel: {
                                    display: true,
                                    labelString: "人口"
                                },
                                ticks: {
                                    min: 0,
                                }
                            }
                        ],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "年代"
                            },
                            ticks: {
                                min: 0,
                            }
                        }],
                    },
                }
            });
        });

    }, [])

    return(
        <>
            <canvas className="populationGraph" id="drawGraph">

            </canvas>
            <div className="checkBoxes">
                {
                    prefs.map((name, index) =>{
                        return(
                            <div className="one" key={name.prefCode.toString()}>
                                <label htmlFor={name.prefCode.toString()}>{name.prefName}</label>
                                <input type="checkbox" id={name.prefCode.toString()} onChange={() => showGraph(name.prefCode, name.prefName)} />
                            </div>
                            
                        )

                    })
                }
            </div>
        </>

    )
}