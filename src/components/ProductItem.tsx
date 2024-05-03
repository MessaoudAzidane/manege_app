import React from 'react';
import { Button } from 'antd';

interface Product {
  id: number;
  name: string;
  nbTickets: number;
  price: number;
}

interface ProductItemProps {
  product: Product;
  onPrintTickets: (nbTickets: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onPrintTickets }) => {
  const { name, nbTickets, price } = product;
 
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center sm:flex-row sm:items-stretch">
      <div className="flex-1 sm:mr-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p>Number of Tickets: {nbTickets}</p>
        <p>Price: ${price}</p>
      </div>
      <Button
        type="primary"
        onClick={() => onPrintTickets(nbTickets)}
        disabled={nbTickets === 0}
        className="mt-4 sm:mt-0"
      >
        Print Tickets
      </Button>
    </div>
  );
};

export default ProductItem;