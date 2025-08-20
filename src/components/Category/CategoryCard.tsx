import React from "react";



interface CategoryCardProps {
  name: string;
  icon: React.ElementType;
  slug?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  icon: Icon,
  isSelected = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`w-[29%] flex flex-col items-center md:w-[10%] p-3 rounded-lg cursor-pointer transition-all duration-200 
         `}
    >
          <Icon className={`w-7 object-cover rounded-md  ${isSelected ? "text-red-500" : "text-zinc-600 dark:text-zinc-100"}`}/>
          <p className={`mt-2 text-center text-sm ${isSelected ? "text-red-500" : "text-zinc-600 dark:text-zinc-100"}`}>{name}</p>
    </div>
  );
};

export default CategoryCard;
