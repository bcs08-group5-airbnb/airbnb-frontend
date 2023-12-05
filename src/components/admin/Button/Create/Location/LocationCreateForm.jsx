import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { locationServ } from "../../../../../api/api";
import { useDispatch } from "react-redux";
import { reloadDataLocation } from "../../../../../redux/locationSlice";

const LocationCreateForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  //   const [locations, setLocations] = useState(null);
  const [isSelectedPhoto, setIsSelectedPhoto] = useState(false);
  const [errHinhAnh, setErrHinhAnh] = useState(null);

  const handleChangeHinhAnh = (evt) => {
    let files = evt.target.files;
    let f = files[0];

    // show preview
    let reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = function (oFREvent) {
      document.getElementById("showHinhVitri").src = oFREvent.target.result;
    };

    setIsSelectedPhoto(true);
    setErrHinhAnh(null);
  };

  const onFinishFailed = (errorInfo) => {
    if (!isSelectedPhoto) {
      setErrHinhAnh("Vui lòng chọn hình ảnh!");
    }
    console.error("Failed:", errorInfo);
  };

  const onFinish = (values) => {
    if (!isSelectedPhoto) {
      setErrHinhAnh("Vui lòng chọn hình ảnh!");
      return;
    }

    locationServ
      .createLocation(values)
      .then((response) => {
        const mess = response.data.message;
        const { id } = response.data.content;

        // upload hinh
        const input = document.querySelector("#hinhAnhVitri");
        var dataPhoto = new FormData();
        dataPhoto.append("formFile", input.files[0]);

        locationServ
          .uploadPhotoLocation(id, dataPhoto)
          .then((res) => {
            dispatch(reloadDataLocation());
            message.success(mess);
            closeModal();
          })

          .catch((error) => {
            locationServ.deleteLocation(id);
            message.error(error.response.data.content);
          });
      })
      .catch((error) => {
        message.error(error.response.data.content);
      });
  };

  return (
    <div className="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center">
      <div
        className="w-full px-6 py-4 overflow-scroll bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl max-h-[70vh] overflow-y-scroll"
        role="dialog"
        id="modal"
      >
        <header className="flex justify-end">
          <button
            className="inline-flex items-center justify-center w-6 h-6 text-gray-400 transition-colors duration-150 rounded dark:hover:text-gray-200 hover: hover:text-gray-700"
            aria-label="close"
            onClick={closeModal}
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
          <p className="mb-4 text-lg font-semibold text-black dark:text-gray-300">
            Thêm vị trí
          </p>

          <div className="mb-5">
            <p>Thêm hình</p>

            <img id="showHinhVitri" className=" rounded-[5px]" />

            {!isSelectedPhoto ? (
              <label
                htmlFor="hinhAnhVitri"
                className="w-[50px] h-[50px] border-[1px] border-primary rounded-[3px] block text-center leading-[50px] cursor-pointer"
              >
                +
              </label>
            ) : (
              <label
                htmlFor="hinhAnhVitri"
                className=" bg-gray-300 rounded-[3px] px-3  mt-2 inline-block cursor-pointer"
              >
                Change
              </label>
            )}
            <input
              type="file"
              id="hinhAnhVitri"
              name="hinhAnhVitri"
              className="hidden"
              onChange={handleChangeHinhAnh}
            />
            {errHinhAnh && (
              <p className="text-[14px] text-primary">{errHinhAnh}</p>
            )}
          </div>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="grid grid-cols-1 ">
              <Form.Item
                name="tenViTri"
                label="Tên vị trí"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên vị trí!",
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder="Điền tên vị trí vào đây..." />
              </Form.Item>
              <Form.Item
                label="Tỉnh thành"
                name="tinhThanh"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Tỉnh thành!",
                  },
                ]}
              >
                <Input placeholder="Nhập Tỉnh thành vào đây" />
              </Form.Item>

              <Form.Item
                label="Quốc gia"
                name="quocGia"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Quốc gia!",
                  },
                ]}
              >
                <Input placeholder="Nhập Quốc gia vào đây" />
              </Form.Item>
            </div>
            <footer className="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800 mt-5">
              <button
                onClick={closeModal}
                className="w-full px-5 py-3 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
              >
                Huỷ
              </button>
              <button className="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-primary border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-primary hover:bg-primary-dark focus:outline-none focus:shadow-outline-purple">
                Thêm mới
              </button>
            </footer>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LocationCreateForm;
