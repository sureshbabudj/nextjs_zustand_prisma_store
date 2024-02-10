// store.js
import create from "zustand";
import { getProductsData } from "./pages";

export const useStore = create((set, get) => ({
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
  setSelectedCategories: async (selectedCategories) => {
    set((state) => ({ ...state, selectedCategories }));
    const { size, selectedSubcategories } = get();
    const page = 1; // reset page
    const productsData = await getProductsData({
      size,
      page,
      selectedCategories,
      selectedSubcategories,
    });
    set((state) => ({ ...state, productsData }));
  },
  setSelectedSubcategories: async (selectedSubcategories) => {
    set((state) => ({ ...state, selectedSubcategories }));
    const { size, selectedCategories } = get();
    const page = 1; // reset page
    const productsData = await getProductsData({
      size,
      page,
      selectedCategories,
      selectedSubcategories,
    });
    set((state) => ({ ...state, productsData }));
  },
  setPage: async (page) => {
    set((state) => ({ ...state, page }));
    const { size, selectedCategories, selectedSubcategories } = get();
    const productsData = await getProductsData({
      size,
      page,
      selectedCategories,
      selectedSubcategories,
    });
    set((state) => ({ ...state, productsData }));
  },
  setSize: async (size) => {
    set((state) => ({ ...state, size }));
    const { selectedCategories, selectedSubcategories } = get();
    const page = 1;
    const productsData = await getProductsData({
      size,
      page,
      selectedCategories,
      selectedSubcategories,
    });
    set((state) => ({ ...state, productsData }));
  },
  setProductsData: (productsData) =>
    set((state) => ({ ...state, productsData })),
  setLoading: (loading) => set((state) => ({ ...state, loading })),
}));
