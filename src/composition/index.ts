import { addFunction, loginFn } from "@/composition/login";
export const useAddFunction = addFunction;
export const useLoginFn = loginFn;

import { requestDiagnosesFn } from "@/composition/requestDiagnoses";
export const useRequestDiagnoses = requestDiagnosesFn;

import { modalFn } from "@/composition/modal";
export const useModalFn = modalFn;

import { evaluationModeFn } from "@/composition/evaluationMode";
export const useEvaluationMode = evaluationModeFn;

import { showECGChartFn } from "@/composition/showECGChart";
export const useShowECGChart = showECGChartFn;

import { showTagListFn } from "@/composition/showTagList";
export const useShowTagList = showTagListFn;

import { initSciChartFn } from "@/composition/sciChart/initSciChart";
export const useInitSciChart = initSciChartFn;
