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
import { renderList, renderGenres } from "../../../helpers/helpers";
import SearchResults from "./SearchResults";

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

  return (
    <GradientBackground>
      <SafeAreaView>
        <ScrollView>
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

            {searchTerm === "" ? (
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
                {renderList("Trending now", trending)}

                {/*Discover movies*/}
                {renderList("Discover movies", discoveredMovies)}

                {/*Discover TV*/}
                {renderList("Discover TV", discoveredTV, 1)}
              </View>
            ) : (
              <SearchResults searchResults={searchResults} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default MovieScreen;
