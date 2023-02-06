import { FC } from 'react';
import { withMetadata } from 'common/hoc/withMetadata';
import MainContainer from 'modules/Main/MainContainer';

const Main: FC = () => <MainContainer />;

export default withMetadata({
  title: 'Metame',
  description: 'Main page',
})(Main);
