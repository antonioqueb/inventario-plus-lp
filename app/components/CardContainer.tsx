// app/components/CardContainer.tsx
import React from 'react';
import Card from './Card';

interface CardContainerProps {
  items: { title: string; description: string }[];
}

const CardContainer: React.FC<CardContainerProps> = ({ items }) => {
  return (
    <div className="grid my-8 mb-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8">
      {items.map((item, index) => (
        <Card key={index} title={item.title} description={item.description} />
      ))}
    </div>
  );
};

export default CardContainer;
