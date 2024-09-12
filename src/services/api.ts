import { Record } from "../types/index";

const API_URL = "http://localhost:3000/employees";

export const fetchRecords = async (
	page: number,
	limit: number
): Promise<Record[]> => {
	try {
		if (page > 3) {
			return [];
		}
		const response = await fetch(`${API_URL}?_page=${page}&_per_page=${limit}`);
		if (!response.ok) throw new Error("Network response was not ok");
		const data: { data: Record[] } = await response.json();
		return data.data;
	} catch (error) {
		console.error("Error fetching records:", error);
		return [];
	}
};

export const addRecord = async (data: any) => {
	try {
		console.log("Sending data:", data);
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) throw new Error("Network response was not ok");

		const result = await response.json();
		console.log("Response data:", result);
		return result;
	} catch (error) {
		console.error("Error adding record:", error);
		throw error;
	}
};

// src/services/api.ts

export const deleteRecord = async (id: number): Promise<void> => {
	try {
	  const response = await fetch(`${API_URL}/${id}`, {
		method: "DELETE",
	  });
  
	  if (!response.ok) throw new Error("Network response was not ok");
  
	} catch (error) {
	  console.error("Error deleting record:", error);
	  throw error;
	}
  };
  
