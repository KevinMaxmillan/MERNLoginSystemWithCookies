import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import authService from "../services/authServices";
import useAuthStore from "../store/authStore";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: authService.getProfile,
    onSuccess: (data) => {
      useAuthStore.getState().setUser(data);
    },
    onError: () => {
      useAuthStore.getState().logoutUser();
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.login,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["profile"]);
    },
  });
};

export const useRegister = () => {
    return useMutation(authService.register);
  };
  
export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      useAuthStore.getState().logoutUser();
      queryClient.clear();
    },
  });
};

export const useTodos = (numericId) => {
  return useQuery({
    queryKey: ["todos", numericId], 
    queryFn: () => authService.fetchTodos(numericId),
    enabled: !!numericId, 
  });
};

