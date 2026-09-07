import axios from "axios";
import { getToken } from "../utils/storage";
import { API_URL } from "../config/env";

const NOTES_URL = `${API_URL}/notes`;

const getConfig = () => {
  const token = getToken();
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    timeout: 8000,
  };
};

export const getNotes = async () => {
  try {
    const response = await axios.get(NOTES_URL, getConfig());
    // Handle array or object wrapper response
    return response.data?.notes || response.data?.data || response.data;
  } catch (error) {
    throw error;
  }
};

export const getNoteById = async (id) => {
  try {
    const response = await axios.get(`${NOTES_URL}/${id}`, getConfig());
    return response.data?.note || response.data?.data || response.data;
  } catch (error) {
    throw error;
  }
};

export const createNote = async (noteData) => {
  try {
    const response = await axios.post(NOTES_URL, noteData, getConfig());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateNote = async (id, noteData) => {
  try {
    const response = await axios.put(`${NOTES_URL}/${id}`, noteData, getConfig());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`${NOTES_URL}/${id}`, getConfig());
    return response.data;
  } catch (error) {
    throw error;
  }
};
