import { loginFn } from "@/composition/login";
export const useLoginFn = loginFn;

import { requestDiagnosesFn } from "@/composition/requestDiagnoses";
export const useRequestDiagnoses = requestDiagnosesFn;

import { modalFn } from "@/composition/modal";
export const useModalFn = modalFn;

import { evaluationModeFn } from "@/composition/evaluationMode";
export const useEvaluationMode = evaluationModeFn;

import { showECGChartFn } from "@/composition/showECGChart";
export const useShowECGChart = showECGChartFn;

import { initSciChartFn } from "@/composition/sciChart/initSciChart";
export const useInitSciChart = initSciChartFn;
