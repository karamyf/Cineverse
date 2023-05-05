import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { getMovieVideosFromApi } from '../API/TMDBApi';
import { WebView } from 'react-native-webview';

class FilmDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trailerKey: null,
      watchlist: JSON.parse(localStorage.getItem('watchlist')) || [], // get the watchlist from local storage
    };
  }
  

  componentDidMount() {
    getMovieVideosFromApi(this.props.route.params.film.id).then((data) => {
      const trailer = data.results.find(
        (result) => result.type === 'Trailer' && result.site === 'YouTube'
      );
      if (trailer) {
        this.setState({ trailerKey: trailer.key });
      }
    });
  }

  // new function to handle adding movies to the watchlist
  addToWatchlist = (film) => {
    const { watchlist } = this.state;
  
    // check if the movie is already in the watchlist
    const movieExists = watchlist.some((item) => item.id === film.id);
  
    if (!movieExists) {
      // if the movie is not already in the watchlist, add it to the array
      this.setState({ watchlist: [...watchlist, film] }, () => {
        // store the updated watchlist in local storage
        localStorage.setItem('watchlist', JSON.stringify(this.state.watchlist));
        alert('Movie added to watchlist!');
      });
    } else {
      alert('Movie already in watchlist!');
    }
  }
  

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
            onPress={() => this.addToWatchlist(film)} // call the new function when the button is pressed
          >
            <Text style={styles.button_text}>Add to Watchlist</Text>
          </TouchableOpacity>

          

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
});

export default FilmDetails;
