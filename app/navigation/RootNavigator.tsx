import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar } from 'react-native';
import "../globals.css";
// import MovieListScreen from '../movies';
import MovieListScreen from '../../features/movies/view/MovieListScreen';

// export default MovieListScreen;

const Stack = createNativeStackNavigator();


const RootNavigator = () => {
  return (
    <>
    <StatusBar />
          <Stack.Navigator>
            <Stack.Screen 
              name="Movies" 
              component={MovieListScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
          
   </>
  )
}

export default RootNavigator


{/* <Stack>
<Stack.Screen name="movies" />
</Stack> */}

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useFonts } from 'expo-font';
// import { StatusBar } from 'expo-status-bar';
// import { Provider } from 'react-redux';
// import MovieListScreen from '../../features/movies/view/MovieListScreen';
// import { store } from '../../store';

// const Stack = createNativeStackNavigator();

// export default function RootLayout() {
//   const [loaded] = useFonts({
//     SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   if (!loaded) {
//     // Async font loading only occurs in development.
//     return null;
//   }

  // return (
  //   <Provider store={store}>
  //     <NavigationContainer>
  //       <Stack.Navigator>
  //         <Stack.Screen 
  //           name="Movies" 
  //           component={MovieListScreen}
  //           options={{ headerShown: false }}
  //         />
  //       </Stack.Navigator>
  //       <StatusBar style="auto" />
  //     </NavigationContainer>
  //   </Provider>
  // );
// }


