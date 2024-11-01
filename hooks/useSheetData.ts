// hooks/useSheetData.ts
import { useState, useEffect } from 'react';

export function useSheetData() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch('/api/sheets')
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
    console.log("useSheetData fetched");
  }, []);



  return { data, loading, error };
}