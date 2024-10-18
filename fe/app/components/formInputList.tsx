import {Input} from '@nextui-org/react';

const FormInputList = () => {
	return (
		<div className="">
			<Input label="ID" placeholder="12345678" size="md" />
			<Input label="Username" placeholder="exampleUser42" size="md" />
			<Input label="Content" placeholder="ABC xyz" size="md" />
		</div>
	)

}

export default FormInputList;
