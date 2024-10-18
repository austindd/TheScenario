"use client";

import { useEffect, useState } from "react"
import FormInputList from "./components/formInputList"
import { Divider } from "@nextui-org/react";
import DataList from "@/app/components/dataList";

export default () => {

  const revalidatedData = async () => {
    const result = await fetch(`http://127.0.01:3000/data`, {
        method: 'GET',
        mode: 'no-cors',
    });

    console.log(result);

    return result;
  }
  
  const [state, setState] = useState<Response>();
  const [loadData, setLoadData] = useState(true);

  useEffect(()=>{

    if (!loadData)
      return;

    setLoadData(false)

    revalidatedData()
    .then(res=>{
      setState(res)
    })
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
          <FormInputList />
        </div>
        <div className="items-center">
          <Divider orientation="vertical" />
        </div>
        <div className="items-center">
          <DataList items={dummyItems} />
        </div>
      </div>
    </main>
  )
}
