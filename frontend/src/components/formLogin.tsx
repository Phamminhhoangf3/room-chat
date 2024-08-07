import React from "react";
import SelectAvatar from "./selectAvatar";

export const FormLogin = ({ joinRoom, valuesForm, setValuesForm }) => {
  const { username, avatar, room } = valuesForm;
  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col items-center justify-center">
      <form className="w-full max-w-sm" onSubmit={joinRoom}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="text-báse block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              Tên:
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              placeholder="Nhập tên"
              value={username}
              onChange={(e) =>
                setValuesForm((prev) => ({ ...prev, username: e.target.value }))
              }
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="text-base block tracking-wide text-gray-500 font-bold mb-2"
              htmlFor="grid-state"
            >
              Phòng:
            </label>
          </div>
          <div className="relative md:w-2/3">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              value={room}
              onChange={(e) =>
                setValuesForm((prev) => ({ ...prev, room: e.target.value }))
              }
            >
              <option value="1">Phòng 1</option>
              <option value="2">Phòng 2</option>
              <option value="3">Phòng 3</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <SelectAvatar value={avatar} setValuesForm={setValuesForm} />
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <input
              type="submit"
              className="text-base shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              value="Vào phòng"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
