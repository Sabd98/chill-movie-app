import { api } from "./api";

export const moviesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => "movies.json",
      providesTags: ["Movies"],
    }),
    getEpisodes: builder.query({
      query: () => "episodes.json",
      transformResponse: (response) => response || [],
    }),
    getRecommendations: builder.query({
      query: () => "recommendations.json",
      transformResponse: (response) => response || [],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMoviesQuery,
  useGetEpisodesQuery,
  useGetRecommendationsQuery,
} = moviesApi;
