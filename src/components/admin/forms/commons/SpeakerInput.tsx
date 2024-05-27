import { getSpeakersForInput } from '@/lib/db/utils/speaker';
import chatCreationFormSchema from '@/lib/schemas/chatCreationFormSchema';
import workshopCreationFormSchema from '@/lib/schemas/workshopCreationFormSchema';
import { Input } from '@nextui-org/input';
import React, { useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { default as Combobox, StylesConfig } from 'react-select';
import { z } from 'zod';

interface SpeakerInputProps {
  control:
    | Control<z.infer<typeof workshopCreationFormSchema>>
    | Control<z.infer<typeof chatCreationFormSchema>>;
  kind: 'workshop' | 'chat';
  defaultSpeakerId?: string;
}

type OptionsForCombobox = {
  value: string;
  label: string;
  email: string | null;
  isFixed: boolean;
};

const SpeakerInput: React.FC<SpeakerInputProps> = ({ control, kind, defaultSpeakerId }) => {
  const [comboboxOptions, setComboboxOptions] = useState<OptionsForCombobox[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSpeakers = async () => {
      setIsLoading(true); // Set loading state
      const speakers = await getSpeakersForInput(kind);

      if (speakers) {
        const options = speakers.map((speaker) => ({
          value: speaker.id,
          label: `${speaker.first_names} ${speaker.last_names}`,
          email: speaker.email,
          isFixed: speaker.id === defaultSpeakerId,
        }));
        setComboboxOptions(options);
      }
      setIsLoading(false); // Clear loading state
    };

    fetchSpeakers();
  }, []); // Empty dependency array ensures this runs once on mount

  const styles: StylesConfig<OptionsForCombobox, true> = {
    multiValue: (base, state) => {
      return state.data.isFixed ? { ...base, backgroundColor: 'gray' } : base;
    },
    multiValueLabel: (base, state) => {
      return state.data.isFixed
        ? { ...base, fontWeight: 'bold', color: 'white', paddingRight: 6 }
        : base;
    },
    multiValueRemove: (base, state) => {
      return state.data.isFixed ? { ...base, display: 'none' } : base;
    },
  };

  if (isLoading)
    return <Input isDisabled placeholder="🔃 Cargando facilitadores" className="animate-pulse" />;

  return (
    <div>
      <span className="text-sm">Facilitador(es)</span>
      <Controller
        name="speakers"
        control={control}
        rules={{ required: true }}
        render={({ field }) => {
          return (
            <Combobox
              // defaultValue={}
              isMulti
              defaultValue={
                defaultSpeakerId
                  ? comboboxOptions.find((option) => option.value === defaultSpeakerId)
                  : undefined
              }
              {...field}
              required={true}
              isClearable={false}
              className="!rounded-lg z-50 py-2"
              options={comboboxOptions}
              placeholder="Selecciona los facilitadores"
              styles={{
                control: (baseStyles: object, _state: object) => ({
                  ...baseStyles,
                  padding: '1px 5px', // Increase vertical padding
                  borderRadius: '10px', // Set rounded corners
                  borderColor: 'transparent', // Set border color as transparent
                  outline: 'none', // Remove outline
                  boxShadow: 'none', // Remove boxShadow (ring)
                  '&:hover': {
                    backgroundColor: 'dark' ? 'gray-900' : '#f3f4f6',
                  },
                  '&:focus': {
                    outline: 'none', // Remove outline on focus
                  },
                  '&:active': {
                    outline: 'none', // Remove outline on active
                  },
                }),
                ...styles,
              }}
            />
          );
        }}
      />
    </div>
  );
};

export default SpeakerInput;
