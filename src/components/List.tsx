import React, { ReactNode, ComponentProps } from 'react';

type CustomListProps =
  | { ordered?: boolean; items: ReactNode[] } & (
      | ComponentProps<'ol'>
      | ComponentProps<'ul'>
    );

// Define the CustomList component
export const List = ({ ordered, items, ...listProps }: CustomListProps) => {
  // Determine the type of list to render
  const ListComponent = ordered ? 'ol' : 'ul';

  return (
    <ListComponent {...listProps}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ListComponent>
  );
};
