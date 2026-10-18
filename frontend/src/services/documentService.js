import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

const getDocuments = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.DOCUMENTS.GET_DOCUMENTS);
    return response.data?.data;
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      'Failed to fetch documents';
    throw { message, error: message, ...(error.response?.data || {}) };
  }
};

const uploadDocument = async (formData) => {
  try {
    const response = await axiosInstance.post(API_PATHS.DOCUMENTS.UPLOAD, formData);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      'Failed to upload document';
    throw { message, error: message, ...(error.response?.data || {}) };
  }
};

const deleteDocument = async (id) => {
  try {
    const response = await axiosInstance.delete(API_PATHS.DOCUMENTS.DELETE_DOCUMENT(id));
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      'Failed to delete document';
    throw { message, error: message, ...(error.response?.data || {}) };
  }
};

const getDocumentById = async (id) => {
  try {
    const response = await axiosInstance.get(API_PATHS.DOCUMENTS.GET_DOCUMENT_BY_ID(id));
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      'Failed to fetch document details';
    throw { message, error: message, ...(error.response?.data || {}) };
  }
};


const documentService = {
  getDocuments,
  uploadDocument,
  deleteDocument,
  getDocumentById,
};

export default documentService;