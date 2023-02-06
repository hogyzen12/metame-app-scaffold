import { FC, memo, useState, useCallback, useMemo, ChangeEvent } from 'react';
import { Unstable_Grid2 as Grid, Divider, Stack } from '@mui/material';

import { ResultsSubmit } from 'modules/Main/components';
import { PredictionPanelProps } from './PredictionPanel.types';
import { PaperBox } from './PredictionPanel.styles';

const PredictionPanelBase: FC<PredictionPanelProps> = () => {
  return (
    <Grid xs={12} lg={4}>
      <PaperBox>
        <ResultsSubmit />
      </PaperBox>
    </Grid>
  );
};

const PredictionPanel = memo(PredictionPanelBase);

export default PredictionPanel;
