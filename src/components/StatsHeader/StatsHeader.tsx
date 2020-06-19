import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const StatsHeader: React.FC = ({}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>2.4L</Text>
        <Text style={styles.text}>Total Water Drunk</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>15</Text>
        <Text style={styles.text}>Achieved Goal Days</Text>
      </View>
    </View>
  );
};

export default StatsHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    maxWidth: 130,
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 40,
    lineHeight: 48,
    fontWeight: '600',
    color: '#fff',
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 20,
    color: '#fff',
    textTransform: 'uppercase',
  },
});
