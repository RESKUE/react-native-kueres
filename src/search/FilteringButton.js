import React from 'react';
import OptionsButton from './OptionsButton';

export default function FilteringButton({children}) {
  return (
    <OptionsButton
      title="Filterung"
      icon="filter-variant"
      children={children}
    />
  );
}
