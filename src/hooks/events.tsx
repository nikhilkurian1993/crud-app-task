import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

const getEvent = async (term: string) => {
  const path = term ? `/events?search=${encodeURIComponent(term)}` : `/events`;
  return await fetch(path, {
    method: "GET",
  }).then((res) => res.json());
};

const addEvent = async (event: any) => {
  console.log(event, "event in hook");
  return await fetch("/events", {
    method: "POST",
    body: JSON.stringify(event),
  }).then((res) => res);
};

const updateEvent = async (event: any) => {
  console.log(event, "hook event");
  return await fetch(`/events/${event.id}`, {
    method: "PUT",
    body: JSON.stringify(event),
  }).then((res) => res);
};

const deleteEvent = async (id: number) => {
  return await fetch(`/events/${id}`, {
    method: "DELETE",
  }).then((res) => res);
};

export const useGetEvent = (term: string, isEnabled: boolean) => {
  return useQuery(["fetchQuery", term], () => getEvent(term), {
    enabled: isEnabled,
  });
};

export const usePostEvent = () => {
  return useMutation(addEvent);
};

export const useUpdateEvent = () => {
  return useMutation(updateEvent);
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchQuery"]);
      message.success("Deleted data");
    },
    onError: () => {
      message.error("Error while deleting data");
    },
  });
};
