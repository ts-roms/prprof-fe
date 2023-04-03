
import trash from '../../assets/trash.svg'
import back from '../../assets/back.svg';
import { History } from '../model';

interface HistoryProps {
  history: History[];
  clearHistory: () => void;
  toggleHistory: () => void;
}

const HistoryPage: React.FC<HistoryProps> = ({
  history,
  clearHistory,
  toggleHistory
}) => {
  console.log('histoyr', history);
  return (
    <div className="w-[347px]">
      <h2 className="text-3xl my-5">History</h2>
      <div className="flex items-center justify-between -mt-11 mb-5 mx-4">
        <img onClick={toggleHistory} className="cursor-pointer invert w-5 h-5 scale-[1.7]" src={back} alt={'back'} />
        <img onClick={clearHistory} className="cursor-pointer" src={trash} alt={'clear-history'} />
      </div>
      {
        history && history.length > 0 ?
          (<div className="h-[574px] overflow-auto rounded-2xl scrollbar-hide">
            <ul>
              {
                history.map((item, key) => (
                  <li key={key} className="bg-[#5B5E67] items-center text-left px-4 py-4 border-b-2 border-[#3B3D43]">
                    <p>{item.formula}</p>
                    <p>= {item.result}</p>
                  </li>
                ))
              }
            </ul>

          </div>) :
          (
            <div className="bg-[#3B3D43] rounded-xl px-4 py-14 cursor-pointer text-xl leading-6">
              <p>Empty!</p>
              <span>Do some calculations/</span>
            </div>
          )
      }
    </div>
  )
}

export default HistoryPage;