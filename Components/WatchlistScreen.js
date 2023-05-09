import React from 'react';
import { View, Text, StyleSheet, Image, FlatList,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class WatchlistScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      watchlist: [],
    };
  }

  async componentDidMount() {
    const watchlist = await AsyncStorage.getItem('watchlist');
    this.setState({ watchlist: JSON.parse(watchlist) || [] });
  }

  renderWatchlistItem = ({ item }) => (
    <View style={styles.watchlist_item}>
      <Image
        style={styles.watchlist_poster}
        source={{ uri: `https://image.tmdb.org/t/p/w300${item.poster_path}` }}
      />
      <Text style={styles.watchlist_item_title}>{item.title}</Text>
      <TouchableOpacity onPress={() => this.removeFromWatchlist(item.id)}>
        <Text style={styles.delete_button}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  
  removeFromWatchlist = async (movieId) => {
    const { watchlist } = this.state;
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieId);
    await AsyncStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    this.setState({ watchlist: updatedWatchlist });
  };
  
  render() {
    const { watchlist } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Watchlist</Text>
        {watchlist.length > 0 ? (
          <FlatList
            data={watchlist}
            renderItem={this.renderWatchlistItem}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <Text style={styles.empty}>Watchlist is empty</Text>
        )}
      </View>
    );
  }
}


const styles = StyleSheet.create({

  delete_button: {
    backgroundColor: '#ffc107',
    color: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
    fontSize: 16,
    marginLeft: 10
  },
  
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  watchlist_item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  watchlist_poster: {
    width: 50,
    height: 75,
    marginRight: 10,
    borderRadius: 5,
  },
  watchlist_item_title: {
    flex: 1,
    fontSize: 16,
  },
  empty: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
  },
});
