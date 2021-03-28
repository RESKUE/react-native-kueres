import React from 'react';
import OptionsButton from './OptionsButton';

export default function FilteringButton({testID, children}) {
  return (
    <OptionsButton
      testID={testID}
      title="Filterung"
      icon="filter-variant"
      children={children}
    />
  );
}
