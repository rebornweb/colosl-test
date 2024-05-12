'use client'
import { Avatar, Button } from '@/components';
import { Contact, randomContact } from '@/utils';
import { FC, useEffect, useMemo, useState } from 'react';
import styles from './contacts-table.module.css';

export interface ContactsTableProps {
  items: Contact[];
}

export const ContactsTable: FC<ContactsTableProps> = ({ items }) => {
  const [localItems, setLocalItems] = useState<Contact[]>([]);

  const capitalizeName = (name: string): string => {
    return name
      .split(' ')
      .map((word) => capitalizeFirstLetter(word))
      .join(' ');
  };

  const capitalizeFirstLetter = (word: string): string => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  useEffect(() => {
    const savedItems = localStorage.getItem('savedContacts');
    if (savedItems) {
      setLocalItems(JSON.parse(savedItems));
    } else {
      setLocalItems(items);
    }
  }, [items]);

  const capitalizedItems = useMemo(
    () =>
      localItems.map((item) => ({
        ...item,
        name: capitalizeName(item.name),
      })),
    [localItems]
  );

  const addItem = () => {
    const updatedItems = [...localItems, randomContact()];
    setLocalItems(updatedItems);
    saveItems(updatedItems);
  };

  const removeItem = (index: number) => {
    const updatedItems = localItems.filter((_, i) => i !== index);
    setLocalItems(updatedItems);
    saveItems(updatedItems);
  };

  const saveItems = (items: Contact[]) => {
    localStorage.setItem('savedContacts', JSON.stringify(items));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <header className={styles.header}>
          <Button size="sm" onClick={addItem}>
            Add Contact
          </Button>
        </header>
        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {capitalizedItems.map((item, i) => (
              <tr key={i}>
                <td>
                  <Avatar
                    firstName={capitalizeFirstLetter(item.name.split(' ')[0])}
                    lastName={capitalizeFirstLetter(item.name.split(' ')[1])}
                  />
                </td>
                <td>
                  {capitalizeName(item.name)}
                </td>
                <td>{item.email}</td>
                <td>{item.phoneNumber}</td>
                <td>
                  <Button size="sm" outline onClick={() => removeItem(i)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
