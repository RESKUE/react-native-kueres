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
import SearchContext from './SearchContext';

export default function OptionsButton({testID, icon, title, children}) {
  const searchContext = React.useContext(SearchContext);
  const [visible, setVisible] = React.useState(false);
  const {colors} = useTheme();
  const childrenWithSeparators = buildChildrenWithSeparators(children);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <>
      <IconButton
        testID={testID}
        icon={icon}
        color={colors.primary}
        onPress={show}
      />
      <Portal>
        <SearchContext.Provider value={searchContext}>
          <Dialog visible={visible} onDismiss={hide}>
            <Dialog.Title>{title}</Dialog.Title>
            <Divider />
            {childrenWithSeparators}
            <Dialog.Actions>
              <Button onPress={hide}>Schließen</Button>
            </Dialog.Actions>
          </Dialog>
        </SearchContext.Provider>
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
