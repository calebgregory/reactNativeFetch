import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BASE_URL = 'http://localhost:3030';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { data: '', error: '', contentType: '' };
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getData()
  }

  getData() {
    fetch(`${BASE_URL}/api/binary`)
      .then((res) => {
        this.setState({ contentType: res.headers.map['content-type'] });
        return res.text()
      })
      .then((res) => {
        console.log('res received from api', res);
        this.setState({ data: res });
      })
      .catch((error) => {
        console.log('Error fetching from api', error);
        this.setState({ error });
      });
  }

  render() {
    const { data, error, contentType } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Content-Type: {contentType}
        </Text>
        <Text style={styles.text}>
          Data: {data}
        </Text>
        <Text style={styles.text}>
          Error: {error}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
