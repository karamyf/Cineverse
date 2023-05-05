import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText, getTrendingFilmsFromApi } from '../API/TMDBApi'


class Search extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      films: [],
      searchedText: "",
      page: 1,
      totalPages: 0,
      isLoading: false,
    }
  }

  componentDidMount() {
    this.fetch_movie()
  }

  fetch_movie = () => {
    if (this.state.searchedText.length > 0) {
      this.setState({ isLoading: true });
      getFilmsFromApiWithSearchedText(this.state.searchedText, this.state.page).then(data => {
        this.setState(prevState => ({
          films: prevState.page === 1 ? data.results : [...prevState.films, ...data.results],
          page: data.page + 1,
          totalPages: data.total_pages,
          isLoading: false,
        }))
      })
    } else {
      // fetch trending movies
      this.setState({ isLoading: true });
      getTrendingFilmsFromApi(this.state.page).then(data => {
        this.setState(prevState => ({
          films: prevState.page === 1 ? data.results : [...prevState.films, ...data.results],
          page: data.page + 1,
          totalPages: data.total_pages,
          isLoading: false,
        }))
      })
    }
  }

  handleTextChange = (text) => {
    this.setState({ searchedText: text });
  }

  handleSearch = () => {
    this.setState({ page: 1, totalPages: 0, films: [] }, () => {
      this.fetch_movie();
    });
  }
  renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headline}>Trending Movies</Text>
        <Text style={styles.subheadline}>Check out the most popular movies right now</Text>
      </View>
    )
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.main_container}>
        {this.renderHeader()}
        <View style={styles.search_bar}>
          <TextInput
            style={styles.textinput}
            placeholder='Search...'
            onChangeText={this.handleTextChange}
            onSubmitEditing={this.handleSearch}
          />
          <TouchableOpacity style={styles.search_button} onPress={this.handleSearch}>
            <MaterialIcons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <FilmItem navigation={navigation} film={item} />}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.state.page <= this.state.totalPages && !this.state.isLoading) {
              this.fetch_movie()
            }
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textinput: {
    paddingLeft: 5,
    borderRadius: 5,
    height: 50,
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  main_container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  search_bar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000000',

  },
  search_button: {
    height: 50,
    backgroundColor: '#FFC107',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  search_icon: {
    paddingRight: 5,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  subheadline: {
    fontSize: 16,
    color: '#777777',
    textAlign: 'center',
  },
})




export default Search
