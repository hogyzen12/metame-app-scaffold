import { FC } from 'react';
import { Box, Typography } from '@mui/material';

export interface Payout {
  game: number;
  counter: number;
  multi: number;
}

interface TabPanelProps {
  selectedIdx: number;
  tabIdx: number;
  description: string;
}

const TabPanel: FC<TabPanelProps> = ({ selectedIdx, tabIdx, description }) => {
  return (
    <Box
      role="tabpanel"
      hidden={selectedIdx !== tabIdx}
      id={`simple-tabpanel-${tabIdx}`}
      aria-labelledby={`simple-tab-${tabIdx}`}
      sx={{ minHeight: '336px' }}
    >
      {selectedIdx === tabIdx && (
        <Box sx={{ p: 3 }}>
          <Typography>{description}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default TabPanel;
