import React from "react";

const avatars = [
  { id: 1, src: "/User1.png", alt: "Avatar 1" },
  { id: 2, src: "/User2.png", alt: "Avatar 2" },
  { id: 3, src: "/User3.png", alt: "Avatar 3" },
];

const SelectAvatar = ({ value, setValuesForm }) => {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-white border rounded-lg p-4">
        <h2 className="text-base text-gray-500 font-bold mb-4 text-center">Chọn ảnh đại diện:</h2>
        <div className="grid grid-cols-3 gap-4">
          {avatars.map((avatar) => (
            <div key={avatar.id} className="relative">
              <input
                type="radio"
                name="avatar"
                id={`avatar${avatar.id}`}
                className="hidden peer"
                checked={value === avatar.src}
                onChange={() =>
                  setValuesForm((prev) => ({ ...prev, avatar: avatar.src }))
                }
              />
              <label htmlFor={`avatar${avatar.id}`} className="cursor-pointer">
                <img
                  src={avatar.src}
                  alt={avatar.alt}
                  className={`rounded-full border-2 ${
                    value === avatar.src
                      ? "border-purple-500"
                      : "border-transparent"
                  }`}
                />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectAvatar;
