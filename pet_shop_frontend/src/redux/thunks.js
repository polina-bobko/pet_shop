import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';


//Получение всех категорий товаров
export const getAllCategories = createAsyncThunk(
  'data/getAllCategories',
  async () => {
    try {
      const response = await axios.get('http://localhost:3333/categories/all');
      return response.data;
    } catch (error) {
      console.error('There was an error fetching the categories!', error);
      throw error;
    }
  }
)

// Получение продуктов по категории
export const getProductsByCategory = createAsyncThunk(
  'data/getProductsByCategory',
  async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:3333/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('There was an error fetching the products!', error);
      throw error;
    }
  }
)

// Получение всех продуктов
export const getAllProducts = createAsyncThunk(
  'data/getAllProducts',
  async ( _ , { getState }) => {
  /* async ({ getState }) => { */
    const existingProducts = getState().products.products;
    if (existingProducts && existingProducts.length > 0) {
      return existingProducts; // Не загружаем заново, если товар уже в state
    } 
    try {
      const response = await axios.get('http://localhost:3333/products/all');
      return response.data;
    } catch (error) {
      console.error('There was an error fetching the products!', error);
      throw error;
    }
  }
)

// Получение продукта по id
/* export const getProductById = createAsyncThunk(
  'data/getProductById',
  async (productId) => {
    try {
      const response = await axios.get(`http://localhost:3333/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('There was an error fetching the product!', error);
      throw error;
    }
  }
) */

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (productId, { getState }) => {
    const existingProduct = getState().products.product;
    if (existingProduct && existingProduct.id === productId) {
      return existingProduct; // Не загружаем заново, если товар уже в state
    } 
    try {
      const response = await axios.get(`http://localhost:3333/products/${productId}`);
      /* if (!response.ok) {
        throw new Error("Failed to fetch product");
      } */
      return response.data;
    } catch (error) {
      console.error('There was an error fetching the product!', error);
      throw error;
    }

  }
);

// Оформление заказа
export const sendOrder = createAsyncThunk(
  "data/sendOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3333/order/send", orderData);
      console.log("Order successfully placed!", response.data);
      return response.data;
    } catch (error) {
      console.error("There was an error sending the order!", error);
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);