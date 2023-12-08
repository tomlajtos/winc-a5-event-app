import {useData} from "./useData"

export const useMultiDataObj = (endpoints) => {
  const dataObj= endpoints.reduce(( res,endpoint ) => ({...res,[endpoint.name]:useData(endpoint.path)}),{})

  return dataObj
}
