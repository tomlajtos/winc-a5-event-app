// Chakra-ui imports
import { Center, Stack, Tag, Text } from "@chakra-ui/react";

export const CompactCategories = ({ categories, full, ...props }) => {
  const colors = props.colors ? props.colors : "neonVio";
  const variant = props.tagVariant ? props.tagVariant : "outline";
  const spacing = props.gap ? props.gap : 1;

  return (
    <Stack direction="row" spacing={spacing}>
      {categories.map((category) => (
        <Stack key={category} direction="row" gap={0}>
          <Tag
            variant={variant}
            height="28px"
            width="28px"
            lineHeight="14px"
            justifyContent="center"
            p={0}
            fontWeight={800}
            borderRadius="full"
            borderWidth="2px"
            colorScheme={colors}
            borderColor="blackAlpha.100"
            textTransform="capitalize"
            {...props}
          >
            <Center boxSize="16px">{category.slice(0, 1)}</Center>
          </Tag>
          {full && (
            <Text pt={0.5} color={`${colors}.500`}>
              {category.slice(1)}
            </Text>
          )}
        </Stack>
      ))}
    </Stack>
  );
};
