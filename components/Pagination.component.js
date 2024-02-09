import React from "react";
import { Pagination } from "react-bootstrap";

// first, ..., prev, current, next, ..., last
const MINIMAL_PAGE_ITEM_COUNT = 7;

/**
 * Generate numeric page items around current page.
 *   - Always include first and last page
 *   - Add ellipsis if needed
 */
function generatePageItems(current, total) {
  var last = total,
    delta = 2,
    left = current - delta,
    right = current + delta + 1,
    range = [],
    rangeWithDots = [],
    l;

  for (let i = 1; i <= last; i++) {
    if (i == 1 || i == last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}

function CustomPagination({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const pageNumbers = generatePageItems(currentPage, totalPages);

  const renderPaginationItems = () => {
    const items = [];

    // Always display the previous button
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
      />
    );

    // Render page numbers with ellipsis as necessary
    for (let [index, num] of pageNumbers.entries()) {
      let targetPage = num,
        key = num;
      if (num === "...") {
        targetPage = pageNumbers[index - 1] + 1;
        key = `threeDots-${Date.now()}-${targetPage}`;
      }
      const item = (
        <Pagination.Item
          key={key}
          active={num === currentPage}
          onClick={() => handlePageChange(num)}
        >
          {num}
        </Pagination.Item>
      );
      items.push(item);
    }

    // Always display the next button
    items.push(
      <Pagination.Next
        key="next"
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
      />
    );

    return items;
  };

  return <Pagination>{renderPaginationItems()}</Pagination>;
}

export default CustomPagination;
