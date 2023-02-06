import { FC, memo, useMemo } from 'react';
import { /*Countdown, */ zeroPad } from 'react-countdown';
import {
  Unstable_Grid2 as Grid,
  Typography,
  Divider,
  Stack,
} from '@mui/material';
// import { Preloader } from 'common/components';
import { InfoPanelProps, Renderer } from './InfoPanel.types';
import { PaperBox } from './InfoPanel.styles';

const InfoPanelBase: FC<InfoPanelProps> = () => {
  const renderer = ({ hours, minutes, seconds }: Renderer) => (
    <Typography variant="h2" component="span">
      {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
    </Typography>
  );

  return (
    <Grid
      xs={12}
      sx={{
        maxHeight: '130px',
        height: '100%',
      }}
      marginTop="auto"
    >
      <PaperBox>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Grid xs>
            <Typography>Current draw:</Typography>
            <Typography variant="h2" component="span">
              0
            </Typography>
          </Grid>

          <Grid xs>
            <Typography>Current slot:</Typography>
            <Typography variant="h2" component="span">
              0
            </Typography>
          </Grid>

          <Grid xs>
            <Typography>Next draw:</Typography>
            <Typography variant="h2" component="span">
              0
            </Typography>
          </Grid>

          <Grid xs>
            <Typography>Update in:</Typography>
            <Typography variant="h2" component="span">
              0
              {/* <Countdown
                intervalDelay={1}
                precision={3}
                date={endCountdown}
                renderer={renderer}
                key={100}
              /> */}
            </Typography>
          </Grid>
        </Stack>
      </PaperBox>
    </Grid>
  );
};

const InfoPanel = memo(InfoPanelBase);

export default InfoPanel;
