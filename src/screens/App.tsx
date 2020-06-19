import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {MenuType} from '../constant/MenuType';
import HumanGraphic from '../components/HumanGraphic/HumanGraphic';
import StatsHeader from '../components/StatsHeader/StatsHeader';
import SwipeMenu from '../components/SwipeMenu/SwipeMenu';
import UpdateButtons from '../components/UpdateButtons/UpdateButtons';

const initialState = () => ({
  currentIndex: 1,
  waterQuantities: [
    {
      id: 0,
      metric: 'ml',
      quantity: 150,
    },
    {
      id: 1,
      metric: 'ml',
      quantity: 250,
    },
    {
      id: 2,
      metric: 'ml',
      quantity: 350,
    },
  ],
});

type State = ReturnType<typeof initialState>;

const STORAGE_KEY = '@save_water_index';

export default class App extends React.Component<State> {
  readonly state: State = initialState();

  componentDidMount(): void {
    this.retrieveAsyncStorage();
  }

  retrieveAsyncStorage = async () => {
    try {
      const waterQuantityIndex = await AsyncStorage.getItem(STORAGE_KEY);

      if (waterQuantityIndex !== null) {
        this.setState({waterQuantityIndex});
      }
    } catch (e) {
      Error('Failed to fetch the data from storage');
    }
  };

  saveToAsyncStorage = async () => {
    const {currentIndex} = this.state;

    try {
      await AsyncStorage.setItem(STORAGE_KEY, currentIndex.toString());
    } catch (e) {
      Error(e);
    }
  };

  _onDecreaseWaterQuantity = () => {
    const {currentIndex} = this.state;

    if (currentIndex !== 0) {
      this.setState({currentIndex: currentIndex - 1});
      this.saveToAsyncStorage();
    }
  };

  _onIncreaseWaterQuantity = () => {
    const {currentIndex, waterQuantities} = this.state;

    if (currentIndex < waterQuantities.length - 1) {
      this.setState({currentIndex: currentIndex + 1});
      this.saveToAsyncStorage();
    }
  };

  _updateCurrentIndex = (index: number) => {
    this.setState({currentIndex: index});
    this.saveToAsyncStorage();
  };

  get formattedMenuItems(): MenuType[] {
    // Transform the data into something more generic so we can re-use the SwipeMenu component

    const {waterQuantities} = this.state;

    return waterQuantities.map((item) => {
      const formattedMenuItem = `${item.quantity} ${item.metric.toString()}`;

      return {
        id: item.id,
        title: formattedMenuItem,
      };
    });
  }

  render() {
    const {currentIndex, waterQuantities} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <StatsHeader />
        </View>
        <HumanGraphic
          animationIndex={currentIndex}
          totalQuantities={waterQuantities.length}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Nice work! Keep it up!</Text>
        </View>
        <View style={styles.footer}>
          <SwipeMenu
            parentIndex={currentIndex}
            indexCallback={this._updateCurrentIndex}
            menuItems={this.formattedMenuItems}
          />

          <View style={styles.buttons}>
            <UpdateButtons
              decreaseValue={this._onDecreaseWaterQuantity}
              increaseValue={this._onIncreaseWaterQuantity}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 60,
    backgroundColor: '#53bfef',
  },
  header: {
    paddingHorizontal: 25,
    marginBottom: 50,
  },
  footer: {
    marginTop: 'auto',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 28,
    paddingHorizontal: 25,
  },
  text: {
    maxWidth: 120,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '500',
    textAlign: 'center',
    color: '#fff',
  },
  buttons: {
    marginTop: 24,
  },
});
