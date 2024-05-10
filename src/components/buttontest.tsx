'use client';
import { acquireToken } from '@/lib/azure/auth';
import { Button } from '@nextui-org/react';

const BUttonTest = () => {
  return <Button onPress={async () => await acquireToken()}> cLICK </Button>;
};

export default BUttonTest;
