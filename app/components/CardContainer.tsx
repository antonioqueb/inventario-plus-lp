import React from 'react';
import Card from './Card';

interface CardContainerProps {
  items: { title: string; description: string }[];
}

const CardContainer: React.FC<CardContainerProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <Card key={index} title={item.title} description={item.description} />
      ))}
    </div>
  );
};

export default CardContainer;
