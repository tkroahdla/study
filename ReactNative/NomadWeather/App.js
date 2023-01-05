import { ActivityIndicator, Text, View, StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Fontisto } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "";

const icons = {
  Clouds: "cloudy",
  Rain: "rains",
  Clear: "day-sunny",
  Atmosphere: "",
  Snow: "snow",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
    setCity(location[0].city);
    console.log(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    const json = await response.json();
    console.log(json);
    setDays(json.daily);
  };
  useEffect(() => {
    getWeather();
  }, []);

  useEffect(() => {
    console.log("days", days);
  }, [days]);

  return (
    <>
      <StatusBar style="black" />
      <View style={styles.containter}>
        <View style={styles.city}>
          <Text style={styles.cityName}>{city}</Text>
        </View>
        <ScrollView pagingEnabled showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={styles.weather}>
          {days?.length == 0 ? (
            <View style={styles.day}>
              <ActivityIndicator size="large" color="#00ff00" />
              <Text style={styles.loading}>loading...</Text>
            </View>
          ) : (
            days.map((day, index) => (
              <View key={index} style={styles.day}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                  <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
                  <Fontisto name={icons[day.weather[0].main]} size={68} color="white" />
                </View>

                <Text style={styles.desc}>{day.weather[0].main}</Text>
                <Text style={styles.tinyText}>{day.weather[0].description}</Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500",
    color: "white",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  temp: {
    marginTop: 50,
    fontSize: 120,
    color: "white",
  },
  desc: {
    marginTop: -30,
    fontSize: 30,
    color: "white",
  },
  loading: {
    marginTop: 30,
    fontSize: 30,
  },
  tinyText: {
    fontSize: 20,
    color: "white",
  },
});
