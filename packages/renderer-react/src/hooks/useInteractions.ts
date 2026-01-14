import type { InteractionEvents } from "../../../schema";

/**
 * Hook para processar interações do ForgeUI
 * @param interactions Objeto de interações vindo do Nó
 * @param onStateChange Callback para atualizar o estado global do documento
 */
export function useInteractions(
  interactions?: InteractionEvents, 
  onStateChange?: (key: string, value: any) => void
) {
  const handleClick = (e: React.MouseEvent) => {
    // Se não houver evento de clique definido, ignoramos
    if (!interactions?.onClick) return;

    // Impede que o clique dispare em elementos pai (essencial para botões dentro de boxes)
    e.stopPropagation();

    const { type, payload } = interactions.onClick as any;

    console.log(`[ForgeUI] Executando ação: ${type}`, payload);

    switch (type) {
      case 'state.set':
        // Ação fundamental para Abas, Modais e Acordeões
        if (onStateChange && payload?.key) {
          onStateChange(payload.key, payload.value);
        } else {
          console.warn("[ForgeUI] Tentativa de state.set sem onStateChange configurado ou payload inválido.");
        }
        break;

      case 'link.external':
        if (payload?.url) {
          window.open(payload.url, payload.targetBlank ? '_blank' : '_self');
        }
        break;

      case 'navigation.push':
        // No futuro, aqui integraria com seu roteador (Next.js / React Router)
        console.log(`Navegando para página: ${payload?.path}`);
        break;

      default:
        console.warn(`[ForgeUI] Tipo de ação desconhecido: ${type}`);
        break;
    }
  };

  return { handleClick };
}