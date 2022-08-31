import React, { useEffect, useState } from 'react';
import { InfoCard, TextContainer } from '../../components/Liststyle';
import { Column } from '../user-reserv/ReserveStyle';
import ResModal from '../../components/book/ResModal';
import { IInfoArrRes } from './HospitalReserve';

function ReserveCard({ res }: any) {
  return (
    <InfoCard>
      <TextContainer>
        <Column>{res?.email}</Column>
        <Column>{`${res?.rezDate}/ ${res?.rezHour}시`}</Column>
        <Column>{res?.name}</Column>
        <Column>
          <ResModal res={res} />
        </Column>
      </TextContainer>
    </InfoCard>
  );
}

export default ReserveCard;
