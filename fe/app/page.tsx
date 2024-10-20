"use client";

import { useEffect } from "react"
import DataList from "@/app/components/dataList";
import DataForm from "@/app/components/dataForm";
import { useContentApi } from "@/app/hooks/useContentApi";

export default () => {
  const { data, fetchData, addData, deleteData, updateData } = useContentApi();

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <main className="flex h-full flex-col items-center justify-center p-24 bg-slate">
      <DataForm onSubmit={addData} />
      <DataList items={data} deleteItem={deleteData} editItem={updateData} />
    </main>
  )
}
