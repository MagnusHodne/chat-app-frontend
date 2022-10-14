import { useEffect, useState } from "react";

export function useLoading<Type>(
  loadingFunction: () => Promise<Type>,
  deps: any[] = []
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<Type>();

  async function load() {
    try {
      setLoading(true);
      setData(await loadingFunction());
    } catch (error) {
      setError(error);
    } finally {
      //Either we have the data, or we have an error. Regardless, loading should now be false
      setLoading(false);
    }
  }

  //Calls the load function once on first invocation, and then every time a dependency changes
  useEffect(() => {
    load();
  }, deps);

  return { loading, error, data, reload: load };
}
