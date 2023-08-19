"use client";
import axios from "axios";

/**
 * Instância axios que cuida das requisições para a API
 */
export const axiosInstance = axios.create({
  baseURL: "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
