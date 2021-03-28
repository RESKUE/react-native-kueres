import React from 'react';
import OptionsButton from './OptionsButton';

export default function SortingButton({testID, children}) {
  return (
    <OptionsButton
      testID={testID}
      title="Sortierung"
      icon="sort"
      children={children}
    />
  );
}
