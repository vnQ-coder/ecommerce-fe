/* eslint-disable */
import {useCallback, useEffect, useState} from "react";

const SUCCESS_RESP_CODE = 200;

const defaultApiCallErrorHandler = (e) => console.log("There is a server error, Sorry for inconvenience: ", e);
const defaultscallOpt = {
  apiDispatchCallError: defaultApiCallErrorHandler,
  initiateOnLoad: true,
  initiateOnLoadCallData: null,
}
/**
 *
 * @param callOptions {{apiDispatchCall: function, apiDispatchCallError: function, initiateOnLoad: boolean = true, initiateOnLoadCallData = null}
 * @returns {{dispatchCall: function, isLoadingResponse: boolean, isSuccessResponse: boolean, apiResponse: Object, body: (ReqBody|string|HTMLElement|Blob|ArrayBufferView|ArrayBuffer|FormData|URLSearchParams|ReadableStream<Uint8Array>)}}
 */
const useApiHook = ( 
  callOptions = {
    apiDispatchCall: null,
    apiDispatchCallError: defaultApiCallErrorHandler,
    initiateOnLoad: true,
    initiateOnLoadCallData: null,
  }
) => {
  const callOpt = { ...defaultscallOpt, ...callOptions };
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [isSuccessResponse, setIsSuccessResponse] = useState(false);
  const [apiResponse, setApiResponse] = useState({});
  const [body, setBody] = useState(null);

  const dispatchRequest = useCallback(async (callToDispatch) => {
    try {
      const apiResponse = await callToDispatch();
      setIsLoadingResponse(true);
      const isSuccessResponse = apiResponse && apiResponse.status === SUCCESS_RESP_CODE;
      if (isSuccessResponse) setIsSuccessResponse(true);
      setApiResponse(apiResponse);
      setBody(apiResponse.body);
      setIsLoadingResponse(false);
      return {
        isSuccessResponse,
        body: apiResponse.body,
        apiResponse
      }
    } catch (e) {
      callOpt.apiDispatchCallError(e);
      return {};
    }
  }, [])

  const onClearResponse = () => {
    setApiResponse({});
    setIsLoadingResponse(false);
    setIsSuccessResponse(false);
  }

  const dispatchCall = async (...data) => dispatchRequest(callOpt.apiDispatchCall.bind(null, ...data));

  useEffect(() => {
    if (callOpt.initiateOnLoad && callOpt.apiDispatchCall) dispatchRequest(callOpt.apiDispatchCall.bind(null, callOpt.initiateOnLoadCallData))
  }, [callOpt.initiateOnLoad, callOpt.apiDispatchCall]);

  return {
    apiResponse,
    onClearResponse,
    dispatchCall,
    body,
    setBody: setBody,
    isLoadingResponse,
    isSuccessResponse,
    dispatchRequest
  }
}
export default useApiHook;