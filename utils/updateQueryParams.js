import { useStore } from "../store";

export function updateQueryParams(router) {
  const { size, page, selectedCategories, selectedSubcategories } =
    useStore.getState();

  const queryParams = {
    size: size.toString(),
    page: page.toString(),
  };

  if (selectedCategories && selectedCategories.length)
    queryParams.categories = selectedCategories.join(",");

  if (selectedSubcategories && selectedSubcategories.length)
    queryParams.subcategories = selectedSubcategories.join(",");

  router.push(
    {
      pathname: router.pathname,
      query: queryParams,
    },
    undefined,
    { shallow: true }
  );
}
