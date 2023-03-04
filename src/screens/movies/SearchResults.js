import React from "react";
import { View, ScrollView } from "react-native";
import _map from "lodash/map";
import ResultListItem from "../../components/ResultListItem";
import { getReleaseDate } from "../../../helpers/utils";

const SearchResults = ({ searchResults }) => {
  return (
    <ScrollView>
      <View className={"flex flex-wrap flex-row justify-around mt-4"}>
        {_map(searchResults, (movie, key) => {
          const type = movie.media_type === "movie" ? 0 : 1;
          const releaseDate = getReleaseDate(movie, type);
          movie = { ...movie, releaseDate };
          return <ResultListItem key={key} itemToRender={movie} type={type} />;
        })}
      </View>
    </ScrollView>
  );
};

export default SearchResults;
