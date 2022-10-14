export async function postJSON(url: string, object: object) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(object),
  });
  if (!res.ok) {
    throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
  }
  return await res.json();
}

export async function deleteJSON(url: string, object: object) {
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
export async function postJSONNoReturn(url: string, object: object) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(object),
  });
  if (!res.ok) {
    throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
  }
}

export async function putJSON(url: string, object: object) {
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(object),
  });
  if (!res.ok) {
    throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
  }
}

export async function fetchJSON(url: string, options?: RequestInit) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Failed to load ${res.status}: ${res.statusText}`);
  }
  return await res.json();
}
