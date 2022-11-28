import { useEffect, useState } from "react"

export const CheckBoxs = (props) =>{

    const [prefs, setPrefs] = useState([]);
    //グラフ描画処理
    const showGraph = code => {
        alert(code);
    }
    
    //都道府県一覧のチェックボックスを生成する配列を作るための処理
    useEffect(() => {
        console.log("aaa");
        const KEY = "sXkAFcfVBW9zVWIINTnMyFZGr9PdXOQ9vdFVFl5K";
        const headers = new Headers();
        headers.set("X-API-KEY", KEY);
        const URL = `${props.endPoint}/api/v1/prefectures`;

        fetch(URL, {headers: headers}).then(res => {
            return res.json();
        })
        .then(json => {
            setPrefs(json.result);
        });

    }, [])

    return(
        <div className="checkBoxes">
            {
                prefs.map((name, index) =>{
                    return(
                        <div className="one" key={name.prefCode.toString()}>
                            <label htmlFor={name.prefCode.toString()}>{name.prefName}</label>
                            <input type="checkbox" id={name.prefCode.toString()} onChange={() => showGraph(name.prefCode)} />
                        </div>
                        
                    )

                })
            }
        </div>
    )
}