import React, { useEffect, useMemo, useState } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import _debounce from "lodash/debounce";
import CustomText from "../../components/CustomText";
import SearchBar from "../../components/SearchBar";
import {
  fetchTrending,
  discoverMovies,
  discoverTV,
  fetchByName,
} from "../../../helpers/api";
import GradientBackground from "../../components/GradientBackground";
import SearchResults from "./SearchResults";
import HorizontalList from "../../components/HorizontalList";
import _map from "lodash/map";
import { movieGenres } from "../../../helpers/constants";

const MovieScreen = () => {
  const [trending, setTrending] = useState([]);
  const [discoveredMovies, setDiscoveredMovies] = useState([]);
  const [discoveredTV, setDiscoveredTV] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const getSearchResults = async (e) => {
    setSearchTerm(e);
    const URIEncodedString = e.split(" ").join("%20");
    await fetchByName(URIEncodedString).then(({ data }) => {
      setSearchResults(data.results);
    });
  };

  // Debouncing API calls for optimization
  const handleSearchText = useMemo(() => {
    return _debounce(getSearchResults, 500);
  }, []);

  useEffect(() => {
    return () => {
      handleSearchText.cancel();
    };
  });

  useEffect(() => {
    fetchData().catch((error) => console.log(error));
  }, []);

  const fetchData = async () => {
    await fetchTrending().then(({ data }) => {
      setTrending(data.results);
    });

    await discoverMovies().then(({ data }) => {
      setDiscoveredMovies(data.results);
    });

    await discoverTV().then(({ data }) => {
      setDiscoveredTV(data.results);
    });
  };

  const renderGenres = () => {
    return _map(movieGenres, (genre, key) => {
      return (
        <View key={key} className={"flex justify-center items-center"}>
          <View className={"bg-white w-20 h-20 rounded-lg"}></View>
          <CustomText font={"poppins-sbold"} classes={"text-center mt-2"}>
            {genre.name}
          </CustomText>
        </View>
      );
    });
  };

  return (
    <GradientBackground>
      <SafeAreaView>
        <View className={"px-4 py-3 flex"}>
          <CustomText classes={"text-4xl text-center"} font={"lusitana-bold"}>
            Movies & TV
          </CustomText>

          {/*Searchbar*/}
          <View className={"flex justify-center items-center"}>
            <SearchBar
              placeholder={"Search movies and tv"}
              setSearch={(e) => handleSearchText(e)}
            />
          </View>
        </View>
        <ScrollView>
          {searchTerm === "" ? (
            <View className={"px-4 pb-44 flex"}>
              <View>
                {/*Genres*/}
                <View className={"mt-6"}>
                  <CustomText font={"lusitana-bold"} classes={"text-2xl"}>
                    Genres
                  </CustomText>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    className={"flex flex-row space-x-5 mt-3"}
                  >
                    {renderGenres()}
                  </ScrollView>
                </View>

                {/*Trending now*/}
                <HorizontalList
                  header={"Trending now"}
                  listToRender={trending}
                />

                {/*Discover movies*/}
                <HorizontalList
                  header={"Discover movies"}
                  listToRender={discoveredMovies}
                />

                {/*Discover TV*/}
                <HorizontalList
                  header={"Discover TV"}
                  listToRender={discoveredTV}
                  type={1}
                />
              </View>
            </View>
          ) : (
            <SearchResults searchResults={searchResults} />
          )}
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default MovieScreen;
