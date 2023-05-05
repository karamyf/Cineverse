import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { getMovieVideosFromApi } from '../API/TMDBApi';
import { WebView } from 'react-native-webview';



class FilmDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trailerKey: null,
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
        <Text style={styles.title_text}>{film.title}</Text>
        <Text style={styles.description_text}>{film.overview}</Text>
        <Text style={styles.date_text}>Release date: {film.release_date}</Text>
        <Text style={styles.vote_text}>Rating: {film.vote_average}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    padding: 10,
  },
  video: {
    height: 200,
    marginBottom: 10,
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  description_text: {
    fontStyle: 'italic',
    fontSize: 16,
    marginBottom: 10,
  },
  date_text: {
    fontSize: 14,
    marginBottom: 10,
  },
  vote_text: {
    fontSize: 14,
    textAlign: 'right',
  },
});

export default FilmDetails;
