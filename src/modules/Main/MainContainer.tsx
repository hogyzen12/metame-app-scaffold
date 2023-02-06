import { FC } from 'react';
import { Unstable_Grid2 as Grid } from '@mui/material';
import { InfoPanel, PredictionPanel } from 'modules/Main/components';
import { MainContainerProps } from 'modules/Main/MainContainer.types';

const MainContainer: FC<MainContainerProps> = () => {
  return (
    <Grid container spacing={1} alignItems="center" justifyContent="center">
      <InfoPanel />
      <PredictionPanel />
    </Grid>
  );
};

export default MainContainer;
