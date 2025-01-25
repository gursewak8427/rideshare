import React from "react";
import SingleRideDetails from "../../_components/SingleRideDetails";
const page = ({ params }) => {
  return (
    <>
      <SingleRideDetails isList={true} id={params?.id}></SingleRideDetails>
    </>
  );
};

export default page;
