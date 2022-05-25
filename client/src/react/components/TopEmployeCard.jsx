import React from "react";

const TopEmployeCard = ({ data }) => {
  return (
    <>
      <h2 className="text-center mb-3 text-md">Top employees</h2>
      {data.map((item, index) => (
        <div
          key={item.id}
          className="h-10 text-sm flex justify-between mt-2 border rounded p-3 border-gray-300 items-center"
        >
          <p>{item.id}</p>
          <p>{item.fullname}</p>
          <p style={{ fontSize: "12px" }}>
            {item.score}
            <span className="text-green-600 text-xs relative bottom-1">
              +{item.extra}
            </span>
          </p>
        </div>
      ))}
    </>
  );
};

export default TopEmployeCard;
