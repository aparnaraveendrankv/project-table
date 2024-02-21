import React from "react";

const sizeClasses = {
  txtPoppinsRegular18Gray600: "font-normal font-poppins",
  txtPoppinsRegular18: "font-normal font-poppins",
  txtPoppinsMedium18: "font-medium font-poppins",
  txtPoppinsRegular16: "font-normal font-poppins",
};

const Text = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
