import { useEffect, useState } from "react";
``;
import { useRouter } from "next/router";
import TextInput from "@/components/ui/textinput";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { useAlert } from "@/components/global/AlertContext";
import Register from "@/components/register/RegisterForm";
import ForgotPassword from "@/components/forgotpassword/ForgotPassword";
import { login, ssoLogin, checkRole } from "@/api/auth";
import { getToken, setToken } from "@/storage/token";

const LoginForm = () => {
  const { showAlert } = useAlert();
  const router = useRouter();

  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);

  useEffect(() => {
    const checkTokenAndRole = async () => {
      const token = getToken();

      if (!token || router.pathname !== "/login") return;

      try {
        const data = await checkRole(token);
        console.log("Data role:", data);
        const { role } = data;

        if (!role) {
          console.error("Role tidak ditemukan dalam response");
          return;
        }

        localStorage.setItem("role", role);
        router.replace("/dashboard");
      } catch (err) {
        console.warn("Gagal validasi token atau ambil role:", err);
        localStorage.removeItem("role");
      }
    };

    checkTokenAndRole();
  }, [router]);

  const handleLogin = async () => {
    setErrors({});
    try {
      const data = await login(username, password);
      if (data.status !== "success") throw new Error(data.message);

      // 1. Simpan token ke localStorage
      setToken(data.token);
      localStorage.setItem("token", data.token); // Pastikan token diset ke localStorage

      // 2. Cek role setelah token diset
      const { role } = await checkRole(data.token);
      if (!role) {
        throw new Error("Role tidak ditemukan");
      }

      // 3. Simpan role ke localStorage
      localStorage.setItem("role", role);

      showAlert("Login berhasil!", "success");
      router.push("/dashboard");
    } catch (err: any) {
      showAlert("Email atau Kata Sandi salah!", "error");
    }
  };

  const handleSSOLogin = async () => {
    try {
      const data = await ssoLogin("YOUR_SSO_TOKEN");
      if (!data.success) throw new Error("Login SSO gagal.");

      setToken(data.token);
      showAlert("Login SSO berhasil!", "success");
      router.push("/dashboard");
    } catch (err: any) {
      showAlert(err.message || "Gagal login SSO", "error");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center flex-grow mt-[56px]">
        <div className="self-center text-center mb-6">
          <h5 className="text-H5 text-emphasis-on_surface-high">
            Selamat Datang di Katalog HSPW!
          </h5>
          <p className="text-B1 text-emphasis-on_surface-medium max-w-[384px]">
            Katalog Informasi Harga Satuan Pokok Material Peralatan Tenaga Kerja
            Konstruksi per Wilayah
          </p>
        </div>

        <div className="w-full max-w-[336px] space-y-4">
          <TextInput
            label="Email"
            placeholder="Masukkan Email"
            value={username}
            onChange={handleEmailChange}
            isRequired
            errorMessage={errors?.username}
          />
          {errors.username && (
            <p className="text-custom-red-500">{errors.username}</p>
          )}

          <div className="space-y-1">
            <TextInput
              label="Password"
              type="password"
              placeholder="Masukkan Password"
              value={password}
              onChange={handlePasswordChange}
              isRequired
              errorMessage={errors?.password}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}

            <Button
              onClick={() => setIsForgotPasswordModalOpen(true)}
              variant="red_text"
              size="ExtraSmall"
              className="custom-padding">
              Lupa Kata Sandi
            </Button>
          </div>

          <div className="space-y-2">
            <Button
              onClick={handleLogin}
              variant="solid_blue"
              size="Medium"
              className="w-full">
              Masuk
            </Button>

            <div className="relative flex py-4 items-center">
              <div className="flex-grow border-t-2 border-emphasis-on_surface-small rounded-full" />
              <span className="flex-shrink mx-4 text-custom-neutral-500 text-Overline">
                ATAU
              </span>
              <div className="flex-grow border-t-2 border-emphasis-on_surface-small rounded-full" />
            </div>
          </div>

          <div className="space-y-2">
            <Button
              onClick={handleSSOLogin}
              variant="disabled"
              size="Medium"
              className="w-full">
              Masuk menggunakan SSO
            </Button>

            <div className="gap-x-1 flex items-center justify-center">
              <p className="text-Small text-neutral-500 text-center">
                Belum punya akun?
              </p>
              <div className="grid justify-end">
                <Button
                  onClick={() => setIsRegisterModalOpen(true)}
                  variant="blue_text"
                  className="custom-padding"
                  size="ExtraSmall">
                  Daftar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}>
        <Register onClose={() => setIsRegisterModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isForgotPasswordModalOpen}
        onClose={() => setIsForgotPasswordModalOpen(false)}>
        <ForgotPassword onClose={() => setIsForgotPasswordModalOpen(false)} />
      </Modal>
    </>
  );
};

export default LoginForm;
