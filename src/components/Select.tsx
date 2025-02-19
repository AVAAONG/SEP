'use client';
import { Select, SelectItem } from "@heroui/select";

interface SelectProps {
  label: string;
  items: { label: string; value: string }[];
}

const SelectComponent: React.FC<SelectProps> = ({ items, label }) => {
  return (
    <Select label={label} isRequired>
      {items.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default SelectComponent;
