import React from "react";

const ActionItem = ({ icon, handleClick }: any) => {
  return <div onClick={handleClick}>{icon}</div>;
};

export default ActionItem;
