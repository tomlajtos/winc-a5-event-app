// Chakra-ui imports
import { Stack, Tag } from "@chakra-ui/react";
// Context and custom hook imports
import { useStaticData } from "../context/StaticDataContext";

export const EventCategories = ({ event, tagProps, ...props }) => {
  const { categories } = useStaticData();

  return (
    <Stack direction="row" spacing={2} {...props}>
      {categories.map((category) =>
        event.categoryIds.includes(Number(category.id)) ? (
          <Tag
            key={category.name}
            variant="solid"
            colorScheme="neonVio"
            {...tagProps}
          >
            {category.name}
          </Tag>
        ) : null,
      )}
    </Stack>
  );
};
