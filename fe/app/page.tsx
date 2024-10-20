"use client";

import { useCallback, useEffect, useState } from "react"
import DataList from "@/app/components/dataList";
import DataForm from "@/app/components/dataForm";
import { useContentApi } from "@/app/hooks/useContentApi";
import { ContentRecord, FormValues } from "@/app/types/formTypes";
import { FormikHelpers, useFormik } from "formik";

export default () => {
  const { data, fetchData, addData, deleteData, updateData } = useContentApi();
  const [editMode, setEditMode] = useState(false);
  const onClickEditButton = useCallback(() => setEditMode(!editMode), [editMode, setEditMode]);

  useEffect(() => {
    fetchData()
  }, []);

	const initialToEdit: Record<string, ContentRecord> = {};
	data && data.forEach(item => {
		if (!item._id) return;
	  initialToEdit[item._id] = item;
	});
  const initialToAdd: ContentRecord = { data: '' };

  console.log('Initial To Edit: ', initialToEdit);
  console.log('Initial To Add: ', initialToAdd);
  console.log('Data: ', data);

  const onSubmit = useCallback(
    (values: FormValues, helpers: FormikHelpers<FormValues>) => {
      console.log('Submitting form');
			console.log('From Form: ', data);
      const { toAdd, toEdit } = values;
      if (editMode) {
        console.log('Editing data');
        data && data.forEach(item => {
          if (!item._id) return;
          const inputData = toEdit[item._id];
          if (!inputData) return;
          if (inputData._id === item._id && inputData.data !== item.data) {
            updateData(inputData);
          }
        });
      } else if (toAdd.data && toAdd.data.length > 0) {
        console.log('Adding data');
        addData(toAdd);
        helpers.resetForm();
      }
		}, [data, editMode, addData, updateData]);

	const formik = useFormik<FormValues>({
		initialValues: { toAdd: initialToAdd, toEdit: initialToEdit },
		onSubmit,
    enableReinitialize: true,
	});

  console.log('Formik: ', formik);

  return (
    <main className="flex h-full flex-col items-center justify-center p-24 bg-slate">
      <form className="w-full lg:px-64 md:px-24" onSubmit={formik.handleSubmit}>
        <DataForm content={formik.values.toAdd} handleChange={(field: string) => formik.handleChange(field)} onClickEditButton={onClickEditButton} editMode={editMode}  />
        <DataList items={data} formData={formik.values.toEdit} deleteItem={deleteData} handleChange={(field: string) => formik.handleChange(field)} editMode={editMode} />
      </form>
    </main>
  )
}
