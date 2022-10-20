//=========== Methods without authorization ===========//

async function postJSON(url: string, object: object, options?: RequestInit) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(object),
    ...options,
  });
  if (!res.ok) {
    throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
  }
  return await res.json();
}

async function deleteJSON(url: string, object: object) {
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      body: JSON.stringify(object),
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to delete ${res.status}: ${res.statusText}`);
  }
}
async function postJSONNoReturn(
  url: string,
  object: object,
  options?: RequestInit
) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(object),
    ...options,
  });
  if (!res.ok) {
    throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
  }
}

async function putJSON(url: string, object: object, options?: RequestInit) {
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(object),
    ...options,
  });
  if (!res.ok) {
    throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
  }
}

async function fetchJSON(url: string, options?: RequestInit) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Failed to load ${res.status}: ${res.statusText}`);
  }
  return await res.json();
}

//=========== Methods with authorization ===========//
async function fetchJSONWithToken(url: string, token: string) {
  const res = await fetch(url, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to load ${res.status}: ${res.statusText}`);
  }
  return await res.json();
}

async function postJSONWithToken(url: string, token: string, payload: any) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
  }
  return await res.json();
}

export {
  fetchJSON,
  putJSON,
  postJSON,
  postJSONNoReturn,
  deleteJSON,
  fetchJSONWithToken,
  postJSONWithToken,
};
