import { useRef } from "react";
import { Outlet } from "react-router-dom";

const Root: React.FC = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  return (
    <div className="" ref={elementRef}>
      <Outlet />
    </div>
  );
};

export default Root;
