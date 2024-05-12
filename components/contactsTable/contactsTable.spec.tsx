import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ContactsTable, ContactsTableProps } from './contactsTable';

describe('ContactsTable', () => {
  const mockItems: ContactsTableProps['items'] = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '9876543210',
    },
  ];

  it('renders table with correct data', () => {
    render(<ContactsTable items={mockItems} />);

    const table = screen.getByRole('table');
    const tableRows = screen.getAllByRole('row');

    expect(table).toBeTruthy();
    expect(tableRows).toHaveLength(mockItems.length + 1); 

    mockItems.forEach((item, index) => {
      const row = tableRows[index + 1]; 

      expect(screen.getByText(item.name)).toBeTruthy();
      expect(screen.getByText(item.email)).toBeTruthy();
      expect(screen.getByText(item.phoneNumber)).toBeTruthy();
    });
  });

  it('adds a new contact when "Add Contact" button is clicked', () => {
    render(<ContactsTable items={mockItems} />);

    const addButton = screen.getByRole('button', { name: 'Add Contact' });

    fireEvent.click(addButton);

    const tableRows = screen.getAllByRole('row');

    expect(tableRows).toHaveLength(mockItems.length + 2);
  });


  it('removes an individual contact when "Remove" button is clicked', () => {
    render(<ContactsTable items={mockItems} />);
  
    const initialTableRows = screen.getAllByRole('row');
  
    const removeButtons = screen.getAllByRole('button', { name: 'Remove' });
  
    const firstRemoveButton = removeButtons[0];
    fireEvent.click(firstRemoveButton);
  
   //Check table rows
    const updatedTableRows = screen.getAllByRole('row');
  
    // Expect the table to have one less row than the original length
    expect(updatedTableRows).toHaveLength(initialTableRows.length - 1);
  });
  

});
