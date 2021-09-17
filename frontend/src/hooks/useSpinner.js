import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useSpinner = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { status: categoryStatus } = useSelector(
    (state) => state.categoryReducer
  );
  const { status: crawlStatus } = useSelector((state) => state.crawlReducer);
  const { status: linkStatus } = useSelector(
    (state) => state.linkDataApiCallReducer
  );
  const { status: loginStatus } = useSelector((state) => state.loginReducer);
  const { status: registerStatus } = useSelector(
    (state) => state.registerReducer
  );

  const loadingCheck = () => {
    if (
      [
        categoryStatus,
        crawlStatus,
        linkStatus,
        loginStatus,
        registerStatus,
      ].some((status) => status === "REQUEST")
    ) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadingCheck();
  }, [
    categoryStatus,
    crawlStatus,
    linkStatus,
    loginStatus,
    registerStatus,
    loadingCheck,
  ]);
  return { isLoading };
};

useSpinner.propTypes = {};

export default useSpinner;
