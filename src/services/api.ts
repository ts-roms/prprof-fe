
const baseUrl = 'http://localhost:4000'

export interface HistoryProps {
  formula: string;
  result: string;
}

export const getHistory = async (): Promise<HistoryProps[]> => {
  const response = await fetch(`${baseUrl}/history`);
  const data = await response.json();
  console.log('data_received', data);
  return data;
}

export const saveHistory = async (body: HistoryProps) => {
  const response = await fetch(`${baseUrl}/history`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  return response.json();
}

export const clearHistory = async () => {
  const response = await fetch(`${baseUrl}/history`, { 
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
   });
  const data = await response.json();
  return data;
}