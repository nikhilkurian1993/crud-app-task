import { useQuery } from "@tanstack/react-query";

const getSchema = async () => {
  return fetch("/schema", {
    method: "GET",
  }).then((res) => res.json());
};

export const useGetSchema = () => {
  return useQuery(["fetchSchema"], () => getSchema());
};
