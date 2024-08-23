import React from 'react';
import { ApiResponse as ApiResponseType } from './api';

interface ApiResponseProps {
  apiResponse: ApiResponseType;
}

// const ApiResponse: React.FC<ApiResponseProps> = ({ apiResponse }) => {
//   return (
//     <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//       <h2 className="text-xl font-bold mb-4">API Response</h2>
//       <pre className="bg-gray-100 p-4 rounded-md mb-4 whitespace-pre-wrap">
//         {apiResponse.content}
//       </pre>
      
//       <div className="bg-gray-100 p-4 rounded-md mb-4">
//         <h2 className="text-xl font-bold mb-4">Other Info</h2>
//         <div className="flex flex-col space-y-2">
//           <div><span className="font-bold">Model:</span> {apiResponse.model}</div>
//           <div><span className="font-bold">Prompt Tokens:</span> {apiResponse.prompt_tokens}</div>
//           <div><span className="font-bold">Completion Tokens:</span> {apiResponse.completion_tokens}</div>
//           <div><span className="font-bold">Total Tokens:</span> {apiResponse.total_tokens}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

const ApiResponse: React.FC<ApiResponseProps> = ({ apiResponse, otherInfo }) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">API Response</h2>
      <pre className="bg-gray-100 p-4 rounded-md mb-4 whitespace-pre-wrap">
        {apiResponse.content}
      </pre>

        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <h2 className="text-xl font-bold mb-4">Other Info</h2>
          <div className="flex flex-col space-y-2">
            <div><span className="font-bold">Model:</span> {apiResponse.model}</div>
            <div><span className="font-bold">Prompt Tokens:</span> {apiResponse.prompt_tokens}</div>
            <div><span className="font-bold">Completion Tokens:</span> {apiResponse.completion_tokens}</div>
            <div><span className="font-bold">Total Tokens:</span> {apiResponse.total_tokens}</div>
          </div>
        </div>

    </div>
  );
}

export default ApiResponse;

// src/hooks/useLocalStorage.ts
// import { useState, useEffect } from 'react';

// export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
//   const [storedValue, setStoredValue] = useState<T>(() => {
//     try {
//       const item = window.localStorage.getItem(key)?.trim();
//       alert(item)
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       console.log(error);
//       return initialValue;
//     }
//   });

//   useEffect(() => {
//     try {
//       window.localStorage.setItem(key, JSON.stringify(storedValue));
//     } catch (error) {
//       console.log(error);
//     }
//   }, [key, storedValue]);

//   return [storedValue, setStoredValue];
// }