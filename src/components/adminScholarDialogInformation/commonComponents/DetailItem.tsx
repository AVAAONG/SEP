interface DetailItemProps {
    label: string;
    value: string | number | JSX.Element | null | undefined;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
    <div>
        <label className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor={label.toLowerCase().replace(/ /g, '-')}>
            {label}
        </label>
        <p className="mt-1 text-sm peer-disabled:opacity-100">{value}</p>
    </div>
);

export default DetailItem;