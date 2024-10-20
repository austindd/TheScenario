"use client";

import { useCallback, useEffect, useState } from "react"
import EditableDataList from "@/app/components/editableDataList";
import AddDataInput from "@/app/components/addDataInput";
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

  const onSubmit = useCallback(
    (values: FormValues, helpers: FormikHelpers<FormValues>) => {
      const { toAdd, toEdit } = values;
      if (editMode) {
        data && data.forEach(item => {
          if (!item._id) return;
          const inputData = toEdit[item._id];
          if (!inputData) return;
          if (inputData._id === item._id && inputData.data !== item.data) {
            updateData(inputData).then(() => setEditMode(false)).catch(() => setEditMode(false));
          }
        });
      } else if (toAdd.data && toAdd.data.length > 0) {
        addData(toAdd);
        helpers.resetForm();
      }
		}, [data, editMode, addData, updateData]);

	const formik = useFormik<FormValues>({
		initialValues: { toAdd: initialToAdd, toEdit: initialToEdit },
		onSubmit,
    enableReinitialize: true,
	});

  return (
    <main className="flex h-full flex-col items-center justify-center p-24 bg-slate">
      <form className="w-full lg:px-64 md:px-24" onSubmit={formik.handleSubmit}>
        <AddDataInput content={formik.values.toAdd} handleChange={(field: string) => formik.handleChange(field)} onClickEditButton={onClickEditButton} editMode={editMode}  />
        <EditableDataList items={data} formData={formik.values.toEdit} deleteItem={deleteData} handleChange={(field: string) => formik.handleChange(field)} editMode={editMode} />
      </form>
    </main>
  )
}
