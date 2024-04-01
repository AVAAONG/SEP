import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "@nextui-org/tooltip";
import { COLORS } from "./chartConstants";

interface LegendProps {
  data: Array<{ label: string; value: number, color?: string }>;
}

const Legend: React.FC<LegendProps> = ({ data }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  const getPercentage = (value: number) => ((value / total) * 100).toFixed(2);
  return (
    <Tooltip
      classNames={{
        content: 'rounded-lg'
      }}
      placement="right-end"
      content={
        <div className='flex flex-col gap-3 p-4'>
          <h4 className='font-semibold truncate'>Leyenda</h4>
          <div className="flex flex-col gap-2">
            {data.map((item, index,) => (
              <div key={index} className='grid grid-cols-3 gap-2 divide-x-2 items-center justify-center' >
                <div className='flex items-center gap-2'>
                  <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color ? item.color : COLORS[index] }}></div>
                  <p>{item.label}</p>
                </div>
                <div className="flex gap-2 w-full px-2">
                  <p className="font-semibold truncate">Total</p>
                  <p>{item.value}</p>
                </div>
                <div className="flex gap-2 w-full px-2">
                  <p className="font-semibold truncate"></p>
                  <p>{getPercentage(item.value)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      }>
      <InformationCircleIcon className='h-5 w-5 cursor-pointer' />
    </Tooltip>
  );
};

export default Legend;