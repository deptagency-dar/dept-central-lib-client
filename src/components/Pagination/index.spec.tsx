import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Pagination } from './index';

describe('Pagination', () => {
  const onPageChangeMock = jest.fn();

  beforeEach(() => {
    onPageChangeMock.mockClear();
  });

  it('invokes onPageChange with the correct argument when next button is clicked', async () => {
    render(
      <Pagination
        currentPage={1}
        itemsPerPage={10}
        totalItems={100}
        onPageChange={onPageChangeMock}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Next/ }));
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  it('invokes onPageChange with the correct argument when previous button is clicked', async () => {
    render(
      <Pagination
        currentPage={2}
        itemsPerPage={10}
        totalItems={100}
        onPageChange={onPageChangeMock}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Previous/ }));
    expect(onPageChangeMock).toHaveBeenCalledWith(1);
  });

  it('disables the previous button on the first page', async () => {
    render(
      <Pagination
        currentPage={1}
        itemsPerPage={10}
        totalItems={100}
        onPageChange={onPageChangeMock}
      />
    );

    const prevButton = screen.getByRole('button', { name: /Previous/ });
    expect(prevButton).toBeDisabled();
  });

  it('disables the next button on the last page', async () => {
    render(
      <Pagination
        currentPage={10}
        itemsPerPage={10}
        totalItems={100}
        onPageChange={onPageChangeMock}
      />
    );

    const nextButton = screen.getByRole('button', { name: /Next/ });
    expect(nextButton).toBeDisabled();
  });

  it('applies the className prop correctly', () => {
    const customClass = 'my-custom-class';
    render(
      <Pagination
        currentPage={1}
        itemsPerPage={10}
        totalItems={100}
        onPageChange={onPageChangeMock}
        className={customClass}
      />
    );

    const paginationContainer = screen.getByTestId('pagination-container');
    expect(paginationContainer).toHaveClass(customClass);
  });

  describe('Items per page selector', () => {
    it('shows the itemsPerPage selector when showItemsPerPage is true', () => {
      render(
        <Pagination
          currentPage={1}
          itemsPerPage={10}
          totalItems={100}
          onPageChange={onPageChangeMock}
          showItemsPerPage={true}
        />
      );

      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('hides the itemsPerPage selector when showItemsPerPage is false', () => {
      render(
        <Pagination
          currentPage={1}
          itemsPerPage={10}
          totalItems={100}
          onPageChange={onPageChangeMock}
          showItemsPerPage={false}
        />
      );

      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });

    it('updates itemsPerPage when a valid number is entered', () => {
      const onItemsPerPageChangeMock = jest.fn();
    
      render(
        <Pagination
          currentPage={1}
          itemsPerPage={10}
          totalItems={100}
          onPageChange={onPageChangeMock}
          onItemsPerPageChange={onItemsPerPageChangeMock}
          showItemsPerPage={true}
        />
      );
    
      const input = screen.getByRole('textbox');
    
      fireEvent.change(input, { target: { value: '20' } });
      fireEvent.blur(input);
    
      expect(onItemsPerPageChangeMock).toHaveBeenCalledWith(20);
    });
  })
});
