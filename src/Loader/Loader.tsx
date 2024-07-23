import React from "react";
import { Oval } from "react-loader-spinner";

interface LoaderProps {
  isShow: boolean;
  size: number;
}

export const Loader: React.FC<LoaderProps> = ({ isShow, size }) => {
  return (
    <Oval
      visible={isShow}
      height={size}
      width={size}
      color="#a9ad74"
      secondaryColor="#878787"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};
