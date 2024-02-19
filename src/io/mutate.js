import { redirect } from "react-router-dom";
import { validateFormDataInAction, generateHttpError } from "./validate";
import { log } from "../util/log";

export const action = async ({ request, params, signal }) => {
  const formData = await request.formData();
  const formDataObject = Object.fromEntries(await formData);
  const intent = formData.get("intent");
  const method = request.method;

  // obj to return as result on edit success
  const result = {
    requestMethod: method,
    success: false,
  };

  // base obj to return on error with edit/delete
  const error = {
    id: params.eventId,
    requestMethod: method,
    name: `Unsuccessful Action: ${intent} event`,
    error: {},
    data: {},
  };

  /* UPDATE event */
  if (request.method === "PATCH" && intent === "edit") {
    validateFormDataInAction(formDataObject, error);

    // validate form data before fetch
    if (Object.keys(error.error).length > 0) {
      log.error("Input Error @mutate>action", error);
      return error;
    }

    // convert categoryIds from strings to numbers - to addhere to original events.json formatting
    formDataObject.categoryIds = formDataObject.categoryIds
      .split("")
      .reduce((resArr, char) => {
        if (char !== ",") {
          resArr = [...resArr, Number(char)];
        }
        return resArr;
      }, []);

    const response = await fetch(
      `http://localhost:3003/events/${params.eventId}`,
      {
        signal,
        method: "PATCH",
        body: JSON.stringify(formDataObject),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      },
    );

    if (!response.ok) {
      log.error("HTTP error @mutate>UPDATE:", response, "\n", request);
      return generateHttpError(error, response, formDataObject);
    }

    result.success = response.ok;
    result.formData = formDataObject;
    return result;
  }

  /* DELETE event */
  if (request.method === "DELETE") {
    const response = await fetch(
      `http://localhost:3003/events/${params.eventId}`,
      {
        method: "DELETE",
      },
    );
    if (!response.ok) {
      log.error("HTTP error @mutate>DELETE:", response, "\n", request);
      return generateHttpError(error, response, formDataObject);
    }
    return redirect("/");
  }
};
