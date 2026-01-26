import { useState } from "react";
import { FileText, Pencil, PencilOff, AlertTriangle, Sparkles } from "lucide-react";
import useAuthStore from "../store/authStore";
import { useForm } from "../hooks/useForm";
import { loginSchema } from "../utils/validation";
import { updateUser } from "../api/user";
import { decryptPassword } from "../utils/crypto";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router";
import "../styles/profile.css";

const Profile = () => {
  const { user, updateUserState, unsubscribe } = useAuthStore();
  const navigate = useNavigate();
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [updateMessage, setUpdateMessage] = useState({ type: "", text: "" });

  const { values, errors, handleChange, validate } = useForm(
    {
      username: user?.username || "",
      password: user?.password ? decryptPassword(user.password) : "",
    },
    loginSchema,
    { formId: user ? `profile-${user.username}` : 'profile-guest' }
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

  const isSubscribed = user?.subscription?.status === 'active';

  return (
    <main className="py-[100px]! min-h-screen bg-[#181a1c] flex flex-col justify-center items-center">
      <div className="w-full max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8! text-center">Profil Saya</h2>

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
                    disabled={!isEditingUsername}
                    className={`profile-input ${errors.username ? "border-red-500" : ""}`}
                  />
                  {isEditingUsername? <PencilOff
                    size={20}
                    className="edit-icon"
                    onClick={() => setIsEditingUsername(!isEditingUsername)}
                  />:<Pencil
                    size={20}
                    className="edit-icon"
                    onClick={() => setIsEditingUsername(!isEditingUsername)}
                  />}
                 
                </div>
                {errors.username && (
                  <span className="text-red-500 text-xs mt-1!">
                    {errors.username}
                  </span>
                )}
              </div>

              <div className="form-group mb-8!">
                <label className="form-label mb-2!">Kata Sandi</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    placeholder="Ubah Kata Sandi"
                    onChange={handleChange}
                    disabled={!isEditingPassword}
                    className={`profile-input ${errors.password ? "border-red-500" : ""}`}
                  />
                  {isEditingPassword ? <PencilOff
                    size={20}
                    className="edit-icon"
                    onClick={() => setIsEditingPassword(!isEditingPassword)}
                  /> : <Pencil
                    size={20}
                    className="edit-icon"
                    onClick={() => setIsEditingPassword(!isEditingPassword)}
                  />}
                  
                </div>
                {errors.password && (
                  <span className="text-red-500 text-xs mt-1!">
                    {errors.password}
                  </span>
                )}
              </div>

              {updateMessage.text && (
                <div
                  className={`mb-4! p-3! rounded ${updateMessage.type === "success" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}
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

          <div className="profile-right">
            {!isSubscribed ? (
              <div className="subscription-card">
                <div className="bg-[#3b3e44] p-3! rounded-full h-fit">
                  <AlertTriangle className="text-orange-500" size={24} />
                </div>
                <div className="subscription-info flex-1">
                  <h4 className="text-white">Saat ini anda belum berlangganan</h4>
                  <p>Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaan Kamu!</p>
                  <div className="flex justify-end">
                    <Button 
                      className="bg-[#2f3136] hover:bg-[#3b3e44] text-white px-6! py-2! rounded-full text-sm font-semibold border border-gray-600"
                      onClick={() => navigate('/subscription')}
                    >
                      Mulai Berlangganan
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="subscription-card active">
                <div className="bg-[#2f3136] p-3! rounded-full h-fit">
                   <Sparkles className="text-yellow-400" size={24} />
                </div>
                <div className="subscription-info flex-1">
                  <div className="mb-2!">
                    <span className="bg-[#192f60] text-blue-200 text-xs px-3! py-1! rounded-full font-semibold">Aktif</span>
                  </div>
                  <h4 className="text-white flex items-center gap-2">
                    Akun Premium {user.subscription.planName}
                    <Sparkles size={16} className="text-yellow-400" />
                  </h4>
                  <p>Saat ini kamu sedang menggunakan akses akun premium</p>
                  <div className="flex justify-between items-center mt-2!">
                    <p className="text-xs text-blue-200 mb-0!">
                      Berlaku hingga {new Date(user.subscription.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    <Button
                      variant="custom"
                      onClick={() => unsubscribe()}
                      className="text-xs text-red-400 hover:text-red-300 bg-[#2f3136] hover:bg-[#3b3e44] rounded-2xl underline cursor-pointer border-none p-1!"
                    >
                      Berhenti Berlangganan
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
