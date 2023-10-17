import { redirect } from "react-router-dom";

export const action = async ({ params }) => {
  const response = fetch(`http://localhost:3003/events/${params.eventId}`, {
    method: "DELETE",
  });
  console.log(await response);
  console.log(params);
  return redirect("/");
};
