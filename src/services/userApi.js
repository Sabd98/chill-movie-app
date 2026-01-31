import { api } from "./api";
import { getSafeKey, encryptPassword } from "../utils/crypto";
import { updateUserSubscription, updateUserProfile } from "../store/authSlice";
import { toast } from "react-toastify";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionPlans: builder.query({
      query: () => "plans.json",
      transformResponse: (response) => {
        if (!response) return [];
        const data = Array.isArray(response)
          ? response
          : Object.keys(response).map((key) => ({ id: key, ...response[key] }));
        return data.filter((item) => item !== null);
      },
      providesTags: ["Subscription"],
    }),
    getMyList: builder.query({
      query: (username) => {
        if (!username)
          return { url: "movies.json", params: { limitToFirst: 0 } };
        return `chill_my_list/${getSafeKey(username)}.json`;
      },
      transformResponse: (response) => {
        if (response) {
          return Object.values(response);
        }
        return [];
      },
      providesTags: ["MyList"],
    }),
    addToMyList: builder.mutation({
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Berhasil ditambahkan ke Daftar Saya");
        } catch (err) {
          toast.error(err?.error?.data || "Gagal menambahkan ke Daftar Saya");
        }
      },
      query: ({ username, movie }) => ({
        url: `chill_my_list/${getSafeKey(username)}/${movie.id}.json`,
        method: "PUT",
        body: movie,
      }),
      invalidatesTags: ["MyList"],
    }),
    removeFromMyList: builder.mutation({
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Berhasil dihapus dari Daftar Saya");
        } catch (err) {
          toast.error(err?.error?.data || "Gagal menghapus dari Daftar Saya");
        }
      },
      query: ({ username, movieId }) => ({
        url: `chill_my_list/${getSafeKey(username)}/${movieId}.json`,
        method: "DELETE",
      }),
      invalidatesTags: ["MyList"],
    }),
    subscribe: builder.mutation({
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateUserSubscription(data));
           toast.success("Berhasil berlangganan");
        } catch (err) {
          toast.error(err?.error?.data || "Gagal berlangganan");
        }
      },
      queryFn: async (planId, { getState }, _extraOptions, baseQuery) => {
        const state = getState();
        const user = state.auth.user;
        if (!user)
          return { error: { status: 401, data: "User not logged in" } };

        try {
          let userId = user.id;
          if (!userId) {
            const usersResult = await baseQuery("users.json");
            const usersMap = usersResult.data || {};
            const userEntry = Object.entries(usersMap).find(
              (u) => u.username === user.username,
            );
            if (!userEntry)
              return { error: { status: 404, data: "User tidak ditemukan" } };
            userId = userEntry[0];
          }

          const plansResult = await baseQuery("plans.json");
          const plansMap = plansResult.data;
          const plans = Array.isArray(plansMap)
            ? plansMap
            : Object.keys(plansMap).map((key) => ({
                id: key,
                ...plansMap[key],
              }));

          const plan = plans.find((p) => p.id === planId);
          if (!plan)
            return { error: { status: 404, data: "Paket tidak ditemukan" } };

          const subscriptionData = {
            status: "active",
            planId: plan.id,
            planName: plan.name,
            price: plan.price,
            startDate: new Date().toISOString(),
            endDate: new Date(
              new Date().setMonth(new Date().getMonth() + 1),
            ).toISOString(),
          };

          await baseQuery({
            url: `users/${userId}.json`,
            method: "PATCH",
            body: { subscription: subscriptionData },
          });

          return { data: subscriptionData };
        } catch (error) {
          return { error: { status: 500, data: error.message } };
        }
      },
      invalidatesTags: ["User"],
    }),
    unsubscribe: builder.mutation({
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateUserSubscription(data));
          toast.success("Berhasil berhenti berlangganan");
        } catch (err) {
          toast.error(err?.error?.data || "Gagal berhenti berlangganan");
        }
      },
      queryFn: async (_, { getState }, _extraOptions, baseQuery) => {
        const state = getState();
        const user = state.auth.user;
        if (!user)
          return { error: { status: 401, data: "User not logged in" } };

        try {
          let userId = user.id;
          if (!userId) {
            const usersResult = await baseQuery("users.json");
            const usersMap = usersResult.data || {};
            const userEntry = Object.entries(usersMap).find(
              (u) => u.username === user.username,
            );
            if (!userEntry)
              return { error: { status: 404, data: "User tidak ditemukan" } };
            userId = userEntry[0];
          }

          const inactiveSubscription = {
            status: "inactive",
            planId: null,
            planName: null,
            endDate: null,
          };

          await baseQuery({
            url: `users/${userId}.json`,
            method: "PATCH",
            body: { subscription: inactiveSubscription },
          });

          return { data: inactiveSubscription };
        } catch (error) {
          return { error: { status: 500, data: error.message } };
        }
      },
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateUserProfile(data));
          toast.success("Profil Berhasil Diperbarui");
        } catch (err) {
          console.error(err);
          toast.error(err?.error?.data || "Gagal Memperbarui Profil");
        }
      },
      queryFn: async (
        { username: oldUsername, userData },
        _queryApi,
        _extraOptions,
        baseQuery,
      ) => {
          const usersResult = await baseQuery("users.json");
          const usersMap = usersResult.data || {};
          const users = Object.entries(usersMap).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          const targetUser = users.find((u) => u.username === oldUsername);

          console.log("userApi: targetUser found", targetUser);

          if (!targetUser)
            return { error: { status: 404, data: "User tidak ditemukan" } };

          if (userData.username && userData.username !== oldUsername) {
            if (users.some((u) => u.username === userData.username)) {
              return {
                error: { status: 409, data: "Username sudah digunakan" },
              };
            }
          }

          const updates = {};
          if (userData.username) updates.username = userData.username;
          if (userData.password)
            updates.password = encryptPassword(userData.password);
          if (userData.photoUrl) updates.photoUrl = userData.photoUrl;

          const result = await baseQuery({
            url: `users/${targetUser.id}.json`,
            method: "PATCH",
            body: updates,
          });

          if (result.error) {
            return { error: result.error };
          }

          return { data: updates };
      },
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSubscriptionPlansQuery,
  useGetMyListQuery,
  useAddToMyListMutation,
  useRemoveFromMyListMutation,
  useSubscribeMutation,
  useUnsubscribeMutation,
  useUpdateUserMutation,
} = userApi;
