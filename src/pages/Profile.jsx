import { useState } from "react";
import { Pencil, FileText } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import { loginSchema } from "../utils/validation";
import { updateUser } from "../api/movies";
import Button from "../components/ui/Button";
import "../styles/profile.css";

const Profile = () => {
  const { user, updateUserState } = useAuth();
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [updateMessage, setUpdateMessage] = useState({ type: "", text: "" });

  const { values, errors, handleChange, handleBlur, validate } = useForm(
    {
      username: user?.username || "",
      password: user?.password||"",
    },
    loginSchema,
  );

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const result = await updateUser(user.username, {
          username: values.username,
          password: values.password,
        });

        updateUserState({ 
          ...user, 
          username: result.data.username,
          password: result.data.password 
        });

        setUpdateMessage({
          type: "success",
          text: "Profil berhasil diperbarui!",
        });
        setIsEditingUsername(false);
        setIsEditingPassword(false);

        setTimeout(() => setUpdateMessage({ type: "", text: "" }), 3000);
      } catch (err) {
        setUpdateMessage({ type: "error", text: err.message });
      }
    }
  };

  return (
    <main className="profile-container">
      <h2 className="profile-header my-8!">Profil Saya</h2>

      <div className="profile-content">
        <div className="profile-left">
          <div className="profile-pic-section mb-8!">
            <img
              src="/Ellipse 395.png"
              alt="Profile"
              className="profile-pic"
            />

            <div className="flex flex-col gap-2">
              <Button
                variant="info"
                className="rounded-full px-6! py-2! text-[#3b82f6] border-[#3b82f6] hover:bg-[#3b82f6] hover:text-white transition-all"
              >
                Ubah Foto
              </Button>
              <div className="profile-pic-info">
                <FileText size={16} />
                <span>Maksimal 2MB</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="max-w-[500px]">
            <div className="form-group mb-6!">
              <label className="form-label mb-2!">Nama Pengguna</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!isEditingUsername}
                  className={`profile-input ${errors.username ? "border-red-500" : ""}`}
                />
                <Pencil
                  size={20}
                  className="edit-icon"
                  onClick={() => setIsEditingUsername(!isEditingUsername)}
                />
              </div>
              {errors.username && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.username}
                </span>
              )}
            </div>

            <div className="form-group mb-8!">
              <label className="form-label mb-2!">Kata Sandi</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="password"
                  value={values.password}
                  placeholder="Ubah Kata Sandi"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!isEditingPassword}
                  className={`profile-input ${errors.password ? "border-red-500" : ""}`}
                />
                <Pencil
                  size={20}
                  className="edit-icon"
                  onClick={() => setIsEditingPassword(!isEditingPassword)}
                />
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.password}
                </span>
              )}
            </div>

            {updateMessage.text && (
              <div
                className={`mb-4 p-3 rounded ${updateMessage.type === "success" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}
              >
                {updateMessage.text}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="px-10! py-2! rounded-full bg-[#0F1E93] hover:bg-[#1a2dbb]"
            >
              Simpan
            </Button>
          </form>
        </div>
      </div>

      <section className="my-list-section mt-4!">
        <div className="my-list-header flex justify-between items-center">
          <h3 className="my-list-title text-2xl font-bold">Daftar Saya</h3>
          <a href="#" className="see-all text-gray-400 hover:text-white">
            Lihat Semua
          </a>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          Coming Soon, Under Construction
        </div>
      </section>
    </main>
  );
};

export default Profile;
