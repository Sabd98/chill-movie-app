import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Username harus diisi'),
  password: z.string().min(1, 'Password harus diisi')
});

export const registerSchema = z.object({
  username: z.string().min(3, 'Username minimal 3 karakter'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  confirmPassword: z.string().min(1, 'Konfirmasi password harus diisi')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

export const profileSchema = z.object({
  username: z.string().min(1, 'Username harus diisi'),
  password: z.string().optional().refine(val => !val || val.length >= 6, {
    message: 'Password minimal 6 karakter jika diisi'
  })
});
