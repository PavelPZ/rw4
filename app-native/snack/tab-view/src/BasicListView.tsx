/* @flow */

import React, { PureComponent } from 'react';
import { ListView, View, Text, StyleSheet, ListViewDataSource } from 'react-native';

export default class ListViewExample extends PureComponent<any> {
  state = {
    data: [],
    dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    } as any),
  };

  componentWillMount() {
    this._genRows();
  }

  _root: any;

  _genRows = () => {
    const data = this.state.data.slice(0);
    const itemsLength = data.length;

    if (itemsLength >= 1000) {
      return;
    }

    for (let i = 0; i < 100; i++) {
      data.push(itemsLength + i);
    }

    this.setState({
      data,
      dataSource: this.state.dataSource.cloneWithRows(data),
    });
  };

  _renderRow = index => {
    return (
      <View style={styles.row}>
        <Text style={styles.text}>
          {index}
        </Text>
      </View>
    );
  };

  scrollTo = (...args: any[]) => this._root.scrollTo(...args);

  render() {
    return (
      <ListView
        {...this.props}
        removeClippedSubviews={false}
        contentContainerStyle={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        onEndReached={this._genRows}
        ref={el => (this._root = el)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  row: {
    margin: 8,
    padding: 16,
    borderRadius: 3,
    backgroundColor: 'rgba(0, 0, 0, .1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'rgba(0, 0, 0, .4)',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
