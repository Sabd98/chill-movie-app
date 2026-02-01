import { Check, Download, Monitor, Smartphone, X } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetSubscriptionPlansQuery, useSubscribeMutation } from "../api/userApi";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router";

const Subscription = () => {
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { data: plans = [], isLoading: isLoadingPlans, error } = useGetSubscriptionPlansQuery();
  const [subscribeApi] = useSubscribeMutation();

  const handleSubscribe = async (planId) => {
    try {
        await subscribeApi(planId).unwrap();
        navigate('/profile');
    } catch (err) {
        console.error("Subscription failed", err);
    }
  };

  if (isLoadingPlans) {
    return (
      <div className="min-h-screen bg-[#181a1c] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#181a1c] pt-[120px]! pb-20!">
      <section className="w-full max-w-[1920px] mx-auto px-4!">
        
        <div className="text-center mb-16!">
          <h1 className="text-3xl font-bold text-white mb-12!">Kenapa Harus Berlangganan?</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12! gap-x-8! max-w-5xl mx-auto!">
            <div className="flex flex-col items-center text-white space-y-4!">
              <Download size={40} strokeWidth={1.5} />
              <p className="font-semibold">Download Konten Pilihan</p>
            </div>
            <div className="flex flex-col items-center text-white space-y-4!">
              <X size={40} strokeWidth={1.5} />
              <p className="font-semibold">Tidak Ada Iklan</p>
            </div>
            <div className="flex flex-col items-center text-white space-y-4!">
              <Monitor size={40} strokeWidth={1.5} />
              <p className="font-semibold">Tonton Semua Konten</p>
            </div>
            <div className="flex flex-col items-center text-white space-y-4!">
              <Monitor size={40} strokeWidth={1.5} />
              <p className="font-semibold">Kualitas Maksimal Sampai Dengan 4K</p>
            </div>
            <div className="flex flex-col items-center text-white space-y-4!">
              <Smartphone size={40} strokeWidth={1.5} />
              <p className="font-semibold text-center max-w-[200px]">Tonton di TV, Tablet, Mobile, dan Laptop</p>
            </div>
            <div className="flex flex-col items-center text-white space-y-4!">
              <Monitor size={40} strokeWidth={1.5} />
              <p className="font-semibold">Subtitle Untuk Konten Pilihan</p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto! px-4!">
          <div className="text-center mb-10!">
            <h2 className="text-2xl font-bold text-white mb-2!">Pilih Paketmu</h2>
            <p className="text-gray-400">Temukan paket sesuai kebutuhanmu!</p>
            {error && (
              <div className="mt-4! p-3! bg-red-500/20 text-red-500 rounded-lg inline-block">
                {error}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8!">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className="bg-gradient-to-br from-[#3d58cb] to-[#1e2a66] rounded-[32px] p-8! flex flex-col hover:scale-105 transition-transform duration-300 relative border border-white/10 shadow-xl"
              >
                {/* Plan Name Pill */}
                <div className="bg-[#000000]/40 text-white px-6! py-2! rounded-full self-start mb-6! text-sm font-bold backdrop-blur-sm">
                  {plan.name}
                </div>

                <div className="text-white mb-8!">
                  <p className="text-base mb-1!">Mulai dari Rp{plan.price.toLocaleString('id-ID')}/{plan.period}</p>
                  <p className="text-sm text-gray-200">{plan.maxUsers} Akun</p>
                </div>

                <div className="flex-1 space-y-4! mb-8!">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start text-white text-sm">
                      <Check size={18} className="mr-3! mt-0.5! flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <Button
                    variant="custom"
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={loading}
                    className="w-full bg-white text-[#1e2a66] hover:bg-gray-200 rounded-full py-3! font-bold transition-colors"
                  >
                    {loading ? 'Memproses...' : 'Langganan'}
                  </Button>
                  
                  <p className="text-center text-[10px] text-white/60 mt-4!">
                    Syarat dan Ketentuan Berlaku
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Subscription;
