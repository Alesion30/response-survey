import { useRouter } from "next/router";
import { QuestionnaireForm } from "../components/QuestionnaireForm";
import { Questionnaire } from "../schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { questionnaireApi } from "../api";
import { questionnaireQueries } from "../queries";

export const RegisterQuestionnairePage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: Questionnaire) => questionnaireApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(questionnaireQueries.fetchAll().queryKey);
      router.push("/questionnaires");
    },
  });

  const onSubmit = (data: Questionnaire) => {
    mutation.mutate(data);
  };

  return (
    <QuestionnaireForm onSubmit={onSubmit} disabled={mutation.isLoading} />
  );
};