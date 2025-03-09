import { NextResponse } from "next/server";
import dbConnect from "../config/db.config";
import { pagination } from "./pagination";

export const resources = (model) => {
  let returnResource = {
    GET: async function GET(request, { params }) {
      await dbConnect();
      const { actionType } = params;
      let tenantModel = model;

      // i.e. /api/categories/single/123123421
      if (actionType[0] === "single") {
        let item = null;
        console.log({ query: request?.query }, "---query");
        if (typeof request?.query?.populate !== "undefined") {
          item = await tenantModel
            .findById(actionType[1])
            .populate(request.query.populate);
        } else {
          item = await tenantModel.findById(actionType[1]);
        }

        if (!item) {
          return NextResponse.json(
            {
              success: false,
              message: `No item found for id ${actionType[1]}`,
            },
            { status: 404 }
          );
        }
        return NextResponse.json({ success: true, data: item });
      } else if (actionType[0] === "delete") {
        // i.e. /api/categories/delete/123123421

        try {
          const item = await tenantModel.findById(actionType[1]).lean();

          if (!item) {
            return NextResponse.json(
              {
                success: false,
                message: `No item found for id ${actionType[1]}`,
              },
              { status: 404 }
            );
          }
          await tenantModel.findOneAndDelete({ _id: actionType[1] });

          return NextResponse.json({
            success: true,
            message: "Item successfully removed",
          });
        } catch (error) {
          return NextResponse.json(
            { success: false, message: error },
            { status: 401 }
          );
        }
      }

      return NextResponse.json(
        { success: false, message: `Action not found` },
        { status: 404 }
      );
    },

    POST: async function POST(request, { params }) {
      await dbConnect();
      let tenantModel = model;
      const body = await request.json();

      const { actionType } = params;
      console.log({ actionType });

      if (actionType[0] === "list") {
        // i.e. /api/categories/list

        return NextResponse.json({
          success: true,
          data: await pagination(body, tenantModel),
        });
      } else if (actionType[0] === "create") {
        // i.e. /api/categories/list

        try {
          let data = await tenantModel.create({ ...body });
          return NextResponse.json({
            success: true,
            message: "Item successfully added",
            data,
          });
        } catch (error) {
          return NextResponse.json(
            { success: false, message: error },
            { status: 401 }
          );
        }
      } else if (actionType[0] === "update") {
        try {
          await tenantModel.updateOne({ _id: actionType[1] }, { $set: body });
          return NextResponse.json({
            success: true,
            message: "Item successfully updated",
          });
        } catch (error) {
          console.log(error, "--error");

          return NextResponse.json(
            { success: false, message: error },
            { status: 401 }
          );
        }
      }

      return NextResponse.json(
        { success: false, message: `Action not found` },
        { status: 404 }
      );
    },
  };

  return returnResource;
};
