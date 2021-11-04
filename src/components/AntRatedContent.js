import React from 'react';
import { Content } from 'antd/lib/layout/layout';

import { GenresListConsumer } from './GenresListContext';
import AntCard from './AntCard';

const AntRatedContent = ({ rateList }) => (
  <Content>
    <GenresListConsumer>
      {(genresList) => {
        return rateList.map((item) => {
          const { id } = item;
          return <AntCard item={item} key={id} genresList={genresList} />;
        });
      }}
    </GenresListConsumer>
  </Content>
);
export default AntRatedContent;
