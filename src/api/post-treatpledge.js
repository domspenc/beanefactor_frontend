async function postTreatPledge(pledgeData, token) {
  const url = `${import.meta.env.VITE_API_URL}/treatpledges/`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(pledgeData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.detail || "Failed to create treat pledge. Please try again."
    );
  }

  return response.json();
}

export default postTreatPledge;
