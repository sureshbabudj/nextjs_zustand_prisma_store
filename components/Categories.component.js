// Components/Categories.js

import React from "react";
import { FormGroup, FormCheck } from "react-bootstrap";
import { useStore } from "../store";

function Categories() {
  const {
    categories,
    selectedCategories,
    selectedSubcategories,
    setSelectedCategories,
    setSelectedSubcategories,
  } = useStore();

  // Event handler for category selection change
  const onCategoryChange = (event, catId) => {
    const isChecked = event.target.checked;
    let temp = [...selectedCategories];
    if (isChecked) {
      temp.push(catId);
    } else {
      const indexToRemove = selectedCategories.findIndex((i) => i === catId);
      if (indexToRemove !== -1) {
        temp.splice(indexToRemove, 1);
      }
    }
    setSelectedCategories(temp);
  };

  // Event handler for subcategory selection change
  const onSubcategoryChange = (event, subcatId) => {
    const isChecked = event.target.checked;
    let temp = [...selectedSubcategories];
    if (isChecked) {
      temp.push(subcatId);
    } else {
      const indexToRemove = selectedSubcategories.findIndex(
        (i) => i === subcatId
      );
      if (indexToRemove !== -1) {
        temp.splice(indexToRemove, 1);
      }
    }
    setSelectedSubcategories(temp);
  };

  return (
    <div className="me-3">
      <h6 className="mb-3">Categories</h6>
      {categories.length > 0 &&
        categories.map((category) => (
          <div key={category.id} className="mb-3">
            <FormCheck
              className="mb-3 border-bottom fw-bold"
              type="checkbox"
              id={`category-${category.id}`}
              label={category.name}
              checked={selectedCategories.includes(category.id)}
              onChange={(e) => onCategoryChange(e, category.id)}
            />
            <FormGroup className="ms-3">
              {category.subcategories.map((subcategory) => (
                <FormCheck
                  key={subcategory.id}
                  type="checkbox"
                  id={`subcategory-${subcategory.id}`}
                  label={subcategory.name}
                  checked={selectedSubcategories.includes(subcategory.id)}
                  onChange={(e) => onSubcategoryChange(e, subcategory.id)}
                />
              ))}
            </FormGroup>
          </div>
        ))}
    </div>
  );
}

export default Categories;
