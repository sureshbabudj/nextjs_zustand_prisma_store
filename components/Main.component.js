import React, { useEffect } from "react";
import Categories from "./Categories.component";
import Product from "./Products.component";
import styles from "../styles/Home.module.css";
import { useStore } from "../store";
import { getProductsData } from "../pages";

import { updateQueryParams } from "../utils/updateQueryParams";
import { useRouter } from "next/router";

export default function Main() {
  const router = useRouter();
  const {
    size,
    page,
    selectedCategories,
    selectedSubcategories,
    setProductsData,
    setSelectedCategories,
    setSelectedSubcategories,
    setPage,
    setSize,
  } = useStore();

  const fetchProducts = async () => {
    try {
      const productsData = await getProductsData({
        size,
        page,
        selectedCategories,
        selectedSubcategories,
      });
      setProductsData(productsData);
    } catch (error) {
      setProductsData({ products: [], totalCount: 0 });
    }
  };

  useEffect(() => {
    const handlePopstate = () => {
      const query = window.location.search.substring(1);
      const params = new URLSearchParams(query);
      const newQueryParams = {};
      for (const [key, value] of params.entries()) {
        newQueryParams[key] = value;
      }
      const { categories, subcategories, page, size } = newQueryParams;
      // Update store state with query parameters from URL
      setSelectedCategories(categories ? categories.split(",") : []);
      setSelectedSubcategories(subcategories ? subcategories.split(",") : []);
      setPage(page ? parseInt(page, 10) : 1);
      setSize(size ? parseInt(size, 10) : 10);
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  useEffect(() => {
    updateQueryParams(router);
    fetchProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, page, selectedCategories, selectedSubcategories]);

  return (
    <main className={styles.main}>
      <div className={styles.left}>
        <Categories />
      </div>
      <div className={styles.right}>
        <Product />
      </div>
    </main>
  );
}
