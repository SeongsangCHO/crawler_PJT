import React from "react";
import CategoryItem from "./CategoryItem";

const CategoryList = ({ categories }) => {
  return (
    <div>
      {categories?.map((category) => (
        <CategoryItem category={category} />
      ))}
    </div>
  );
};

CategoryList.propTypes = {};

export default CategoryList;
