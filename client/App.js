import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import messager from './request';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { response: '', caller: '', error: '', request: { caller: '', text: '' } };
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getData()
  }

  getData() {
    messager.sendMsg({ caller: 'react-native', text: 'YESSSSSSSSSSS' }, (error, resp) => {
      console.log(`\n\n ** calll made to api ** \n\n error ${error} \n resp ${JSON.stringify(resp, null, 2)}`);
      if (error) {
        this.setState({ error });
        return;
      }

      this.setState({
        caller   : resp.caller,
        response : resp.response,
        request  : resp.request
      });
    })
  }

  render() {
    const { response, caller, error, request } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Request Caller: {request.caller}
        </Text>
        <Text style={styles.text}>
          Request Text: {request.text}
        </Text>
        <Text style={styles.text}>
          Response text: {response}
        </Text>
        <Text style={styles.text}>
          Response caller: {caller}
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
