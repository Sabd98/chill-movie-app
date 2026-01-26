import api from "./apiRoot";

export const getSubscriptionPlans = async () => {
  try {
    const response = await api.get("/plans.json");
  
    if (!response.data) return { data: [] };
    
    const data = Array.isArray(response.data) 
      ? response.data 
      : Object.keys(response.data).map(key => ({ id: key, ...response.data[key] }));

    const validData = data.filter(item => item !== null);

    return { data: validData };
  } catch (error) {
    console.error("Error fetching subscription plans:", error);
    throw error;
  }
};

const findUserByUsername = async (username) => {
  try {
    const response = await api.get('/users.json');
    const usersMap = response.data || {};
    const users = Array.isArray(usersMap) 
      ? usersMap.map((user, index) => ({ id: index.toString(), ...user })).filter(Boolean)
      : Object.entries(usersMap).map(([key, value]) => ({ id: key, ...value }));
      
    return users.find(u => u.username === username);
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
};

export const subscribeToPlan = async (username, planId) => {
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      throw new Error("User tidak ditemukan");
    }

    const plansResponse = await getSubscriptionPlans();
    const plan = plansResponse.data.find(p => p.id === planId);
    
    if (!plan) {
      throw new Error("Paket tidak ditemukan");
    }

    const subscriptionData = {
      status: 'active',
      planId: plan.id,
      planName: plan.name,
      price: plan.price,
      startDate: new Date().toISOString(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(), // 1 bulan
    };

    // 4. Update User di Firebase
    await api.patch(`/users/${user.id}.json`, { subscription: subscriptionData });

    return { success: true, message: "Berhasil berlangganan!", data: subscriptionData };
  } catch (error) {
    console.error("Error subscribing to plan:", error);
    throw error;
  }
};

export const unsubscribeFromPlan = async (username) => {
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      throw new Error("User tidak ditemukan");
    }

    const inactiveSubscription = {
      status: 'inactive',
      planId: null,
      planName: null,
      endDate: null
    };

    await api.patch(`/users/${user.id}.json`, { subscription: inactiveSubscription });

    return {
      success: true,
      data: inactiveSubscription
    };
  } catch (error) {
    console.error("Error unsubscribing:", error);
    throw error;
  }
};
