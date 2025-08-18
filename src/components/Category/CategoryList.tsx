import React, { useState } from "react";
import CategoryCard from "./CategoryCard";

type Category = {
  id: number;
  name: string;
  icon: React.ElementType;
  slug: string;
};

interface CategoryListProps {
  categories: Category[];
  defaultSelectedId?: number;
  onCategorySelect: (category: Category) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onCategorySelect,
  defaultSelectedId,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(
    defaultSelectedId || categories[0]?.id
  );

  const handleSelect = (category: Category) => {
    setSelectedCategoryId(category.id);
    onCategorySelect(category); // Tell parent page that a category is selected
  };

  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          name={category.name}
          icon={category.icon}
          isSelected={category.id === selectedCategoryId}
          onClick={() => handleSelect(category)}
        />
      ))}
    </div>
  );
};

export default CategoryList;
