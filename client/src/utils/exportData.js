export const exportJSON = (data) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = "opportunities.json";

  a.click();
};

export const exportCSV = (data) => {
  const headers = ["Title", "Type", "Source", "Location", "Organizer"];

  const rows = data.map((item) => [
    item.title,
    item.type,
    item.source,
    item.location,
    item.organizer,
  ]);

  const csvContent = [headers.join(","), ...rows.map((e) => e.join(","))].join(
    "\n",
  );

  const blob = new Blob([csvContent], {
    type: "text/csv",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = "opportunities.csv";

  a.click();
};
