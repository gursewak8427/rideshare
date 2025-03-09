import rides from "../../../../../backend/models/rides";
import { resources } from "../../../../../backend/utility/resources";

export const { GET, POST } = resources(rides);
