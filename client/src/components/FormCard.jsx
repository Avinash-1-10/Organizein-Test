import React from 'react';

const FormCard = ({ title, description }) => {
  return (
    <div className="w-[350px] rounded overflow-hidden shadow-lg bg-white p-4 m-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          {description}
        </p>
      </div>
    </div>
  );
}

export default FormCard;
