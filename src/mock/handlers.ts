import { rest } from "msw";
import { events, schema } from "./data";

interface Event {
  id: number;
  title: string;
  type: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export const handlers = [
  rest.get("/schema", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(schema));
  }),
  rest.get("/events", (req, res, ctx) => {
    const search = req.url.searchParams.get("search");
    if (!search?.length) {
      return res(ctx.delay(500), ctx.status(200), ctx.json(events));
    } else {
      const filterData = events.filter(
        (item) =>
          item.title.includes(search) || item.description.includes(search)
      );
      return res(ctx.delay(500), ctx.status(200), ctx.json(filterData));
    }
  }),

  rest.post<Event>("/events", (req, res, ctx) => {
    const newEvent: any = req.body;
    let record = JSON.parse(newEvent);
    record["id"] = events.length + 1;
    const event: any = record;
    events.push(event);
    return res(ctx.delay(500), ctx.status(201), ctx.json(newEvent));
  }),

  rest.put("/events/:id", (req, res, ctx) => {
    const { id } = req.params;
    const event: any = req.body;
    const { title, type, startDate, endDate, description } = JSON.parse(event);
    const index = events.findIndex((item) => item.id === Number(id));

    if (index === -1) {
      return res(
        ctx.status(404),
        ctx.json({ message: `event with id ${id} not found` })
      );
    }
    events[index] = {
      ...events[index],
      id: Number(id),
      title,
      type,
      startDate,
      endDate,
      description,
    };

    return res(ctx.delay(500), ctx.status(200));
  }),

  rest.delete("/events/:id", (req, res, ctx) => {
    const { id } = req.params;
    const index = events.findIndex((obj) => obj.id === Number(id));
    if (index !== -1) {
      events.splice(index, 1);
    }
    return res(ctx.delay(500), ctx.status(200), ctx.json(events));
  }),
];
