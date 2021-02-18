import React from 'react';
import {StyleSheet} from 'react-native';
import {
  useTheme,
  IconButton,
  Portal,
  Dialog,
  Button,
  Divider,
} from 'react-native-paper';

export default function OptionsButton({icon, title, children}) {
  const [visible, setVisible] = React.useState(false);
  const {colors} = useTheme();

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const childrenWithSeparators = buildChildrenWithSeparators(children);

  return (
    <>
      <IconButton icon={icon} color={colors.primary} onPress={show} />
      <Portal>
        <Dialog visible={visible} onDismiss={hide}>
          <Dialog.Title>{title}</Dialog.Title>
          <Divider />
          {childrenWithSeparators}
          <Dialog.Actions>
            <Button onPress={hide}>Schließen</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 16,
    paddingBottom: 16,
  },
});

function buildChildrenWithSeparators(children) {
  const childernWithSeparators = [];
  for (let index = 0; index < children.length; index++) {
    childernWithSeparators.push(
      <Dialog.Content style={styles.content} key={`option-${index}`}>
        {children[index]}
      </Dialog.Content>,
    );
    childernWithSeparators.push(<Divider key={`divider-${index}`} />);
  }
  return childernWithSeparators;
}
