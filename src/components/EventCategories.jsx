// Chakra-ui imports
import { Stack, Tag } from "@chakra-ui/react";
// Context and custom hook imports
import { useStaticData } from "../context/StaticDataContext";

export const EventCategories = ({ event, tagProps, ...props }) => {
  const { categories } = useStaticData();

  return (
    <Stack direction={"row"} spacing={[2]} {...props}>
      {categories.map((category) =>
        event.categoryIds.includes(category.id) ? (
          <Tag
            key={category.name}
            colorScheme={"neonVioDark"}
            color={"neonVioLight.50"}
            {...tagProps}
          >
            {category.name}
          </Tag>
        ) : null,
      )}
    </Stack>
  );
};
