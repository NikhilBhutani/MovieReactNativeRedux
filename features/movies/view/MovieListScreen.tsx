import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import MovieCard from '@/shared/components/MovieCard';
import { AppDispatch, RootState } from '@/store';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../moviesSlice';
function MovieListScreen() {

  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: RootState) => state.movies.list);
  const loading = useSelector((state: RootState) => state.movies.loading);
  const error = useSelector((state: RootState) => state.movies.error);

  useEffect(() => {
   // fetchMoviesApi()
    dispatch(fetchMovies());
  }, []);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error}</Text>;

  const renderHeader = () => (
    <View>
      <Image source={images.bg} className="absolute top-0 left-0 w-full z-0" />
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
      
  
      <Text className="text-white text-2xl font-bold mt-5 mb-3">Latest Movies</Text>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <Text className="text-red-500 text-center text-lg">Error: {error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
    
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MovieCard {...item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          marginBottom: 10,
          paddingRight: 5,
          gap: 20
        }}
        className="mt-2 pb-32"
        contentContainerStyle={{ paddingBottom: 32, paddingHorizontal: 20 }}
        ListHeaderComponent={renderHeader}
      />
    </View>
  )
}

export default MovieListScreen