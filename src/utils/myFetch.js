export default async ({ url, method, successType, failType, data }) => {
  let response;
  try {
    response = await fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  } catch (e) {
    return { type: failType };
  }
  const json = await response.json();
  return { type: successType, response: json };
};
