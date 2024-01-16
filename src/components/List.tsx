import React, { ReactNode, ComponentPropsWithoutRef } from 'react';

type ListProps<T> = T extends false
  ? ComponentPropsWithoutRef<'ul'>
  : ComponentPropsWithoutRef<'ol'>;

type CustomListProps<T extends boolean> =
  | { ordered?: T; items: string[] } & ListProps<T>;

// Define the CustomList component
export const List = <T extends boolean>({
  ordered,
  items,
  ...listProps
}: CustomListProps<T>) => {
  // Determine the type of list to render
  const ListComponent = ordered ? 'ol' : 'ul';

  return (
    <ListComponent {...listProps} className="list-disc">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ListComponent>
  );
};
