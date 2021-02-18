import React from 'react';
import OptionsButton from './OptionsButton';

export default function SortingButton({children}) {
  return <OptionsButton title="Sortierung" icon="sort" children={children} />;
}
