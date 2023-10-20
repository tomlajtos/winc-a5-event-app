import { redirect } from "react-router-dom";

export const action = async ({ request, params }) => {
  const updates = Object.fromEntries(await request.formData());

  updates.categoryIds = updates.categoryIds.split(",").map((id) => Number(id));
  const response = await fetch(
    `http://localhost:3003/events/${params.eventId}`,
    {
      method: "PATCH",
      body: JSON.stringify(updates),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );
  const json = await response.json();
  // console.log("RESPONSE", response);
  // console.log("DATA", json);

  return redirect(`/event/${params.eventId}`);
};
