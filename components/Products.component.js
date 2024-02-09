// Product.js
import React from "react";
import { Card } from "react-bootstrap";
import CustomPagination from "./Pagination.component";
import { useStore } from "../store";

export default function Product() {
  const { page, setPage, productsData, size } = useStore();
  if (!productsData) {
    return null;
  }

  function gridCols(products) {
    const cards = [];
    for (let i = 0; i < products.length; i += 3) {
      const row = (
        <div key={i / 3} className="row">
          {products.slice(i, i + 3).map((product, index) => (
            <div key={index} className="col">
              <Card
                key={product.id}
                className="mb-3"
                style={{ backgroundColor: product.color }}
              >
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>Price: {product.price}</Card.Text>
                  <Card.Text>Weight: {product.weight}</Card.Text>
                  <Card.Text>Brand: {product.brand}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      );

      cards.push(row);
    }
    return cards;
  }

  return (
    <div>
      <h2>Products</h2>
      {productsData.products.length > 0 && (
        <>
          <div className="wrap">{gridCols(productsData.products)}</div>
          <CustomPagination
            currentPage={page}
            totalPages={Math.floor(productsData.totalCount / size)}
            onPageChange={(p) => setPage(p)}
          />
        </>
      )}
    </div>
  );
}
