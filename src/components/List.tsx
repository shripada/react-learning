import { ComponentPropsWithoutRef } from 'react';
import { cn } from '../utils';

type ListProps<T> = T extends false
  ? ComponentPropsWithoutRef<'ul'>
  : ComponentPropsWithoutRef<'ol'>;

type CustomListProps<T extends boolean> =
  | { ordered?: T; items: string[] } & ListProps<T>;

/**
 * A list which can be ordered or unordered depending a flag passed to it.
 * True, that this is a bit contorted example, but serves the purpose
 * to learn How we can achieve common jsx via a polymorphic component.
 */
export const List = <T extends boolean>({
  ordered,
  items,
  ...listProps
}: CustomListProps<T>) => {
  // ListComponent is polymorphic, it caters to the contracts of both
  // ol, and ul here. Without this, we would need to do a conditional rendering
  // and that will need lot of code duplication.
  const ListComponent = ordered ? 'ol' : 'ul';

  return (
    <ListComponent
      className={cn({ 'list-disc': !ordered }, { 'list-decimal': ordered })}
      {...listProps}
    >
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ListComponent>
  );
};
