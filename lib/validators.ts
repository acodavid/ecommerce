import { z } from 'zod';
import { formatNumberWithDecimal } from './utils';
import { PAYMENT_METHODS } from './constants';

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    'Price must have exactly two decimal places'
  );

// Schema for inserting products
export const insertProductSchema = z.object({
  name: z.string().min(3, 'Име мора бити најмање 3 слова'),
  slug: z.string().min(3, 'Скраћеница мора бити најмање 3 слова'),
  category: z.string().min(3, 'Категорија мора бити најмање 3 слова'),
  brand: z.string().min(3, 'Бренд мора бити најмање 3 слова'),
  description: z.string().min(3, 'Опис мора бити најмање 3 слова'),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, 'Производ мора имати најмање једну слику'),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

// Schema for updating products
export const updateProductSchema = insertProductSchema.extend({
  id: z.string().min(1, 'Идентификациони број је обавезан'),
});

// Schema for signing users in
export const signInFormSchema = z.object({
  email: z.string().email('Неважећа адреса е-поште'),
  password: z.string().min(6, 'Лозинка мора бити најмање 6 знакова'),
});

// Schema for signing up a user
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, 'Име мора бити најмање 3 слова'),
    email: z.string().email('Неважећа адреса е-поште'),
    password: z.string().min(6, 'Лозинка мора бити најмање 6 знакова'),
    confirmPassword: z
      .string()
      .min(6, 'Потврда лозинке мора бити најмање 6 знакова'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Лозинке се не поклапају',
    path: ['confirmPassword'],
  });

// Cart Schemas
export const cartItemSchema = z.object({
  productId: z.string().min(1, 'Производ је обавезан'),
  name: z.string().min(1, 'Име је обавезно'),
  slug: z.string().min(1, 'Скраћеница је обавезна'),
  qty: z.number().int().nonnegative('Количина мора бити позитиван број'),
  image: z.string().min(1, 'Слика је обавезна'),
  price: currency,
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, 'Сесијски идентификатор корпе је обавезан'),
  userId: z.string().optional().nullable(),
});

// Schema for the shipping address
export const shippingAddressSchema = z.object({
  fullName: z.string().min(3, 'Име мора бити најмање 3 слова'),
  streetAddress: z.string().min(3, 'Адреса мора бити најмање 3 слова'),
  city: z.string().min(3, 'Град мора бити најмање 3 слова'),
  postalCode: z.string().min(3, 'Поштански број мора бити најмање 3 слова'),
  country: z.string().min(3, 'Држава мора бити најмање 3 слова'),
  phoneNumber: z.string().min(7, 'Број телефона је обавезан'),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

// Schema for payment method
export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, 'Метода плаћања је обавезна'),
  })
  .refine((data) => PAYMENT_METHODS.includes(data.type), {
    path: ['type'],
    message: 'Неважећи метод плаћања',
  });

// Schema for inserting order
export const insertOrderSchema = z.object({
  userId: z.string().min(1, 'Корисник је обавезан'),
  itemsPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  totalPrice: currency,
  paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
    message: 'Неважећи метод плаћања',
  }),
  shippingAddress: shippingAddressSchema,
});

// Schema for inserting an order item
export const insertOrderItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  image: z.string(),
  name: z.string(),
  price: currency,
  qty: z.number(),
});

// Schema for the PayPal paymentResult
export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string(),
  pricePaid: z.string(),
});

// Schema for updating the user profile
export const updateProfileSchema = z.object({
  name: z.string().min(3, 'Име мора бити најмање 3 слова'),
  email: z.string().min(3, 'Е-пошта мора бити најмање 3 слова'),
});

// Schema to update users
export const updateUserSchema = updateProfileSchema.extend({
  id: z.string().min(1, 'Идентификациони број је обавезан'),
  role: z.string().min(1, 'Улога је обавезна'),
});

// Schema to insert reviews
export const insertReviewSchema = z.object({
  title: z.string().min(3, 'Наслов мора бити најмање 3 слова'),
  description: z.string().min(3, 'Опис мора бити најмање 3 слова'),
  productId: z.string().min(1, 'Производ је обавезан'),
  userId: z.string().min(1, 'Корисник је обавезан'),
  rating: z.coerce
    .number()
    .int()
    .min(1, 'Оцена мора бити најмање 1')
    .max(5, 'Оцена мора бити највише 5'),
});
