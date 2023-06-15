import { useState,useCallback} from "react";

export const useHttpClient=()=>
{
    const [isloading,setIsLoading]=useState(false);
    const [error,setError]=useState();


    const sendRequest=useCallback(async(url,method='GET',body=null,headers={})=>{
        setIsLoading(true);

        try {
            const response=await fetch(url,{
                method,
                body,
                headers,
            });
            const responseData=await response.json();

            if(!response.ok)
            {
               throw new Error(responseData.message);
            }
            setIsLoading(false);
            return responseData;

        } catch (error) {
            setError(error.message|| 'An unknown error occured');
            setIsLoading(false);
            throw error;
        }
    },[]);

    const manageError=()=>{
        setError(null);
    }
 

    return {isloading,error,sendRequest,manageError,setError};
}