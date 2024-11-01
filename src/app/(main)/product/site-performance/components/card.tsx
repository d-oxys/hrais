import React from 'react';

interface CardProps {
  title: string;
  priceRange: string;
  bestColor: string;
  salesPercentage: number;
  lostSalesPercentage: number;
}

const Card: React.FC<CardProps> = ({ title, priceRange, bestColor, salesPercentage, lostSalesPercentage }) => (
  <div className="border border-gray-300 rounded-lg overflow-hidden">
    <div className="bg-[#394049] text-white text-center py-2">
      <h3 className="font-semibold text-lg">{title}</h3>
    </div>
    <div className="p-4">
      {/* <hr className="border-t border-gray-200 my-4" /> */}
      <p><strong>Price Range:</strong> {priceRange}</p>
      <p><strong>Best Color:</strong> {bestColor}</p>
      <p><strong>% of Sales:</strong> {salesPercentage}%</p>
      <p><strong>% of Lost Sales:</strong> {lostSalesPercentage}%</p>
    </div>
  </div>
);

export default Card;