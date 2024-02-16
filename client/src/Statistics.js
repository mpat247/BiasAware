import React from 'react';

const categories = [
  { name: 'Hockey', image: 'https://placehold.co/200x200.png?text=Hockey' },
  { name: 'Bingo', image: 'https://placehold.co/200x200.png?text=Bingo' },
  { name: 'Tennis', image: 'https://placehold.co/200x200.png?text=Tennis' }
];

const CarouselCard = ({ category }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 w-48 bg-yellow-400 rounded-lg shadow-md m-2">
      <img src={category.image} alt={`Placeholder for ${category.name}`} className="h-32 w-32 rounded-full mt-4" />
      <div className="mt-4 text-xl font-semibold">{category.name}</div>
    </div>
    
  );
};

const CarouselComponent = () => {
  return (
    <div className="bg-purple-800 py-10">
      <div className="flex items-center justify-center">
        <button className="text-yellow-400 text-4xl mx-4">{'<'}</button>
        <div className="flex">
          {categories.map((category, index) => (
            <CarouselCard key={index} category={category} />
          ))}
        </div>
        <button className="text-yellow-400 text-4xl mx-4">{'>'}</button>
      </div>
    </div>
  );
};

<script src="https://cdn.tailwindcss.com"></script>


export default CarouselComponent;
