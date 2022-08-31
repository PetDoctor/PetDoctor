import React from 'react';
import { Container, InfoInput, InputLabel } from '../InfoForm';

interface TBookProps {
  label: string;
  defaultValue: string | number;
  name: string;
}

const ReservationContent = ({ label, defaultValue, name }: TBookProps) => {
  return (
    <Container>
      <InputLabel>{label}</InputLabel>
      <InfoInput defaultValue={defaultValue} disabled />
    </Container>
  );
};

export default ReservationContent;
