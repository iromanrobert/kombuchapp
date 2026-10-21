import { useState, useEffect } from "react";
import Layout from "@/Layout";
import batchService from "../api/batch";

export default function DashboardPage() {
  const [batches, setBatches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        setBatches(await batchService.getAll());
      } catch (error) {
        setError("Failed to load batches");
      }
    };

    fetchBatches();
  }, []);

  if (error) return <p>{error}</p>;
  if (!batches) return <p>loading...</p>;
  return (
    <Layout>
      <>
        {batches.map((batch) => (
          <p key={batch.id}>{batch.name}</p>
        ))}
      </>
    </Layout>
  );
}
