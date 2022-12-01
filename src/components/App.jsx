import { CheckBoxs } from "./CheckBoxs";
import "./Reset.scss";
import "./App.scss";

export const App = () => {
  const END_POINT = "https://opendata.resas-portal.go.jp";
  const KEY = "sXkAFcfVBW9zVWIINTnMyFZGr9PdXOQ9vdFVFl5K";

  return (
    <>
      <header>
        <h1>人口推移グラフ</h1>
      </header>

      <CheckBoxs END_POINT={END_POINT} API_KEY={KEY} />
    </>
  );
};
