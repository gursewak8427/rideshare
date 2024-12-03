import React from "react";
import RideDetails from "../../_components/RideDetails";
const page = ({ params }) => {
  return (
    <>
      <RideDetails id={params?.id}></RideDetails>
    </>
  );
};

export default page;
