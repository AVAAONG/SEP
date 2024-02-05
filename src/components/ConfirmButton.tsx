'use client';
import { Workshop } from '@prisma/client';
import React, { useMemo, useState } from 'react';
interface Props {
  scholarId: number;
  data: any[];
}

const AddWorkshopButton: React.FC<Props> = ({ scholarId, data }) => {
  const [showWorkshops, setShowWorkshops] = useState(false);
  const [workshops] = useState<Workshop[]>(data);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWorkshops = useMemo(() => {
    return workshops.filter((workshop) =>
      workshop.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [workshops, searchQuery]);

  const handleAddWorkshop = async () => {
    if (!selectedWorkshop) return;
    const confirm = window.confirm(
      `Are you sure you want to add ${selectedWorkshop.title} to this scholar?`
    );
    if (confirm) {
      setSelectedWorkshop(null);
      setShowWorkshops(false);
    }
  };

  const handleSelectWorkshop = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
  };

  const handleShowWorkshops = async () => {
    setShowWorkshops(true);
  };

  return (
    <>
      <button onClick={handleShowWorkshops}>Agregar Taller</button>
      {showWorkshops && (
        <div>
          <input
            type="text"
            placeholder="Search workshops"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <ul>
            {filteredWorkshops.map((workshop) => (
              <li key={workshop.id} onClick={() => handleSelectWorkshop(workshop)}>
                {workshop.title}
              </li>
            ))}
          </ul>
          {selectedWorkshop && (
            <button onClick={handleAddWorkshop}>Add {selectedWorkshop.title} to scholar</button>
          )}
        </div>
      )}
    </>
  );
};

export default AddWorkshopButton;
