import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, incrementAsync, selectCount } from "./counterSlice";

const Counter = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div>
      <div>Counter</div>
    </div>
  );
};

export default Counter;
