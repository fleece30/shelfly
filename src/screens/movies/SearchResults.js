import React from "react";
import { View, ScrollView } from "react-native";
import _map from "lodash/map";
import { renderResultItem } from "../../../helpers/helpers";

const SearchResults = ({ searchResults }) => {
  return (
    <ScrollView>
      <View className={"flex flex-wrap flex-row justify-around mt-4"}>
        {_map(searchResults, (movie) => {
          const type = movie.media_type === "movie" ? 0 : 1;
          if (!movie.release_date && !movie.first_air_date) return null;
          // const release_date =
          //   type === 0
          //     ? movie.release_date.split("-")[0]
          //     : movie.first_air_date.split("-")[0];

          return renderResultItem(movie, type);
        })}
      </View>
    </ScrollView>
  );
};

export default SearchResults;
