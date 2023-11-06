import React from "react";

const LoadingPage: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-wrap content-center justify-center ">
      <div className="h-32 w-32 animate-spin rounded-full border-b-4 border-gray-900 dark:border-gray-300 "></div>
    </div>
  );
};

export default LoadingPage;
