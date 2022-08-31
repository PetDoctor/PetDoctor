import React from 'react';
import { InfoCard, TextContainer } from '../../components/Liststyle';
import { Column } from './ReserveStyle';
import ResModal from '../../components/book/ResModal';
import { IReservation } from '../../apis/reservation/ReserveTypes';
function ReserveCard({ res, idx }: { res: IReservation; idx: number }) {
  return (
    <InfoCard>
      <TextContainer>
        <Column>{idx + 1}</Column>
        <Column>{`${res?.rezDate}/ ${res?.rezHour}시`}</Column>
        <Column>{res?.hpName}</Column>
        <Column>{res?.resName}</Column>
        <Column>
          <ResModal res={res} />
        </Column>
      </TextContainer>
    </InfoCard>
  );
}

export default ReserveCard;
