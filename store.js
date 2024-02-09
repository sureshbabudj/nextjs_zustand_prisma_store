// store.js
import create from "zustand";

export const useStore = create((set, state) => ({
  loading: false,
  categories: {},
  selectedCategories: [],
  selectedSubcategories: [],
  page: 1,
  size: 10,
  queryParams: {},
  productsData: {
    products: [],
    totalCount: 0,
  },
  setCategories: (categories) => set((state) => ({ ...state, categories })),
  setQueryParams: (queryParams) => set((state) => ({ ...state, queryParams })),
  setSelectedCategories: (selectedCategories) =>
    set((state) => ({ ...state, selectedCategories })),
  setSelectedSubcategories: (selectedSubcategories) =>
    set((state) => ({ ...state, selectedSubcategories })),
  setPage: (page) => set((state) => ({ ...state, page })),
  setSize: (size) => set((state) => ({ ...state, size })),
  setProductsData: (productsData) =>
    set((state) => ({ ...state, productsData })),
  setLoading: (loading) => set((state) => ({ ...state, loading })),
}));
