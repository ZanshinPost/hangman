/** In order for logging to stream to XDE or the exp CLI you must import the
  * exponent module at some point in your app */
import Exponent from 'exponent';

import React from 'react';
import {
  AppRegistry,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  FontAwesome,
} from '@exponent/vector-icons';
import { Provider } from 'react-redux'

import cacheAssetsAsync from './utilities/cacheAssetsAsync';

import ActionTypes from './state/ActionTypes';
import * as ActionCreators from './state/ActionCreators';
import * as Game from './Game';
import HomeScreen from './screens/HomeScreen';
import Store from './state/Store';

let store = Store;

class AppContainer extends React.Component {
  state = {
    appIsReady: false,
  }

  componentWillMount() {
    this._loadAssetsAsync();
    Game.createNewGameAsync(Store.dispatch); // TODO: Handle errors
  }

  async _loadAssetsAsync() {
    await cacheAssetsAsync({
      images: [
        require('./assets/images/exponent-wordmark.png'),
      ],
      fonts: [
        FontAwesome.font,
        {
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          // 'VT323': require('./assets/fonts/VT323.ttf'),
          // 'NovaMono': require('./assets/fonts/NovaMono.ttf'),
          // 'DontMixYerDrinks': require('./assets/fonts/dontmix.ttf'),
          // 'Targa': require('./assets/fonts/TargaMSHand.ttf'),
          // 'CafeFrancoise': require('./assets/fonts/cafe-francoise.ttf'),
          // 'Appleberry': require('./assets/fonts/appleberry.ttf'),
          // 'Puddleduck': require('./assets/fonts/Puddleduck.ttf'),
          // 'SkinnyJeansSolid': require('./assets/fonts/SkinnyJeansSolid.ttf'),
          // 'ItsaSketch': require('./assets/fonts/ItsaSketch.ttf'),
          'TopSecret': require('./assets/fonts/Top_Secret.ttf'),

        },

      ],
    });

    this.setState({appIsReady: true});
  }

  render() {
    if (this.state.appIsReady) {
      let { notification } = this.props.exp;

      return (
        <View style={styles.container}>
          <Provider store={Store}>
            <HomeScreen />
          </Provider>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        </View>
      );
    } else {
      return <Exponent.Components.AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

AppRegistry.registerComponent('main', () => AppContainer);
