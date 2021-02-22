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
  const childrenWithSeparators = buildChildrenWithSeparators(children);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

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
  return React.Children.map(children, (child, index) => {
    return (
      <>
        <Dialog.Content style={styles.content} key={`option-${index}`}>
          {child}
        </Dialog.Content>
        <Divider key={`divider-${index}`} />
      </>
    );
  });
}
