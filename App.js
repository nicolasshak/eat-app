import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, StatusBar } from 'react-native';

//Maybe OK restaurants that have a dislike but offer something else
const people = [
  {
    "name": "Kayla",
    "dislikes": [
      "mexican"
    ]
  },
  {
    "name": "Kiana",
    "dislikes": [
      "sushi",
      "mediterranean"
    ]
  },
  {
    "name": "Jeff",
    "dislikes": [
      "burgers"
    ]
  }
]

const dislikes = people.reduce((accum, item) => {
  item.dislikes.forEach((dislike => {
    if(!accum.includes(dislike)) accum.push(dislike);
  }));
  return accum;
}, []);

console.log({dislikes});

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = new URL('https://uygkzypwmd.execute-api.us-east-1.amazonaws.com/beta/search');
    url.searchParams.append('location', '335 S Bentley Ave, Los Angeles CA, 90049');
    url.searchParams.append('categories', 'restaurants');
    url.searchParams.append('limit', '50');
    fetch(url.href)
    .then(res => res.json())
    .then(json => {
      setData(json.businesses.filter(business => business.categories.some(category => dislikes.includes(category.alias) )));
      //setData(json.businesses);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#000"
      />
      <View>
        <Text>Title
        Title
        Title </Text>
      </View>
      <FlatList
        data={ data }
        renderItem={ ({ item }) => <RestaurantCard name={ item.name } /> }
      />
      <ExpoStatusBar style="auto" />
    </SafeAreaView>
  );
}

function RestaurantCard(props) {
  const { name } = props;

  return(
    <View>
      <Text>{ name }</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
