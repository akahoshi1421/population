import { CheckBoxs } from "./CheckBoxs";

export const App = () => {
  const END_POINT = "https://opendata.resas-portal.go.jp";

  return (
    <>
      <h1>人口推移グラフ</h1>
      <div className="populationGraph">

      </div>
      <CheckBoxs endPoint={END_POINT}/>
    </>
  );
}
