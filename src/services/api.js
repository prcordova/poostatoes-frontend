import axios from "axios";

export const API_BASE_URL = window.location.host.includes("localhost:3000")
  ? "http://localhost:4000"
  : "https://poostatoes-api.vercel.app";

export const createNewPost = async (title, summary, content, files, token) => {
  const data = new FormData();
  data.set("title", title);
  data.set("summary", summary);
  data.set("content", content);
  data.set("file", files[0]);

  try {
    const response = await axios.post(`${API_BASE_URL}/post`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to create new post");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPostById = async (postId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/post/${postId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch post by ID");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePost = async (
  postId,
  title,
  summary,
  content,
  files,
  token
) => {
  const data = new FormData();
  data.set("title", title);
  data.set("summary", summary);
  data.set("content", content);
  data.set("id", postId);

  if (files?.[0]) {
    data.set("file", files?.[0]);
  }

  try {
    const response = await axios.put(`${API_BASE_URL}/post`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to update post");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/post`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch all posts");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/login`,
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Erro : ", error);

    throw error;
  }
};
