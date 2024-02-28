import { Stack, Tag } from "@chakra-ui/react";
import { useStaticData } from "../../context/StaticDataContext";
import { Logger } from "../../util/Logger";

export const EventCategories = ({ event }) => {
  const { categories } = useStaticData();

  return (
    <Logger name="EventCategories" level={5}>
      <Stack direction={"row"} spacing={2} pt={1}>
        {categories.map((category) =>
          event.categoryIds.includes(category.id) ? (
            <Tag key={category.name} size="lg" colorScheme={"purple"}>
              {category.name}
            </Tag>
          ) : null,
        )}
      </Stack>
    </Logger>
  );
};
