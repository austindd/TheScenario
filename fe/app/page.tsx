"use client";

import { useEffect } from "react"
import DataList from "@/app/components/dataList";
import DataForm from "@/app/components/form";
import { useContentApi } from "@/app/hooks/useContentApi";

export default () => {
  const { data, fetchData, addData, deleteData } = useContentApi();

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <main className="flex h-full flex-col items-center justify-center p-24 bg-slate">
      <div>
        <div className="items-center p-4">
          <DataForm onSubmit={addData} />
        </div>
      </div>
      <DataList items={data} deleteItem={deleteData} />
    </main>
  )
}
