import { createApi } from "@reduxjs/toolkit/query/react";

const WBAPIBaseQuery = () => async ({ params }) => {
	try {
		return { params }
	} catch (error) {
		return { error }
	}
}

export const WBapi = createApi({
	reducerPath: "WBAPI",
	baseQuery: WBAPIBaseQuery(),
	tagTypes: ["Data"],
	endpoints: build => ({
		getData: build.query({
			query: ({ params }) => ({ apiMethod: "getData", params }),
			providesTags: () => ["Data"],
		})
	}),
})
