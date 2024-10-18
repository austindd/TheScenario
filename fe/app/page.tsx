"use client";

import { use, useEffect, useState } from "react"
import FormInputList from "./components/formInputList"
import { Button, Divider } from "@nextui-org/react";
import DataList, { ContentRecord } from "@/app/components/dataList";
import DataForm from "@/app/components/form";
import { useContentApi } from "@/app/hooks/useContentApi";

export default () => {

  // const revalidatedData = async () => {
  //   const result = await fetch(`http://127.0.01:3000/data`, {
  //       method: 'GET',
  //       mode: 'no-cors',
  //   });

  //   console.log(result);

  //   return result;
  // }

  // const [state, setState] = useState<ContentRecord[] | null>(null);
  // const [loadData, setLoadData] = useState(true);

  const { data, isLoading, error, fetchData, addData } = useContentApi();

  useEffect(() => {

    if (isLoading)
      return;

    fetchData()

    // revalidatedData()
    // .then(res=>{
    //   setState(res)
    // })
  })

  const dummyItems = [
    { _id: "1", userName: "user1", content: "content1" },
    { _id: "2", userName: "user2", content: "content2" },
    { _id: "3", userName: "user3", content: "content3" },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="grid grid-cols-3 gap-8 items-center">
        <div className="items-center">
          <DataForm onSubmit={(values) => {addData(values)}} />
        </div>
        <div className="items-center">
          <Divider orientation="vertical" />
        </div>
        <div className="items-center">
          <DataList items={dummyItems} />
        </div>
      </div>
      <div>
        <Button onClick={fetchData}>Update List</Button>
      </div>
    </main>
  )
}
