import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "@nextui-org/tooltip";
import { COLORS } from "./chartConstants";

interface LegendProps {
  data: Array<{ label: string; value: number }>;
}

const Legend: React.FC<LegendProps> = ({ data }) => {
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
            {data.map((item, index) => (
              <div key={index} className='flex items-center gap-2' >
                <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: COLORS[index] }}></div>
                <p>{item.label}</p>
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