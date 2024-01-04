import { redirect } from "react-router-dom";
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "edit") {
    const formDataObject = Object.fromEntries(await formData);
    formDataObject.categoryIds = formDataObject.categoryIds
      .split(",")
      .map((id) => Number(id));

    const response = await fetch(
      `http://localhost:3003/events/${params.eventId}`,
      {
        method: "PATCH",
        body: JSON.stringify(formDataObject),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      },
    );

    return { formData: formDataObject, response };
  }

  if (intent === "delete") {
    const response = fetch(`http://localhost:3003/events/${params.eventId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      return response;
    }
    return redirect("/");
  }

  throw new Error(`The form was submitted with an invalid intent: ${intent}!`);
};
