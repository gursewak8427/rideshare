import React from "react";
import RideDetails from "../../_components/RideDetails";
import { getRideDetails } from "@/backend/services/rides";

const page = async ({ params }) => {
  const data = await getRideDetails(params?.id);

  return (
    <>
      <RideDetails data={{ ...data, _id: data?._id?.toString(), }}></RideDetails>
    </>
  );
};

export default page;
