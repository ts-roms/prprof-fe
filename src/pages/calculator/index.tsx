
/**
 * COLOR:
 * FONT: #FFFFFF
 * OPERATOR: #3764B4
 * TOP: #5B5E67 / active-history: #5B5E67
 * NUMBER: #3B3D43
 * EMPTY HISTORY: #3B3D43
 */

import { useEffect, useState } from "react";
import HistoryPage from "./history";
import historySrc from '../../assets/history.svg';
import backspaceSrc from '../../assets/backspace.svg';
import { clearHistory, getHistory, saveHistory } from "../../services/api";
import { History } from "../model";

interface CalculatorProps { }

const Calculator: React.FC<CalculatorProps> = () => {

  const [value, setValue] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<History[]>([]);
  const [toggleHistory, setToggleHistory] = useState<boolean>(false);

  useEffect(() => {
    if ((typeof value === 'string' && value.length > 0) &&
      (typeof result === 'string' && result.length > 0)) {
      saveHistory({ formula: value, result: result });
    }

    fetchHistory();
  }, [result])

  const fetchHistory = async () => {
    const data = await getHistory();
    setHistory(data);
  };

  const handleButtonPress = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btnValue = e.currentTarget.value;
    switch (btnValue) {
      case '=':
        try {
          const res = eval(value);
          setResult(res.toString());
        } catch (error) {
          setResult('Error');
        }
        break;
      case '+/-':
        setValue((prevInput) =>
          prevInput.startsWith("-") ? prevInput.slice(1) : "-" + prevInput
        );
        break;
      case '%':
        setValue((prevInput) => (parseFloat(prevInput) / 100).toString());
        break;
      case 'AC':
        setValue('');
        setResult('');
        break;
      default:
        setValue((prevInput) => prevInput + btnValue);
    }
  }

  const handleNumPress = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currValue = e.currentTarget.value;
    setValue((prevInput) => prevInput + currValue);
  }

  const handleClearHistory = () => {
    clearHistory().then(() => fetchHistory())
  }

  const handleHistory = () => {
    fetchHistory().then(() => {
      setToggleHistory((prev) => !prev);
    });
  }

  const handleBackspace = () => {
    setValue((value) => value.slice(0, value.length - 1));
  }

  const CalculatorPanel = () => {

    return (<>
      <div className="h-48 items-center text-right">
        {
          result ? (
            <>
              <p className="text-[#5B5E67] text-[35px] h-[53px]">{value}</p>
              <p className="text-[89px]">{result}</p>
            </>
          ) :
            (
              <>
                <p className="text-[#5B5E67] text-[35px] h-[53px]"></p>
                <p className="text-[89px]">{value}</p>
              </>
            )
        }

      </div>
      <div className="pt-5">
        <div>
          <button className="bg-[#5B5E67] h-[95px] w-[95px] mx-[2px] my-[2px] hover:bg-[#3B3D43]" value="AC" onClick={handleButtonPress}>
            <span className="text-[45px]">AC</span>
          </button>
          <button className="bg-[#5B5E67] h-[95px] w-[95px] mx-[2px] my-[2px] hover:bg-[#3B3D43]" value="+/-" onClick={handleButtonPress}>
            <span className="text-[45px]">+/-</span>
          </button>
          <button className="bg-[#5B5E67] h-[95px] w-[95px] mx-[2px] my-[2px] hover:bg-[#3B3D43]" value="%" onClick={handleButtonPress}>
            <span className="text-[45px]">%</span>
          </button>
          <button className="bg-[#3764B4] h-[95px] w-[95px] mx-[2px] my-[2px] hover:bg-[#5e88d3]" value="/" onClick={handleButtonPress}>
            <span className="text-[45px]">&#x00F7;</span>
          </button>
        </div>
        <div>
          <button className="bg-[#3B3D43] h-[95px] w-[95px] mx-[2px] my-[2px] hover:bg-[#5B5E67]" value="7" onClick={handleNumPress}>
            <span className="text-[45px]">7</span>
          </button>
          <button className="bg-[#3B3D43] h-[95px] w-[95px] mx-[2px] my-[2px] hover:bg-[#5B5E67]" value="8" onClick={handleNumPress}>
            <span className="text-[45px]">8</span>
          </button>
          <button className="bg-[#3B3D43] h-[95px] w-[95px] mx-[2px] my-[2px] hover:bg-[#5B5E67]" value="9" onClick={handleNumPress}>
            <span className="text-[45px]">9</span>
          </button>
          <button className="bg-[#3764B4] h-[95px] w-[95px] mx-[2px] my-[2px] hover:bg-[#5e88d3]" value="*" onClick={handleButtonPress}>
            <span className="text-[45px]">x</span>
          </button>
        </div>
        <div>
          <button className="bg-[#3B3D43] h-[95px] w-[95px] mx-[2px] my-[2px] hover:bg-[#5B5E67]" value="4" onClick={handleNumPress}>
            <span className="text-[45px]">4</span>
          </button>
          <button className="bg-[#3B3D43] h-[95px] w-[95px] mx-[2px] my-[2px] hover:bg-[#5B5E67]" value="5" onClick={handleNumPress}>
            <span className="text-[45px]">5</span>
          </button>
          <button className="bg-[#3B3D43] h-[95px] w-[95px] mx-[2px] my-[2px] hover:bg-[#5B5E67]" value="6" onClick={handleNumPress}>
            <span className="text-[45px]">6</span>
          </button>
          <button className="bg-[#3764B4] h-[95px] w-[95px] mx-[2px] my-[2px] hover:bg-[#5e88d3]" value="-" onClick={handleButtonPress}>
            <span className="text-[45px]">-</span>
          </button>
        </div>
        <div>
          <button className="bg-[#3B3D43] h-[95px] w-[95px] mx-[2px] my-[2px] hover:bg-[#5B5E67]" value="1" onClick={handleNumPress}>
            <span className="text-[45px]">1</span>
          </button>
          <button className="bg-[#3B3D43] h-[95px] w-[95px] mx-[2px] my-[2px] hover:bg-[#5B5E67]" value="2" onClick={handleNumPress}>
            <span className="text-[45px]">2</span>
          </button>
          <button className="bg-[#3B3D43] h-[95px] w-[95px] mx-[2px] my-[2px] hover:bg-[#5B5E67]" value="3" onClick={handleNumPress}>
            <span className="text-[45px]">3</span>
          </button>
          <button className="bg-[#3764B4] h-[95px] w-[95px] mx-[2px] my-[2px] hover:bg-[#5e88d3]" value="+" onClick={handleButtonPress}>
            <span className="text-[45px]">+</span>
          </button>
        </div>
        <div className="items-center flex">
          <button className="bg-[#3B3D43] h-[95px] w-[95px] mx-[2px] my-[2px] hover:bg-[#5B5E67]" value="." onClick={handleButtonPress}>
            <span className="text-[45px]">.</span>
          </button>
          <button className="bg-[#3B3D43] h-[95px] w-[95px] mx-[2px] my-[2px] hover:bg-[#5B5E67]" value="0" onClick={handleNumPress}>
            <span className="text-[45px]">0</span>
          </button>
          <button className="bg-[#3B3D43] h-[95px] w-[95px] mx-[2px] my-[2px]" onClick={handleHistory}>
            <img src={historySrc} alt={'history'} className="w-full h-auto invert" />
          </button>
          <button className="bg-[#3764B4] h-[95px] w-[95px] mx-[2px] my-[2px] hover:bg-[#5e88d3]" value="=" onClick={handleButtonPress}>
            <span className="text-[45px]">=</span>
          </button>
        </div>
      </div>
      <div className="items-center flex">
        <button className="w-full bg-[#be731d] hover:bg-[#5B5E67]" onClick={handleBackspace}>
          <img src={backspaceSrc} alt={'backspace'}  className=" m-auto  h-[95px] invert"/>
        </button>
      </div>
    </>)
  }


  return (
    <div>
      {
        !toggleHistory ?
          (<CalculatorPanel />) :
          (<HistoryPage history={history} clearHistory={handleClearHistory} toggleHistory={handleHistory} />)
      }
    </div>
  )
}

export default Calculator;