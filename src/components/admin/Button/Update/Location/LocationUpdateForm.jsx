import React, { useState } from "react";
import { Form, Input, Radio, Select, message } from "antd";
import { locationServ, roomServ } from "../../../../../api/api";
import { useDispatch } from "react-redux";
import { reloadDataLocation } from "../../../../../redux/locationSlice";

const LocationUpdateForm = ({ closeUpdateForm, location }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [isChange, setIsChange] = useState(false);

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  const handleChangeHinhVitri = (evt) => {
    let files = evt.target.files;
    let f = files[0];

    // show preview
    let reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = function (oFREvent) {
      document.getElementById("showHinhVitriUpdate").src =
        oFREvent.target.result;
    };
    setIsChange(true);
  };

  const onFinish = (value) => {
    if (isChange) {
      // upload hinh
      const input = document.querySelector("#hinhVitriUpdate");
      var dataPhoto = new FormData();
      dataPhoto.append("formFile", input.files[0]);

      locationServ
        .uploadPhotoLocation(location.id, dataPhoto)
        .then((res) => {
          const processValues = {
            ...value,
            hinhAnh: res.data.content.hinhAnh,
          };

          locationServ
            .updateLocation(processValues)
            .then((result) => {
              message.success(result.data.message);
              dispatch(reloadDataLocation());
              setIsChange(false);
              closeUpdateForm();
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          message.error(error.response.data.content);
        });
    } else {
      locationServ
        .updateLocation({ ...value, hinhAnh: location.hinhAnh })
        .then((result) => {
          message.success(result.data.message);
          dispatch(reloadDataLocation());
          closeUpdateForm();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div
      className="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
      style={{ marginLeft: 0 }}
    >
      <div
        className="w-full px-6 py-4 overflow-scroll max-h-[70vh] bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl"
        role="dialog"
        id="modal"
      >
        <header className="flex justify-end">
          <button
            className="inline-flex items-center justify-center w-6 h-6 text-gray-400 transition-colors duration-150 rounded dark:hover:text-gray-200 hover: hover:text-gray-700"
            aria-label="close"
            onClick={closeUpdateForm}
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              role="img"
              aria-hidden="true"
            >
              <path
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        </header>
        <div className="mt-4 mb-6">
          <p className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
            Cập nhật vị trí
          </p>

          <div className="mb-10">
            <img
              src={location.hinhAnh}
              className="h-[200px] w-full object-cover rounded-[3px]"
              alt="hinh anh phong thue"
              id="showHinhVitriUpdate"
            />

            <div>
              <label
                htmlFor="hinhVitriUpdate"
                className=" bg-gray-300 rounded-[3px] px-3 inline-block cursor-pointer hover:text-white hover:bg-slate-500 mt-3"
              >
                Change
              </label>
              <input
                type="file"
                name="hinhVitriUpdate"
                id="hinhVitriUpdate"
                className="hidden"
                onChange={handleChangeHinhVitri}
              />
            </div>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="grid grid-cols-1">
              <Form.Item
                name="id"
                label="Mã vị trí"
                initialValue={location?.id}
              >
                <Input name="id" disabled placeholder="Điền tên vào đây..." />
              </Form.Item>
              <Form.Item
                name="tenViTri"
                label="Tên vị trí"
                initialValue={location?.tenViTri}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng ghi tên vị trí!",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  name="tenViTri"
                  placeholder="Điền tên vị trí vào đây..."
                />
              </Form.Item>

              <Form.Item
                name="tinhThanh"
                label="Tên tỉnh thành"
                initialValue={location?.tinhThanh}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng ghi tên tỉnh thành!",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  name="tinhThanh"
                  placeholder="Điền tên tỉnh thành vào đây..."
                />
              </Form.Item>

              <Form.Item
                name="quocGia"
                label="Tên quốc gia"
                initialValue={location?.quocGia}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng ghi tên quốc gia!",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  name="quocGia"
                  placeholder="Điền tên quốc gia vào đây..."
                />
              </Form.Item>
            </div>
            <footer className="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800 mt-5">
              <button
                onClick={closeUpdateForm}
                className="w-full px-5 py-3 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
              >
                Huỷ
              </button>
              <button className="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-primary border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-primary hover:bg-primary-dark focus:outline-none focus:shadow-outline-purple">
                Cập nhật
              </button>
            </footer>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LocationUpdateForm;
