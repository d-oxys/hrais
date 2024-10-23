import Http from "@root/libs/http";
import { AppDispatch } from "..";
import { evaluationActions } from "../slices/evaluation.slice";

// create thunk for evaluation
export const fetchEvaluationData = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(evaluationActions.setLoading(true));
    try {
      const { data } = await new Http().get("/api/v1/evaluations");
      dispatch(evaluationActions.setEvaluation(data.data));
    } catch (error) {
      dispatch(evaluationActions.setError(error));
    } finally {
      dispatch(evaluationActions.setLoading(false));
    }
  };
};

// create thunk for evaluation
export const createEvaluation = (data: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch(evaluationActions.setLoading(true));
    try {
      await new Http().post("/api/v1/evaluation", data);
    } catch (error) {
      dispatch(evaluationActions.setError(error));
    } finally {
      dispatch(evaluationActions.setLoading(false));
    }
  };
};
