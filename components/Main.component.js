import React, { useEffect } from "react";
import Categories from "./Categories.component";
import Product from "./Products.component";
import styles from "../styles/Home.module.css";
import { useStore } from "../store";

import { updateQueryParams } from "../utils/updateQueryParams";
import { useRouter } from "next/router";
import { getProductsData } from "../pages";

export default function Main() {
  const router = useRouter();
  const state = useStore();

  useEffect(() => {
    const handlePopstate = () => {
      console.log("handlePopstate");
      const query = window.location.search.substring(1);
      const params = new URLSearchParams(query);
      const newQueryParams = {};
      for (const [key, value] of params.entries()) {
        newQueryParams[key] = value;
      }
      const { categories, subcategories, page, size } = newQueryParams;

      const updatedQueryState = {
        selectedCategories: categories ? categories.split(",") : [],
        selectedSubcategories: subcategories ? subcategories.split(",") : [],
        page: page ? parseInt(page, 10) : 1,
        size: size ? parseInt(size, 10) : 10,
      };

      useStore.setState({
        ...state,
        ...updatedQueryState,
      });

      const fetchProducts = async () => {
        try {
          const productsData = await getProductsData(updatedQueryState);
          return productsData;
        } catch (error) {
          console.log("Error while fetching products data", error);
          return null;
        }
      };

      fetchProducts();
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  const { size, page, selectedCategories, selectedSubcategories } = state;

  useEffect(() => {
    updateQueryParams(router);
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
