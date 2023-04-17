export const events = [
  {
    id: 1,
    title: "Start of the year",
    type: "generic",
    startDate: "2022-01-01",
    endDate: "2022-12-01",
    description: "This is an event about the start of this year",
  },
  {
    id: 2,
    title: "Mediagenix holiday",
    type: "holiday",
    startDate: "2022-04-04",
    endDate: "2022-04-05",
    description: "Celebrating Mediagenix",
  },
];

export const schema = [
  {
    name: "title",
    label: "Title",
    component: "text",
    required: true,
  },
  {
    name: "type",
    component: "select",
    label: "Type",
    required: true,
    options: [
      {
        label: "Generic",
        value: "generic",
      },
      {
        label: "Holiday",
        value: "holiday",
      },
    ],
  },
  {
    name: ["startDate", "endDate"],
    component: "range_picker",
    label: "Date",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    component: "textarea",
  },
];
