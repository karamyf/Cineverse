import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { getImageFromApi } from '../API/TMDBApi'

class FilmItem extends React.Component {
  render() {
    const film = this.props.film
    const nav = this.props.navigation
    return (
        <TouchableOpacity onPress={() => nav.navigate('FilmDetail', { film : film })} style={styles.main_container}>
          <Image
              style={styles.image}
              source={{ uri: getImageFromApi(film.poster_path) }}
          />
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={styles.title_text}>{film.title}</Text>
              <View style={styles.rating_container}>
                <AntDesign name="star" size={14} color="#F5C518" />
                <Text style={styles.vote_text}>{film.vote_average.toFixed(1)}</Text>
              </View>
            </View>
            <View style={styles.description_container}>
              <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
            </View>
            <View style={styles.date_container}>
              <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
            </View>
          </View>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  content_container: {
    flex: 1,
    margin: 5,
  },
  header_container: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
    color: '#1D3557',
  },
  rating_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1D3557',
    marginLeft: 5,
  },
  description_container: {
    flex: 7,
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    lineHeight: 18,
  },
  date_container: {
    flex: 1,
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14,
    color: '#1D3557',
  },
})

export default FilmItem
