import React from "react";

const SummaryCard = ({ data }) => {
  return (
    <>
      <h2 className="text-center mb-2 text-md align-middle">Summary</h2>
      {data.map((item, index) => (
        <div
          key={item.name}
          className="text-sm h-10 flex justify-between mt-2 border rounded p-3 border-gray-300 items-center"
        >
          <p>{item.name}</p>
          <p style={{ color: item.color, fontSize: "12px" }}>{item.value}</p>
        </div>
      ))}
    </>
  );
};

export default SummaryCard;
