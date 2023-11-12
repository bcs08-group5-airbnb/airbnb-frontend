import { DatePicker, Form, Select } from "antd";

export default function SearchPlaces() {
  const [form] = Form.useForm();
  const onFinishFailed = errorInfo => {
    console.error("Failed:", errorInfo);
  };
  const onFinish = values => {
    console.log(values);
  };
  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      className='bg-black w-full h-auto rounded-full px-6 py-3 text-white grid grid-cols-4 gap-3'
    >
      <div>
        <h1>Địa điểm</h1>
        <Select className='w-full border-none border-transparent focus:shadow-transparent' placeholder='Chọn giới tính'>
          <Select.Option value='male'>Nam</Select.Option>
          <Select.Option value='female'>Nữ</Select.Option>
        </Select>
        <DatePicker className='w-full border-none border-transparent focus:shadow-transparent' />
      </div>
      <div>
        <h1>Nhận phòng</h1>
        <Select className='w-full' placeholder='Chọn giới tính'>
          <Select.Option value='male'>Nam</Select.Option>
          <Select.Option value='female'>Nữ</Select.Option>
        </Select>
      </div>
      <div>
        <h1>Trả phòng</h1>
        <Select className='w-full' placeholder='Chọn giới tính'>
          <Select.Option value='male'>Nam</Select.Option>
          <Select.Option value='female'>Nữ</Select.Option>
        </Select>
      </div>
      <div>
        <h1>Khách</h1>
        <Select className='w-full' placeholder='Chọn giới tính'>
          <Select.Option value='male'>Nam</Select.Option>
          <Select.Option value='female'>Nữ</Select.Option>
        </Select>
      </div>
    </Form>
  );
}
