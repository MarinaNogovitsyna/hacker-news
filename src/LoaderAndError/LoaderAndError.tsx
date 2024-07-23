import React from "react";
import { Oval } from "react-loader-spinner";
import styles from "./LoaderAndError.module.css";

interface LoaderAndErrorProps {
  loaderSize: number;
  errorText: string;
  showLoader: boolean;
  showError: boolean;
  backgroundColor?: string;
}

export const LoaderAndError: React.FC<LoaderAndErrorProps> = ({
  errorText,
  loaderSize,
  showError,
  showLoader,
  backgroundColor
}) => {
  if (!showError && !showLoader) {
    return null;
  }
  return (
    <div className={styles.container} style={{background: backgroundColor}}>
      <Oval
        visible={showLoader}
        height={loaderSize}
        width={loaderSize}
        color="#a9ad74"
        secondaryColor="#878787"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      {showError && <span>{errorText}</span>}
    </div>
  );
};
