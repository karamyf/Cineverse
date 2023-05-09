import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { getMovieVideosFromApi,getMovieCreditsFromApi} from '../API/TMDBApi';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';




class FilmDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trailerKey: null,
      watchlist: [],
      actors: [],
    };
  }


  componentDidMount() {
    getMovieVideosFromApi(this.props.route.params.film.id).then((data) => {
      const trailer = data.results.find(
        (result) => result.type === 'Trailer' && result.site === 'YouTube'
      );
      AsyncStorage.getItem('watchlist').then((watchlist) => {
        if (watchlist) {
          this.setState({ watchlist: JSON.parse(watchlist) });
        }
      });
      if (trailer) {
        this.setState({ trailerKey: trailer.key });
      }
    });

    getMovieCreditsFromApi(this.props.route.params.film.id).then((data) => {
      this.setState({ actors: data.cast });
    });
  }


  addToWatchlist = async (film) => {
    const { watchlist } = this.state;

    const movieExists = watchlist.some((item) => item.id === film.id);

    if (!movieExists) {
      await this.setState((prevState) => ({ watchlist: [...prevState.watchlist, film] }));
      await AsyncStorage.setItem('watchlist', JSON.stringify(this.state.watchlist));
      alert('Movie added to watchlist!');
    } else {
      alert('Movie already in watchlist!');
    }
  };






  render() {
    const film = this.props.route.params.film;
    const youtubeUrl = this.state.trailerKey
      ? `https://www.youtube.com/embed/${this.state.trailerKey}`
      : null;

    return (
      <ScrollView style={styles.main_container}>
        {youtubeUrl && (
          <WebView
            style={styles.video}
            source={{ uri: youtubeUrl }}
            allowsFullscreenVideo
          />
        )}
        <View style={styles.details_container}>
          <View style={styles.header_container}>
            <Image style={styles.poster} source={{ uri: `https://image.tmdb.org/t/p/w300${film.poster_path}` }} />
            <View style={styles.title_container}>
              <Text style={styles.title_text}>{film.title}</Text>
              <Text style={styles.date_text}>{`(${new Date(film.release_date).getFullYear()})`}</Text>
              <Text style={styles.vote_text}>{`${film.vote_average}/10`}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <Text style={styles.section_title}>Overview</Text>
          <Text style={styles.description_text}>{film.overview}</Text>

          <TouchableOpacity
            style={styles.button_container}
            onPress={() => this.addToWatchlist(film)}
          >
            <Text style={styles.button_text}>Add to Watchlist</Text>
          </TouchableOpacity>


          <View style={styles.actors_container}>
  <Text style={styles.section_title}>Actors</Text>
  <ScrollView horizontal={true}>
    {this.state.actors.map((actor) => (
      <View key={actor.id} style={styles.actor_container}>
      {actor.profile_path ? (
        <Image
          style={styles.actor_image}
          source={{
            uri: `https://image.tmdb.org/t/p/w185${actor.profile_path}`,
          }}
        />
      ) : (
        <Image
          style={styles.actor_image_placeholder}
          source={{
            uri: `https://cdn2.vectorstock.com/i/1000x1000/08/61/person-gray-photo-placeholder-little-boy-vector-23190861.jpg`,
          }}
        />
      )}
      <Text style={styles.actor_name}>{actor.name}</Text>
    </View>

    ))}
  </ScrollView>
</View>


        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  video: {
    height: 200,
    marginBottom: 10,
  },
  details_container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  header_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  poster: {
    width: 100,
    height: 150,
    marginRight: 20,
    borderRadius: 5,
  },
  title_container: {
    flex: 1,
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
  },
  date_text: {
    fontSize: 18,
    marginBottom: 10,
    color: '#666',
  },
  vote_text: {
    fontSize: 16,
    textAlign: 'right',
    marginBottom: 10,
    color: '#666',
  },
  divider: {
    backgroundColor: '#ccc',
    height: 1,
    width: '100%',
    marginVertical: 20,
  },
  section_title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  description_text: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  button_container: {
    backgroundColor: '#FFC107',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  button_text: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  actors_container: {
    marginTop: 20,
  },
  actor_container: {
    alignItems: 'center',
    marginRight: 15,
  },
  actor_image: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  actor_name: {
    textAlign: 'center',
    marginTop: 5,
  },
});

export default FilmDetails;
