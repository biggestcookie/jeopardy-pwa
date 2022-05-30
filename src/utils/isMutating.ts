import { MutationType, SubscriptionCallbackMutation } from "pinia";

export function isMutating<T>(
  mutation: SubscriptionCallbackMutation<T>,
  key: keyof T
) {
  return mutation.type === MutationType.patchObject && key in mutation.payload;
}
