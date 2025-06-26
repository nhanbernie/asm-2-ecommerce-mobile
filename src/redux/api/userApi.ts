import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../slices/userSlice';

export interface UpdateUserRequest {
  id: string;
  name?: string;
  email?: string;
  bio?: string;
  phone?: string;
  location?: string;
  avatar?: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
      transformResponse: (response: any): User => ({
        id: response.id.toString(),
        name: response.name,
        email: response.email,
        bio: response.company?.catchPhrase || '',
        phone: response.phone,
        location: `${response.address?.city}, ${response.address?.zipcode}`,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(response.name)}&size=200&background=007AFF&color=fff`,
      }),
    }),
    updateUser: builder.mutation<User, UpdateUserRequest>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
      transformResponse: (response: any): User => ({
        id: response.id.toString(),
        name: response.name,
        email: response.email,
        bio: response.bio || '',
        phone: response.phone,
        location: response.location,
        avatar: response.avatar,
      }),
    }),
    createUser: builder.mutation<User, Omit<User, 'id'>>({
      query: (newUser) => ({
        url: 'users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useCreateUserMutation,
} = userApi;
