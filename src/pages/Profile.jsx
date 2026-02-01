import { useState } from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  FileText,
  Pencil,
  PencilOff,
  Sparkles,
} from "lucide-react";
import { useSelector } from "react-redux";
import {
  useUpdateUserMutation,
  useUnsubscribeMutation,
} from "../api/userApi";
import { useForm } from "../hooks/useForm";
import { profileSchema } from "../utils/validation";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import "../styles/profile.css";
import { cn } from "../utils/cn";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const [updateUserApi] = useUpdateUserMutation();
  const [unsubscribeApi] = useUnsubscribeMutation();

  const { values, errors, handleChange, validate } = useForm(
    {
      username: user?.username || "",
      password: "",
    },
    profileSchema,
    { formId: user ? `profile-${user.username}` : "profile-guest" },
  );

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (validate()) {
      const userData = {
        username: values.username,
        password: values.password,
      };

      await updateUserApi({
        username: user.username,
        userData,
      }).unwrap();

      setIsEditingUsername(false);
      setIsEditingPassword(false);
    }
  };

  const isSubscribed = user?.subscription?.status === "active";

  return (
    <main className="py-[100px]! min-h-screen bg-[#181a1c] flex flex-col justify-center items-center">
      <div className="w-full max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8! text-center">
          Profil Saya
        </h2>

        <section className="profile-content">
          <div className="profile-left">
            <div className="profile-pic-section mb-8!">
              <img
                src="/Ellipse 395.png"
                alt="Profile"
                className="profile-pic"
              />

              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept="image/*"
                  id="profile-upload"
                  className="hidden"
                />
                <Button
                  variant="info"
                  className="rounded-full px-6! py-2! text-[#3b82f6] border! border-[#3b82f6] hover:bg-[#3b82f6] hover:text-white transition-all"
                  onClick={() =>
                    document.getElementById("profile-upload").click()
                  }
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
                  <Input
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    disabled={!isEditingUsername}
                    error={errors.username}
                    className={cn(
                      "profile-input rounded-lg! bg-white/5! border! pr-[40px]!",
                      errors.username ? "" : "border-white/10!",
                    )}
                    containerClassName="mb-0!"
                  />
                  {isEditingUsername ? (
                    <PencilOff
                      size={20}
                      className="edit-icon"
                      onClick={() => setIsEditingUsername(!isEditingUsername)}
                    />
                  ) : (
                    <Pencil
                      size={20}
                      className="edit-icon"
                      onClick={() => setIsEditingUsername(!isEditingUsername)}
                    />
                  )}
                </div>
              </div>

              <div className="form-group mb-8!">
                <label className="form-label mb-2!">Kata Sandi</label>
                <div className="input-wrapper">
                  <Input
                    type="password"
                    name="password"
                    value={values.password}
                    placeholder="Ubah Kata Sandi"
                    onChange={handleChange}
                    disabled={!isEditingPassword}
                    error={errors.password}
                    showPasswordToggle={false}
                    className={cn(
                      "profile-input rounded-lg! bg-white/5! border! pr-[40px]!",
                      errors.password ? "" : "border-white/10!",
                    )}
                    containerClassName="mb-0!"
                  />
                  {isEditingPassword ? (
                    <PencilOff
                      size={20}
                      className="edit-icon"
                      onClick={() => setIsEditingPassword(!isEditingPassword)}
                    />
                  ) : (
                    <Pencil
                      size={20}
                      className="edit-icon"
                      onClick={() => setIsEditingPassword(!isEditingPassword)}
                    />
                  )}
                </div>
              </div>

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
                  <h4 className="text-white">
                    Saat ini anda belum berlangganan
                  </h4>
                  <p>
                    Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series
                    Kesukaan Kamu!
                  </p>
                  <div className="flex justify-end">
                    <Button
                      className="bg-[#2f3136] hover:bg-[#3b3e44] text-white px-6! py-2! rounded-full text-sm font-semibold border border-gray-600"
                      onClick={() => navigate("/subscription")}
                    >
                      Mulai Berlangganan
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="subscription-card active">
                <div className="bg-[#2f3136] p-3! rounded-full">
                  <Sparkles className="text-yellow-400" size={24} />
                </div>
                <div className="subscription-info flex-1">
                  <div className="mb-2!">
                    <span className="bg-[#192f60] text-blue-200 text-xs px-3! py-1! rounded-full font-semibold">
                      Aktif
                    </span>
                  </div>
                  <h4 className="text-white flex items-center gap-2">
                    Akun Premium {user.subscription.planName}
                    <Sparkles size={16} className="text-yellow-400" />
                  </h4>
                  <p>Saat ini kamu sedang menggunakan akses akun premium</p>
                  <div className="flex justify-between items-center mt-2!">
                    <p className="text-xs text-blue-200 mb-0!">
                      <h5>
                        Berlaku hingga:
                      </h5>
                      <h5>
                         {new Date(user.subscription.endDate).toLocaleDateString(
                        "id-ID",
                        { day: "numeric", month: "long", year: "numeric" },
                      )}
                      </h5>
                     
                    </p>
                    <Button
                      variant="info"
                      onClick={() => unsubscribeApi()}
                      className="w-[15vh] rounded-xl py-6! text-[#ef4444] border-[#ef4444] hover:bg-[#ef4444] hover:text-white transition-all font-semibold"
                    >
                      Berhenti Berlangganan
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Profile;
