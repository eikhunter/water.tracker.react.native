import React from 'react';
import {MenuType} from '../../constant/MenuType';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

interface Props {
  indexCallback: (index: number) => void;
  menuItems: MenuType[];
  parentIndex?: number;
}

const initialState = () => ({
  menuIndex: 0,
});

type State = ReturnType<typeof initialState>;

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SCREEN_WIDTH / 4; // I'd Turn this into a prop something like amount of menu items on screen
const SPACING_WIDTH = 20; // I'd also Turn this into a prop
const INCREMENT_WIDTH = ITEM_WIDTH + SPACING_WIDTH * 2;

class SwipeMenu extends React.Component<Props> {
  readonly state: State = initialState();
  scrollRef: any;

  componentDidMount(): void {
    const {menuIndex} = this.state;
    const {parentIndex} = this.props;

    if (parentIndex !== undefined && parentIndex !== menuIndex) {
      setTimeout(() => {
        this.scrollToIndex(parentIndex, false);
      }, 0);
    }
  }

  componentDidUpdate(): void {
    const {menuIndex} = this.state;
    const {parentIndex} = this.props;

    if (parentIndex !== undefined && parentIndex !== menuIndex) {
      this.scrollToIndex(parentIndex, true);
    }
  }

  onEndScroll = async (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ): Promise<void> => {
    const {indexCallback} = this.props;
    const scrollPos = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPos / INCREMENT_WIDTH);

    indexCallback(index);
    this.setState({menuIndex: index});
  };

  scrollToIndex = (index: number, animate: boolean) => {
    const {menuItems} = this.props;

    if (index >= 0 && index < menuItems.length) {
      const scrollVal = INCREMENT_WIDTH * index;
      this.scrollRef.scrollTo({animated: animate, x: scrollVal});
      this.setState({menuIndex: index});
    }
  };

  render() {
    const {menuItems} = this.props;

    return (
      <View style={styles.container}>
        <ScrollView
          ref={(ref) => (this.scrollRef = ref)}
          bounces={false}
          contentContainerStyle={styles.scrollView}
          decelerationRate={0}
          horizontal={true}
          onMomentumScrollEnd={this.onEndScroll}
          pagingEnabled={true}
          snapToInterval={INCREMENT_WIDTH}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.menuItems}>
            {menuItems.map((item) => (
              <Text style={styles.item} key={item.id}>
                {item.title}
              </Text>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
};

export default SwipeMenu;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  scrollView: {
    overflow: 'hidden',
  },
  menuItems: {
    paddingHorizontal: SCREEN_WIDTH / 2 - ITEM_WIDTH / 2 - SPACING_WIDTH,
    position: 'relative',
    flexDirection: 'row',
  },
  item: {
    width: ITEM_WIDTH,
    marginHorizontal: SPACING_WIDTH,
    fontSize: 26,
    textAlign: 'center',
    lineHeight: 32,
    fontWeight: '600',
    color: '#fff',
  },
});
