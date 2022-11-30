import { CheckBoxs } from "./CheckBoxs";

export const App = () => {
  const END_POINT = "https://opendata.resas-portal.go.jp";
  const KEY = "sXkAFcfVBW9zVWIINTnMyFZGr9PdXOQ9vdFVFl5K";

  return (
    <>
      <h1>人口推移グラフ</h1>
      <CheckBoxs END_POINT={END_POINT} API_KEY={KEY}/>
    </>
  );
}
