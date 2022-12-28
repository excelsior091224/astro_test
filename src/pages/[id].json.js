export function get({ params }) {
  // Access environment variables per request inside a function
  const serverUrl = "import.meta.env.MICROCMS_SERVICE_DOMAIN";
  const result = await fetch(serverUrl + "/user/" + params.id);
  return {
    body: await result.text(),
  };
}