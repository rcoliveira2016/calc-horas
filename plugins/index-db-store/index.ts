import { HistoricoStorege as CriarHistoricoStorege } from "./storages/historico-storege";


export default defineNuxtPlugin(() => {
  return {
    provide: {
      historicoHorasStorage: CriarHistoricoStorege(),
    },
  };
});
