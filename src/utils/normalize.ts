import { DataType } from "../types/dataType";
export const normalize = (
  message: string,
  status: string,
  dataType: DataType,
  data: any,
) => {
  return {
    meta: {
      message: message,
      status: status,
      dataType: dataType,
    },
    data: data,
  };
};
