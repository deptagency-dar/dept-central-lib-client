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
});
