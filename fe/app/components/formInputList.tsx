import {Input} from '@nextui-org/react';

const FormInputList = () => {
	return (
		<div className="flex flex-col gap-4">
			<Input label="Username" placeholder="exampleUser42" size="lg" />
			<Input label="Content" placeholder="ABC xyz" size="lg" />
		</div>
	)

}

export default FormInputList;
