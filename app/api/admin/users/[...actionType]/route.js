import users from "../../../../../backend/models/users";
import { resources } from "../../../../../backend/utility/resources";

export const { GET, POST } = resources(users);
