import { api } from "./api";
import { encryptPassword } from "../utils/crypto";
import { setUser } from "../store/authSlice";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (err) {
          console.error(err)
        }
      },
      queryFn: async (
        { username, password },
        _queryApi,
        _extraOptions,
        baseQuery,
      ) => {
        try {
          const usersResult = await baseQuery("users.json");
          if (usersResult.error) return { error: usersResult.error };

          const usersMap = usersResult.data;
          const users = usersMap
            ? Object.entries(usersMap).map(([key, value]) => ({
                id: key,
                ...value,
              }))
            : [];

          const encryptedPassword = encryptPassword(password);
          const user = users.find(
            (u) => u.username === username && u.password === encryptedPassword,
          );

          if (user) {
            if (!user.subscription) {
              user.subscription = { status: "inactive" };
            }
            return { data: user };
          } else {
            return {
              error: { status: 401, data: "Username atau password salah" },
            };
          }
        } catch (error) {
          return { error: { status: 500, data: error.message } };
        }
      },
    }),
    register: builder.mutation({
      queryFn: async (
        { username, password },
        _queryApi,
        _extraOptions,
        baseQuery,
      ) => {
        try {
          const usersResult = await baseQuery("users.json");
          if (usersResult.error) return { error: usersResult.error };

          const usersMap = usersResult.data;
          const users = usersMap ? Object.values(usersMap) : [];

          if (users.find((u) => u.username === username)) {
            return { error: { status: 409, data: "Username sudah terdaftar" } };
          }

          const newUser = {
            username,
            password: encryptPassword(password),
            subscription: { status: "inactive" },
          };

          const postResult = await baseQuery({
            url: "users.json",
            method: "POST",
            body: newUser,
          });

          if (postResult.error) return { error: postResult.error };

          return { data: { ...newUser, id: postResult.data.name } };
        } catch (error) {
          return { error: { status: 500, data: error.message } };
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation } = authApi;
