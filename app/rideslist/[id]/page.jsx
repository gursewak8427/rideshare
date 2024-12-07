import React from "react";
import SingleRideDetails from "../../_components/SingleRideDetails";
const page = ({ params }) => {
  return (
    <>
      <SingleRideDetails id={params?.id}></SingleRideDetails>
    </>
  );
};

export default page;
