import { products } from "../../utils/data";

export default function HomeSkeleton() {
  return (
    <div className="w-full h-full">
      <div
        className="grid lg:gap-10 grid-cols-2 mt-8  
      md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 "
      >
        <div
          className="skeleton
            rounded-sm duration-150
            hover:cursor-pointer my-4 lg:my-1 lg:p-4 shadow-md lg:h-[240px] lg:w-[240px] 
            max-w-full lg:max-w-[250px]"
        ></div>
        <div
          className="skeleton
            rounded-sm duration-150
            hover:cursor-pointer my-4 lg:my-1 lg:p-4 shadow-md lg:h-[240px] lg:w-[240px] 
            max-w-full lg:max-w-[250px]"
        ></div>
        <div
          className="skeleton
            rounded-sm duration-150
            hover:cursor-pointer my-4 lg:my-1 lg:p-4 shadow-md lg:h-[240px] lg:w-[240px] 
            max-w-full lg:max-w-[250px]"
        ></div>
        <div
          className="skeleton
            rounded-sm duration-150
            hover:cursor-pointer my-4 lg:my-1 lg:p-4 shadow-md lg:h-[240px] lg:w-[240px] 
            max-w-full lg:max-w-[250px]"
        ></div>
        <div
          className="skeleton
            rounded-sm duration-150
            hover:cursor-pointer my-4 lg:my-1 lg:p-4 shadow-md lg:h-[240px] lg:w-[240px] 
            max-w-full lg:max-w-[250px]"
        ></div>
      </div>

    </div>
  );
}
