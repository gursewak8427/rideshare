import { NextResponse } from "next/server"
import {addride} from "../../../backend/services/rides"
import {deleteallrides} from "../../../backend/services/rides"
export const POST=async(req)=>{
    const body=await req.json()
    const newride=await addride(body)
    return NextResponse.json(newride)}
export const DELETE=async(req)=>{
    await deleteallrides()
    return NextResponse.json({message:"deleted"})
}